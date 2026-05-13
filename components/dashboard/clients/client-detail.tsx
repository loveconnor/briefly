import Link from "next/link";
import {
	ArrowLeftIcon,
	CalendarDaysIcon,
	CheckCircle2Icon,
	Clock3Icon,
	FileTextIcon,
	FolderOpenIcon,
	InboxIcon,
	LineChartIcon,
	MousePointerSquareDashedIcon,
	PaperclipIcon,
	SendIcon,
	UploadIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { badgeToneClassName, badgeToneVariant, type BadgeTone, type BadgeVariant } from "@/components/dashboard/badge-tone";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { type ClientHealth, type ClientRecord, type ClientStatus } from "./client-data";

const statusStyles: Record<ClientStatus, BadgeTone | "secondary"> = {
	Active: "success",
	Waiting: "warning",
	Blocked: "error",
	Paused: "secondary",
	Completed: "info",
	Archived: "default",
};

const healthStyles: Record<ClientHealth, string> = {
	Healthy: "border-success text-success-foreground",
	"Needs attention": "border-info text-info-foreground",
	"At risk": "border-warning text-warning-foreground",
	Blocked: "border-destructive text-destructive-foreground",
};

function getStatusBadgeProps(status: ClientStatus): {
	className?: string;
	variant: BadgeVariant;
} {
	const tone = statusStyles[status];

	return tone === "secondary"
		? { variant: "secondary" }
		: {
				className: badgeToneClassName(tone),
				variant: badgeToneVariant(tone),
			};
}

function getBlockerBadgeProps(blocker: string): {
	className: string;
	variant: BadgeVariant;
} {
	const tone: BadgeTone = blocker === "None" ? "success" : "warning";

	return {
		className: badgeToneClassName(tone),
		variant: badgeToneVariant(tone),
	};
}

function InlineMeta({
	label,
	value,
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="min-w-0">
			<div className="text-xs font-medium text-muted-foreground">{label}</div>
			<div className="mt-1 truncate text-sm font-semibold">{value}</div>
		</div>
	);
}

function SectionHeader({
	description,
	icon: Icon,
	title,
}: {
	description: string;
	icon: typeof Clock3Icon;
	title: string;
}) {
	return (
		<div className="mb-4">
			<h2 className="flex items-center gap-2 text-base font-semibold">
				<Icon className="size-4" />
				{title}
			</h2>
			<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

function ProjectProgress({ project }: { project: ClientRecord["projects"][number] }) {
	return (
		<div className="grid gap-4 py-5 lg:grid-cols-[minmax(0,1fr)_10rem]">
			<div className="min-w-0">
				<div className="flex flex-wrap items-center gap-2">
					<div className="font-semibold">{project.name}</div>
					<Badge {...getBlockerBadgeProps(project.blocker)}>
						{project.blocker === "None" ? "Moving" : "Blocked"}
					</Badge>
				</div>
				<div className="mt-1 text-sm text-muted-foreground">
					{project.phase} phase · Owner: Briefly team · Due Friday
				</div>
				<div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
					<div
						className={cn(
							"h-full rounded-full bg-primary",
							project.status === "Blocked" && "bg-destructive",
							project.status === "Waiting" && "bg-warning"
						)}
						style={{ width: `${project.progress}%` }}
					/>
				</div>
				<div className="mt-3 text-sm text-muted-foreground">
					{project.blocker === "None" ? "No active blocker." : `Waiting on ${project.blocker.toLowerCase()}.`}
				</div>
			</div>
			<div className="self-center text-left lg:text-right">
				<div className="text-2xl font-semibold tabular-nums">{project.progress}%</div>
				<div className="text-xs font-medium text-muted-foreground">complete</div>
			</div>
		</div>
	);
}

export function ClientDetail({ client }: { client: ClientRecord }) {
	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
				<div className="min-w-0">
					<Button asChild className="mb-3" size="sm" variant="ghost">
						<Link href="/dashboard/clients">
							<ArrowLeftIcon />
							Clients
						</Link>
					</Button>
					<div className="flex min-w-0 items-center gap-3">
						<Avatar className="size-12 rounded-lg border">
							<AvatarFallback className="rounded-lg bg-accent text-base">
								{client.initials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<h1 className="truncate text-2xl font-bold tracking-tight">
								{client.name}
							</h1>
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<Badge {...getStatusBadgeProps(client.status)}>{client.status}</Badge>
								<Badge className={healthStyles[client.health]} variant="outline">
									{client.health}
								</Badge>
								<span className="text-sm text-muted-foreground">{client.responseTime}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					<Button variant="outline">
						<MousePointerSquareDashedIcon />
						Open portal
					</Button>
					<Button>
						<SendIcon />
						Send update
					</Button>
				</div>
			</div>

			<div className="grid gap-x-8 gap-y-4 border-t pt-4 sm:grid-cols-2 xl:grid-cols-4">
				<InlineMeta label="Active projects" value={`${client.activeProjects}`} />
				<InlineMeta label="Waiting on" value={client.waitingOn} />
				<InlineMeta label="Last active" value={client.lastActivity} />
				<InlineMeta label="Next" value={client.nextDeliverable} />
			</div>

			<Tabs defaultValue="overview" className="gap-4">
				<div className="overflow-x-auto">
					<TabsList variant="line">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="projects">Projects</TabsTrigger>
						<TabsTrigger value="timeline">Timeline</TabsTrigger>
						<TabsTrigger value="requests">Requests</TabsTrigger>
						<TabsTrigger value="deliverables">Deliverables</TabsTrigger>
						<TabsTrigger value="portal">Portal</TabsTrigger>
						<TabsTrigger value="files">Files</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent className="space-y-4" value="overview">
					<div className="grid gap-10 xl:grid-cols-[1.4fr_.9fr]">
						<section>
							<SectionHeader
								description="Project movement, phase, and blockers for this relationship."
								icon={FolderOpenIcon}
								title="Active projects"
							/>
							<div className="border-t">
								{client.projects.map((project) => (
									<div className="py-5" key={project.name}>
										<div className="flex flex-wrap items-start justify-between gap-3">
											<div>
												<div className="font-semibold">{project.name}</div>
												<div className="mt-1 text-sm text-muted-foreground">
													{project.phase} · {project.status}
												</div>
											</div>
											<Badge {...getBlockerBadgeProps(project.blocker)}>
												{project.blocker === "None" ? "No blockers" : project.blocker}
											</Badge>
										</div>
										<div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
											<div
												className={cn(
													"h-full rounded-full bg-primary",
													project.status === "Blocked" && "bg-destructive",
													project.status === "Waiting" && "bg-warning"
												)}
												style={{ width: `${project.progress}%` }}
											/>
										</div>
										<div className="mt-3 text-sm text-muted-foreground">
											{project.blocker === "None" ? "Moving without blockers" : `Waiting on ${project.blocker.toLowerCase()}`}
										</div>
									</div>
								))}
							</div>
						</section>

						<section>
							<SectionHeader
								description="The operational read on responsiveness and visibility."
								icon={LineChartIcon}
								title="Relationship health"
							/>
							<div className="border-t">
								<div className={cn("border-l-2 py-5 pl-4", healthStyles[client.health])}>
									<div className="text-sm font-semibold">{client.health}</div>
									<div className="mt-1 text-sm">{client.healthDetail}</div>
								</div>
								<div className="grid gap-4 border-t py-5 sm:grid-cols-2 xl:grid-cols-1">
									<InlineMeta label="Portal visibility" value={client.portalActivity} />
									<InlineMeta label="Response pattern" value={client.responseTime} />
								</div>
							</div>
						</section>
					</div>
				</TabsContent>

				<TabsContent value="projects">
					<section>
						<SectionHeader
							description="Every project tied to this client relationship."
							icon={FolderOpenIcon}
							title="Projects"
						/>
						<div className="border-t">
							{client.projects.map((project) => (
								<ProjectProgress key={project.name} project={project} />
							))}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="timeline">
					<section>
						<SectionHeader
							description="Approvals, uploads, portal views, revisions, and updates in one chronological view."
							icon={Clock3Icon}
							title="Shared client timeline"
						/>
						<div className="grid border-t py-4 xl:grid-cols-[minmax(0,44rem)_1fr]">
							<div>
								<div className="pb-3 text-xs font-semibold uppercase tracking-normal text-muted-foreground">
									Recent
								</div>
								{client.timeline.map((item, index) => (
									<div className="grid grid-cols-[1.25rem_1fr] gap-3 pb-4 last:pb-0" key={`${item.event}-${item.time}`}>
										<div className="flex flex-col items-center">
											<div className="mt-1 flex size-5 items-center justify-center rounded-full border bg-background">
												<CheckCircle2Icon className="size-3" />
											</div>
											{index < client.timeline.length - 1 ? <div className="mt-2 h-full w-px bg-border" /> : null}
										</div>
										<div>
											<div className="font-semibold">{item.event}</div>
											<div className="mt-1 text-sm text-muted-foreground">
												{item.time} · {client.projects[0]?.name ?? client.name}
											</div>
											<p className="mt-1 text-sm text-muted-foreground">
												{item.type === "portal"
													? "Client visibility signal recorded in the shared portal."
													: item.type === "request"
														? "Client action is needed before delivery can continue."
														: "Relationship activity captured for the project record."}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</TabsContent>

				<TabsContent value="requests">
					<section>
						<SectionHeader
							description="Anything awaiting response, assets, or approval."
							icon={InboxIcon}
							title="Open requests"
						/>
						<div className="border-t">
							{client.requests.length ? (
								client.requests.map((request) => (
									<div className="grid gap-3 py-4 md:grid-cols-[1fr_auto]" key={request.title}>
										<div>
											<div className="font-semibold">{request.title}</div>
											<div className="mt-1 text-sm text-muted-foreground">
												Assigned to {request.owner} · Due {request.due} · Open 9 days
											</div>
										</div>
										<div className="flex flex-wrap items-center gap-2 md:justify-end">
											<Badge
												className={badgeToneClassName(request.status === "Blocked" ? "error" : "warning")}
												variant={badgeToneVariant(request.status === "Blocked" ? "error" : "warning")}
											>
												{request.status}
											</Badge>
											<Button size="sm" variant="outline">Reply</Button>
											<Button size="sm" variant="ghost">Resolve</Button>
										</div>
									</div>
								))
							) : (
								<div className="py-6 text-sm text-muted-foreground">
									No open requests.
								</div>
							)}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="deliverables">
					<section>
						<SectionHeader
							description="Upcoming launches, reviews, uploads, and handoffs."
							icon={CalendarDaysIcon}
							title="Deliverables"
						/>
						<div className="border-t">
							{client.deliverables.map((deliverable) => (
								<div className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 py-4" key={deliverable.title}>
									<div className="text-sm font-semibold text-muted-foreground">{deliverable.date}</div>
									<div className="min-w-0">
										<div className="truncate font-semibold">{deliverable.title}</div>
										<div className="mt-1 text-sm text-muted-foreground">
											{client.waitingOn === "No blockers" ? "Ready for delivery" : `Waiting on ${client.waitingOn.toLowerCase()}`}
										</div>
									</div>
									<Badge variant="outline">{deliverable.state}</Badge>
								</div>
							))}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="portal">
					<section>
						<SectionHeader
							description="Client visibility signals that reduce follow-up anxiety."
							icon={MousePointerSquareDashedIcon}
							title="Portal"
						/>
						<div className="grid gap-x-8 gap-y-4 border-t py-5 md:grid-cols-[minmax(0,1fr)_14rem_14rem]">
							<InlineMeta label="Latest visibility" value={client.portalActivity} />
							<InlineMeta label="Viewed this week" value={client.portalTone === "good" ? "Active" : "Low activity"} />
							<InlineMeta label="Most viewed" value={client.portalPages[0]?.label ?? "No portal pages"} />
						</div>
						<div className="mt-6 border-t">
							{client.portalPages.map((page) => (
								<div className="grid min-h-14 items-center gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_14rem_14rem]" key={page.label}>
									<div className="font-semibold">{page.label}</div>
									<div className="text-sm text-muted-foreground">{page.meta}</div>
									<div className="text-sm text-muted-foreground">{page.value}</div>
								</div>
							))}
							{client.portalPages.length === 0 ? (
								<div className="py-5 text-sm text-muted-foreground">No portal pages recorded.</div>
							) : null}
						</div>
					</section>
				</TabsContent>

				<TabsContent value="files">
					<section>
						<SectionHeader
							description="Assets, handoffs, and shared working files for the client."
							icon={FileTextIcon}
							title="Files"
						/>
						<div className="border-t">
							{client.files.map(({ name, updated, state }) => (
								<div className="grid gap-3 py-4 sm:grid-cols-[1fr_10rem_10rem]" key={name}>
									<div className="flex min-w-0 items-center gap-2">
										{name.endsWith(".zip") ? <UploadIcon className="size-4 text-muted-foreground" /> : <PaperclipIcon className="size-4 text-muted-foreground" />}
										<span className="truncate font-semibold">{name}</span>
									</div>
									<div className="text-sm text-muted-foreground">{updated}</div>
									<div className="text-sm text-muted-foreground">{state}</div>
								</div>
							))}
							{client.files.length === 0 ? (
								<div className="py-5 text-sm text-muted-foreground">No files recorded for this client.</div>
							) : null}
						</div>
					</section>
				</TabsContent>
			</Tabs>
		</div>
	);
}
