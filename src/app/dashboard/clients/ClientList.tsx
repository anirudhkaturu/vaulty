import { Users } from "lucide-react";
import { ClientListItem } from "./ClientListItem";

interface Template {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
  email: string | null;
}

interface ClientListProps {
  clients: Client[];
  templates: Template[];
}

export function ClientList({ clients, templates }: ClientListProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-visible">
      {clients.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
            <Users size={28} />
          </div>
          <h3 className="text-lg font-black text-indigo-950 mb-1">No clients yet.</h3>
          <p className="text-slate-400 font-medium text-sm max-w-xs mx-auto mb-6">
            Your directory is empty.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100/60">
          {clients.map((client, index) => (
            <ClientListItem 
              key={client.id} 
              client={client} 
              templates={templates} 
              isFirst={index === 0}
              isLast={index === clients.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
