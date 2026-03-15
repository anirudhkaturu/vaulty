"use client";

import { useState, useRef } from "react";
import { addTemplateItemAction } from "../actions";
import { Loader2, PlusCircle, Check } from "lucide-react";

export function AddItemForm({ templateId }: { templateId: string }) {
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const isRequired = formData.get("isRequired") === "on";

    try {
      await addTemplateItemAction(templateId, name, description, isRequired);
      formRef.current?.reset();
      
      // Visual feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Refocus the name input for rapid adding
      const nameInput = formRef.current?.querySelector('input[name="name"]') as HTMLInputElement;
      nameInput?.focus();
    } catch (error) {
      // Silent error or a subtle toast would be better than an alert
      console.error("Failed to add requirement", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          Requirement Name
        </label>
        <input
          name="name"
          required
          autoComplete="off"
          placeholder="e.g. Passport Copy"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          rows={2}
          placeholder="Instructions for the client..."
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 focus:bg-white transition-all resize-none"
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <input
          type="checkbox"
          name="isRequired"
          id="isRequired"
          defaultChecked
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isRequired" className="text-xs font-bold text-slate-600 select-none cursor-pointer">
          Required for completion
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`w-full py-3.5 rounded-2xl font-bold transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 text-sm ${
          showSuccess 
            ? "bg-emerald-500 text-white shadow-emerald-200" 
            : "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700"
        }`}
      >
        {pending ? (
          <Loader2 className="animate-spin" size={18} />
        ) : showSuccess ? (
          <>
            <Check size={18} strokeWidth={3} />
            Added!
          </>
        ) : (
          <>
            <PlusCircle size={18} />
            Add to Template
          </>
        )}
      </button>
    </form>
  );
}
