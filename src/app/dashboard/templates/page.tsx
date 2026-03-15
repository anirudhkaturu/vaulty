import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { request_templates, template_items } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { 
  FileStack, 
  Plus, 
  Search, 
  ArrowRight,
  MoreVertical,
  Layers
} from "lucide-react";
import Link from "next/link";
import { AddTemplateForm } from "./AddTemplateForm";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const allTemplates = await db.query.request_templates.findMany({
    where: eq(request_templates.profileId, user.id),
    orderBy: [desc(request_templates.createdAt)],
    with: {
      items: true,
    },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[9px] font-black text-indigo-600 mb-2 uppercase tracking-[0.2em]">
            <Layers size={10} strokeWidth={3} />
            <span>Workflow Automation</span>
          </div>
          <h1 className="text-3xl font-black text-indigo-950 tracking-tight leading-none">
            Request Templates
          </h1>
        </div>
        <AddTemplateForm />
      </header>

      {/* Compact Action Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search templates..."
            className="w-full bg-white border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Templates Grid */}
      {allTemplates.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-20 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
            <FileStack size={28} />
          </div>
          <h3 className="text-lg font-black text-indigo-950 mb-1">No templates found.</h3>
          <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-6">
            Create your first reusable request template to save time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTemplates.map((template) => (
            <Link 
              key={template.id}
              href={`/dashboard/templates/${template.id}`}
              className="group bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300 flex flex-col text-left"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                  <FileStack size={22} />
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <MoreVertical size={16} />
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-indigo-950 leading-tight group-hover:text-indigo-600 transition-colors mb-2">
                {template.name}
              </h3>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">
                  {template.items?.length || 0} Items
                </span>
                <div className="flex items-center gap-1.5 text-indigo-600 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <span className="text-[10px] font-black uppercase tracking-widest">Edit Builder</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
