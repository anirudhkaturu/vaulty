"use client";

import { Trash2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { deleteClientAction } from "../actions";
import { useRouter } from "next/navigation";

export function DeleteClientButton({ clientId }: { clientId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsPending(true);
    try {
      await deleteClientAction(clientId);
      setShowModal(false);
      router.push("/dashboard/clients");
    } catch (err) {
      console.error("Error deleting client:", err);
      alert("Failed to delete client");
      setIsPending(false);
    }
  }

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    if (!isPending) setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={openModal}
        disabled={isPending}
        className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all shadow-xs group disabled:opacity-50"
        title="Delete Client"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
        )}
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          aria-modal="true"
          role="dialog"
        >
          {/* Enhanced Glass Blur Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-4xl p-8 shadow-2xl border border-slate-200/60 max-w-sm w-full animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shadow-sm border border-rose-100/50">
                <Trash2 size={24} />
              </div>
              <button
                onClick={closeModal}
                disabled={isPending}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-black text-indigo-950 tracking-tight mb-2">
              Delete Client
            </h3>

            <p className="text-[13px] text-slate-500 mb-8 leading-relaxed font-medium">
              Are you sure you want to delete this client? All their data and requests will be permanently removed.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={closeModal}
                disabled={isPending}
                className="w-full sm:flex-1 h-11 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="w-full sm:flex-1 h-11 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Delete Now"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
