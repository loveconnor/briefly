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

import {
	dueFilterItems,
	priorityItems,
	statusItems,
	workflowFilterItems,
	type TaskDueFilter,
	type TaskSourceFilter,
	type TaskWorkflowFilter,
} from "./tasks-constants";
import type { TaskPriority, TaskStatus } from "./tasks-data";

export function TaskFilterMenu({
	due,
	onDueChange,
	onPriorityChange,
	onSourceChange,
	onStatusChange,
	onWorkflowChange,
	priority,
	source,
	status,
	workflow,
}: {
	due: TaskDueFilter;
	onDueChange: (due: TaskDueFilter) => void;
	onPriorityChange: (priority: TaskPriority | "all") => void;
	onSourceChange: (source: TaskSourceFilter) => void;
	onStatusChange: (status: TaskStatus | "all") => void;
	onWorkflowChange: (workflow: TaskWorkflowFilter) => void;
	priority: TaskPriority | "all";
	source: TaskSourceFilter;
	status: TaskStatus | "all";
	workflow: TaskWorkflowFilter;
}) {
	const activeFilterCount = [
		due !== "all",
		status !== "all",
		priority !== "all",
		source !== "all",
		workflow !== "all",
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
				<DropdownMenuLabel>Due</DropdownMenuLabel>
				{dueFilterItems.map((item) => (
					<FilterMenuItem
						active={due === item.value}
						key={item.value}
						label={item.label}
						onClick={() => onDueChange(item.value)}
					/>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Work type</DropdownMenuLabel>
				{workflowFilterItems.map((item) => (
					<FilterMenuItem
						active={workflow === item.value}
						key={item.value}
						label={item.label}
						onClick={() => onWorkflowChange(item.value)}
					/>
				))}
				<DropdownMenuSeparator />
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
								onDueChange("all");
								onStatusChange("all");
								onPriorityChange("all");
								onSourceChange("all");
								onWorkflowChange("all");
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
