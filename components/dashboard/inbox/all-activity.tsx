"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
	CheckCircle2,
	Clock3,
	FileUp,
	Filter,
	GitPullRequestArrow,
	MessageSquareText,
	Search,
	Send,
	Share2,
	SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const activityItems = [
	{
		icon: CheckCircle2,
		title: "Homepage approved by Acme",
		detail: "Approval recorded and the homepage build phase opened.",
		client: "Acme",
		project: "Website Redesign",
		type: "Approval",
		time: "9:42 AM",
		dateRange: "today",
		tone: "success",
	},
	{
		icon: FileUp,
		title: "Nova uploaded branding assets",
		detail: "Logo files, brand colors, and type guidelines are ready.",
		client: "Nova",
		project: "Brand Refresh",
		type: "Upload",
		time: "9:18 AM",
		dateRange: "today",
		tone: "info",
	},
	{
		icon: Send,
		title: "Weekly update sent to Brightside",
		detail: "Included milestones, open questions, and Friday targets.",
		client: "Brightside",
		project: "Landing Page",
		type: "Update",
		time: "8:36 AM",
		dateRange: "today",
		tone: "default",
	},
	{
		icon: GitPullRequestArrow,
		title: "Landing page moved to QA",
		detail: "Internal review is complete and QA signoff is pending.",
		client: "Brightside",
		project: "Landing Page",
		type: "Phase",
		time: "Yesterday",
		dateRange: "week",
		tone: "warning",
	},
	{
		icon: MessageSquareText,
		title: "Northstar requested homepage revisions",
		detail: "Client left comments on the pricing and testimonials sections.",
		client: "Northstar",
		project: "Website Redesign",
		type: "Request",
		time: "Yesterday",
		dateRange: "week",
		tone: "error",
	},
	{
		icon: Share2,
		title: "Portal shared with Luma Works",
		detail: "Client portal invitation sent to the primary stakeholder.",
		client: "Luma Works",
		project: "Client Portal",
		type: "System",
		time: "Mon",
		dateRange: "month",
		tone: "default",
	},
];

const toneClassMap = {
	default: "bg-muted text-muted-foreground",
	error: "bg-destructive/8 text-destructive-foreground",
	info: "bg-info/8 text-info-foreground",
	success: "bg-success/8 text-success-foreground",
	warning: "bg-warning/8 text-warning-foreground",
};

const clients = [...new Set(activityItems.map((item) => item.client))];
const projects = [...new Set(activityItems.map((item) => item.project))];
const types = [...new Set(activityItems.map((item) => item.type))];

export function AllActivity() {
	const [query, setQuery] = useState("");
	const [selectedClients, setSelectedClients] = useState(clients);
	const [selectedProjects, setSelectedProjects] = useState(projects);
	const [selectedTypes, setSelectedTypes] = useState(types);
	const [dateRange, setDateRange] = useState("month");
	const [density, setDensity] = useState("comfortable");
	const [showQuickActions, setShowQuickActions] = useState(true);
	const [showProjectLabels, setShowProjectLabels] = useState(true);

	const filteredItems = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return activityItems.filter((item) => {
			const matchesQuery =
				!normalizedQuery ||
				[item.title, item.detail, item.client, item.project, item.type]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);
			const matchesClient = selectedClients.includes(item.client);
			const matchesProject = selectedProjects.includes(item.project);
			const matchesType = selectedTypes.includes(item.type);
			const matchesDate =
				dateRange === "custom" ||
				item.dateRange === dateRange ||
				(dateRange === "week" && item.dateRange === "today") ||
				(dateRange === "month" && ["today", "week", "month"].includes(item.dateRange));

			return matchesQuery && matchesClient && matchesProject && matchesType && matchesDate;
		});
	}, [dateRange, query, selectedClients, selectedProjects, selectedTypes]);

	return (
		<div className="space-y-4">
			<header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">All Activity</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Complete operational timeline across clients, projects, and delivery work.
					</p>
				</div>
				<ViewOptions
					density={density}
					onDensityChange={setDensity}
					onShowProjectLabelsChange={setShowProjectLabels}
					onShowQuickActionsChange={setShowQuickActions}
					showProjectLabels={showProjectLabels}
					showQuickActions={showQuickActions}
				/>
			</header>

			<ActivityToolbar
				dateRange={dateRange}
				onClientChange={setSelectedClients}
				onDateRangeChange={setDateRange}
				onProjectChange={setSelectedProjects}
				onQueryChange={setQuery}
				onTypeChange={setSelectedTypes}
				query={query}
				selectedClients={selectedClients}
				selectedProjects={selectedProjects}
				selectedTypes={selectedTypes}
			/>

			<section className="border-t border-border/60">
				<div className="py-3.5">
					<h2 className="font-semibold">Today</h2>
					<p className="text-muted-foreground mt-1 text-sm">
						Chronological stream of client, internal, and system activity.
					</p>
				</div>
				<div className="relative before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-border/45">
					{filteredItems.map((item) => {
						const Icon = item.icon;

						return (
							<div
								key={item.title}
								className={cn(
									"group relative flex gap-4 rounded-lg py-1 transition-colors hover:bg-muted/35",
									density === "compact" ? "pb-3" : "pb-5"
								)}
							>
								<div
									className={cn(
										"z-10 flex size-8 shrink-0 items-center justify-center rounded-md ring-4 ring-background",
										toneClassMap[item.tone as keyof typeof toneClassMap]
									)}
								>
									<Icon className="size-4" />
								</div>
								<div className="min-w-0 flex-1">
									<p className="font-medium leading-5">
										{item.title}
										<span className="text-muted-foreground ml-2 text-sm font-normal">
											{item.time}
										</span>
									</p>
									<p className="text-muted-foreground mt-0.5 text-sm">{item.detail}</p>
									{showProjectLabels ? (
										<div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-2 text-sm">
											<span>{item.client}</span>
											<span aria-hidden="true">·</span>
											<span>{item.project}</span>
											<Badge className="ml-1" variant={item.tone === "default" ? "outline" : item.tone as "error" | "info" | "success" | "warning"}>
												{item.type}
											</Badge>
										</div>
									) : null}
									{showQuickActions ? (
										<div className="text-muted-foreground mt-2.5 flex flex-wrap items-center gap-2 text-sm">
											<TextAction>Open project</TextAction>
											<span aria-hidden="true">·</span>
											<TextAction>Reply</TextAction>
											<span aria-hidden="true">·</span>
											<TextAction>Complete</TextAction>
										</div>
									) : null}
								</div>
							</div>
						);
					})}
					{filteredItems.length === 0 ? (
						<p className="text-muted-foreground text-sm">No activity matches the current filters.</p>
					) : null}
				</div>
			</section>
		</div>
	);
}

function TextAction({ children }: { children: ReactNode }) {
	return (
		<button className="text-foreground/80 underline-offset-4 hover:text-foreground hover:underline" type="button">
			{children}
		</button>
	);
}

function ActivityToolbar({
	dateRange,
	onClientChange,
	onDateRangeChange,
	onProjectChange,
	onQueryChange,
	onTypeChange,
	query,
	selectedClients,
	selectedProjects,
	selectedTypes,
}: {
	dateRange: string;
	onClientChange: (items: string[]) => void;
	onDateRangeChange: (value: string) => void;
	onProjectChange: (items: string[]) => void;
	onQueryChange: (value: string) => void;
	onTypeChange: (items: string[]) => void;
	query: string;
	selectedClients: string[];
	selectedProjects: string[];
	selectedTypes: string[];
}) {
	return (
		<div className="flex flex-col gap-3 md:flex-row md:items-center">
			<div className="relative min-w-0 flex-1">
				<Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
				<Input
					className="[&_[data-slot=input]]:pl-9"
					onChange={(event) => onQueryChange(event.currentTarget.value)}
					placeholder="Search activity"
					type="search"
					value={query}
				/>
			</div>
			<div className="grid grid-cols-2 gap-2 sm:flex">
				<FilterMenu label="Client" items={clients} onChange={onClientChange} selectedItems={selectedClients} />
				<FilterMenu label="Project" items={projects} onChange={onProjectChange} selectedItems={selectedProjects} />
				<FilterMenu label="Type" items={types} onChange={onTypeChange} selectedItems={selectedTypes} />
				<DateMenu onChange={onDateRangeChange} value={dateRange} />
			</div>
		</div>
	);
}

function ViewOptions({
	density,
	onDensityChange,
	onShowProjectLabelsChange,
	onShowQuickActionsChange,
	showProjectLabels,
	showQuickActions,
}: {
	density: string;
	onDensityChange: (value: string) => void;
	onShowProjectLabelsChange: (value: boolean) => void;
	onShowQuickActionsChange: (value: boolean) => void;
	showProjectLabels: boolean;
	showQuickActions: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }))}>
				<SlidersHorizontal />
				View options
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Timeline density</DropdownMenuLabel>
					<DropdownMenuRadioGroup onValueChange={onDensityChange} value={density}>
						<DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showQuickActions} onCheckedChange={onShowQuickActionsChange}>
					Show quick actions
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={showProjectLabels} onCheckedChange={onShowProjectLabelsChange}>
					Show project labels
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function FilterMenu({
	items,
	label,
	onChange,
	selectedItems,
}: {
	items: string[];
	label: string;
	onChange: (items: string[]) => void;
	selectedItems: string[];
}) {
	const toggleItem = (item: string, checked: boolean) => {
		onChange(checked ? [...selectedItems, item] : selectedItems.filter((selected) => selected !== item));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
				<Filter />
				{label}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{label}</DropdownMenuLabel>
					{items.map((item) => (
						<DropdownMenuCheckboxItem
							key={item}
							checked={selectedItems.includes(item)}
							onCheckedChange={(checked) => toggleItem(item, checked)}
						>
							{item}
						</DropdownMenuCheckboxItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onChange(items)}>Reset {label.toLowerCase()}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function DateMenu({ onChange, value }: { onChange: (value: string) => void; value: string }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
				<Clock3 />
				Date
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40">
				<DropdownMenuRadioGroup onValueChange={onChange} value={value}>
					<DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="week">This week</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="month">This month</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="custom">Custom range</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
