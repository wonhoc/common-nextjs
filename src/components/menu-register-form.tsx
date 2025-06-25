"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getAvailableIcons, getAvailablePermissions } from "@/lib/menu-api";
import type { MenuItem, CreateMenuRequest } from "@/types/menu";
import { useCreateMenu, useUpdateMenu } from "@/hooks/menu.mutation";
import { useSearchParams } from "next/navigation";

interface MenuFormProps {
  menu?: MenuItem;
  parentId?: number;
  mode: "create" | "update";
}

export function MenuForm({ menu, parentId, mode }: MenuFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableIcons] = useState(getAvailableIcons());
  const [availablePermissions] = useState(getAvailablePermissions());

  const searchParams = useSearchParams();
  const parentName = searchParams.get("parentName");

  console.log(menu);

  const [formData, setFormData] = useState<CreateMenuRequest>({
    name: menu?.name || "",
    description: menu?.description || "",
    url: menu?.url || "",
    icon: menu?.icon || "circle",
    sortOrder: menu?.sortOrder || 1,
    level: menu?.level || 1,
    isActive: menu?.isActive ?? true,
    isVisible: menu?.isVisible ?? true,
    type: menu?.type || "menu",
    permission: menu?.permission || "",
    config: menu?.config || "{}",
    parentId: parentId ? Number(parentId) : null,
  });

  useEffect(() => {
    if (menu && mode === "update") {
      setFormData({
        name: menu.name || "",
        description: menu.description || "",
        url: menu.url || "",
        icon: menu.icon || "circle",
        sortOrder: menu.sortOrder || 1,
        level: menu.level || 1,
        isActive: menu.isActive ?? true,
        isVisible: menu.isVisible ?? true,
        type: menu.type || "menu",
        permission: menu.permission || "",
        config: menu.config || "{}",
        parentId: menu.parentId || null,
      });
    }
  }, [menu, mode]);

  const { mutate: createMenu } = useCreateMenu();
  const { mutate: updateMenu } = useUpdateMenu();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        createMenu(formData);
      } else if (mode === "update") {
        updateMenu({
          menuId: menu?.id!,
          data: formData,
        });
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "새 메뉴 추가" : "메뉴 수정"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">메뉴명 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="메뉴명을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="/example"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="메뉴에 대한 설명을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">아이콘</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData({ ...formData, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <DynamicIcon name={formData.icon} className="w-4 h-4" />
                      {formData.icon}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={icon} className="w-4 h-4" />
                        {icon}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permission">권한 *</Label>
              <Select
                value={formData.permission}
                onValueChange={(value) =>
                  setFormData({ ...formData, permission: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="권한을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {availablePermissions.map((permission) => (
                    <SelectItem key={permission} value={permission}>
                      {permission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {parentId != null && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>부모 메뉴</Label>
                <div className="flex items-center p-3 border rounded-md bg-gray-50">
                  {parentName}
                </div>
                {/* hidden input으로 값 전달 */}
                <input type="hidden" name="parentId" value={parentId} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">정렬 순서</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: Number(e.target.value),
                  })
                }
                min="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="config">설정 (JSON)</Label>
            <Input
              id="config"
              value={formData.config}
              onChange={(e) =>
                setFormData({ ...formData, config: formData.config })
              }
              placeholder='{"target": "_blank"}'
            />
            <p className="text-xs text-gray-500">
              JSON 형식으로 추가 설정을 입력하세요. 예: target, className 등
            </p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="isActive">활성화</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isVisible: checked })
                  }
                />
                <Label htmlFor="isVisible">표시</Label>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>레벨: {formData.level}</p>
              <p>타입: {formData.type}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "저장 중..."
                : mode === "create"
                ? "추가"
                : "수정"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
