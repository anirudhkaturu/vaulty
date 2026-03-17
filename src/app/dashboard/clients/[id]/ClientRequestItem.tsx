import { FileText, Clock, ChevronRight } from "lucide-react";
import { RequestRowActions } from "./RequestRowActions";
import Link from "next/link";

interface ClientRequestItemProps {
  request: {
    id: string;
    createdAt: Date;
    status: string | null;
    templateId: string | null;
  };
  clientId: string;
}

export function ClientRequestItem({ request, clientId }: ClientRequestItemProps) {
  return (
    <div className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
      <Link 
        href={`/dashboard/requests/${request.id}`}
        className="flex-1 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xs">
          <FileText size={18} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
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
      </Link>
      <div className="flex items-center gap-4">
        <RequestRowActions 
          requestId={request.id} 
          clientId={clientId} 
          templateId={request.templateId} 
        />
        <Link 
          href={`/dashboard/requests/${request.id}`}
          className="text-slate-300 group-hover:text-indigo-400 transition-colors"
        >
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
