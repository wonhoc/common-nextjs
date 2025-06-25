"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, RefreshCw, Settings } from "lucide-react";
import { MenuTree } from "@/components/menu-tree";
import { useMenus, useDeleteMenu } from "@/hooks/menu.mutation";
import { deleteMenu, updateMenu } from "@/lib/menu-api";
import type { MenuItem } from "@/types/menu";
import { useRouter } from "next/navigation";

export default function MenuManagementPage() {
  const router = useRouter();

  const [filteredMenus, setFilteredMenus] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // useMenus 훅만 사용하여 데이터 관리
  const { data, isLoading, refetch } = useMenus();
  const { mutate: deleteMutate } = useDeleteMenu();
  // data가 변경될 때마다 menus 상태 업데이트
  const menus = data?.data || [];

  useEffect(() => {
    if (searchTerm) {
      const filtered = filterMenus(menus, searchTerm.toLowerCase());
      setFilteredMenus(filtered);
    } else {
      setFilteredMenus(menus);
    }
  }, [menus, searchTerm]);

  const filterMenus = (menuList: MenuItem[], term: string): MenuItem[] => {
    return menuList
      .map((menu) => {
        const matchesSearch =
          menu.name.toLowerCase().includes(term) ||
          menu.description.toLowerCase().includes(term) ||
          menu.url.toLowerCase().includes(term);

        const filteredChildren = menu.children
          ? filterMenus(menu.children, term)
          : [];

        if (matchesSearch || filteredChildren.length > 0) {
          return {
            ...menu,
            children: filteredChildren,
          };
        }

        return null;
      })
      .filter((menu): menu is MenuItem => menu !== null);
  };

  const handleEdit = (menu: MenuItem) => {
    window.location.href = `/setting/menus/${menu.id}/update`;
  };

  const handleDelete = async (menuId: number) => {
    if (!confirm("정말로 이 메뉴를 삭제하시겠습니까?")) return;

    try {
      await deleteMutate(menuId);

      await refetch();
    } catch (error) {
      alert("메뉴 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleToggleActive = async (menuId: number, isActive: boolean) => {
    try {
      await updateMenu(menuId, { isActive });
      // 업데이트 후 데이터 다시 가져오기
      await refetch();
    } catch (error) {
      alert("메뉴 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handleAddChild = (parentId: number, parentName: string) => {
    router.push(
      `/setting/menus/register?parentId=${parentId}&parentName=${encodeURIComponent(
        parentName
      )}`
    );
  };

  const handleRefresh = () => {
    refetch();
  };

  const getMenuStats = () => {
    const totalMenus = countMenus(menus);
    const activeMenus = countActiveMenus(menus);
    const topLevelMenus = menus.length;

    return { totalMenus, activeMenus, topLevelMenus };
  };

  const countMenus = (menuList: MenuItem[]): number => {
    return menuList.reduce((count, menu) => {
      return count + 1 + (menu.children ? countMenus(menu.children) : 0);
    }, 0);
  };

  const countActiveMenus = (menuList: MenuItem[]): number => {
    return menuList.reduce((count, menu) => {
      const currentCount = menu.isActive ? 1 : 0;
      const childCount = menu.children ? countActiveMenus(menu.children) : 0;
      return count + currentCount + childCount;
    }, 0);
  };

  const stats = getMenuStats();

  // 페이지 이동 함수
  const handleNavigate = (path: string) => {
    router.push("/setting/menus" + path); // 다른 페이지로 이동
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">메뉴 관리</h1>
              <p className="text-gray-600">시스템 메뉴를 관리하고 구성하세요</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              새로고침
            </Button>

            <Button
              onClick={() => handleNavigate("/register")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />새 메뉴 추가
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전체 메뉴</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalMenus}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">활성 메뉴</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.activeMenus}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    최상위 메뉴
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.topLevelMenus}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="메뉴명, 설명, URL로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 메뉴 트리 */}
        <Card>
          <CardHeader>
            <CardTitle>메뉴 구조</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-100 rounded-md animate-pulse"
                  />
                ))}
              </div>
            ) : filteredMenus.length === 0 ? (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  {searchTerm ? "검색 결과가 없습니다." : "메뉴가 없습니다."}
                </p>
                {!searchTerm && (
                  <Button onClick={() => handleNavigate("/register")}>
                    첫 번째 메뉴 추가하기
                  </Button>
                )}
              </div>
            ) : (
              <MenuTree
                menus={filteredMenus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
                onAddChild={handleAddChild}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
