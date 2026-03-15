import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { request_templates, template_items } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { 
  ArrowLeft, 
  FileText, 
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { AddItemForm } from "./AddItemForm";
import { DeleteItemButton } from "./DeleteItemButton";
import { DeleteTemplateButton } from "./DeleteTemplateButton";

export default async function TemplateBuilderPage({
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

  // Fetch template details
  const template = await db.query.request_templates.findFirst({
    where: and(
      eq(request_templates.id, id),
      eq(request_templates.profileId, user.id)
    ),
    with: {
      items: {
        orderBy: [desc(template_items.createdAt)],
      },
    },
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Tightened Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/templates"
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-xs group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-indigo-950 tracking-tight leading-none">
              {template.name}
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
              <FileText size={12} strokeWidth={3} />
              Template Builder
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DeleteTemplateButton templateId={id} />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Add Item Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm sticky top-8">
            <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Plus size={16} strokeWidth={3} className="text-indigo-600" />
              Add Requirement
            </h2>
            <AddItemForm templateId={id} />
          </div>
        </div>

        {/* Right Column: Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Required Documents</h2>
              <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
                {template.items?.length || 0} Total
              </span>
            </div>

            {template.items?.length === 0 ? (
              <div className="p-20 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-200">
                  <AlertCircle size={24} />
                </div>
                <p className="text-sm font-bold text-slate-400">No documents defined yet.</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">Use the form on the left to start building.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {template.items.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xs">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1 flex items-center gap-2">
                          {item.name}
                          {item.isRequired && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-black uppercase tracking-tighter">
                              Required
                            </span>
                          )}
                        </h4>
                        {item.description && (
                          <p className="text-[11px] text-slate-400 font-medium line-clamp-1 italic">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DeleteItemButton templateId={id} itemId={item.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Help Card */}
          <div className="bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-black mb-2">Ready to use</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Templates are automatically available when you send a new document request. Changes are saved in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
