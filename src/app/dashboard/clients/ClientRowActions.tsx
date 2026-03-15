"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2, Loader2 } from "lucide-react";
import { deleteClientAction } from "./actions";

export function ClientRowActions({ clientId }: { clientId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsPending] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this client?")) return;

    setIsPending(true);
    try {
      await deleteClientAction(clientId);
    } catch {
      alert("Failed to delete client");
      setIsPending(false);
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Edit logic would go here
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors text-left border-b border-slate-50"
          >
            <Edit2 size={14} className="text-slate-400" />
            Edit Client
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors text-left"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Delete Client
          </button>
        </div>
      )}
    </div>
  );
}
