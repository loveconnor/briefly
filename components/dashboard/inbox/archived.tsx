"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArchiveRestore, Clock3, Filter, Search, SlidersHorizontal } from "lucide-react";

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
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import type { ArchivedInboxItem } from "@/lib/app-data";

export function Archived({ archivedItems }: { archivedItems: ArchivedInboxItem[] }) {
	const archiveTypes = useMemo(() => [...new Set(archivedItems.map((item) => item.type))], [archivedItems]);
	const archiveProjects = useMemo(() => [...new Set(archivedItems.map((item) => item.project))], [archivedItems]);
	const [query, setQuery] = useState("");
	const [selectedTypes, setSelectedTypes] = useState(archiveTypes);
	const [selectedProjects, setSelectedProjects] = useState(archiveProjects);
	const [dateRange, setDateRange] = useState("30-days");
	const [archiveView, setArchiveView] = useState("recent");
	const [showRestoreActions, setShowRestoreActions] = useState(true);

	const visibleItems = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		const filtered = archivedItems.filter((item) => {
			const matchesQuery =
				!normalizedQuery ||
				[item.title, item.type, item.project, item.completed, item.owner]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);
			const matchesType = selectedTypes.includes(item.type);
			const matchesProject = selectedProjects.includes(item.project);
			const matchesDate =
				dateRange === "quarter" ||
				item.dateRange === dateRange ||
				(dateRange === "30-days" && item.dateRange === "7-days");

			return matchesQuery && matchesType && matchesProject && matchesDate;
		});

		if (archiveView === "client") {
			return [...filtered].sort((a, b) => a.project.localeCompare(b.project));
		}

		if (archiveView === "type") {
			return [...filtered].sort((a, b) => a.type.localeCompare(b.type));
		}

		return filtered;
	}, [archiveView, dateRange, query, selectedProjects, selectedTypes]);

	return (
		<div className="space-y-4">
			<header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Archived</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Resolved approvals, completed requests, and older operational records.
					</p>
				</div>
				<ViewOptions
					archiveView={archiveView}
					onArchiveViewChange={setArchiveView}
					onShowRestoreActionsChange={setShowRestoreActions}
					showRestoreActions={showRestoreActions}
				/>
			</header>

			<ArchiveToolbar
				archiveProjects={archiveProjects}
				archiveTypes={archiveTypes}
				dateRange={dateRange}
				onDateRangeChange={setDateRange}
				onProjectChange={setSelectedProjects}
				onQueryChange={setQuery}
				onTypeChange={setSelectedTypes}
				query={query}
				selectedProjects={selectedProjects}
				selectedTypes={selectedTypes}
			/>

			<section className="border-t border-border/60">
				<div className="py-4">
					<h2 className="font-semibold">Completed Items</h2>
					<p className="text-muted-foreground mt-1 text-sm">
						Search, filter, and restore completed operational records.
					</p>
				</div>
				<div className="divide-y divide-border/55">
					{visibleItems.map((item) => (
						<div
							key={`${item.title}-${item.completed}`}
							className="grid gap-3 py-4 md:grid-cols-[1fr_160px_140px_120px_auto] md:items-center"
						>
							<div className="min-w-0">
								<p className="font-medium leading-5">{item.title}</p>
								<p className="text-muted-foreground mt-1 text-sm">{item.project}</p>
							</div>
							<Badge className="w-fit" variant="secondary">{item.type}</Badge>
							<p className="text-muted-foreground text-sm">{item.completed}</p>
							<p className="text-muted-foreground text-sm">{item.owner}</p>
							{showRestoreActions ? (
								<TextAction>
									<ArchiveRestore />
									<span>Restore</span>
								</TextAction>
							) : null}
						</div>
					))}
					{visibleItems.length === 0 ? (
						<p className="text-muted-foreground py-5 text-sm">No archived items match the current search and filters.</p>
					) : null}
				</div>
			</section>
		</div>
	);
}

function TextAction({ children }: { children: ReactNode }) {
	return (
		<button
			aria-label="Restore"
			className="text-muted-foreground inline-flex min-h-7 items-center gap-1.5 rounded-md px-2 text-sm transition-colors hover:bg-accent/70 hover:text-foreground [&_svg]:size-3.5"
			type="button"
		>
			{children}
		</button>
	);
}

function ArchiveToolbar({
	archiveProjects,
	archiveTypes,
	dateRange,
	onDateRangeChange,
	onProjectChange,
	onQueryChange,
	onTypeChange,
	query,
	selectedProjects,
	selectedTypes,
}: {
	archiveProjects: string[];
	archiveTypes: string[];
	dateRange: string;
	onDateRangeChange: (value: string) => void;
	onProjectChange: (items: string[]) => void;
	onQueryChange: (value: string) => void;
	onTypeChange: (items: string[]) => void;
	query: string;
	selectedProjects: string[];
	selectedTypes: string[];
}) {
	return (
		<div className="flex flex-col gap-3 md:flex-row md:items-center">
			<Field className="min-w-0 flex-1">
				<InputGroup>
					<InputGroupAddon>
						<Search />
					</InputGroupAddon>
					<InputGroupInput
					onChange={(event) => onQueryChange(event.currentTarget.value)}
					placeholder="Search archive"
					type="search"
					value={query}
				/>
				</InputGroup>
			</Field>
			<div className="grid grid-cols-2 gap-2 sm:flex">
				<FilterMenu label="Type" items={archiveTypes} onChange={onTypeChange} selectedItems={selectedTypes} />
				<FilterMenu label="Project" items={archiveProjects} onChange={onProjectChange} selectedItems={selectedProjects} />
				<DateMenu onChange={onDateRangeChange} value={dateRange} />
			</div>
		</div>
	);
}

function ViewOptions({
	archiveView,
	onArchiveViewChange,
	onShowRestoreActionsChange,
	showRestoreActions,
}: {
	archiveView: string;
	onArchiveViewChange: (value: string) => void;
	onShowRestoreActionsChange: (value: boolean) => void;
	showRestoreActions: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }))}>
				<SlidersHorizontal />
				View options
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Archive view</DropdownMenuLabel>
					<DropdownMenuRadioGroup onValueChange={onArchiveViewChange} value={archiveView}>
						<DropdownMenuRadioItem value="recent">Recently archived</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="client">Group by client</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="type">Group by type</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked={showRestoreActions} onCheckedChange={onShowRestoreActionsChange}>
					Show restore actions
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
			<DropdownMenuContent className="w-44">
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
					<DropdownMenuRadioItem value="7-days">Last 7 days</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="30-days">Last 30 days</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="quarter">This quarter</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
