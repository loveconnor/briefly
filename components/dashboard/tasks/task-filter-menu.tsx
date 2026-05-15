import { CheckIcon, FilterIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { priorityItems, statusItems, type TaskSourceFilter } from "./tasks-constants";
import type { TaskPriority, TaskStatus } from "./tasks-data";

export function TaskFilterMenu({
	onPriorityChange,
	onSourceChange,
	onStatusChange,
	priority,
	source,
	status,
}: {
	onPriorityChange: (priority: TaskPriority | "all") => void;
	onSourceChange: (source: TaskSourceFilter) => void;
	onStatusChange: (status: TaskStatus | "all") => void;
	priority: TaskPriority | "all";
	source: TaskSourceFilter;
	status: TaskStatus | "all";
}) {
	const activeFilterCount = [
		status !== "all",
		priority !== "all",
		source !== "all",
	].filter(Boolean).length;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant={activeFilterCount ? "secondary" : "ghost"}>
						<FilterIcon className="size-4" />
						Filters
						{activeFilterCount ? <Badge variant="outline">{activeFilterCount}</Badge> : null}
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>Status</DropdownMenuLabel>
				<FilterMenuItem
					active={status === "all"}
					label="Any status"
					onClick={() => onStatusChange("all")}
				/>
				{statusItems.map((item) => (
					<FilterMenuItem
						active={status === item}
						key={item}
						label={item}
						onClick={() => onStatusChange(item)}
					/>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Priority</DropdownMenuLabel>
				<FilterMenuItem
					active={priority === "all"}
					label="Any priority"
					onClick={() => onPriorityChange("all")}
				/>
				{priorityItems.map((item) => (
					<FilterMenuItem
						active={priority === item}
						key={item}
						label={item}
						onClick={() => onPriorityChange(item)}
					/>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Source</DropdownMenuLabel>
				<FilterMenuItem
					active={source === "all"}
					label="Any source"
					onClick={() => onSourceChange("all")}
				/>
				<FilterMenuItem
					active={source === "user"}
					label="Created by user"
					onClick={() => onSourceChange("user")}
				/>
				<FilterMenuItem
					active={source === "client"}
					label="Client-created"
					onClick={() => onSourceChange("client")}
				/>
				<FilterMenuItem
					active={source === "system"}
					label="System-created"
					onClick={() => onSourceChange("system")}
				/>
				{activeFilterCount ? (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								onStatusChange("all");
								onPriorityChange("all");
								onSourceChange("all");
							}}
						>
							Clear filters
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function FilterMenuItem({
	active,
	label,
	onClick,
}: {
	active: boolean;
	label: string;
	onClick: () => void;
}) {
	return (
		<DropdownMenuItem className="justify-between" onClick={onClick}>
			{label}
			{active ? <CheckIcon className="size-4" /> : null}
		</DropdownMenuItem>
	);
}
