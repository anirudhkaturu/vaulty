import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { profiles, clients, requests } from "@/lib/db/schema";
import { eq, count, desc, and } from "drizzle-orm";
import { 
  Users, 
  FileText, 
  Clock, 
  Plus, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [profile, clientCountResult, pendingRequestsResult, completedRequestsResult, userRecentRequests] = await Promise.all([
    db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    }),
    db
      .select({ value: count() })
      .from(clients)
      .where(eq(clients.profileId, user.id)),
    db
      .select({ value: count() })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(
        and(
          eq(clients.profileId, user.id),
          eq(requests.status, "pending")
        )
      ),
    db
      .select({ value: count() })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(
        and(
          eq(clients.profileId, user.id),
          eq(requests.status, "completed")
        )
      ),
    db
      .select({
        id: requests.id,
        clientId: requests.clientId,
        status: requests.status,
        createdAt: requests.createdAt,
        client: {
          name: clients.name,
        }
      })
      .from(requests)
      .innerJoin(clients, eq(requests.clientId, clients.id))
      .where(eq(clients.profileId, user.id))
      .orderBy(desc(requests.createdAt))
      .limit(5),
  ]);

  const displayName = profile?.name || user.email?.split("@")[0] || "User";
  const activeClients = clientCountResult[0]?.value || 0;
  const pendingFiles = pendingRequestsResult[0]?.value || 0;
  const verifiedItems = completedRequestsResult[0]?.value || 0;

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
          <Link 
            href="/dashboard/clients"
            className="flex-1 md:flex-none h-12 px-6 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-200"
          >
            <Plus size={18} strokeWidth={3} />
            New Request
          </Link>
        </div>
      </header>

      {/* Stats Grid - Bento Style */}
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

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-indigo-950 flex items-center gap-2">
            Recent Requests
            <span className="h-px flex-1 bg-slate-100 ml-4" />
          </h2>
          
          {userRecentRequests.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-12 text-center border-dashed flex flex-col items-center justify-center min-h-100">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-black text-indigo-950 mb-2">Your vault is clean.</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto mb-8">
                You haven&apos;t requested any documents yet. Start by adding a client and sending your first request.
              </p>
              <Link 
                href="/dashboard/clients"
                className="h-12 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 flex items-center justify-center"
              >
                Add Your First Client
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {userRecentRequests.map((request) => (
                  <Link 
                    key={request.id} 
                    href={`/dashboard/clients/${request.clientId}`}
                    className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-105 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-indigo-950 leading-tight mb-1">
                          Request for {request.client.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1">
                            <Clock size={10} />
                            {request.createdAt.toLocaleDateString()}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter ${
                            request.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </Link>
                ))}
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                <Link href="/dashboard/clients" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">
                  View All Clients
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions / Sidebar Side */}
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Create Template", icon: Plus, desc: "For recurring requests", href: "/dashboard/templates" },
                { label: "Add Client", icon: Users, desc: "Register a new entity", href: "/dashboard/clients" },
              ].map((action, i) => (
                <Link 
                  key={i} 
                  href={action.href}
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
                </Link>
              ))}
            </div>
          </section>

          {/* Tips Card */}
          <div className="bg-indigo-600 rounded-4xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h3 className="text-lg font-black mb-2 relative z-10">Pro Tip</h3>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10 mb-6">
              Use templates to automate document requests for common onboarding flows. It saves time and ensures consistency.
            </p>
            <Link 
              href="/dashboard/templates"
              className="inline-block text-[10px] font-black uppercase tracking-[0.2em] py-2.5 px-6 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all shadow-md active:scale-95"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
