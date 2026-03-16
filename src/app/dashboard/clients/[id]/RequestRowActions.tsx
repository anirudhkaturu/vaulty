"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Trash2, Loader2, Eye } from "lucide-react";
import { deleteRequestAction } from "../actions";
import Link from "next/link";

export function RequestRowActions({ 
  requestId, 
  clientId, 
  templateId 
}: { 
  requestId: string; 
  clientId: string;
  templateId: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
    
    if (!confirm("Are you sure you want to delete this request?")) return;

    setIsDeleting(true);
    try {
      await deleteRequestAction(requestId, clientId);
    } catch {
      alert("Failed to delete request");
      setIsDeleting(false);
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
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {templateId && (
            <Link
              href={`/dashboard/templates/${templateId}`}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-50"
            >
              <Eye size={14} className="text-slate-400" />
              Check Template
            </Link>
          )}

          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors text-left"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Delete Request
          </button>
        </div>
      )}
    </div>
  );
}
