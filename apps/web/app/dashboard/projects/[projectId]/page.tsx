import { AppList } from "../../../../modules/apps/ui/AppList";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <AppList projectId={projectId} />
    </div>
  );
}
