import Link from "next/link";
import { FileStack, MoreVertical, ArrowRight } from "lucide-react";

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    items?: unknown[]; // We only need the length
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link 
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
  );
}
