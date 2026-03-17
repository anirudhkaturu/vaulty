import { Mail, Phone, Calendar } from "lucide-react";

interface ClientInfoCardProps {
  client: {
    email: string | null;
    phone: string | null;
    createdAt: Date;
    notes: string | null;
  };
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Email</p>
              <p className="text-xs font-bold text-indigo-950 truncate">{client.email || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Phone</p>
              <p className="text-xs font-bold text-indigo-950 truncate">{client.phone || "—"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
              <Calendar size={14} className="text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-0.5">Joined</p>
              <p className="text-xs font-bold text-indigo-950">{client.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {client.notes && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-300 mb-2">Notes</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
              &ldquo;{client.notes}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
