import { ArrowRightIcon, ArrowUpDownIcon } from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { badgeToneClassName, badgeToneVariant } from "@/components/dashboard/badge-tone";
import { cn } from "@/lib/utils";

import { DependencyIndicator } from "./dependency-indicator";
import { TaskActionsMenu } from "./task-actions-menu";
import { statusTone, type DeliveryTask } from "./tasks-data";

export function TaskList({
	displayed,
	onDelete,
	onMarkComplete,
	onSelect,
	onSelectionChange,
	onSendReminder,
	selectedTaskIds,
	tasks,
}: {
	displayed: boolean;
	onDelete: (taskId: string) => void;
	onMarkComplete: (taskId: string) => void;
	onSelect: (task: DeliveryTask) => void;
	onSelectionChange: (taskId: string, checked: boolean) => void;
	onSendReminder: (taskId: string) => void;
	selectedTaskIds: string[];
	tasks: DeliveryTask[];
}) {
	return (
		<>
			<div className={cn("hidden overflow-x-auto lg:block", !displayed && "lg:hidden")}>
				<div className="min-w-[820px]">
					<div className="grid grid-cols-[28px_minmax(240px,1.5fr)_180px_130px_96px_minmax(180px,1fr)_36px] gap-3 border-b px-1.5 pb-2 text-xs font-medium text-muted-foreground">
						<span />
						<span>Task name</span>
						<span>Project</span>
						<span>Status</span>
						<span>Due</span>
						<span>Waiting On</span>
						<span className="flex justify-end">
							<ArrowUpDownIcon className="size-3" />
						</span>
					</div>
					<div className="divide-y divide-border/60">
						{tasks.map((task) => (
							<TaskRow
								key={task.id}
								onDelete={() => onDelete(task.id)}
								onMarkComplete={() => onMarkComplete(task.id)}
								onSelect={() => onSelect(task)}
								onSelectionChange={(checked) => onSelectionChange(task.id, checked)}
								onSendReminder={() => onSendReminder(task.id)}
								selected={selectedTaskIds.includes(task.id)}
								task={task}
							/>
						))}
						{!tasks.length ? (
							<DashboardEmptyState
								className="my-6"
								title="No tasks match the current filters"
							/>
						) : null}
					</div>
				</div>
			</div>

			<div className={cn("space-y-2 lg:hidden", !displayed && "hidden")}>
				{tasks.map((task) => (
					<button
						className="w-full rounded-md border border-border/70 p-4 text-left transition-colors hover:bg-muted/35"
						key={task.id}
						onClick={() => onSelect(task)}
						type="button"
					>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<p className="font-semibold">{task.name}</p>
								<p className="mt-1 text-sm text-muted-foreground">
									{task.project} / {task.phase}
								</p>
							</div>
							<Badge
								className={badgeToneClassName(statusTone[task.status], "shrink-0")}
								variant={badgeToneVariant(statusTone[task.status])}
							>
								{task.status}
							</Badge>
						</div>
						<div className="mt-4 grid gap-2 text-sm text-muted-foreground">
							<span>Due: {task.due}</span>
							<span>Waiting on: {task.waitingOn}</span>
							<span>Activity: {task.activity}</span>
						</div>
					</button>
				))}
			</div>
		</>
	);
}

function TaskRow({
	onDelete,
	onMarkComplete,
	onSelect,
	onSelectionChange,
	onSendReminder,
	selected,
	task,
}: {
	onDelete: () => void;
	onMarkComplete: () => void;
	onSelect: () => void;
	onSelectionChange: (checked: boolean) => void;
	onSendReminder: () => void;
	selected: boolean;
	task: DeliveryTask;
}) {
	return (
		<div
			className="group grid min-h-12 w-full grid-cols-[28px_minmax(240px,1.5fr)_180px_130px_96px_minmax(180px,1fr)_36px] items-center gap-3 px-1.5 py-2.5 text-left text-sm transition-colors hover:bg-muted/28"
			onClick={onSelect}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onSelect();
				}
			}}
			role="button"
			tabIndex={0}
		>
			<span
				onClick={(event) => event.stopPropagation()}
				onKeyDown={(event) => event.stopPropagation()}
			>
				<Checkbox
					aria-label={`Select ${task.name}`}
					checked={selected}
					onCheckedChange={(checked) => onSelectionChange(Boolean(checked))}
				/>
			</span>
			<span className="flex min-w-0 items-center gap-1.5">
				<span className="block truncate font-medium text-foreground/90 transition-colors group-hover:text-foreground">
					{task.name}
				</span>
				<ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70" />
			</span>
			<span className="truncate text-muted-foreground/70">{task.project}</span>
			<span>
				<Badge
					className={badgeToneClassName(statusTone[task.status], "w-fit")}
					variant={badgeToneVariant(statusTone[task.status])}
				>
					{task.status}
				</Badge>
			</span>
			<span className={cn("truncate text-muted-foreground", task.due === "Overdue" && "font-medium text-destructive-foreground")}>
				{task.due}
			</span>
			<DependencyIndicator value={task.waitingOn} />
			<span
				className="flex justify-end"
				onClick={(event) => event.stopPropagation()}
				onKeyDown={(event) => event.stopPropagation()}
			>
				<TaskActionsMenu
					onDelete={onDelete}
					onMarkComplete={onMarkComplete}
					onSelect={onSelect}
					onSendReminder={onSendReminder}
					task={task}
				/>
			</span>
		</div>
	);
}
