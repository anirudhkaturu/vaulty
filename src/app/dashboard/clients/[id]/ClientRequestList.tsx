import { FileText } from "lucide-react";
import { NewRequestButton } from "./NewRequestButton";
import { ClientRequestItem } from "./ClientRequestItem";

interface Template {
  id: string;
  name: string;
}

interface Request {
  id: string;
  createdAt: Date;
  status: string | null;
  templateId: string | null;
}

interface ClientRequestListProps {
  requests: Request[];
  clientId: string;
  templates: Template[];
}

export function ClientRequestList({ requests, clientId, templates }: ClientRequestListProps) {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-visible">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Document Requests</h2>
          <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
            {requests.length} Total
          </span>
        </div>

        {requests.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <FileText size={20} className="text-slate-200" />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active requests.</p>
            
            <NewRequestButton clientId={clientId} templates={templates} variant="ghost" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {requests.map((request) => (
              <ClientRequestItem 
                key={request.id} 
                request={request} 
                clientId={clientId} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
