import { FileStack, User, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface RequestInfoSidebarProps {
  client: {
    id: string;
    name: string;
    email: string | null;
  };
  template: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
}

export function RequestInfoSidebar({ client, template, createdAt }: RequestInfoSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Client Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <User size={12} />
          Client Information
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-bold text-indigo-950">{client.name}</p>
            <p className="text-xs text-slate-500 font-medium">{client.email || "No email provided"}</p>
          </div>
          <Link 
            href={`/dashboard/clients/${client.id}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest transition-colors"
          >
            View Full Profile
            <ExternalLink size={10} />
          </Link>
        </div>
      </div>

      {/* Template Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <FileStack size={12} />
          Used Template
        </h3>
        <div className="space-y-4">
          {template ? (
            <>
              <div>
                <p className="text-sm font-bold text-indigo-950">{template.name}</p>
                <p className="text-xs text-slate-500 font-medium italic">Standard workflow</p>
              </div>
              <Link 
                href={`/dashboard/templates/${template.id}`}
                className="inline-flex items-center gap-1.5 text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest transition-colors"
              >
                Edit Template
                <ExternalLink size={10} />
              </Link>
            </>
          ) : (
            <p className="text-xs text-slate-400 font-medium italic">No template associated.</p>
          )}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Calendar size={12} />
          Request Timeline
        </h3>
        <div className="space-y-4 relative pl-4 border-l border-slate-100">
          <div>
            <div className="absolute w-2 h-2 rounded-full bg-indigo-500 -left-[4.5px] ring-4 ring-indigo-50" />
            <p className="text-[11px] font-bold text-indigo-950">Request Created</p>
            <p className="text-[10px] text-slate-400">{createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
