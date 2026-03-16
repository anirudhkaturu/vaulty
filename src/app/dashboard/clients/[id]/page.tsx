import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { clients, requests, request_templates } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Clock
} from "lucide-react";
import { NewRequestButton } from "./NewRequestButton";
import { RequestRowActions } from "./RequestRowActions";
import { DeleteClientButton } from "./DeleteClientButton";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch client details
  const client = await db.query.clients.findFirst({
    where: and(
      eq(clients.id, id),
      eq(clients.profileId, user.id)
    ),
  });

  if (!client) {
    notFound();
  }

  // Fetch templates for the user
  const templates = await db.query.request_templates.findMany({
    where: eq(request_templates.profileId, user.id),
    orderBy: [desc(request_templates.createdAt)],
  });

  // Fetch requests for this client
  const clientRequests = await db.query.requests.findMany({
    where: eq(requests.clientId, client.id),
    orderBy: [desc(requests.createdAt)],
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Tightened Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/clients"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-xs group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-indigo-950 tracking-tight leading-none">
              {client.name}
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active Client
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NewRequestButton clientId={id} templates={templates} />
          
          <button className="h-9 px-4 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider">
            Edit Details
          </button>

          <DeleteClientButton clientId={id} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Compact Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Email</p>
                  <p className="text-xs font-bold text-indigo-950 truncate">{client.email || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Phone</p>
                  <p className="text-xs font-bold text-indigo-950 truncate">{client.phone || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                  <Calendar size={14} className="text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Joined</p>
                  <p className="text-xs font-bold text-indigo-950">{client.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {client.notes && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-2">Notes</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                  &ldquo;{client.notes}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Requests & Timeline */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-visible">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Document Requests</h2>
              <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                {clientRequests.length} Total
              </span>
            </div>

            {clientRequests.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
                  <FileText size={20} className="text-slate-200" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active requests.</p>
                
                <NewRequestButton clientId={id} templates={templates} variant="ghost" />
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {clientRequests.map((request) => (
                  <div key={request.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xs">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1">
                          Request #{request.id.slice(0, 8).toUpperCase()}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                            <Clock size={10} />
                            {request.createdAt.toLocaleDateString()}
                          </span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter ${
                            request.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RequestRowActions 
                        requestId={request.id} 
                        clientId={id} 
                        templateId={request.templateId} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
