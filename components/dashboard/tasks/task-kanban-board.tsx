import { Badge } from "@/components/ui/badge";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { badgeToneClassName, badgeToneVariant } from "@/components/dashboard/badge-tone";
import { cn } from "@/lib/utils";

import { DependencyIndicator } from "./dependency-indicator";
import { TaskActionsMenu } from "./task-actions-menu";
import { kanbanStatuses } from "./tasks-constants";
import { statusTone, type DeliveryTask } from "./tasks-data";

export function TaskKanbanBoard({
	onDelete,
	onMarkComplete,
	onSelect,
	onSendReminder,
	tasks,
}: {
	onDelete: (taskId: string) => void;
	onMarkComplete: (taskId: string) => void;
	onSelect: (task: DeliveryTask) => void;
	onSendReminder: (taskId: string) => void;
	tasks: DeliveryTask[];
}) {
	if (!tasks.length) {
		return (
			<DashboardEmptyState
				className="my-6"
				title="No tasks match the current filters"
			/>
		);
	}

	const visibleStatuses = kanbanStatuses.filter((status) =>
		tasks.some((task) => task.status === status)
	);

	return (
		<div className="overflow-x-auto pb-2">
			<div className="grid min-w-[980px] auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3">
				{visibleStatuses.map((status) => {
					const columnTasks = tasks.filter((task) => task.status === status);

					return (
						<section className="min-h-80 rounded-md bg-muted/18" key={status}>
							<div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2.5">
								<div className="flex min-w-0 items-center gap-2">
									<Badge
										className={badgeToneClassName(statusTone[status], "shrink-0")}
										variant={badgeToneVariant(statusTone[status])}
									>
										{status}
									</Badge>
									<span className="text-xs text-muted-foreground tabular-nums">
										{columnTasks.length}
									</span>
								</div>
							</div>
							<div className="space-y-2 p-2">
								{columnTasks.map((task) => (
									<KanbanTaskCard
										key={task.id}
										onDelete={() => onDelete(task.id)}
										onMarkComplete={() => onMarkComplete(task.id)}
										onSelect={() => onSelect(task)}
										onSendReminder={() => onSendReminder(task.id)}
										task={task}
									/>
								))}
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
}

function KanbanTaskCard({
	onDelete,
	onMarkComplete,
	onSelect,
	onSendReminder,
	task,
}: {
	onDelete: () => void;
	onMarkComplete: () => void;
	onSelect: () => void;
	onSendReminder: () => void;
	task: DeliveryTask;
}) {
	return (
		<div
			className="group rounded-md border border-border/60 bg-background/55 p-3 text-left transition-colors hover:bg-muted/35"
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
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<p className="truncate text-sm font-medium">{task.name}</p>
					<p className="mt-1 truncate text-xs text-muted-foreground/70">{task.project}</p>
				</div>
				<TaskActionsMenu
					onDelete={onDelete}
					onMarkComplete={onMarkComplete}
					onSelect={onSelect}
					onSendReminder={onSendReminder}
					task={task}
				/>
			</div>
			<div className="mt-3 grid gap-1.5 text-xs text-muted-foreground">
				<span className={cn(task.due === "Overdue" && "font-medium text-destructive-foreground")}>
					Due {task.due}
				</span>
				<DependencyIndicator value={task.waitingOn} />
			</div>
		</div>
	);
}
