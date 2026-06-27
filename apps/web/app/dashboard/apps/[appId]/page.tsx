import { AuditResults } from "../../../../modules/audits/ui/AuditResults";

export default async function AppDetailsPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <AuditResults appId={appId} />
    </div>
  );
}
