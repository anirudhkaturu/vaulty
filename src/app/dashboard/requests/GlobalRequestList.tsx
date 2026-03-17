import { FileSearch } from "lucide-react";
import { GlobalRequestItem } from "./GlobalRequestItem";

interface Request {
  id: string;
  createdAt: Date;
  status: string | null;
  clientId: string;
  client: {
    name: string;
  };
}

interface GlobalRequestListProps {
  requests: Request[];
}

export function GlobalRequestList({ requests }: GlobalRequestListProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-visible">
      {requests.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
            <FileSearch size={28} />
          </div>
          <h3 className="text-lg font-black text-indigo-950 mb-1">No requests yet.</h3>
          <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-6">
            You haven&apos;t created any document requests. Start by selecting a client and sending a request.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100/60">
          {requests.map((request) => (
            <GlobalRequestItem key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
