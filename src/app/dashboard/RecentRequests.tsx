import { FileText, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RecentRequest {
  id: string;
  clientId: string;
  status: string | null;
  createdAt: Date;
  client: {
    name: string;
  };
}

interface RecentRequestsProps {
  requests: RecentRequest[];
}

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h2 className="text-xl font-black text-indigo-950 flex items-center gap-2">
        Recent Requests
        <span className="h-px flex-1 bg-slate-100 ml-4" />
      </h2>
      
      {requests.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-12 text-center border-dashed flex flex-col items-center justify-center min-h-100">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-black text-indigo-950 mb-2">Your vault is clean.</h3>
          <p className="text-slate-400 font-medium max-w-sm mx-auto mb-8">
            You haven&apos;t requested any documents yet. Start by adding a client and sending your first request.
          </p>
          <Link 
            href="/dashboard/clients"
            className="h-12 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200 flex items-center justify-center"
          >
            Add Your First Client
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {requests.map((request) => (
              <Link 
                key={request.id} 
                href={`/dashboard/requests/${request.id}`}
                className="p-6 hover:bg-slate-50/50 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-105 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-950 leading-tight mb-1">
                      Request for {request.client.name}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1">
                        <Clock size={10} />
                        {request.createdAt.toLocaleDateString()}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-tighter ${
                        request.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </Link>
            ))}
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
            <Link href="/dashboard/clients" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">
              View All Clients
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
