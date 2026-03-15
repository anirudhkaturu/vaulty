"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteTemplateAction } from "../actions";

export function DeleteTemplateButton({ templateId }: { templateId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this template?")) {
      return;
    }

    setIsPending(true);
    try {
      await deleteTemplateAction(templateId);
    } catch (error) {
      alert("Failed to delete template");
      setIsPending(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="h-9 px-4 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
      Delete Template
    </button>
  );
}
