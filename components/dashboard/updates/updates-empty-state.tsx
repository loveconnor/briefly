import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { UpdateComposer } from "@/components/dashboard/updates/update-composer";

export function UpdatesEmptyState({ projects = [] }: { projects?: string[] }) {
	return (
		<div className="flex min-h-[420px] flex-col items-center justify-center border-t border-border/70 text-center">
			<DashboardEmptyState
				className="border-0"
				description="Project updates, approvals, launches, and follow-ups will appear here once communication begins."
				title="No updates yet"
			/>
			<div className="mt-5">
				<UpdateComposer projects={projects} />
			</div>
		</div>
	);
}
