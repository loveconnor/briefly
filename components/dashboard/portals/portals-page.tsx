"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
	ArrowUpRightIcon,
	ArchiveIcon,
	BarChart3Icon,
	BookOpenIcon,
	CheckCircle2Icon,
	CopyIcon,
	EyeIcon,
	MessageSquareTextIcon,
	MoreHorizontalIcon,
	PanelsTopLeftIcon,
	SendIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { portalSummary, portals, type Portal, type PortalTone } from "./portals-data";

const toneStyles: Record<
	PortalTone,
	{
		text: string;
		dot: string;
	}
> = {
	healthy: {
		text: "text-success-foreground",
		dot: "bg-success-foreground",
	},
	attention: {
		text: "text-warning-foreground",
		dot: "bg-warning-foreground",
	},
	blocked: {
		text: "text-destructive-foreground",
		dot: "bg-destructive-foreground",
	},
};

export function PortalsPage() {
	const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
	const selectedPortal =
		portals.find((portal) => portal.id === selectedPortalId) ?? null;

	return (
		<div className="mx-auto w-full max-w-[1440px] space-y-7">
			<PortalHeader />

			<Tabs defaultValue="active" className="gap-4">
				<div className="flex justify-center">
					<TabsList
						className="w-fit text-muted-foreground/80"
						variant="underline"
					>
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="archived">Archived</TabsTrigger>
						<TabsTrigger value="templates">Templates</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="active">
					<>
						<main className="min-w-0">
							<div className="divide-y divide-border/35">
								{portals.map((portal) => (
									<PortalRow
										key={portal.id}
										onSelect={() => setSelectedPortalId(portal.id)}
										portal={portal}
									/>
								))}
							</div>
						</main>

						<PortalDetailsSheet
							onOpenChange={(open) => {
								if (!open) setSelectedPortalId(null);
							}}
							portal={selectedPortal}
						/>
					</>
				</TabsContent>

				<TabsContent value="archived">
					<PortalEmptyState
						action="Create portal"
						description="Archived portals will appear here after client-facing workspaces are closed out."
						icon={ArchiveIcon}
						secondaryAction="View active"
						title="No archived portals yet"
					/>
				</TabsContent>
				<TabsContent value="templates">
					<PortalEmptyState
						action="Create template"
						description="Save repeatable portal structures for approvals, handoffs, uploads, and client reviews."
						icon={PanelsTopLeftIcon}
						secondaryAction="Browse examples"
						title="No portal templates yet"
					/>
				</TabsContent>
				<TabsContent value="analytics">
					<PortalEmptyState
						action="Open active portals"
						description="Portal analytics will appear once clients start viewing, commenting, approving, and uploading."
						icon={BarChart3Icon}
						secondaryAction="Learn more"
						title="No portal analytics yet"
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}

function PortalHeader() {
	return (
		<header className="space-y-6 border-b border-border/80 pb-6">
			<div className="max-w-3xl">
				<h1 className="text-2xl font-bold tracking-tight">Portals</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					Client-facing workspaces, approvals, uploads, and visibility signals.
				</p>
			</div>
			<div className="flex flex-wrap gap-x-10 gap-y-4">
				{portalSummary.map((metric) => (
					<div className="min-w-24" key={metric.label}>
						<div className="text-xl font-semibold leading-none tracking-tight">
							{metric.value}
						</div>
						<div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
					</div>
				))}
			</div>
		</header>
	);
}

function PortalRow({
	onSelect,
	portal,
}: {
	onSelect: () => void;
	portal: Portal;
}) {
	const tone = toneStyles[portal.tone];

	return (
		<article className="group grid gap-5 px-2 py-4 transition-colors hover:bg-muted/18 sm:px-3 lg:grid-cols-[minmax(320px,1.35fr)_minmax(260px,0.95fr)_96px] lg:items-start">
			<button
				className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onSelect}
				type="button"
			>
				<div className="min-w-0 space-y-2.5">
					<div>
						<h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
							{portal.name}
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">{portal.project}</p>
					</div>

					<div className={cn("text-sm font-medium", tone.text)}>
						{portal.status}
					</div>

					<p className="text-sm text-foreground/80">{portal.statusDetail}</p>
				</div>
			</button>

			<button
				className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onSelect}
				type="button"
			>
				<div className="grid gap-3 text-sm sm:grid-cols-[minmax(0,1fr)_140px]">
					<div className="min-w-0">
						<div className="text-xs font-medium text-muted-foreground">Activity</div>
						<p className="mt-1 text-foreground/75">{portal.engagement}</p>
						<div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
							<span>{portal.visibility}</span>
							<span aria-hidden="true">/</span>
							<span>{portal.updated}</span>
						</div>
					</div>
					<div>
						<div className="text-xs font-medium text-muted-foreground">Engagement</div>
						<div className="mt-1 space-y-1 text-xs leading-5 text-muted-foreground">
							{portal.metrics.map((metric) => (
								<div key={metric}>{metric}</div>
							))}
						</div>
					</div>
				</div>
			</button>

			<div className="flex items-center gap-2 text-xs lg:justify-end">
				<button
					className="flex items-center gap-1.5 whitespace-nowrap font-medium text-foreground transition-colors hover:text-foreground/80"
					onClick={onSelect}
					type="button"
				>
					Open
					<ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</button>
				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label={`More actions for ${portal.name}`}
						className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<MoreHorizontalIcon className="size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-40">
						<DropdownMenuItem onClick={onSelect}>
							<ArrowUpRightIcon className="size-4" />
							Open portal
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<CopyIcon className="size-4" />
							Copy link
						</DropdownMenuItem>
						<DropdownMenuItem>
							<SendIcon className="size-4" />
							Share update
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onSelect}>
							<EyeIcon className="size-4" />
							View analytics
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</article>
	);
}

function PortalDetailsSheet({
	onOpenChange,
	portal,
}: {
	onOpenChange: (open: boolean) => void;
	portal: Portal | null;
}) {
	return (
		<Sheet onOpenChange={onOpenChange} open={Boolean(portal)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[440px] gap-0 overflow-y-auto p-7"
				side="right"
			>
				{portal ? <PortalDetails portal={portal} /> : null}
			</SheetContent>
		</Sheet>
	);
}

function PortalDetails({ portal }: { portal: Portal }) {
	const tone = toneStyles[portal.tone];

	return (
		<div className="flex min-h-full flex-col">
			<div className="space-y-7">
				<div>
					<SheetTitle className="pr-8 text-lg leading-6">
						{portal.activityTitle}
					</SheetTitle>
					<SheetDescription className="mt-2">
						{portal.project}
					</SheetDescription>
					<p className={cn("mt-2 text-sm font-medium", tone.text)}>
						{portal.status}
					</p>
				</div>

				<div className="space-y-3 border-t pt-6">
					<h3 className="text-sm font-semibold">Portal activity</h3>
					{portal.activity.map((item) => (
						<div className="flex gap-3 text-sm" key={item}>
							<span className={cn("size-1.5 rounded-full", tone.dot)} />
							<span className="text-muted-foreground">{item}</span>
						</div>
					))}
				</div>

				<div className="space-y-4 border-t pt-6 text-sm">
					<ActivityField
						icon={<MessageSquareTextIcon className="size-4" />}
						label="Latest action"
						value={portal.latestAction}
					/>
					<ActivityField
						icon={<CheckCircle2Icon className="size-4" />}
						label="Approval state"
						value={portal.approvalState}
					/>
					<ActivityField
						icon={<EyeIcon className="size-4" />}
						label="Visibility signal"
						value={portal.visibility}
					/>
				</div>
			</div>

			<div className="mt-auto pt-8">
				<div className="grid gap-2">
					<Button type="button">
						<ArrowUpRightIcon className="size-4" />
						Open portal
					</Button>
					<div className="grid grid-cols-2 gap-2">
						<Button type="button" variant="outline">
							<SendIcon className="size-4" />
							Share update
						</Button>
						<Button type="button" variant="outline">
							<CopyIcon className="size-4" />
							Copy link
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ActivityField({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex gap-3">
			<span className="mt-0.5 text-muted-foreground">{icon}</span>
			<div>
				<p className="text-xs font-medium text-muted-foreground">{label}</p>
				<p className="mt-1 text-foreground/90">{value}</p>
			</div>
		</div>
	);
}

function PortalEmptyState({
	action,
	description,
	icon: Icon,
	secondaryAction,
	title,
}: {
	action: string;
	description: string;
	icon: LucideIcon;
	secondaryAction: string;
	title: string;
}) {
	return (
		<div className="flex min-h-[460px] items-center justify-center">
			<Empty className="border-0 bg-transparent p-0">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon />
					</EmptyMedia>
					<EmptyTitle>{title}</EmptyTitle>
					<EmptyDescription>{description}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex flex-wrap justify-center gap-2">
						<Button size="sm" type="button">
							{action}
						</Button>
						<Button size="sm" type="button" variant="outline">
							<BookOpenIcon className="opacity-72" />
							{secondaryAction}
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
