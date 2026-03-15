import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { clients, requests } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  Plus,
  Clock
} from "lucide-react";
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

  // Fetch requests for this client
  const clientRequests = await db.query.requests.findMany({
    where: eq(requests.clientId, client.id),
    orderBy: [desc(requests.createdAt)],
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/clients"
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <span className="font-bold text-indigo-950">{client.name}</span>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Client Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-4xl p-8 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-3xl mb-6">
                {client.name.charAt(0)}
              </div>
              <h1 className="text-2xl font-black text-indigo-950 mb-1">{client.name}</h1>
              <p className="text-slate-500 text-sm font-medium mb-8">Client since {client.createdAt.toLocaleDateString()}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Email</p>
                    <p className="text-sm font-bold truncate">{client.email || "No email"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Phone</p>
                    <p className="text-sm font-bold truncate">{client.phone || "No phone"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Added</p>
                    <p className="text-sm font-bold">{client.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Private Notes</p>
                  <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 font-medium leading-relaxed">
                    {client.notes}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-slate-100">
                <DeleteClientButton clientId={id} />
              </div>
            </div>
          </div>

          {/* Right Column: Requests */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-black text-indigo-950">Document Requests</h2>
              <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-indigo-600 px-4 py-2 rounded-xl font-bold hover:bg-indigo-50 transition-all text-xs">
                <Plus size={16} strokeWidth={3} />
                New Request
              </button>
            </div>

            {clientRequests.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-4xl py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText size={24} className="text-slate-300" />
                </div>
                <h3 className="text-indigo-950 font-bold">No requests yet</h3>
                <p className="text-slate-400 text-sm mt-1">Send a document request to this client to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {clientRequests.map((request) => (
                  <div key={request.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between hover:border-indigo-200 transition-all shadow-sm group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-indigo-950 leading-none mb-1.5 flex items-center gap-2">
                          Request #{request.id.slice(0, 8)}
                          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest ${
                            request.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {request.status}
                          </span>
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Sent {request.createdAt.toLocaleDateString()}
                          </span>
                          {request.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              Due {request.dueDate.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">
                      Manage Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
