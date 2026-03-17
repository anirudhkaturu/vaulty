import Link from "next/link";
import { ClientRowActions } from "./ClientRowActions";

interface Template {
  id: string;
  name: string;
}

interface ClientListItemProps {
  client: {
    id: string;
    name: string;
    email: string | null;
  };
  templates: Template[];
  isFirst: boolean;
  isLast: boolean;
}

export function ClientListItem({ client, templates, isFirst, isLast }: ClientListItemProps) {
  return (
    <div 
      className={`group relative flex items-center pr-4 hover:bg-slate-50/50 transition-all ${
        isFirst ? "rounded-t-3xl" : ""
      } ${
        isLast ? "rounded-b-3xl" : ""
      }`}
    >
      <Link 
        href={`/dashboard/clients/${client.id}`}
        className="px-5 py-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm group-hover:scale-105 transition-transform duration-300 shadow-xs group-hover:bg-white border border-transparent group-hover:border-indigo-100">
            {client.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {client.name}
            </h4>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-bold uppercase tracking-wide">
                {client.email || "No email"}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            Active
          </span>
        </div>
      </Link>
      
      <ClientRowActions clientId={client.id} templates={templates} />
    </div>
  );
}
