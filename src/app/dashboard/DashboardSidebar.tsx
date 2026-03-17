"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileStack,
  Settings,
  LogOut,
  Sparkles,
  FileSearch,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Requests", href: "/dashboard/requests", icon: FileSearch },
    { label: "Templates", href: "/dashboard/templates", icon: FileStack },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200/60 flex flex-col sticky top-0 h-screen lg:flex shadow-lg shadow-slate-100/50">
      {/* Logo Section */}
      <div className="p-8 pb-10">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="grid grid-cols-2 gap-0.5 rounded-xl bg-indigo-600 p-2 shadow-lg shadow-indigo-200 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-300 group-active:scale-95">
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
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                isActive
                  ? "bg-linear-to-r from-indigo-50 to-indigo-50/50 text-indigo-600 border border-indigo-200 shadow-sm shadow-indigo-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:shadow-sm hover:shadow-slate-200 border border-transparent"
              }`}
            >
              <item.icon
                size={20}
                className={`transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-400 group-hover:text-indigo-600 group-hover:scale-110"
                }`}
              />
              <span className="relative">
                {item.label}
                {/* Subtle underline effect on hover */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-300 rounded-full transition-all duration-200 group-hover:w-full" />
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer with Sign Out and Version */}
      <div className="p-4 mt-auto">
        {/* Sign Out Button */}
        <form action="/auth/signout" method="post" className="mb-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200 group shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <LogOut
              size={16}
              className="transition-all duration-200 group-hover:-translate-x-0.5 group-hover:scale-110"
            />
            Sign Out
          </button>
        </form>

        {/* Version and Beta */}
        <div className="px-4 py-2 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span className="hover:text-slate-500 transition-colors">v0.1.0</span>
          <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-50/50 px-2 py-1 rounded-full">
            <Sparkles size={10} strokeWidth={3} className="animate-pulse" />
            <span>BETA</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
