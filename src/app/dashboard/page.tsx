import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, clients } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { 
  Users, 
  FileText, 
  Clock, 
  Plus, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [profile, clientCountResult] = await Promise.all([
    db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    }),
    db
      .select({ value: count() })
      .from(clients)
      .where(eq(clients.profileId, user.id)),
  ]);

  const displayName = profile?.name || user.email?.split("@")[0] || "User";
  const activeClients = clientCountResult[0]?.value || 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
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
          <button className="flex-1 md:flex-none h-12 px-6 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-200">
            <Plus size={18} strokeWidth={3} />
            New Request
          </button>
        </div>
      </header>

      {/* Stats Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Clients Card */}
        <div className="group bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
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
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={12} />
                +12%
              </span>
            </div>
          </div>
        </div>

        {/* Pending Requests Card */}
        <div className="group bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-amber-600">
            <Clock size={80} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-500">
              <Clock size={24} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Pending Files</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-indigo-950 tracking-tighter">0</span>
              <span className="text-xs font-bold text-slate-400 italic">No active chase</span>
            </div>
          </div>
        </div>

        {/* Verified Files Card */}
        <div className="group bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-indigo-600">
            <ShieldCheck size={80} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-200">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Verified Items</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-indigo-950 tracking-tighter">0</span>
              <span className="text-xs font-bold text-slate-400">Total volume</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Empty State */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-2">
            Recent Requests
            <span className="h-px flex-1 bg-slate-100 ml-4" />
          </h2>
          
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-12 text-center border-dashed flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-black text-indigo-950 mb-2">Your vault is clean.</h3>
            <p className="text-slate-400 font-medium max-w-sm mx-auto mb-8">
              You haven&apos;t requested any documents yet. Start by adding a client and sending your first request.
            </p>
            <button className="h-12 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
              Launch Setup Wizard
            </button>
          </div>
        </div>

        {/* Quick Actions / Sidebar Side */}
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Create Template", icon: Plus, desc: "For recurring requests" },
                { label: "Add Client", icon: Users, desc: "Register a new entity" },
                { label: "Export Logs", icon: FileText, desc: "Download activity CSV" },
              ].map((action, i) => (
                <button 
                  key={i} 
                  className="group p-4 bg-white border border-slate-200/60 rounded-2xl hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <action.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-indigo-950 leading-tight mb-0.5">{action.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{action.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* Tips Card */}
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-black mb-2 relative z-10">Pro Tip</h3>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10 mb-6">
              Use templates to automate document requests for common onboarding flows. It saves about 12 minutes per client.
            </p>
            <button className="text-xs font-black uppercase tracking-[0.2em] py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              Explore Templates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
