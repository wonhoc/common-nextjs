"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import type { MenuItem } from "@/types/menu";

interface MenuTreeProps {
  menus: MenuItem[];
  onEdit: (menu: MenuItem) => void;
  onDelete: (menuId: number) => void;
  onToggleActive: (menuId: number, isActive: boolean) => void;
  onAddChild: (parentId: number, parentName: string) => void;
}

export function MenuTree({
  menus,
  onEdit,
  onDelete,
  onToggleActive,
  onAddChild,
}: MenuTreeProps) {
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);

  const toggleExpand = (menuId: number) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedMenus.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div
        key={item.id}
        className={`${level > 0 ? "ml-6 border-l border-gray-200 pl-4" : ""}`}
      >
        <Card className={`mb-2 ${!item.isActive ? "opacity-60" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(item.id)}
                    className="p-1"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                )}

                <div className="flex items-center gap-3">
                  <DynamicIcon
                    name={item.icon}
                    className="w-5 h-5 text-gray-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span>URL: {item.url}</span>
                      <span>권한: {item.permission}</span>
                      <span>순서: {item.sortOrder}</span>
                      <span>레벨: {item.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="w-4 h-4 mr-2" />
                    수정
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onAddChild(item.id, item.name)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    하위 메뉴 추가
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onToggleActive(item.id, !item.isActive)}
                  >
                    {item.isActive ? (
                      <EyeOff className="w-4 h-4 mr-2" />
                    ) : (
                      <Eye className="w-4 h-4 mr-2" />
                    )}
                    {item.isActive ? "비활성화" : "활성화"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {hasChildren && isExpanded && (
          <div className="mt-2">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">{menus.map((menu) => renderMenuItem(menu))}</div>
  );
}
