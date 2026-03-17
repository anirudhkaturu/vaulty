import { Users, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface StatsGridProps {
  activeClients: number;
  pendingFiles: number;
  verifiedItems: number;
}

export function StatsGrid({ activeClients, pendingFiles, verifiedItems }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Active Clients Card */}
      <Link href="/dashboard/clients" className="group bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <Users size={80} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform duration-500">
            <Users size={24} />
          </div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Active Clients</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-indigo-950 tracking-tighter">{activeClients}</span>
          </div>
        </div>
      </Link>

      {/* Pending Requests Card */}
      <div className="group bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-amber-600">
          <Clock size={80} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-500">
            <Clock size={24} />
          </div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Pending Requests</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-indigo-950 tracking-tighter">{pendingFiles}</span>
            <span className="text-xs font-bold text-slate-400 italic">Active chase</span>
          </div>
        </div>
      </div>

      {/* Verified Files Card */}
      <div className="group bg-white border border-slate-200/60 rounded-4xl p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-indigo-600">
          <ShieldCheck size={80} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-200">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Completed</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-indigo-950 tracking-tighter">{verifiedItems}</span>
            <span className="text-xs font-bold text-slate-400">Verified requests</span>
          </div>
        </div>
      </div>
    </div>
  );
}
