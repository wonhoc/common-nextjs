"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, RefreshCw } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useMenus } from "@/hooks/menu.mutation";
import { hasPermission } from "@/lib/menu";
import type { MenuItem, MenuConfig } from "@/types/menu";

export function Sidebar() {
  const pathname = usePathname();
  const { data, isLoading, refetch } = useMenus();
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);

  const menus = data?.data || [];

  useEffect(() => {
    if (Array.isArray(menus) && menus.length > 0) {
      // 현재 경로에 해당하는 메뉴의 부모 메뉴를 자동으로 펼침
      const expandedIds: number[] = [];

      const findAndExpandParents = (items: MenuItem[], path: string) => {
        for (const item of items) {
          if (path.startsWith(item.url)) {
            if (item.parentId) {
              expandedIds.push(item.parentId);
            }
          }

          if (item.children && item.children.length > 0) {
            findAndExpandParents(item.children, path);
          }
        }
      };

      findAndExpandParents(menus, pathname);
      setExpandedMenus(expandedIds);
    }
  }, [menus, pathname]);

  const toggleMenu = (menuId: number) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const parseConfig = (configStr: string): MenuConfig => {
    try {
      return JSON.parse(configStr);
    } catch (e) {
      return {};
    }
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    // 권한 체크
    if (item.permission && !hasPermission(item.permission)) return null;

    // 비활성화 또는 숨김 처리된 메뉴는 표시하지 않음
    if (!item.isActive || !item.isVisible) return null;

    const config = parseConfig(item.config);
    const linkProps: any = {};

    // target 설정이 있으면 적용
    if (config.target) {
      linkProps.target = config.target;
      linkProps.rel = "noopener noreferrer";
    }

    // 하위 메뉴가 있는 경우
    if (item.hasChildren && item.children && item.children.length > 0) {
      const isExpanded = expandedMenus.includes(item.id);

      return (
        <div key={item.id} className="mb-1">
          <Button
            variant="ghost"
            className={`w-full justify-between h-9 px-3 ${
              isActive(item.url) ? "bg-blue-50 text-blue-700" : "text-gray-600"
            } ${depth > 0 ? `ml-${depth * 4}` : ""}`}
            onClick={() => toggleMenu(item.id)}
            style={{ paddingLeft: `${12 + depth * 16}px` }}
          >
            <span className="flex items-center gap-3">
              <DynamicIcon name={item.icon} className="w-4 h-4" />
              <span className="font-medium text-sm">{item.name}</span>
            </span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>

          {isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children.map((child) => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // 일반 메뉴 항목
    return (
      <div key={item.id} className="mb-1">
        <Link href={item.url} {...linkProps}>
          <Button
            variant={isActive(item.url) ? "default" : "ghost"}
            className="w-full justify-start gap-3 h-9"
            size="sm"
            title={item.description}
            style={{ paddingLeft: `${12 + depth * 16}px` }}
          >
            <DynamicIcon name={item.icon} className="w-4 h-4" />
            {item.name}
          </Button>
        </Link>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 bg-gray-100 rounded-md animate-pulse" />
          ))}
          <div className="text-center text-sm text-gray-500 mt-4">
            메뉴를 불러오는 중...
          </div>
        </div>
      );
    }

    if (Array.isArray(menus) && menus.length === 0) {
      return (
        <div className="text-center text-sm text-gray-500 py-8">
          <div className="mb-2">메뉴가 없습니다</div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </Button>
        </div>
      );
    }

    return (
      <nav className="space-y-1">
        {Array.isArray(menus) && menus.map((menu) => renderMenuItem(menu))}
      </nav>
    );
  };

  return (
    <aside className="w-64 h-screen border-r bg-white shadow-sm">
      <div className="p-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <span className="font-bold text-xl text-gray-900">게시판</span>
            <p className="text-xs text-gray-500">관리 시스템</p>
          </div>
        </Link>

        {/* 메뉴 컨텐츠 */}
        {renderContent()}
      </div>
    </aside>
  );
}
