"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteClientAction } from "../actions";

export function DeleteClientButton({ clientId }: { clientId: string }) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this client? All their data and requests will be permanently removed.")) {
      return;
    }

    setIsPending(true);
    try {
      await deleteClientAction(clientId);
    } catch {
      alert("Failed to delete client");
      setIsPending(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 text-rose-500 hover:text-rose-600 font-bold text-sm py-2 transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Trash2 size={16} />
      )}
      Delete Client
    </button>
  );
}
