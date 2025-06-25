// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
