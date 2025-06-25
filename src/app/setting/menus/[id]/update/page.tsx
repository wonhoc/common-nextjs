"use client";

import { MenuForm } from "@/components/menu-register-form";
import { useMenu } from "@/hooks/menu.mutation";
import { useEffect, useState } from "react";

interface EditMenuPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default function EditMenuPage({ params }: EditMenuPageProps) {
  const [menuId, setMenuId] = useState<number | null>(null);

  useEffect(() => {
    params.then((p) => setMenuId(Number(p.id)));
  }, [params]);

  const { data, isLoading, error } = useMenu(menuId || 0);

  const menu = data?.data;

  return (
    <div className="p-8">
      <MenuForm menu={menu} mode="update" />
    </div>
  );
}
