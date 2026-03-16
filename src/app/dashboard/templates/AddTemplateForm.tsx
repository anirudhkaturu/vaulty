"use client";

import { useState } from "react";
import { createTemplateAction } from "./actions";
import { X, Loader2, Plus, LayoutPanelTop } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddTemplateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    
    try {
      const newTemplate = await createTemplateAction(name);
      setIsOpen(false);
      router.push(`/dashboard/templates/${newTemplate.id}`);
    } catch {
      alert("Failed to create template");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 text-xs uppercase tracking-widest"
      >
        <Plus size={16} strokeWidth={3} />
        New Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Slide-over */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <LayoutPanelTop size={20} />
                </div>
                <h2 className="text-xl font-black text-indigo-950 tracking-tight">Create Template</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Template Name
                </label>
                <input
                  name="name"
                  required
                  autoFocus
                  placeholder="e.g. Standard Onboarding Pack"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all"
                />
                <p className="text-[10px] text-slate-400 ml-1 font-medium italic">
                  You&apos;ll define the specific documents required in the next step.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {pending ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Create & Start Building"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
