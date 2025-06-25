import { MenuForm } from "@/components/menu-register-form";

interface NewMenuPageProps {
  searchParams: {
    parentId?: string;
  };
}

export default function NewMenuPage({ searchParams }: NewMenuPageProps) {
  const parentId =
    searchParams && searchParams.parentId
      ? Number(searchParams.parentId)
      : undefined;

  return (
    <div className="p-8">
      <MenuForm mode="create" parentId={parentId} />
    </div>
  );
}
