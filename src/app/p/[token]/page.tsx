import { notFound } from "next/navigation";
import { getRequestByToken } from "./actions";
import { UploadPortal } from "./UploadPortal";

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const request = await getRequestByToken(token);

  if (!request) {
    notFound();
  }

  return <UploadPortal request={request} token={token} />;
}
