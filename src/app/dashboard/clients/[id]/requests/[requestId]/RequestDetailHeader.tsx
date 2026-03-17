import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface RequestDetailHeaderProps {
  clientId: string;
  requestId: string;
  status: string | null;
}

export function RequestDetailHeader({ clientId, requestId, status }: RequestDetailHeaderProps) {
  const getStatusDisplay = () => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle2 size={12} className="text-emerald-500" />,
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          label: "Completed"
        };
      case "in_progress":
        return {
          icon: <Clock size={12} className="text-amber-500" />,
          bg: "bg-amber-50",
          text: "text-amber-700",
          label: "In Progress"
        };
      default:
        return {
          icon: <AlertCircle size={12} className="text-indigo-500" />,
          bg: "bg-indigo-50",
          text: "text-indigo-700",
          label: "Pending"
        };
    }
  };

  const statusStyle = getStatusDisplay();

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link 
          href={`/dashboard/clients/${clientId}`}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-xs group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-indigo-950 tracking-tight leading-none">
              Request Detail
            </h1>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusStyle.bg} ${statusStyle.text} border border-black/5`}>
              {statusStyle.icon}
              {statusStyle.label}
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">
            ID: #{requestId.slice(0, 12).toUpperCase()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="h-9 px-4 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider">
          Resend Notification
        </button>
        <button className="h-9 px-4 bg-indigo-600 text-white rounded-xl font-bold text-[11px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider">
          Share Link
        </button>
      </div>
    </header>
  );
}
