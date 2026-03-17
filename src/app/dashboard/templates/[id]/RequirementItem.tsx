import { FileText } from "lucide-react";
import { DeleteItemButton } from "./DeleteItemButton";

interface RequirementItemProps {
  item: {
    id: string;
    name: string;
    description: string | null;
    isRequired: boolean;
  };
  templateId: string;
}

export function RequirementItem({ item, templateId }: RequirementItemProps) {
  return (
    <div className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
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
        <DeleteItemButton templateId={templateId} itemId={item.id} />
      </div>
    </div>
  );
}
