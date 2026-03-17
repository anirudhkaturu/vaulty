import { FileSearch, Plus } from "lucide-react";
import Link from "next/link";

export function RequestPageHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[9px] font-black text-indigo-600 mb-2 uppercase tracking-[0.2em]">
          <FileSearch size={10} strokeWidth={3} />
          <span>Tracking Center</span>
        </div>
        <h1 className="text-3xl font-black text-indigo-950 tracking-tight leading-none">
          Document <span className="text-indigo-600 font-serif italic font-normal">Requests.</span>
        </h1>
      </div>
      <Link 
        href="/dashboard/clients"
        className="group inline-flex items-center gap-2 bg-linear-to-br from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 text-sm"
      >
        <Plus size={18} className="group-hover:scale-110 transition-transform" />
        New Request
      </Link>
    </header>
  );
}
