import { AlertCircle } from "lucide-react";
import { RequirementItem } from "./RequirementItem";

interface Item {
  id: string;
  name: string;
  description: string | null;
  isRequired: boolean;
}

interface RequirementListProps {
  items: Item[];
  templateId: string;
}

export function RequirementList({ items, templateId }: RequirementListProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Required Documents</h2>
          <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
            {items.length} Total
          </span>
        </div>

        {items.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 text-slate-200">
              <AlertCircle size={24} />
            </div>
            <p className="text-sm font-bold text-slate-400">No documents defined yet.</p>
            <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-1">Use the form on the left to start building.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <RequirementItem 
                key={item.id} 
                item={item} 
                templateId={templateId} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
