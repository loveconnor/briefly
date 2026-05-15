"use client";

import { useMemo, useState, type FormEvent } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TaskProjectOption } from "@/lib/app-data";

import { NewTaskDialog } from "./new-task-dialog";
import { TaskDisplayControls } from "./task-display-controls";
import { TaskFilterMenu } from "./task-filter-menu";
import { TaskInspectorSheet } from "./task-inspector-sheet";
import { TaskKanbanBoard } from "./task-kanban-board";
import { TaskList } from "./task-list";
import { TaskSelectionActionBar } from "./task-selection-action-bar";
import { TaskSummaryStrip } from "./task-summary-strip";
import {
	type DisplayMode,
	type TaskSourceFilter,
} from "./tasks-constants";
import {
	type DeliveryTask,
	type TaskPriority,
	type TaskStatus,
	type TaskView,
} from "./tasks-data";

export function TasksPage({
	initialProjectOptions,
	initialTasks,
}: {
	initialProjectOptions: TaskProjectOption[];
	initialTasks: DeliveryTask[];
}) {
	const [activeView, setActiveView] = useState<TaskView>("my-tasks");
	const [displayMode, setDisplayMode] = useState<DisplayMode>("list");
	const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
	const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
	const [sourceFilter, setSourceFilter] = useState<TaskSourceFilter>("all");
	const [tasks, setTasks] = useState<DeliveryTask[]>(initialTasks);
	const [weekStartMs] = useState(() => Date.now() - 7 * 24 * 60 * 60 * 1000);
	const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
	const [selectedTask, setSelectedTask] = useState<DeliveryTask | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	const [taskName, setTaskName] = useState("");
	const [projectId, setProjectId] = useState(initialProjectOptions[0]?.id ?? "");
	const [phase, setPhase] = useState<TaskStatus | string>("Design Review");
	const [assignee, setAssignee] = useState("Connor");
	const [dueDate, setDueDate] = useState("Today");
	const [status, setStatus] = useState<TaskStatus>("Active");
	const [dependencies, setDependencies] = useState("Client feedback");
	const [clientVisible, setClientVisible] = useState(true);

	const filteredTasks = useMemo(() => {
		return tasks
			.filter((task) => matchesView(task, activeView))
			.filter((task) => statusFilter === "all" || task.status === statusFilter)
			.filter((task) => priorityFilter === "all" || task.priority === priorityFilter)
			.filter((task) => sourceFilter === "all" || task.createdBy === sourceFilter);
	}, [activeView, priorityFilter, sourceFilter, statusFilter, tasks]);

	function createTask(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		void mutateTasks("/api/tasks", {
			body: JSON.stringify({
				assignee,
				clientVisible,
				dependencies,
				dueDate,
				phase,
				projectId,
				status,
				taskName,
			}),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		}).then((nextTasks) => {
			const newestTask = nextTasks.find((task) => !tasks.some((current) => current.id === task.id));
			setSelectedTask(newestTask ?? null);
			setDialogOpen(false);
			setTaskName("");
			setDependencies("Client feedback");
		});
	}

	function deleteTask(taskId: string) {
		void mutateTasks(`/api/tasks/${encodeURIComponent(taskId)}`, {
			method: "DELETE",
		});
	}

	function markTasksComplete(taskIds: string[]) {
		void Promise.all(
			taskIds.map((taskId) =>
				mutateTasks(`/api/tasks/${encodeURIComponent(taskId)}`, {
					body: JSON.stringify({ action: "mark-complete" }),
					headers: { "Content-Type": "application/json" },
					method: "PATCH",
				})
			)
		).then((results) => {
			const latestTasks = results.at(-1);
			if (latestTasks) applyTasks(latestTasks);
		});
	}

	function sendReminder(taskIds: string[]) {
		void Promise.all(
			taskIds.map((taskId) =>
				mutateTasks(`/api/tasks/${encodeURIComponent(taskId)}`, {
					body: JSON.stringify({ action: "send-reminder" }),
					headers: { "Content-Type": "application/json" },
					method: "PATCH",
				})
			)
		).then((results) => {
			const latestTasks = results.at(-1);
			if (latestTasks) applyTasks(latestTasks);
		});
	}

	function toggleTaskSelection(taskId: string, checked: boolean) {
		setSelectedTaskIds((current) =>
			checked
				? Array.from(new Set([...current, taskId]))
				: current.filter((id) => id !== taskId)
		);
	}

	async function mutateTasks(url: string, init: RequestInit) {
		const response = await fetch(url, init);
		const payload = await response.json();
		if (!response.ok) {
			throw new Error(payload.error ?? "Unable to update tasks.");
		}
		applyTasks(payload.tasks);
		return payload.tasks as DeliveryTask[];
	}

	function applyTasks(nextTasks: DeliveryTask[]) {
		setTasks(nextTasks);
		setSelectedTaskIds([]);
		setSelectedTask((current) =>
			current ? nextTasks.find((task) => task.id === current.id) ?? null : null
		);
	}

	return (
		<div className="mx-auto w-full max-w-[1360px] space-y-6">
			<header className="flex min-w-0 flex-col gap-4 border-b pb-5 xl:flex-row xl:items-end xl:justify-between">
				<div className="min-w-0">
					<h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Operational work across projects, approvals, launches, and client delivery.
					</p>
				</div>
				<div className="flex min-w-0 max-w-full flex-wrap items-center gap-2 xl:max-w-[22rem] xl:justify-end">
					<Button onClick={() => setDialogOpen(true)}>
						<PlusIcon className="size-4" />
						New task
					</Button>
					<TaskFilterMenu
						onPriorityChange={setPriorityFilter}
						onSourceChange={setSourceFilter}
						onStatusChange={setStatusFilter}
						priority={priorityFilter}
						source={sourceFilter}
						status={statusFilter}
					/>
				</div>
			</header>

			<TaskSummaryStrip tasks={tasks} weekStartMs={weekStartMs} />

			<section className="space-y-4">
				<TaskDisplayControls
					activeView={activeView}
					displayMode={displayMode}
					onDisplayModeChange={setDisplayMode}
					onViewChange={setActiveView}
				/>

				{selectedTaskIds.length ? (
					<TaskSelectionActionBar
						onClear={() => setSelectedTaskIds([])}
						onMarkComplete={() => markTasksComplete(selectedTaskIds)}
						onSendReminder={() => sendReminder(selectedTaskIds)}
						selectedCount={selectedTaskIds.length}
					/>
				) : null}

				{displayMode === "kanban" ? (
					<TaskKanbanBoard
						onDelete={deleteTask}
						onMarkComplete={(taskId) => markTasksComplete([taskId])}
						onSelect={setSelectedTask}
						onSendReminder={(taskId) => sendReminder([taskId])}
						tasks={filteredTasks}
					/>
				) : null}

				<TaskList
					displayed={displayMode === "list"}
					onDelete={deleteTask}
					onMarkComplete={(taskId) => markTasksComplete([taskId])}
					onSelect={setSelectedTask}
					onSelectionChange={toggleTaskSelection}
					onSendReminder={(taskId) => sendReminder([taskId])}
					selectedTaskIds={selectedTaskIds}
					tasks={filteredTasks}
				/>
			</section>

			<NewTaskDialog
				form={{
					assignee,
					clientVisible,
					dependencies,
					dueDate,
					phase,
					projectId,
					status,
					taskName,
				}}
				onOpenChange={setDialogOpen}
				onSubmit={createTask}
				open={dialogOpen}
				projectOptions={initialProjectOptions}
				setters={{
					setAssignee,
					setClientVisible,
					setDependencies,
					setDueDate,
					setPhase,
					setProjectId,
					setStatus,
					setTaskName,
				}}
			/>

			<TaskInspectorSheet onClose={() => setSelectedTask(null)} task={selectedTask} />
		</div>
	);
}

function matchesView(task: DeliveryTask, activeView: TaskView) {
	if (activeView === "my-tasks") return task.assignee === "Connor" && !task.completed;
	if (activeView === "due-soon") return task.dueRank <= 3 && !task.completed;
	if (activeView === "waiting") return task.status === "Waiting" || task.status === "Client Review";
	if (activeView === "blocked") return task.status === "Blocked";
	if (activeView === "approvals") return ["Review", "Client Review"].includes(task.status);
	if (activeView === "launches") return ["Launch Prep", "Ready to Launch"].includes(task.phase) || task.status === "Ready to Launch";
	if (activeView === "completed") return Boolean(task.completed) || task.status === "Delivered";
	return true;
}
