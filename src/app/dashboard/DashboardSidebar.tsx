"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileStack, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";

export function DashboardSidebar({ 
  displayName, 
  companyName 
}: { 
  displayName: string; 
  companyName?: string | null;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Templates", href: "/dashboard/templates", icon: FileStack },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
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
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group ${
                isActive 
                  ? "bg-indigo-50 text-indigo-600 shadow-xs shadow-indigo-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              <item.icon 
                size={20} 
                className={`transition-colors ${isActive ? "text-indigo-600" : "group-hover:text-indigo-600"}`} 
              />
              {item.label}
            </Link>
          );
        })}
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
                {companyName || "Personal Account"}
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
  );
}
