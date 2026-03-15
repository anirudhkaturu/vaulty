"use client";

import { useState, useRef } from "react";
import { addTemplateItemAction } from "../actions";
import { Loader2, PlusCircle, Check } from "lucide-react";

export function AddItemForm({ templateId }: { templateId: string }) {
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRequired, setIsRequired] = useState(true); // default true
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    try {
      await addTemplateItemAction(templateId, name, description, isRequired);
      formRef.current?.reset();
      setIsRequired(true); // reset to default

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      const nameInput = formRef.current?.querySelector(
        'input[name="name"]',
      ) as HTMLInputElement;
      nameInput?.focus();
    } catch (error) {
      console.error("Failed to add requirement", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-5 shadow-sm border border-slate-100 transition-all"
    >
      {/* Name field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400 tracking-wide">
          Name
        </label>
        <input
          name="name"
          required
          autoComplete="off"
          placeholder="e.g. Passport Copy"
          className="w-full border-b border-slate-200 bg-transparent py-2.5 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:border-indigo-400 focus:outline-none focus:ring-0 transition-colors"
        />
      </div>

      {/* Description field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-400 tracking-wide">
          Description <span className="text-slate-300">(optional)</span>
        </label>
        <textarea
          name="description"
          rows={2}
          placeholder="Instructions for the client..."
          className="w-full border-b border-slate-200 bg-transparent py-2.5 text-sm font-medium text-slate-700 placeholder:text-slate-300 focus:border-indigo-400 focus:outline-none focus:ring-0 transition-colors resize-none"
        />
      </div>

      {/* Required toggle – modern switch */}
      <div className="flex items-center justify-between py-1">
        <span className="text-xs font-medium text-slate-500">
          Required for completion
        </span>
        <button
          type="button"
          onClick={() => setIsRequired(!isRequired)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1 ${
            isRequired ? "bg-indigo-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              isRequired ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
        <input type="hidden" name="isRequired" value={isRequired ? "on" : ""} />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={pending}
        className="group relative w-full overflow-hidden rounded-lg bg-indigo-50 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition-all hover:bg-indigo-100 hover:shadow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
      >
        <span className="flex items-center justify-center gap-2">
          {pending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : showSuccess ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              Added
            </>
          ) : (
            <>
              <PlusCircle size={18} strokeWidth={1.5} />
              Add to template
            </>
          )}
        </span>

        {/* Animated background on success */}
        {showSuccess && (
          <span className="absolute inset-0 z-0 animate-pulse bg-emerald-200/50" />
        )}
      </button>
    </form>
  );
}
