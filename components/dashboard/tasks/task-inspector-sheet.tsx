import {
	Clock3Icon,
	FileTextIcon,
	Link2Icon,
	MessageSquareTextIcon,
	PlayCircleIcon,
	RefreshCcwIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { badgeToneClassName, badgeToneVariant } from "@/components/dashboard/badge-tone";
import { cn } from "@/lib/utils";

import type { DeliveryTask } from "./tasks-data";
import { priorityTone, statusTone } from "./tasks-data";

export function TaskInspectorSheet({
	onClose,
	task,
}: {
	onClose: () => void;
	task: DeliveryTask | null;
}) {
	if (!task) {
		return null;
	}

	return (
		<Sheet onOpenChange={(open) => !open && onClose()} open={Boolean(task)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[440px] gap-0 overflow-y-auto p-0 sm:max-w-[440px]"
				side="right"
			>
				<SheetHeader className="border-b border-border/60 p-6 pr-12">
					<div className="space-y-3">
						<div className="flex flex-wrap items-center gap-2">
							<Badge
								className={badgeToneClassName(statusTone[task.status])}
								variant={badgeToneVariant(statusTone[task.status])}
							>
								{task.status}
							</Badge>
							{task.priority === "High" || task.priority === "Urgent" ? (
								<Badge
									className={badgeToneClassName(priorityTone[task.priority])}
									variant={badgeToneVariant(priorityTone[task.priority])}
								>
									{task.priority}
								</Badge>
							) : null}
						</div>
						<div>
							<SheetTitle className="text-xl leading-7">{task.name}</SheetTitle>
							<SheetDescription className="mt-1">
								{task.project} / {task.phase}
							</SheetDescription>
						</div>
						<div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
							<span>{task.client}</span>
							<span className="text-muted-foreground/45">/</span>
							<span>Assigned to {task.assignee}</span>
							<span className="text-muted-foreground/45">/</span>
							<span>Due {task.due.toLowerCase()}</span>
						</div>
					</div>
				</SheetHeader>

				<div className="space-y-7 p-6">
					<section className="rounded-md bg-warning/8 p-3">
						<p className="text-xs font-medium tracking-normal text-warning-foreground uppercase">
							Waiting on
						</p>
						<p className="mt-2 text-base font-semibold">{task.waitingOn}</p>
						{task.dependencies.length ? (
							<div className="mt-3 flex flex-wrap gap-1.5">
								{task.dependencies.map((dependency) => (
									<Badge key={dependency} variant="outline">
										{dependency}
									</Badge>
								))}
							</div>
						) : null}
					</section>

					<InspectorSection title="Description">
						<p className="text-sm leading-6 text-muted-foreground">{task.description}</p>
					</InspectorSection>

					<InspectorSection title="Operational context">
						<div className="space-y-1.5 text-sm text-muted-foreground">
							<p className="font-medium text-foreground">{task.client}</p>
							<p>{task.phase} phase</p>
							<p>Assigned to {task.assignee}</p>
							{task.priority === "High" || task.priority === "Urgent" ? (
								<p>{task.priority} priority</p>
							) : null}
							<p>{task.activity}</p>
						</div>
					</InspectorSection>

					<InspectorSection title="Attachments">
						<FileRows items={task.attachments} />
					</InspectorSection>

					<InspectorSection title="Client comments">
						<CommentRows client={task.client} comments={task.clientComments} />
					</InspectorSection>

					<InspectorSection title="Linked deliverables">
						<div className="flex flex-wrap gap-1.5">
							{task.deliverables.map((deliverable) => (
								<Badge className="gap-1.5" key={deliverable} variant="outline">
									<Link2Icon className="size-3" />
									{deliverable}
								</Badge>
							))}
						</div>
					</InspectorSection>

					<InspectorSection title="Automation signals">
						<AutomationRules signals={task.automation} />
					</InspectorSection>

					<InspectorSection emphasis title="Operational timeline">
						<Timeline items={[...task.approvalHistory, ...task.timeline]} />
					</InspectorSection>
				</div>

				<SheetFooter className="border-t border-border/70 p-6 sm:flex-row sm:justify-end">
					<Button variant={task.status === "Active" ? "default" : "outline"}>
						Mark complete
					</Button>
					<Button variant={task.status === "Active" ? "outline" : "default"}>
						Open project
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

function InspectorSection({
	children,
	emphasis = false,
	title,
}: {
	children: React.ReactNode;
	emphasis?: boolean;
	title: string;
}) {
	return (
		<section className={cn("space-y-3", emphasis && "border-t border-border/60 pt-5")}>
			<h3 className="mb-3 text-sm font-semibold">{title}</h3>
			{children}
		</section>
	);
}

function FileRows({ items }: { items: string[] }) {
	if (!items.length) {
		return <p className="text-sm text-muted-foreground">No attachments yet.</p>;
	}

	return (
		<div className="space-y-1.5">
			{items.map((item) => (
				<div
					className="flex items-center gap-3 rounded-md border border-border/55 px-3 py-2 text-sm"
					key={item}
				>
					<FileTextIcon className="size-4 text-muted-foreground" />
					<div className="min-w-0">
						<p className="truncate font-medium">{item}</p>
						<p className="text-xs text-muted-foreground">Updated {item.includes("v") ? "48m" : "today"} ago</p>
					</div>
				</div>
			))}
		</div>
	);
}

function CommentRows({
	client,
	comments,
}: {
	client: string;
	comments: string[];
}) {
	if (!comments.length) {
		return <p className="text-sm text-muted-foreground">No client comments.</p>;
	}

	return (
		<div className="space-y-2">
			{comments.map((comment) => (
				<div className="rounded-md bg-muted/30 p-3 text-sm" key={comment}>
					<div className="mb-2 flex items-center justify-between gap-3">
						<span className="font-medium">{client}</span>
						<span className="text-xs text-muted-foreground">2h ago</span>
					</div>
					<p className="leading-6 text-muted-foreground">{comment}</p>
				</div>
			))}
		</div>
	);
}

function AutomationRules({ signals }: { signals: string[] }) {
	if (!signals.length) {
		return <p className="text-sm text-muted-foreground">No automations attached.</p>;
	}

	return (
		<div className="space-y-2">
			{signals.map((signal) => (
				<div className="flex items-start gap-3 text-sm" key={signal}>
					<RefreshCcwIcon className="mt-0.5 size-4 text-muted-foreground" />
					<div>
						<p className="font-medium">{signal}</p>
						<p className="text-muted-foreground">
							{signal.toLowerCase().includes("escalation")
								? "Escalates after 24h without movement."
								: signal.toLowerCase().includes("launch")
									? "Unlocks when approvals and QA are complete."
									: "Keeps the task moving without manual follow-up."}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

function Timeline({ items }: { items: string[] }) {
	const uniqueItems = Array.from(new Set(items));

	if (!uniqueItems.length) {
		return <p className="text-sm text-muted-foreground">No timeline activity yet.</p>;
	}

	return (
		<ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-border/70">
			{uniqueItems.map((item, index) => {
				const Icon = item.toLowerCase().includes("comment")
					? MessageSquareTextIcon
					: item.toLowerCase().includes("reminder")
						? Clock3Icon
						: item.toLowerCase().includes("approval")
							? PlayCircleIcon
							: FileTextIcon;

				return (
					<li className="relative flex gap-3 text-sm" key={item}>
						<span
							className={cn(
								"relative z-10 mt-0.5 flex size-3.5 items-center justify-center rounded-full border bg-background",
								index === 0 ? "border-foreground" : "border-border"
							)}
						>
							<span
								className={cn(
									"size-1.5 rounded-full",
									index === 0 ? "bg-foreground" : "bg-muted-foreground/45"
								)}
							/>
						</span>
						<div className="min-w-0">
							<p className="font-medium text-foreground/90">{item}</p>
							<p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
								<Icon className="size-3.5" />
								{index === 0 ? "Most recent" : "Earlier"}
							</p>
						</div>
					</li>
				);
			})}
		</ol>
	);
}
