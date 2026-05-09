"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
	CheckCircle2,
	MessageSquareText,
	SlidersHorizontal,
	XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const approvalItems = [
	{
		title: "Homepage Design",
		project: "Acme Website Redesign",
		requestedBy: "Maya Chen",
		waiting: "3 days overdue",
		priority: "High",
		source: "client",
		detail: "Final desktop and mobile homepage concepts are ready for client signoff.",
		variant: "error" as const,
		urgency: 0,
	},
	{
		title: "Launch Checklist",
		project: "Brightside Landing Page",
		requestedBy: "QA Team",
		waiting: "Due today",
		priority: "High",
		source: "internal",
		detail: "Analytics, redirects, forms, and accessibility checks need internal confirmation.",
		variant: "warning" as const,
		urgency: 1,
	},
	{
		title: "SEO Audit",
		project: "Northstar Growth Retainer",
		requestedBy: "Connor Love",
		waiting: "Waiting 1 day",
		priority: "Medium",
		source: "client",
		detail: "Client needs to confirm recommended page title and URL changes.",
		variant: "outline" as const,
		urgency: 2,
	},
];

export function Approvals() {
	const [queueMode, setQueueMode] = useState("needs-decision");
	const [showInternalApprovals, setShowInternalApprovals] = useState(true);
	const [showClientApprovals, setShowClientApprovals] = useState(true);

	const visibleApprovals = useMemo(() => {
		const filtered = approvalItems.filter((item) => {
			if (item.source === "internal") {
				return showInternalApprovals;
			}

			return showClientApprovals;
		});

		if (queueMode === "overdue") {
			return [...filtered].sort((a, b) => a.urgency - b.urgency);
		}

		if (queueMode === "project") {
			return [...filtered].sort((a, b) => a.project.localeCompare(b.project));
		}

		return filtered;
	}, [queueMode, showClientApprovals, showInternalApprovals]);

	const overdueCount = visibleApprovals.filter((item) => item.variant === "error").length;
	const dueTodayCount = visibleApprovals.filter((item) => item.variant === "warning").length;
	const waitingCount = visibleApprovals.filter((item) => item.variant === "outline").length;

	return (
		<div className="space-y-4">
			<header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Approvals</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Structured signoffs that need a decision before work can keep moving.
					</p>
				</div>
				<ViewOptions
					onQueueModeChange={setQueueMode}
					onShowClientApprovalsChange={setShowClientApprovals}
					onShowInternalApprovalsChange={setShowInternalApprovals}
					queueMode={queueMode}
					showClientApprovals={showClientApprovals}
					showInternalApprovals={showInternalApprovals}
				/>
			</header>

			<div className="grid gap-8 xl:grid-cols-[1fr_280px]">
				<section className="divide-y divide-border/55 border-t border-border/60">
					{visibleApprovals.map((item) => (
						<article key={item.title} className="group rounded-lg py-4 transition-colors hover:bg-muted/30">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<h2 className="font-semibold">{item.title} Review</h2>
									<p className="text-muted-foreground mt-1 text-sm">{item.project}</p>
								</div>
								<Badge variant={item.variant}>{item.waiting}</Badge>
							</div>
							<div className="mt-3 space-y-3">
								<p className="text-sm leading-6">{item.detail}</p>
								<p className="text-muted-foreground text-sm">
									{item.requestedBy} · {item.waiting} · {item.priority} Priority
								</p>
								<div className="flex flex-wrap items-center gap-1">
									<Button size="sm">
										<CheckCircle2 />
										Approve
									</Button>
									<TextAction>
										<MessageSquareText />
										Request changes
									</TextAction>
									<TextAction>
										<XCircle />
										Reject
									</TextAction>
								</div>
							</div>
						</article>
					))}
					{visibleApprovals.length === 0 ? (
						<p className="text-muted-foreground py-5 text-sm">
							No approvals match the current view options.
						</p>
					) : null}
				</section>

				<aside className="h-fit xl:pt-1">
					<h2 className="font-semibold">Signoff Load</h2>
					<p className="text-muted-foreground mt-1 text-sm">Approvals grouped by urgency.</p>
					<div className="mt-4 divide-y divide-border/55 border-t border-border/60">
						<QueueMetric label="Overdue" value={String(overdueCount)} variant="error" />
						<QueueMetric label="Due today" value={String(dueTodayCount)} variant="warning" />
						<QueueMetric label="Waiting" value={String(waitingCount)} variant="outline" />
					</div>
				</aside>
			</div>
		</div>
	);
}

function ViewOptions({
	onQueueModeChange,
	onShowClientApprovalsChange,
	onShowInternalApprovalsChange,
	queueMode,
	showClientApprovals,
	showInternalApprovals,
}: {
	onQueueModeChange: (value: string) => void;
	onShowClientApprovalsChange: (value: boolean) => void;
	onShowInternalApprovalsChange: (value: boolean) => void;
	queueMode: string;
	showClientApprovals: boolean;
	showInternalApprovals: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }))}>
				<SlidersHorizontal />
				View options
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-52">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Queue</DropdownMenuLabel>
					<DropdownMenuRadioGroup onValueChange={onQueueModeChange} value={queueMode}>
						<DropdownMenuRadioItem value="needs-decision">Needs decision</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="overdue">Overdue first</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="project">Group by project</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showInternalApprovals} onCheckedChange={onShowInternalApprovalsChange}>
					Show internal approvals
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={showClientApprovals} onCheckedChange={onShowClientApprovalsChange}>
					Show client approvals
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function TextAction({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<button
			className="text-muted-foreground inline-flex min-h-7 items-center gap-1.5 rounded-md px-2 text-sm transition-colors hover:bg-accent/70 hover:text-foreground [&_svg]:size-3.5"
			type="button"
		>
			{children}
		</button>
	);
}

function QueueMetric({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant: "error" | "outline" | "warning";
}) {
	return (
		<div className="flex items-center justify-between py-3">
			<span className="text-sm font-medium">{label}</span>
			<Badge variant={variant}>{value}</Badge>
		</div>
	);
}
