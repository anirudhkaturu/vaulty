import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { 
  LayoutDashboard, 
  Users, 
  FileStack, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";

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

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  const displayName = profile?.name || user.email?.split("@")[0] || "User";

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Templates", href: "/dashboard/templates", icon: FileStack },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200/60 flex flex-col sticky top-0 h-screen hidden lg:flex">
        {/* Logo Section */}
        <div className="p-8 pb-10">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="grid grid-cols-2 gap-0.5 rounded-xl bg-indigo-600 p-2 shadow-lg shadow-indigo-200 transition-transform group-hover:scale-105 group-active:scale-95">
              <span className="h-2.5 w-2.5 rounded-xs bg-white/40" />
              <span className="h-2.5 w-2.5 rounded-xs bg-white" />
              <span className="h-2.5 w-2.5 rounded-xs bg-white" />
              <span className="h-2.5 w-2.5 rounded-xs bg-white/40" />
            </div>
            <span className="font-serif text-2xl italic tracking-tight text-indigo-950">
              Vaulty
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
            >
              <item.icon size={20} className="transition-colors group-hover:text-indigo-600" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-3xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 font-black shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-indigo-950 truncate leading-none mb-1">
                  {displayName}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                  {profile?.companyName || "Personal Account"}
                </p>
              </div>
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all group"
              >
                <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                Sign Out
              </button>
            </form>
          </div>
          
          <div className="px-4 py-2 flex items-center justify-between text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <span>v0.1.0</span>
            <div className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles size={10} strokeWidth={3} />
              BETA
            </div>
          </div>
        </div>
      </aside>

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
          {/* Mobile toggle could go here */}
        </header>

        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
