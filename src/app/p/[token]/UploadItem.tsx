"use client";

import { useState, useRef } from "react";
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileUp
} from "lucide-react";
import { getPresignedUploadUrl, completeDocumentUpload } from "./actions";
import { createClient } from "@/lib/supabase/client";

interface UploadItemProps {
  document: {
    id: string;
    name: string;
    required: boolean | null;
    uploaded: boolean | null;
  };
  token: string;
  onComplete: () => void;
}

export function UploadItem({ document, token, onComplete }: UploadItemProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const { url, key, provider } = await getPresignedUploadUrl(
        token,
        document.id,
        file.name,
        file.type
      );

      if (provider === "supabase") {
        const supabase = createClient();
        
        // Use Supabase SDK for upload (more reliable than raw PUT for Supabase)
        // We use the path from the key since we're using uploadToSignedUrl
        const { error: uploadError } = await supabase.storage
          .from("documents")
          .uploadToSignedUrl(key, url, file, {
            upsert: true,
          });

        if (uploadError) throw uploadError;
        setUploadProgress(100);
      } else {
        // Fallback for R2 (raw PUT)
        await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", url);
          xhr.setRequestHeader("Content-Type", file.type);
          
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(progress);
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(new Error(`Upload failed with status: ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error"));
          xhr.send(file);
        });
      }

      // Complete upload in DB
      await completeDocumentUpload(
        token,
        document.id,
        key,
        file.name,
        file.size,
        file.type
      );

      onComplete();
    } catch (err: unknown) {
      console.error("Upload process error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  if (document.uploaded) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between group hover:border-emerald-200 transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-indigo-950 uppercase tracking-tight">{document.name}</h4>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Uploaded Successfully</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          Complete
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-3xl p-6 transition-all duration-300 shadow-sm ${
      isUploading ? "border-indigo-300 ring-4 ring-indigo-50" : "border-slate-200 hover:border-indigo-200"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${
            isUploading ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-400 border-slate-100"
          }`}>
            {isUploading ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-indigo-950 uppercase tracking-tight">{document.name}</h4>
              {document.required && (
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100/50">Required</span>
              )}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              {isUploading ? `Uploading...` : "Awaiting Upload"}
            </p>
          </div>
        </div>

        {!isUploading && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 h-11 px-6 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-100"
          >
            <FileUp size={16} />
            Choose File
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="mt-6">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 shadow-sm"
              style={{ width: `${uploadProgress || 50}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wide">{error}</span>
        </div>
      )}
    </div>
  );
}
