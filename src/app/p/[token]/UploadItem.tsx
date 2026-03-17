"use client";

import { useState, useRef } from "react";
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileUp,
  XCircle,
  Lock
} from "lucide-react";
import { getPresignedUploadUrl, completeDocumentUpload } from "./actions";

interface UploadItemProps {
  document: {
    id: string;
    name: string;
    required: boolean | null;
    uploaded: boolean | null;
    reviewStatus?: string | null;
    rejectionReason?: string | null;
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
      const { url, key } = await getPresignedUploadUrl(
        token,
        document.id,
        file.name,
        file.type
      );

      // We use a raw XMLHttpRequest for the PUT upload.
      // This is the most compatible way to use Signed URLs for both Supabase and R2.
      // It bypasses the need for complex client-side RLS policies because the 
      // signature is already in the URL.
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        
        // Essential headers for storage providers
        xhr.setRequestHeader("Content-Type", file.type);
        
        // Supabase-specific: allow overwriting if the file was previously rejected
        xhr.setRequestHeader("x-upsert", "true");

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
            // Try to parse error message if available
            let errorMessage = `Upload failed with status: ${xhr.status}`;
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.message) errorMessage = response.message;
            } catch {
              // Not JSON, use default
            }
            reject(new Error(errorMessage));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(file);
      });

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

  // 1. APPROVED STATE
  if (document.reviewStatus === "approved") {
    return (
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 flex items-center justify-between group shadow-sm bg-emerald-50/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-100">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-indigo-950 uppercase tracking-tight">{document.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Lock size={10} className="text-emerald-600" />
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified & Locked</p>
            </div>
          </div>
        </div>
        <div className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-emerald-100 shadow-xs">
          Approved
        </div>
      </div>
    );
  }

  // 2. REJECTED STATE (Show reason and re-upload button)
  if (document.reviewStatus === "rejected" && !document.uploaded) {
    return (
      <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 transition-all duration-300 shadow-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
                <XCircle size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-indigo-950 uppercase tracking-tight">{document.name}</h4>
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100/50">Action Required</span>
                </div>
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mt-1">Rejected - Please Re-upload</p>
              </div>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 h-11 px-6 rounded-2xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-100"
            >
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
              Re-upload File
            </button>
          </div>

          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100/50">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={12} className="text-rose-500" />
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Reason for rejection:</span>
            </div>
            <p className="text-sm text-rose-800 font-medium leading-relaxed italic">
              &quot;{document.rejectionReason || "No specific reason provided."}&quot;
            </p>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>
    );
  }

  // 3. UPLOADED / PENDING STATE
  if (document.uploaded && !isUploading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between group hover:border-amber-200 transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50">
            <Loader2 size={24} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-black text-indigo-950 uppercase tracking-tight">{document.name}</h4>
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mt-1">Under Review</p>
          </div>
        </div>
        <div className="text-amber-500 font-bold text-[10px] uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
          Uploaded
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
