"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  // 아이콘 이름을 PascalCase로 변환
  const iconName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  // unknown으로 먼저 캐스팅한 후 LucideIcon으로 캐스팅
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];

  if (!Icon) {
    // 아이콘이 없을 경우 기본 아이콘 표시
    return <LucideIcons.Circle className={className} />;
  }

  return <Icon className={className} />;
}
