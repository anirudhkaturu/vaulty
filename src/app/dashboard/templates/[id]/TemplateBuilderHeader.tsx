import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { DeleteTemplateButton } from "./DeleteTemplateButton";

interface TemplateBuilderHeaderProps {
  template: {
    id: string;
    name: string;
  };
}

export function TemplateBuilderHeader({ template }: TemplateBuilderHeaderProps) {
  return (
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
        <DeleteTemplateButton templateId={template.id} />
      </div>
    </header>
  );
}
