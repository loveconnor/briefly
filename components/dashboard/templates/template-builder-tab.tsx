import {
	CheckCircle2Icon,
	GripVerticalIcon,
	PlusIcon,
	UploadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TemplateSectionIntro } from "./template-section-intro";
import type { TemplateSystem } from "./templates-data";

export function BuilderTab({ template }: { template: TemplateSystem }) {
	return (
		<section className="space-y-5">
			<TemplateSectionIntro
				description="Templates edit like playbooks: phases first, then inline tasks, approvals, upload requests, and portal items."
				title="Template builder"
			/>
			<div className="space-y-3">
				{template.phases.map((phase) => (
					<div
						className="group rounded-md bg-muted/20 px-3 py-4 transition-colors hover:bg-muted/30"
						key={phase.name}
					>
						<div className="flex items-center justify-between gap-4">
							<div className="flex min-w-0 items-start gap-2">
								<GripVerticalIcon className="mt-0.5 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
								<div className="min-w-0">
									<div className="font-medium">{phase.name} Phase</div>
									<div className="mt-1 text-sm text-muted-foreground">{phase.summary}</div>
								</div>
							</div>
							<Button size="xs" variant="ghost">
								Edit
							</Button>
						</div>
						<div className="mt-4 grid gap-4 md:grid-cols-3">
							<div>
								<div className="mb-2 flex items-center justify-between gap-3">
									<div className="text-xs font-medium text-muted-foreground">Tasks</div>
									<Button className="h-6 px-1.5 text-xs" size="xs" variant="ghost">
										<PlusIcon className="size-3" />
										Add
									</Button>
								</div>
								<div className="space-y-1.5 text-sm">
									{phase.tasks.slice(0, 3).map((task) => (
										<div className="flex min-h-7 items-center gap-2 rounded px-1.5 transition-colors hover:bg-background/70" key={task}>
											<GripVerticalIcon className="size-3.5 text-muted-foreground" />
											<span>{task}</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<div className="mb-2 flex items-center justify-between gap-3">
									<div className="text-xs font-medium text-muted-foreground">Approvals</div>
									<Button className="h-6 px-1.5 text-xs" size="xs" variant="ghost">
										<PlusIcon className="size-3" />
										Add
									</Button>
								</div>
								<div className="space-y-1.5 text-sm">
									{phase.approvals.slice(0, 2).map((approval) => (
										<div className="flex min-h-7 items-center gap-2 rounded px-1.5 transition-colors hover:bg-background/70" key={approval}>
											<CheckCircle2Icon className="size-3.5 text-success-foreground" />
											<span>{approval}</span>
										</div>
									))}
								</div>
							</div>
							<div>
								<div className="mb-2 flex items-center justify-between gap-3">
									<div className="text-xs font-medium text-muted-foreground">Uploads</div>
									<Button className="h-6 px-1.5 text-xs" size="xs" variant="ghost">
										<PlusIcon className="size-3" />
										Add
									</Button>
								</div>
								<div className="space-y-1.5 text-sm text-muted-foreground">
									{phase.clientRequests.slice(0, 2).map((request) => (
										<div className="flex min-h-7 items-center gap-2 rounded px-1.5 transition-colors hover:bg-background/70" key={request}>
											<UploadIcon className="size-3.5" />
											<span>{request}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="text-sm text-muted-foreground">
				Projects using this template can sync forward from {template.syncVersion}.
			</div>
		</section>
	);
}
