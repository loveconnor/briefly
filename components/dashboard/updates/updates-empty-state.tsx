import { UpdateComposer } from "@/components/dashboard/updates/update-composer";

export function UpdatesEmptyState() {
	return (
		<div className="flex min-h-[420px] flex-col items-center justify-center border-t border-border/70 text-center">
			<h2 className="text-lg font-semibold">No updates yet</h2>
			<p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
				Project updates, approvals, launches, and follow-ups will appear here once communication begins.
			</p>
			<div className="mt-5">
				<UpdateComposer />
			</div>
		</div>
	);
}
