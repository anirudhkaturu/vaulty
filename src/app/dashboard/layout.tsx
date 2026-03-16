import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DashboardSidebar } from "./DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Sidebar - Client Component */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 rounded-lg bg-indigo-600 p-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-xs bg-white/40" />
              <span className="h-2 w-2 rounded-xs bg-white" />
              <span className="h-2 w-2 rounded-xs bg-white" />
              <span className="h-2 w-2 rounded-xs bg-white/40" />
            </div>
            <span className="font-serif text-xl italic tracking-tight text-indigo-950">
              Vaulty
            </span>
          </Link>
        </header>

        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
