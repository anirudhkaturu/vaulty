import { FileStack } from "lucide-react";
import { TemplateCard } from "./TemplateCard";

interface Template {
  id: string;
  name: string;
  items?: unknown[];
}

interface TemplateListProps {
  templates: Template[];
}

export function TemplateList({ templates }: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl p-20 text-center flex flex-col items-center justify-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
          <FileStack size={28} />
        </div>
        <h3 className="text-lg font-black text-indigo-950 mb-1">No templates found.</h3>
        <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-6">
          Create your first reusable request template to save time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
