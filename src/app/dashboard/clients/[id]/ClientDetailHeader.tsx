import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewRequestButton } from "./NewRequestButton";
import { DeleteClientButton } from "./DeleteClientButton";

interface Template {
  id: string;
  name: string;
}

interface ClientDetailHeaderProps {
  client: {
    id: string;
    name: string;
  };
  templates: Template[];
}

export function ClientDetailHeader({ client, templates }: ClientDetailHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/clients"
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-xs group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-indigo-950 tracking-tight leading-none">
            {client.name}
          </h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Client
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NewRequestButton clientId={client.id} templates={templates} />
        
        <button className="h-9 px-4 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider">
          Edit Details
        </button>

        <DeleteClientButton clientId={client.id} />
      </div>
    </header>
  );
}
