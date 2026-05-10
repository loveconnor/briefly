import {
	CheckCircle2Icon,
	ChevronDownIcon,
	UploadIcon,
} from "lucide-react";

import type { TemplatePhase } from "./templates-data";

export function PhaseBlock({
	defaultOpen,
	index,
	phase,
}: {
	defaultOpen?: boolean;
	index: number;
	phase: TemplatePhase;
}) {
	return (
		<details
			className="group rounded-md px-2 py-4 transition-colors hover:bg-muted/20 open:bg-muted/30"
			open={defaultOpen}
		>
			<summary className="flex cursor-pointer list-none items-start justify-between gap-4">
				<div className="grid min-w-0 grid-cols-[1.25rem_1fr] gap-4">
					<div className="flex flex-col items-center pt-0.5">
						<div className="flex size-5 items-center justify-center rounded-full bg-muted text-[0.65rem] font-semibold">
							{index + 1}
						</div>
					</div>
					<div className="min-w-0">
						<h2 className="font-semibold">{phase.name} Phase</h2>
						<p className="mt-1 text-sm text-muted-foreground">{phase.summary}</p>
						<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
							<span>{phase.tasks.length} tasks</span>
							<span>{phase.approvals.length} approvals</span>
							<span>{phase.clientRequests.length} client requests</span>
						</div>
					</div>
				</div>
				<ChevronDownIcon className="mt-0.5 size-5 text-muted-foreground transition-transform group-hover:text-foreground group-open:rotate-180 group-open:text-foreground" />
			</summary>

			<div className="mt-5 grid gap-5 pl-9 md:grid-cols-3">
				<div>
					<div className="mb-2 text-xs font-medium text-muted-foreground">Tasks</div>
					<ul className="space-y-1.5 text-sm">
						{phase.tasks.map((task) => (
							<li className="flex items-center gap-2" key={task}>
								<span className="size-1.5 rounded-full bg-muted-foreground/55" />
								<span>{task}</span>
							</li>
						))}
					</ul>
				</div>
				<div>
					<div className="mb-2 text-xs font-medium text-muted-foreground">
						Approval gates
					</div>
					<div className="space-y-1.5 text-sm">
						{phase.approvals.map((approval) => (
							<div className="flex items-center gap-2" key={approval}>
								<CheckCircle2Icon className="size-4 text-success-foreground" />
								<span>{approval}</span>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="mb-2 text-xs font-medium text-muted-foreground">
						Client requests
					</div>
					<div className="space-y-1.5 text-sm text-muted-foreground">
						{phase.clientRequests.map((request) => (
							<div className="flex items-center gap-2" key={request}>
								<UploadIcon className="size-4" />
								<span>{request}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</details>
	);
}
