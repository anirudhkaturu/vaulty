import { Search } from "lucide-react";

export function TemplateSearchBar() {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
        <input 
          type="text" 
          placeholder="Search templates..."
          className="w-full bg-white border border-slate-200/60 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
        />
      </div>
    </div>
  );
}
