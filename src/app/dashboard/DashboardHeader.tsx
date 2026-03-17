import { TrendingUp, Plus } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  displayName: string;
}

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-600 mb-4 uppercase tracking-[0.2em]">
          <TrendingUp size={12} strokeWidth={3} />
          <span>Operational Overview</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tight leading-none">
          Welcome back, <br className="md:hidden" />
          <span className="text-indigo-600 font-serif italic font-normal">{displayName}.</span>
        </h1>
      </div>
      <div className="flex gap-3">
        <Link 
          href="/dashboard/clients" 
          className="flex-1 md:flex-none h-12 px-6 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
        >
          View Clients
        </Link>
        <Link 
          href="/dashboard/clients"
          className="flex-1 md:flex-none h-12 px-6 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-200"
        >
          <Plus size={18} strokeWidth={3} />
          New Request
        </Link>
      </div>
    </header>
  );
}
