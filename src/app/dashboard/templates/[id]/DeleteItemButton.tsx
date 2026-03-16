"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteTemplateItemAction } from "../actions";

export function DeleteItemButton({ 
  templateId, 
  itemId 
}: { 
  templateId: string; 
  itemId: string;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    try {
      await deleteTemplateItemAction(templateId, itemId);
    } catch {
      alert("Failed to delete item");
      setIsPending(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-50"
      title="Remove Requirement"
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
    </button>
  );
}
