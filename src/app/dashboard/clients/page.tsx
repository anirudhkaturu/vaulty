import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Search, Mail, Users, ArrowRight } from "lucide-react";
import { AddClientForm } from "./AddClientForm";
import { ClientRowActions } from "./ClientRowActions";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const allClients = await db.query.clients.findMany({
    where: eq(clients.profileId, user.id),
    orderBy: [desc(clients.createdAt)],
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Tightened Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[9px] font-black text-indigo-600 mb-2 uppercase tracking-[0.2em]">
            <Users size={10} strokeWidth={3} />
            <span>Directory</span>
          </div>
          <h1 className="text-3xl font-black text-indigo-950 tracking-tight leading-none">
            Clients
          </h1>
        </div>
        <AddClientForm />
      </header>

      {/* Compact Action Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Quick search..."
            className="w-full bg-white border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Tightened Clients List - Removed overflow-hidden to allow menus to pop */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-visible">
        {allClients.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
              <Users size={28} />
            </div>
            <h3 className="text-lg font-black text-indigo-950 mb-1">No clients yet.</h3>
            <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-6">
              Your directory is empty.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/60">
            {allClients.map((client, index) => (
              <div 
                key={client.id} 
                className={`group relative flex items-center pr-4 hover:bg-slate-50/50 transition-all ${
                  index === 0 ? "rounded-t-3xl" : ""
                } ${
                  index === allClients.length - 1 ? "rounded-b-3xl" : ""
                }`}
              >
                <Link 
                  href={`/dashboard/clients/${client.id}`}
                  className="px-5 py-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm group-hover:scale-105 transition-transform duration-300 shadow-xs group-hover:bg-white border border-transparent group-hover:border-indigo-100">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {client.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-bold uppercase tracking-wide">
                          {client.email || "No email"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>
                </Link>
                
                <ClientRowActions clientId={client.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
