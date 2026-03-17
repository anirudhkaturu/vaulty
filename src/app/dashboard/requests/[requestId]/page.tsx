import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requests } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { RequestDetailHeader } from "./RequestDetailHeader";
import { RequestProgress } from "./RequestProgress";
import { RequestDocumentList } from "./RequestDocumentList";
import { RequestInfoSidebar } from "./RequestInfoSidebar";

export default async function RequestDetailPage({
  params,
}: {
  params: { requestId: string };
}) {
  const { requestId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch request details with relations
  const request = await db.query.requests.findFirst({
    where: eq(requests.id, requestId),
    with: {
      client: true,
      template: true,
      documents: {
        with: {
          file: true
        }
      }
    }
  });

  if (!request || request.client.profileId !== user.id) {
    notFound();
  }

  const totalDocuments = request.documents.length;
  const uploadedDocuments = request.documents.filter(doc => doc.uploaded).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <RequestDetailHeader 
        clientId={request.clientId} 
        requestId={requestId} 
        status={request.status} 
      />

      <RequestProgress 
        totalDocuments={totalDocuments} 
        uploadedDocuments={uploadedDocuments} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RequestDocumentList documents={request.documents} />
        </div>
        
        <div className="lg:col-span-1">
          <RequestInfoSidebar 
            client={request.client} 
            template={request.template} 
            createdAt={request.createdAt}
          />
        </div>
      </div>
    </div>
  );
}
