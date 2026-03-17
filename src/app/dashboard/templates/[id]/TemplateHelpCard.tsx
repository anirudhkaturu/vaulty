import { CheckCircle2 } from "lucide-react";

export function TemplateHelpCard() {
  return (
    <div className="bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200">
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <CheckCircle2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-black mb-2">Ready to use</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Templates are automatically available when you send a new document request. Changes are saved in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
