import { FileText, CheckCircle2, Download, ExternalLink, AlertCircle } from "lucide-react";

interface Document {
  id: string;
  name: string;
  required: boolean | null;
  uploaded: boolean | null;
  file?: {
    fileName: string;
    filePath: string;
    fileSize: number | null;
  } | null;
}

interface RequestDocumentListProps {
  documents: Document[];
}

export function RequestDocumentList({ documents }: RequestDocumentListProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <h2 className="text-xs font-black text-indigo-950 uppercase tracking-widest">Required Documents</h2>
        <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
          {documents.length} Items
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {documents.map((doc) => (
          <div key={doc.id} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-colors ${
                doc.uploaded ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
              }`}>
                {doc.uploaded ? <CheckCircle2 size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-indigo-950 leading-tight mb-1 flex items-center gap-2">
                  {doc.name}
                  {doc.required && (
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-black uppercase tracking-tighter">
                      Required
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                    doc.uploaded ? "text-emerald-600" : "text-slate-400"
                  }`}>
                    {doc.uploaded ? "Uploaded" : "Pending Action"}
                  </span>
                  {doc.uploaded && doc.file && (
                    <span className="text-[10px] text-slate-300 font-medium">
                      • {doc.file.fileName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              {doc.uploaded ? (
                <>
                  <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs uppercase tracking-wider">
                    <Download size={12} />
                    Download
                  </button>
                  <button className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-xs">
                    <ExternalLink size={12} />
                  </button>
                </>
              ) : (
                <button className="h-8 px-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-[10px] font-bold hover:bg-indigo-100 transition-all flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertCircle size={12} />
                  Remind Client
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
