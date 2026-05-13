import { UpdateComposer } from "@/components/dashboard/updates/update-composer";

export function UpdatesHeader({ projects = [] }: { projects?: string[] }) {
	return (
		<header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Updates</h1>
				<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
					Project communication, approvals, launches, and client visibility.
				</p>
			</div>
			<UpdateComposer projects={projects} />
		</header>
	);
}
