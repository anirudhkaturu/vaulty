import { Plus } from "lucide-react";
import { AddItemForm } from "./AddItemForm";

interface RequirementFormCardProps {
  templateId: string;
}

export function RequirementFormCard({ templateId }: RequirementFormCardProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm sticky top-8">
        <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Plus size={16} strokeWidth={3} className="text-indigo-600" />
          Add Requirement
        </h2>
        <AddItemForm templateId={templateId} />
      </div>
    </div>
  );
}
