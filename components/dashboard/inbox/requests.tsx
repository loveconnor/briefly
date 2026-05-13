"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
	CheckCircle2,
	Paperclip,
	Reply,
	Search,
	SlidersHorizontal,
	UserPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { badgeToneClassName, badgeToneVariant, type BadgeTone } from "@/components/dashboard/badge-tone";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { InboxRequestItem } from "@/lib/app-data";

export function Requests({
	currentUserName,
	requestItems,
}: {
	currentUserName: string;
	requestItems: InboxRequestItem[];
}) {
	const statuses = useMemo(() => [...new Set(requestItems.map((item) => item.status))], [requestItems]);
	const [query, setQuery] = useState("");
	const [selectedStatuses, setSelectedStatuses] = useState(statuses);
	const [conversationView, setConversationView] = useState("open");
	const [showReplyBoxes, setShowReplyBoxes] = useState(false);
	const [showResolvedActions, setShowResolvedActions] = useState(true);
	const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

	const visibleRequests = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return requestItems.filter((item) => {
			const matchesQuery =
				!normalizedQuery ||
				[item.title, item.from, item.project, item.detail, item.status, item.assignedTo]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);
			const matchesStatus = selectedStatuses.includes(item.status);
			const assignedToCurrentUser =
				item.assignedTo === currentUserName || item.assignedTo === "Workspace owner";
			const matchesView =
				conversationView === "open" ||
				(conversationView === "mine" && assignedToCurrentUser) ||
				(conversationView === "client" && item.status === "Client");

			return matchesQuery && matchesStatus && matchesView;
		});
	}, [conversationView, currentUserName, query, requestItems, selectedStatuses]);

	const clientRequestCount = visibleRequests.filter((item) => item.status === "Client").length;
	const assetsNeededCount = visibleRequests.filter((item) => item.status === "Assets").length;
	const assignedToMeCount = visibleRequests.filter(
		(item) => item.assignedTo === currentUserName || item.assignedTo === "Workspace owner"
	).length;

	return (
		<div className="space-y-4">
			<header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Requests</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Open-ended client and team asks that need a response or next action.
					</p>
				</div>
				<ViewOptions
					conversationView={conversationView}
					onConversationViewChange={setConversationView}
					onShowReplyBoxesChange={setShowReplyBoxes}
					onShowResolvedActionsChange={setShowResolvedActions}
					showReplyBoxes={showReplyBoxes}
					showResolvedActions={showResolvedActions}
				/>
			</header>

			<div className="grid gap-8 xl:grid-cols-[1fr_300px]">
				<section className="space-y-4">
					<RequestToolbar
						onQueryChange={setQuery}
						onStatusChange={setSelectedStatuses}
						query={query}
						selectedStatuses={selectedStatuses}
						statuses={statuses}
					/>
					<div className="divide-y divide-border/55 border-t border-border/60">
						{visibleRequests.map((item) => {
							const replyOpen = showReplyBoxes || expandedReplies[item.title];

							return (
								<article key={item.title} className="group py-4">
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div>
											<h2 className="font-semibold">{item.title}</h2>
											<p className="text-muted-foreground mt-1 text-sm">
												{item.from} · {item.project}
											</p>
										</div>
										<div className="text-muted-foreground/75 flex items-center gap-1.5 text-xs">
											<span>{item.status}</span>
											<span aria-hidden="true">·</span>
											<span>{item.time}</span>
										</div>
									</div>
									<div className="mt-3 space-y-3">
										<p className="text-sm leading-6">{item.detail}</p>
										{replyOpen ? <Textarea placeholder="Reply to client" /> : null}
										<div className="flex flex-wrap items-center gap-1">
											<TextAction
												onClick={() =>
													setExpandedReplies((current) => ({
														...current,
														[item.title]: !current[item.title],
													}))
												}
											>
												<Reply />
												{replyOpen ? "Close reply" : "Reply"}
											</TextAction>
											<span className="flex flex-wrap items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
												<TextAction>
													<Paperclip />
													Attach file
												</TextAction>
												<TextAction>
													<UserPlus />
													Assign
												</TextAction>
												{showResolvedActions ? (
													<TextAction>
														<CheckCircle2 />
														Resolve
													</TextAction>
												) : null}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</div>
					{visibleRequests.length === 0 ? (
						<DashboardEmptyState
							className="my-5"
							description="Adjust the search or filters to include more requests."
							title="No requests match the current search and filters"
						/>
					) : null}
				</section>

				<aside className="h-fit xl:pt-12">
					<h2 className="font-semibold">Request Types</h2>
					<p className="text-muted-foreground mt-1 text-sm">Open work that needs a human response.</p>
					<div className="mt-4 divide-y divide-border/55 border-t border-border/60">
						<QueueMetric label="Client requests" value={String(clientRequestCount)} variant="info" />
						<QueueMetric label="Assets needed" value={String(assetsNeededCount)} variant="warning" />
						<QueueMetric label="Assigned to me" value={String(assignedToMeCount)} variant="default" />
					</div>
				</aside>
			</div>
		</div>
	);
}

function TextAction({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: () => void;
}) {
	return (
		<button
			className="text-muted-foreground inline-flex min-h-7 items-center gap-1.5 rounded-md px-2 text-sm transition-colors hover:bg-accent/70 hover:text-foreground [&_svg]:size-3.5"
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function RequestToolbar({
	onQueryChange,
	onStatusChange,
	query,
	selectedStatuses,
	statuses,
}: {
	onQueryChange: (value: string) => void;
	onStatusChange: (items: string[]) => void;
	query: string;
	selectedStatuses: string[];
	statuses: string[];
}) {
	const toggleStatus = (status: string, checked: boolean) => {
		onStatusChange(
			checked
				? [...selectedStatuses, status]
				: selectedStatuses.filter((selected) => selected !== status)
		);
	};

	return (
		<div className="flex flex-col gap-3 md:flex-row md:items-center">
			<Field className="min-w-0 flex-1">
				<InputGroup>
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
					<InputGroupInput
					onChange={(event) => onQueryChange(event.currentTarget.value)}
					placeholder="Search requests"
					type="search"
					value={query}
				/>
				</InputGroup>
			</Field>
			<DropdownMenu>
				<DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
					Status
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-44">
					{statuses.map((status) => (
						<DropdownMenuCheckboxItem
							key={status}
							checked={selectedStatuses.includes(status)}
							onCheckedChange={(checked) => toggleStatus(status, checked)}
						>
							{status}
						</DropdownMenuCheckboxItem>
					))}
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => onStatusChange(statuses)}>Reset status</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ViewOptions({
	conversationView,
	onConversationViewChange,
	onShowReplyBoxesChange,
	onShowResolvedActionsChange,
	showReplyBoxes,
	showResolvedActions,
}: {
	conversationView: string;
	onConversationViewChange: (value: string) => void;
	onShowReplyBoxesChange: (value: boolean) => void;
	onShowResolvedActionsChange: (value: boolean) => void;
	showReplyBoxes: boolean;
	showResolvedActions: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }))}>
				<SlidersHorizontal />
				View options
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-52">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Conversation view</DropdownMenuLabel>
					<DropdownMenuRadioGroup onValueChange={onConversationViewChange} value={conversationView}>
						<DropdownMenuRadioItem value="open">Open requests</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="mine">Assigned to me</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="client">Client asks</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showReplyBoxes} onCheckedChange={onShowReplyBoxesChange}>
					Show reply boxes
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={showResolvedActions} onCheckedChange={onShowResolvedActionsChange}>
					Show resolved actions
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function QueueMetric({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant: Extract<BadgeTone, "default" | "info" | "warning">;
}) {
	return (
		<div className="flex items-center justify-between py-3">
			<span className="text-sm font-medium">{label}</span>
			<Badge className={badgeToneClassName(variant)} variant={badgeToneVariant(variant)}>
				{value}
			</Badge>
		</div>
	);
}
