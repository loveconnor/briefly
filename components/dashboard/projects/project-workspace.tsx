"use client";

import {
	ArchiveIcon,
	ArrowRightIcon,
	CalendarDaysIcon,
	CheckIcon,
	CheckCircle2Icon,
	CircleIcon,
	DownloadIcon,
	EyeIcon,
	FileTextIcon,
	GitCommitHorizontalIcon,
	MessageSquareIcon,
	MoreVerticalIcon,
	MousePointerSquareDashedIcon,
	PlayIcon,
	SendIcon,
	Settings2Icon,
	Share2Icon,
	SlidersHorizontalIcon,
	UploadIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { badgeToneClassName, badgeToneVariant, type BadgeTone } from "@/components/dashboard/badge-tone";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { EventIconMap, Project, ProjectTaskStatus } from "./project-data";

const statusClass: Record<ProjectTaskStatus, string> = {
	Ready: "text-info-foreground",
	"In progress": "text-foreground",
	Waiting: "text-warning-foreground",
	Blocked: "text-destructive-foreground",
};

const approvalVariant: Record<Project["approvals"][number]["status"], BadgeTone> = {
	Approved: "success",
	Waiting: "warning",
	"Changes requested": "error",
};

const riskClass: Record<Project["risk"], string> = {
	Healthy: "text-success-foreground",
	"At risk": "text-warning-foreground",
	Blocked: "text-destructive-foreground",
};

const eventIcons: EventIconMap = {
	approval: CheckCircle2Icon,
	comment: MessageSquareIcon,
	delivery: GitCommitHorizontalIcon,
	phase: PlayIcon,
	upload: UploadIcon,
};

function InlineMeta({ label, value }: { label: string; value: string }) {
	return (
		<div className="min-w-0">
			<div className="text-xs font-medium text-muted-foreground">{label}</div>
			<div className="mt-1 truncate text-sm font-semibold">{value}</div>
		</div>
	);
}

function SectionTitle({
	description,
	title,
}: {
	description?: string;
	title: string;
}) {
	return (
		<div className="mb-4">
			<h2 className="text-sm font-semibold">{title}</h2>
			{description ? (
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			) : null}
		</div>
	);
}

function PhaseProgress({ project }: { project: Project }) {
	return (
		<div>
			<div className="mb-4 flex flex-wrap items-end justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold">{project.phase} Phase</h2>
					<p className="mt-1 text-sm text-muted-foreground">{project.phaseDetail}</p>
				</div>
				<div className="text-sm font-medium tabular-nums text-muted-foreground">
					{project.deliverablesComplete}/{project.deliverablesTotal} deliverables
				</div>
			</div>
			<div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-6">
				{project.phases.map((phase) => (
					<div
						className={cn(
							"flex min-h-11 items-center gap-2 rounded-sm px-2.5 py-2.5 text-sm",
							phase.state === "current" && "bg-muted text-foreground",
							phase.state === "complete" && "text-foreground",
							phase.state === "upcoming" && "text-muted-foreground"
						)}
						key={phase.name}
					>
						{phase.state === "complete" ? (
							<CheckIcon className="size-4 text-success-foreground" />
						) : phase.state === "current" ? (
							<ArrowRightIcon className="size-4" />
						) : (
							<CircleIcon className="size-3" />
						)}
						<span className="font-medium">{phase.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}

function WorkRow({
	detail,
	due,
	owner,
	status,
	title,
}: Project["activeWork"][number]) {
	return (
		<div className="grid min-h-24 gap-3 rounded-sm px-3 py-4 text-sm transition-colors hover:bg-white/[0.02] md:grid-cols-[minmax(220px,1fr)_150px_110px_100px] md:items-start">
			<div className="min-w-0">
				<div className="truncate font-medium">{title}</div>
				<div className="mt-4 text-muted-foreground">{detail}</div>
			</div>
			<div className={cn("font-medium md:pt-0", statusClass[status])}>{status}</div>
			<div className="text-muted-foreground md:pt-0">{owner}</div>
			<div className="text-muted-foreground tabular-nums md:pt-0">{due}</div>
		</div>
	);
}

function ContextPanel({ project }: { project: Project }) {
	return (
		<section>
			<div className="grid gap-x-10 gap-y-8 border-y py-6 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr]">
				<div className="min-w-0">
					<SectionTitle title="Blockers" />
					<div className="space-y-3">
						{project.blockers.length ? (
							project.blockers.map((blocker) => (
								<div className="text-sm" key={blocker.title}>
									<div className="font-medium">{blocker.title}</div>
									<div className="mt-1 text-muted-foreground">
										Waiting on {blocker.waitingOn} for {blocker.since}
									</div>
								</div>
							))
						) : (
							<DashboardEmptyState className="min-h-20" title="No active blockers" />
						)}
					</div>
				</div>

				<div className="min-w-0">
					<SectionTitle title="Risk State" />
					<div>
						<div className={cn("text-sm font-semibold", riskClass[project.risk])}>{project.risk}</div>
						<p className="mt-1 text-sm text-muted-foreground">{project.riskDetail}</p>
					</div>
				</div>

				<div className="min-w-0 md:col-span-2 xl:col-span-1">
					<SectionTitle title="Budget" />
					<div className="flex items-baseline justify-between gap-3">
						<div className="text-lg font-semibold">{project.budgetUsed} used</div>
						<div className="text-sm font-medium text-muted-foreground">
							{project.budgetPercent}% allocated
						</div>
					</div>
					<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
						<div
							className="h-full rounded-full bg-primary"
							style={{ width: `${project.budgetPercent}%` }}
						/>
					</div>
				</div>
			</div>

			<div className="grid gap-x-10 gap-y-8 border-b py-6 md:grid-cols-2">
				<div>
					<SectionTitle title="Recent Client Activity" />
					<div className="space-y-3">
						{project.clientActivity.map((item, index) => (
							<div className="grid grid-cols-[0.75rem_1fr] gap-3 text-sm" key={item}>
								<span
									className={cn(
										"mt-1.5 size-1.5 rounded-full bg-muted-foreground/45",
										index === 0 && "bg-foreground"
									)}
								/>
								<div className="min-w-0">
									<div className={cn("font-medium", index !== 0 && "text-muted-foreground")}>
										{item}
									</div>
									<div className="mt-0.5 text-xs text-muted-foreground">
										{index === 0 ? "Latest client signal" : "Client activity"}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<SectionTitle title="Team" />
					<div className="grid gap-2 sm:grid-cols-3">
						{project.team.map((member) => (
							<div className="text-sm" key={member.name}>
								<div className="font-medium">{member.name}</div>
								<div className="mt-0.5 text-muted-foreground">{member.role}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function OverviewTab({ project }: { project: Project }) {
	return (
		<div className="space-y-12">
			<PhaseProgress project={project} />

			<ContextPanel project={project} />

			<div className="grid gap-12 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)]">
				<section>
					<SectionTitle
						description="Current execution state across design, copy, QA, and client review."
						title="Active Work"
					/>
					<div className="space-y-1">
						{project.activeWork.map((item) => (
							<WorkRow key={item.title} {...item} />
						))}
					</div>
				</section>

				<section>
					<SectionTitle
						description="Scheduled outputs and approval checkpoints."
						title="Upcoming Deliverables"
					/>
					<div className="space-y-1">
						{project.upcomingDeliverables.map((deliverable) => (
							<div
								className="grid min-h-24 gap-3 rounded-sm px-3 py-4 text-sm transition-colors hover:bg-white/[0.02] sm:grid-cols-[minmax(0,1fr)_110px] sm:items-start"
								key={deliverable.title}
							>
								<div className="min-w-0">
									<div className="truncate font-medium">{deliverable.title}</div>
									<div
										className={cn(
											"mt-4 font-medium",
											deliverable.state === "Needs approval" && "text-warning-foreground",
											deliverable.state === "At risk" && "text-destructive-foreground",
											deliverable.state === "On track" && "text-muted-foreground"
										)}
									>
										{deliverable.state}
									</div>
								</div>
								<div className="text-muted-foreground tabular-nums sm:text-right">{deliverable.due}</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

function TasksTab({ project }: { project: Project }) {
	const [status, setStatus] = useState("All");
	const [assignee, setAssignee] = useState("Anyone");

	const assignees = useMemo(
		() => ["Anyone", ...Array.from(new Set(project.tasks.map((task) => task.assignee)))],
		[project.tasks]
	);
	const statuses = ["All", "Ready", "In progress", "Waiting", "Blocked"];
	const visibleTasks = project.tasks.filter(
		(task) =>
			(status === "All" || task.status === status) &&
			(assignee === "Anyone" || task.assignee === assignee)
	);

	return (
		<div className="space-y-4">
			<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-wrap gap-2">
					{statuses.map((item) => (
						<button
							className={cn(
								"rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
								status === item && "bg-muted text-foreground"
							)}
							key={item}
							onClick={() => setStatus(item)}
							type="button"
						>
							{item}
						</button>
					))}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
						<SlidersHorizontalIcon className="size-4" />
						{assignee}
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Assignee</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{assignees.map((item) => (
							<DropdownMenuItem key={item} onClick={() => setAssignee(item)}>
								{item}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="space-y-1">
				{visibleTasks.map((task) => (
					<div
						className="grid gap-2 rounded-sm px-2 py-3 text-sm transition-colors hover:bg-white/[0.02] md:grid-cols-[minmax(260px,1fr)_110px_100px_110px_32px] md:items-center xl:grid-cols-[minmax(360px,1.3fr)_120px_110px_120px_32px]"
						key={task.title}
					>
						<div className="min-w-0">
							<div className="truncate font-medium">{task.title}</div>
							{task.blocker ? (
								<div className="mt-1 text-xs text-muted-foreground">Blocked by {task.blocker}</div>
							) : null}
						</div>
						<button className="w-fit text-left text-muted-foreground hover:text-foreground" type="button">
							{task.assignee}
						</button>
						<button className="w-fit text-left text-muted-foreground hover:text-foreground" type="button">
							{task.due}
						</button>
						<button className={cn("w-fit text-left font-medium", statusClass[task.status])} type="button">
							{task.status}
						</button>
						<DropdownMenu>
							<DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
								<MoreVerticalIcon className="size-4" />
								<span className="sr-only">Task actions</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Change status</DropdownMenuItem>
								<DropdownMenuItem>Assign</DropdownMenuItem>
								<DropdownMenuItem>Edit due date</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				))}
			</div>
		</div>
	);
}

function TimelineTab({ project }: { project: Project }) {
	return (
		<div className="w-full">
			{project.timelineEvents.map((group) => (
				<section className="grid gap-4 py-6 first:pt-0 md:grid-cols-[8rem_minmax(0,1fr)]" key={group.date}>
					<h2 className="text-sm font-semibold text-muted-foreground">{group.date}</h2>
					<div className="relative space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-border/60">
						{group.items.map((item) => {
							const Icon = eventIcons[item.type];

							return (
								<div className="relative grid grid-cols-[1.5rem_minmax(0,1fr)_6rem] gap-3" key={`${item.title}-${item.time}`}>
									<span className="mt-0.5 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground">
										<Icon className="size-3.5" />
									</span>
									<div>
										<div className="text-sm font-medium">{item.title}</div>
										<p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
									</div>
									<div className="pt-0.5 text-right text-xs text-muted-foreground">{item.time}</div>
								</div>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
}

function ApprovalsTab({ project }: { project: Project }) {
	return (
		<div className="w-full">
			{project.approvals.map((approval) => (
				<div
					className="grid gap-4 border-b py-5 text-sm transition-colors last:border-b-0 hover:bg-white/[0.02] sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(260px,1fr)_minmax(220px,.55fr)_minmax(240px,.45fr)] lg:items-center"
					key={approval.title}
				>
					<div className="flex size-10 items-center justify-center rounded-sm bg-muted/40 text-xs font-semibold text-muted-foreground">
						{approval.assetType}
					</div>
					<div className="min-w-0">
						<div className="font-medium">{approval.title}</div>
						<div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
							<span>{approval.asset}</span>
							<span aria-hidden="true">·</span>
							<span>{approval.reviewer}</span>
							</div>
							<div className="mt-2 text-xs text-muted-foreground">
								Latest comment: &ldquo;{approval.latestComment}&rdquo;
							</div>
						</div>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-start">
						<Badge
							className={badgeToneClassName(approvalVariant[approval.status], "w-fit")}
							variant={badgeToneVariant(approvalVariant[approval.status])}
						>
							{approval.status}
						</Badge>
						<div className="text-muted-foreground">{approval.waiting}</div>
					</div>
					<div className="flex flex-wrap gap-2 lg:justify-start xl:justify-end">
						{approval.status === "Waiting" ? (
							<>
								<Button size="sm" variant="outline">
									<CheckIcon className="size-4" />
									Approve
								</Button>
								<Button size="sm" variant="ghost">
									<MessageSquareIcon className="size-4" />
									Request changes
								</Button>
							</>
						) : (
							<Button size="sm" variant="ghost">
								<CheckCircle2Icon className="size-4" />
								View decision
							</Button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

function DeliverablesTab({ project }: { project: Project }) {
	return (
		<div className="w-full space-y-8">
			{project.deliverables.map((group) => (
				<section key={group.week}>
					<div className="mb-2 flex items-center gap-2 text-sm font-semibold">
						<CalendarDaysIcon className="size-4" />
						{group.week}
					</div>
					<div>
						{group.items.map((item) => (
							<div
								className="grid gap-3 border-b py-4 text-sm transition-colors last:border-b-0 hover:bg-white/[0.02] md:grid-cols-[8rem_minmax(260px,1fr)_160px_160px] md:items-center"
								key={item.title}
							>
								<div className="text-muted-foreground tabular-nums">{item.due}</div>
								<div className="min-w-0 font-medium">
									{item.title}
								</div>
								<div className="text-muted-foreground">{item.phase}</div>
								<div className="font-medium">{item.status}</div>
							</div>
						))}
					</div>
				</section>
			))}
		</div>
	);
}

function FilesTab({ project }: { project: Project }) {
	return (
		<div className="space-y-2">
			<div className="grid px-2 pb-2 text-xs font-medium text-muted-foreground sm:grid-cols-[minmax(220px,1fr)_120px_150px_100px_110px_132px]">
				<span>File</span>
				<span className="hidden sm:block">Type</span>
				<span className="hidden sm:block">Status</span>
				<span className="hidden sm:block">Updated</span>
				<span className="hidden sm:block">Owner</span>
				<span className="hidden text-right sm:block">Actions</span>
			</div>
			{project.files.map((file) => (
				<div
					className="group grid gap-2 rounded-sm px-2 py-4 text-sm transition-colors hover:bg-white/[0.02] sm:grid-cols-[minmax(220px,1fr)_120px_150px_100px_110px_132px] sm:items-center"
					key={file.name}
				>
					<div className="flex min-w-0 items-center gap-3 font-medium">
						<span className="flex size-8 shrink-0 items-center justify-center rounded-md border text-muted-foreground">
							<FileTextIcon className="size-4" />
						</span>
						<span className="truncate">{file.name}</span>
					</div>
					<div className="text-muted-foreground">{file.type}</div>
					<div className="font-medium">{file.status}</div>
					<div className="text-muted-foreground">{file.updated}</div>
					<div className="text-muted-foreground">{file.owner}</div>
					<div className="flex justify-start sm:justify-end">
						<DropdownMenu>
							<DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
								<MoreVerticalIcon className="size-4" />
								<span className="sr-only">File actions for {file.name}</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>File actions</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<EyeIcon className="size-4" />
									Preview
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DownloadIcon className="size-4" />
									Download
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Share2Icon className="size-4" />
									Share
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			))}
		</div>
	);
}

function ActivityTab({ project }: { project: Project }) {
	return (
		<div className="w-full space-y-1">
			{project.activity.map((item) => (
				<div className="grid gap-4 rounded-md px-3 py-5 text-sm transition-colors hover:bg-muted/30 md:grid-cols-[8rem_minmax(0,1fr)]" key={`${item.title}-${item.time}`}>
					<div className="text-muted-foreground">{item.time}</div>
					<div>
						<div className="font-medium">{item.title}</div>
						<p className="mt-1 text-muted-foreground">{item.detail}</p>
					</div>
				</div>
			))}
		</div>
	);
}

function SettingsTab({ project }: { project: Project }) {
	return (
		<div className="w-full">
			{project.settings.map((item) => (
				<div className="grid gap-3 border-b py-5 text-sm transition-colors last:border-b-0 hover:bg-white/[0.02] sm:grid-cols-[minmax(180px,.35fr)_minmax(260px,1fr)_auto] sm:items-center" key={item.label}>
					<div className="font-medium">{item.label}</div>
					<div className="text-muted-foreground">{item.value}</div>
					<Button className="sm:justify-self-end" size="sm" variant={item.label === "Archive" ? "ghost" : "outline"}>
						{item.label === "Archive" ? <ArchiveIcon className="size-4" /> : <Settings2Icon className="size-4" />}
						{item.action}
					</Button>
				</div>
			))}
		</div>
	);
}

export function ProjectWorkspace({ project }: { project: Project }) {
	return (
		<div className="mx-auto w-full max-w-[1440px] space-y-7">
			<header className="space-y-5">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0">
						<h1 className="truncate text-2xl font-bold tracking-tight">{project.name}</h1>
						<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
							<span>{project.status}</span>
							<span aria-hidden="true">·</span>
							<span>{project.phase} Phase</span>
							<span aria-hidden="true">·</span>
							<span>Due {project.due}</span>
						</div>
						<p className="mt-3 text-base text-foreground">{project.summary}</p>
					</div>
					<div className="flex flex-wrap gap-2">
						<Button variant="outline">
							<SendIcon className="size-4" />
							Share update
						</Button>
						<Button variant="outline">
							<MousePointerSquareDashedIcon className="size-4" />
							Open portal
						</Button>
						<Button>
							<CheckCircle2Icon className="size-4" />
							New task
						</Button>
					</div>
				</div>

				<div className="grid gap-x-8 gap-y-4 rounded-lg bg-muted/25 p-4 sm:grid-cols-2 xl:grid-cols-5">
					<InlineMeta label="Client" value={project.client} />
					<InlineMeta label="Owner" value={project.owner} />
					<InlineMeta label="Started" value={project.started} />
					<InlineMeta label="Timeline" value={project.timeline} />
					<InlineMeta label="Budget" value={project.budget} />
				</div>
			</header>

			<Tabs className="gap-5" defaultValue="overview">
				<div className="overflow-x-auto">
					<TabsList variant="line">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="tasks">Tasks</TabsTrigger>
						<TabsTrigger value="timeline">Timeline</TabsTrigger>
						<TabsTrigger value="approvals">Approvals</TabsTrigger>
						<TabsTrigger value="deliverables">Deliverables</TabsTrigger>
						<TabsTrigger value="files">Files</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
						<TabsTrigger value="settings">Settings</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="overview">
					<OverviewTab project={project} />
				</TabsContent>
				<TabsContent value="tasks">
					<TasksTab project={project} />
				</TabsContent>
				<TabsContent value="timeline">
					<TimelineTab project={project} />
				</TabsContent>
				<TabsContent value="approvals">
					<ApprovalsTab project={project} />
				</TabsContent>
				<TabsContent value="deliverables">
					<DeliverablesTab project={project} />
				</TabsContent>
				<TabsContent value="files">
					<FilesTab project={project} />
				</TabsContent>
				<TabsContent value="activity">
					<ActivityTab project={project} />
				</TabsContent>
				<TabsContent value="settings">
					<SettingsTab project={project} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
