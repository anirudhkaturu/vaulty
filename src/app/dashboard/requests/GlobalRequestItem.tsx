import { FileText, Clock, ChevronRight, User } from "lucide-react";
import Link from "next/link";

interface GlobalRequestItemProps {
  request: {
    id: string;
    createdAt: Date;
    status: string | null;
    clientId: string;
    client: {
      name: string;
    };
  };
}

export function GlobalRequestItem({ request }: GlobalRequestItemProps) {
  return (
    <div className="group relative flex items-center pr-4 hover:bg-slate-50/50 transition-all">
      <Link 
        href={`/dashboard/requests/${request.id}`}
        className="px-5 py-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-xs group-hover:scale-105 transition-transform duration-300">
            <FileText size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight mb-1">
              Request #{request.id.slice(0, 8).toUpperCase()}
            </h4>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                <User size={10} />
                {request.client.name}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                <Clock size={10} />
                {request.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter ${
            request.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            {request.status}
          </span>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
        </div>
      </Link>
    </div>
  );
}
