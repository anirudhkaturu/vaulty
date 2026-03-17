import { Users } from "lucide-react";
import { AddClientForm } from "./AddClientForm";

export function ClientPageHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[9px] font-black text-indigo-600 mb-2 uppercase tracking-[0.2em]">
          <Users size={10} strokeWidth={3} />
          <span>Directory</span>
        </div>
        <h1 className="text-3xl font-black text-indigo-950 tracking-tight leading-none">
          Your <span className="text-indigo-600 font-serif italic font-normal">Clients.</span>
        </h1>
      </div>
      <AddClientForm />
    </header>
  );
}
