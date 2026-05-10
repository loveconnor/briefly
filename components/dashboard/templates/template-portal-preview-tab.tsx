import { MessageCircleIcon, UploadIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TemplateSectionIntro } from "./template-section-intro";
import type { ClientPortalPreviewItem, TemplateSystem } from "./templates-data";

const portalTypeClass: Record<ClientPortalPreviewItem["type"], string> = {
	approval: "text-success-foreground",
	deliverable: "text-info-foreground",
	task: "text-foreground",
	upload: "text-warning-foreground",
};

export function PortalPreviewTab({ template }: { template: TemplateSystem }) {
	return (
		<section className="space-y-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<TemplateSectionIntro
					description="A client-facing preview of the approvals, tasks, uploads, and deliverables this template creates."
					title="Client portal preview"
				/>
				<Badge variant="outline">{template.portalStructure.join(" · ")}</Badge>
			</div>
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
				<div className="rounded-md bg-muted/20 p-4">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<div className="text-sm font-semibold">{template.name}</div>
							<div className="mt-1 text-xs text-muted-foreground">
								Client workspace preview
							</div>
						</div>
						<Badge variant="success">Portal enabled</Badge>
					</div>
					<div className="mb-4 grid gap-2 sm:grid-cols-3">
						<div className="rounded-md bg-background px-3 py-2 shadow-xs">
							<div className="text-xs text-muted-foreground">Progress</div>
							<div className="mt-2 h-1.5 rounded-full bg-muted">
								<div className="h-full w-2/3 rounded-full bg-primary" />
							</div>
						</div>
						<div className="rounded-md bg-background px-3 py-2 shadow-xs">
							<div className="text-xs text-muted-foreground">Latest update</div>
							<div className="mt-1 text-sm font-medium">Today, 9:42 AM</div>
						</div>
						<div className="rounded-md bg-background px-3 py-2 shadow-xs">
							<div className="text-xs text-muted-foreground">Client team</div>
							<div className="mt-1 flex -space-x-1">
								{["CL", "AM", "DR"].map((initials) => (
									<span
										className="flex size-6 items-center justify-center rounded-full bg-muted text-[0.65rem] font-medium ring-2 ring-background"
										key={initials}
									>
										{initials}
									</span>
								))}
							</div>
						</div>
					</div>
					<div className="space-y-2">
						{template.clientPortalPreview.map((item, index) => (
							<div
								className="rounded-md bg-background px-3 py-3 text-sm shadow-xs"
								key={`${item.type}-${item.label}`}
							>
								<div className="flex items-center justify-between gap-3">
									<span className={cn("font-medium capitalize", portalTypeClass[item.type])}>
										{item.type}
									</span>
									<span className="text-xs text-muted-foreground">
										{index === 0 ? "2 comments" : item.status}
									</span>
								</div>
								<div className="mt-2 flex items-center justify-between gap-3">
									<div className="font-medium">{item.label}</div>
									{item.type === "upload" ? (
										<span className="inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
											<UploadIcon className="size-4" />
										</span>
									) : null}
								</div>
								<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
									<MessageCircleIcon className="size-3.5" />
									<span>{index === 0 ? "Connor requested feedback" : "Client visible"}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4 text-sm">
					<div>
						<div className="text-xs font-medium text-muted-foreground">
							Visible to client
						</div>
						<div className="mt-1 font-medium">{template.clientVisibility}</div>
					</div>
					<div>
						<div className="text-xs font-medium text-muted-foreground">
							Client forms
						</div>
						<div className="mt-2 space-y-2 text-muted-foreground">
							{template.forms.length
								? template.forms.map((form) => <div key={form}>{form}</div>)
								: "No default forms"}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
