interface RequestProgressProps {
  totalDocuments: number;
  uploadedDocuments: number;
}

export function RequestProgress({ totalDocuments, uploadedDocuments }: RequestProgressProps) {
  const percentage = totalDocuments > 0 ? Math.round((uploadedDocuments / totalDocuments) * 100) : 0;
  
  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Collection Progress</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-indigo-950 tracking-tighter">{uploadedDocuments}</span>
            <span className="text-xl font-bold text-slate-300">/ {totalDocuments}</span>
            <span className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-wide">Documents Received</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-md w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{percentage}% Complete</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{totalDocuments - uploadedDocuments} Remaining</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div 
              className="h-full bg-linear-to-r from-indigo-500 to-indigo-600 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(79,70,229,0.3)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
