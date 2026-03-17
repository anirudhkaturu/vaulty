import { Plus, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function DashboardActions() {
  return (
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
  );
}
