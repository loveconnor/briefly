"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
	ArrowUpDownIcon,
	CalendarDaysIcon,
	CheckCircle2Icon,
	Grid3X3Icon,
	ListFilterIcon,
	ListIcon,
	MessageSquareTextIcon,
	PauseCircleIcon,
	SearchIcon,
	AlertTriangleIcon,
	Clock3Icon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { badgeToneClassName, badgeToneVariant, type BadgeTone, type BadgeVariant } from "@/components/dashboard/badge-tone";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
	clientStatusOptions,
	type ClientHealth,
	type ClientRecord,
	type ClientStatus,
} from "./client-data";

const healthStyles: Record<ClientHealth, string> = {
	Healthy: "border-success/24 bg-success/8 text-success-foreground",
	"Needs attention": "border-info/24 bg-info/8 text-info-foreground",
	"At risk": "border-warning/28 bg-warning/10 text-warning-foreground",
	Blocked: "border-destructive/24 bg-destructive/8 text-destructive-foreground",
};

const healthAccentStyles: Record<ClientHealth, string> = {
	Healthy: "border-success text-success-foreground",
	"Needs attention": "border-info text-info-foreground",
	"At risk": "border-warning text-warning-foreground",
	Blocked: "border-destructive text-destructive-foreground",
};

const statusStyles: Record<ClientStatus, BadgeTone | "secondary"> = {
	Active: "success",
	Waiting: "warning",
	Blocked: "error",
	Paused: "secondary",
	Completed: "info",
	Archived: "default",
};

const statusIcons: Record<ClientStatus, LucideIcon> = {
	Active: CheckCircle2Icon,
	Waiting: Clock3Icon,
	Blocked: AlertTriangleIcon,
	Paused: PauseCircleIcon,
	Completed: CheckCircle2Icon,
	Archived: CheckCircle2Icon,
};

function getStatusBadgeProps(status: ClientStatus, className?: string): {
	className?: string;
	variant: BadgeVariant;
} {
	const tone = statusStyles[status];

	return tone === "secondary"
		? { className, variant: "secondary" }
		: {
				className: badgeToneClassName(tone, className),
				variant: badgeToneVariant(tone),
			};
}

const statusItems = clientStatusOptions.map((option) => ({
	label: option,
	value: option,
}));

const sortItems = [
	{ label: "Attention first", value: "attention" },
	{ label: "Name", value: "name" },
	{ label: "Active projects", value: "projects" },
	{ label: "Last activity", value: "activity" },
];

function InlineStat({
	label,
	value,
	tone,
}: {
	label: string;
	value: string;
	tone?: "good" | "warning" | "danger";
}) {
	return (
		<div className="min-w-0">
			<div
				className={cn(
					"text-xl font-semibold leading-none tabular-nums",
					tone === "good" && "text-success-foreground",
					tone === "warning" && "text-warning-foreground",
					tone === "danger" && "text-destructive-foreground"
				)}
			>
				{value}
			</div>
			<div className="mt-1 text-xs font-medium text-muted-foreground">{label}</div>
		</div>
	);
}

function ClientCard({ client }: { client: ClientRecord }) {
	const StatusIcon = statusIcons[client.status];
	const projectText =
		client.activeProjects === 0
			? "No active projects"
			: `${client.activeProjects} active ${client.activeProjects === 1 ? "project" : "projects"}`;

	return (
		<Link
			aria-label={`Open ${client.name}`}
			className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
			href={`/dashboard/clients/${client.slug}`}
		>
			<Card className="gap-4 rounded-lg py-5 transition-[background-color,box-shadow,transform] group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-foreground/8">
				<CardHeader className="px-5">
					<div className="flex min-w-0 items-center gap-3">
						<Avatar className="size-10 rounded-lg border">
							<AvatarFallback className="rounded-lg bg-accent text-sm">
								{client.initials}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<CardTitle className="truncate text-base">{client.name}</CardTitle>
							<CardDescription className="mt-1 flex min-w-0 items-center gap-1.5">
								<StatusIcon className="size-3.5 shrink-0" />
								<span className="truncate">
									{projectText} · Last active {client.lastActivity}
								</span>
							</CardDescription>
						</div>
					</div>
					<CardAction>
						<Badge {...getStatusBadgeProps(client.status)}>{client.status}</Badge>
					</CardAction>
				</CardHeader>
				<CardPanel className="space-y-4 px-5">
					<div className={cn("border-l-2 pl-3", healthAccentStyles[client.health])}>
						<div className="text-xs font-semibold uppercase tracking-normal">
							{client.health}
						</div>
						<div className="mt-1 max-w-xl text-sm leading-6 text-foreground">
							{client.healthDetail}
						</div>
					</div>
					<div className="flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-sm text-muted-foreground">
						<span className="text-foreground">Next: {client.nextDeliverable}</span>
						<span>{client.portalActivity}</span>
					</div>
				</CardPanel>
			</Card>
		</Link>
	);
}

export function ClientsBoard({ clients }: { clients: ClientRecord[] }) {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState<ClientStatus | "All">("All");
	const [sort, setSort] = useState("attention");
	const [view, setView] = useState("grid");

	const visibleClients = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		const healthOrder: Record<ClientHealth, number> = {
			Blocked: 0,
			"At risk": 1,
			"Needs attention": 2,
			Healthy: 3,
		};

		return clients
			.filter((client) => {
				const matchesQuery =
					!normalizedQuery ||
					client.name.toLowerCase().includes(normalizedQuery) ||
					client.waitingOn.toLowerCase().includes(normalizedQuery) ||
					client.nextDeliverable.toLowerCase().includes(normalizedQuery);
				const matchesStatus = status === "All" || client.status === status;

				return matchesQuery && matchesStatus;
			})
			.sort((a, b) => {
				if (sort === "name") return a.name.localeCompare(b.name);
				if (sort === "projects") return b.activeProjects - a.activeProjects;
				if (sort === "activity") return a.lastActivity.localeCompare(b.lastActivity);
				return healthOrder[a.health] - healthOrder[b.health];
			});
	}, [query, sort, status]);

	const counts = {
		active: clients.filter((client) => client.status === "Active").length,
		blocked: clients.filter((client) => client.status === "Blocked").length,
		waiting: clients.filter((client) => client.status === "Waiting").length,
		attention: clients.filter((client) => client.health !== "Healthy").length,
	};

	return (
		<div className="space-y-7">
			<div className="flex flex-wrap gap-x-8 gap-y-4 border-b pb-5">
				<InlineStat label="Active clients" tone="good" value={`${counts.active}`} />
				<InlineStat label="Need attention" tone="warning" value={`${counts.attention}`} />
				<InlineStat label="Waiting" tone="warning" value={`${counts.waiting}`} />
				<InlineStat label="Blocked" tone="danger" value={`${counts.blocked}`} />
			</div>

			<div className="flex flex-col gap-3 md:flex-row md:items-center">
				<Field className="min-w-0 flex-1">
					<InputGroup>
						<InputGroupAddon>
							<SearchIcon />
						</InputGroupAddon>
						<InputGroupInput
						aria-label="Search clients"
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search clients..."
						type="search"
						value={query}
					/>
					</InputGroup>
				</Field>
				<div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:flex">
					<Field className="md:w-36">
						<Select
							items={statusItems}
							onValueChange={(value) => value != null && setStatus(value as ClientStatus | "All")}
							value={status}
						>
							<SelectTrigger aria-label="Filter by status" className="w-full">
								<ListFilterIcon className="size-4 text-muted-foreground" />
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								<SelectGroup>
									{statusItems.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
					<Field className="md:w-44">
						<Select
							items={sortItems}
							onValueChange={(value) => value != null && setSort(value)}
							value={sort}
						>
							<SelectTrigger aria-label="Sort clients" className="w-full">
								<ArrowUpDownIcon className="size-4 text-muted-foreground" />
								<SelectValue />
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								<SelectGroup>
									{sortItems.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
					<ToggleGroup
						aria-label="View options"
						onValueChange={(value) => value[0] && setView(value[0])}
						value={[view]}
					>
						<ToggleGroupItem aria-label="Grid view" value="grid">
							<Grid3X3Icon />
						</ToggleGroupItem>
						<ToggleGroupItem aria-label="List view" value="list">
							<ListIcon />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>

			{visibleClients.length ? (
				view === "grid" ? (
					<div className="grid gap-4 xl:grid-cols-2 3xl:grid-cols-3">
						{visibleClients.map((client) => (
							<ClientCard client={client} key={client.slug} />
						))}
					</div>
				) : (
					<div className="border-y">
						{visibleClients.map((client) => (
							<Link
								className="grid gap-3 border-b py-4 transition-colors last:border-b-0 hover:bg-accent/40 md:grid-cols-[1.3fr_.8fr_1fr_1fr_auto]"
								href={`/dashboard/clients/${client.slug}`}
								key={client.slug}
							>
								<div className="flex min-w-0 items-center gap-3">
									<Avatar className="size-9 rounded-lg border">
										<AvatarFallback className="rounded-lg bg-accent">
											{client.initials}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0">
										<div className="truncate font-semibold">{client.name}</div>
										<div className="text-sm text-muted-foreground">
											{client.activeProjects} active projects
										</div>
									</div>
								</div>
								<Badge {...getStatusBadgeProps(client.status, "w-fit self-center")}>
									{client.status}
								</Badge>
								<div className="min-w-0 self-center text-sm">
									<span className="text-muted-foreground">Waiting on: </span>
									<span className="font-medium">{client.waitingOn}</span>
								</div>
								<div className="min-w-0 self-center text-sm">
									<span className="text-muted-foreground">Portal: </span>
									<span className="font-medium">{client.portalActivity}</span>
								</div>
								<div className="self-center text-sm text-muted-foreground">
									{client.lastActivity}
								</div>
							</Link>
						))}
					</div>
				)
			) : (
				<div className="border-y py-10 text-center">
					<MessageSquareTextIcon className="mx-auto size-8 text-muted-foreground" />
					<h2 className="mt-3 text-lg font-semibold">No clients match this view</h2>
					<p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
						Adjust search or filters to return relationship status, blockers, and portal activity.
					</p>
				</div>
			)}

			<div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
				<section>
					<div className="mb-3">
						<h2 className="flex items-center gap-2 text-base font-semibold">
							<CalendarDaysIcon className="size-4" />
							Upcoming deliverables
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Work that will change client state soon.
						</p>
					</div>
					<div className="border-y">
						{clients.slice(0, 4).map((client, index) => {
							const [deliverable, date] = client.nextDeliverable.split(" · ");

							return (
								<div
									className="grid min-h-24 grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b py-3 last:border-b-0"
									key={client.slug}
								>
									<div className="text-xs font-medium text-muted-foreground">
										{date ?? `Item ${index + 1}`}
									</div>
									<div className="min-w-0">
										<div className="truncate text-sm font-semibold">{deliverable}</div>
										<div className="text-xs text-muted-foreground">{client.name}</div>
									</div>
									<Badge {...getStatusBadgeProps(client.status)}>{client.status}</Badge>
								</div>
							);
						})}
					</div>
				</section>
				<section>
					<div className="mb-3">
						<h2 className="flex items-center gap-2 text-base font-semibold">
							<MessageSquareTextIcon className="size-4" />
							Response watchlist
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Relationships where visibility or replies are slipping.
						</p>
					</div>
					<div className="border-y">
						{clients
							.filter((client) => client.health !== "Healthy")
							.map((client) => (
								<div
									className="flex min-h-24 flex-col justify-center border-b py-3 last:border-b-0"
									key={client.slug}
								>
									<div className="flex items-center justify-between gap-3">
										<div className="font-semibold">{client.name}</div>
										<Badge className={healthStyles[client.health]} variant="outline">
											{client.health}
										</Badge>
									</div>
									<div className="mt-1 text-sm text-muted-foreground">{client.healthDetail}</div>
								</div>
							))}
					</div>
				</section>
			</div>
		</div>
	);
}
