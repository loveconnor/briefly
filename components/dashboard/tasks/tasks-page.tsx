"use client";

import { useMemo, useState, type FormEvent } from "react";
import { PlusIcon, SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
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
	type TaskDueFilter,
	type TaskSourceFilter,
	type TaskWorkflowFilter,
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
	const [activeView, setActiveView] = useState<TaskView>("mine");
	const [displayMode, setDisplayMode] = useState<DisplayMode>("list");
	const [dueFilter, setDueFilter] = useState<TaskDueFilter>("all");
	const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
	const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">("all");
	const [sourceFilter, setSourceFilter] = useState<TaskSourceFilter>("all");
	const [workflowFilter, setWorkflowFilter] = useState<TaskWorkflowFilter>("all");
	const [searchQuery, setSearchQuery] = useState("");
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
		const normalizedQuery = searchQuery.trim().toLowerCase();

		return tasks
			.filter((task) => matchesView(task, activeView))
			.filter((task) => matchesSearch(task, normalizedQuery))
			.filter((task) => matchesDueFilter(task, dueFilter))
			.filter((task) => matchesWorkflowFilter(task, workflowFilter))
			.filter((task) => statusFilter === "all" || task.status === statusFilter)
			.filter((task) => priorityFilter === "all" || task.priority === priorityFilter)
			.filter((task) => sourceFilter === "all" || task.createdBy === sourceFilter);
	}, [
		activeView,
		dueFilter,
		priorityFilter,
		searchQuery,
		sourceFilter,
		statusFilter,
		tasks,
		workflowFilter,
	]);

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

	function moveTask(taskId: string, status: TaskStatus, orderedTaskIds: string[]) {
		setTasks((current) => reorderTasks(current, taskId, status, orderedTaskIds));

		void mutateTasks(`/api/tasks/${encodeURIComponent(taskId)}`, {
			body: JSON.stringify({ action: "update-status", orderedTaskIds, status }),
			headers: { "Content-Type": "application/json" },
			method: "PATCH",
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
		<div className="mx-auto flex min-h-full w-full max-w-[1360px] flex-col gap-6">
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
					<InputGroup className="w-full min-w-48 flex-1 border-transparent bg-muted/50 shadow-none xl:w-52 xl:flex-none">
						<InputGroupAddon>
							<SearchIcon className="size-4" />
						</InputGroupAddon>
						<InputGroupInput
							aria-label="Search tasks"
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="Search tasks"
							value={searchQuery}
						/>
					</InputGroup>
					<TaskFilterMenu
						due={dueFilter}
						onDueChange={setDueFilter}
						onPriorityChange={setPriorityFilter}
						onSourceChange={setSourceFilter}
						onStatusChange={setStatusFilter}
						onWorkflowChange={setWorkflowFilter}
						priority={priorityFilter}
						source={sourceFilter}
						status={statusFilter}
						workflow={workflowFilter}
					/>
				</div>
			</header>

			<TaskSummaryStrip tasks={tasks} weekStartMs={weekStartMs} />

			<section className="flex min-h-0 flex-1 flex-col gap-4">
				<TaskDisplayControls
					activeView={activeView}
					displayMode={displayMode}
					onDisplayModeChange={setDisplayMode}
					onViewChange={setActiveView}
				/>

				<ActiveTaskFilters
					due={dueFilter}
					onClearDue={() => setDueFilter("all")}
					onClearPriority={() => setPriorityFilter("all")}
					onClearSearch={() => setSearchQuery("")}
					onClearSource={() => setSourceFilter("all")}
					onClearStatus={() => setStatusFilter("all")}
					onClearWorkflow={() => setWorkflowFilter("all")}
					priority={priorityFilter}
					searchQuery={searchQuery}
					source={sourceFilter}
					status={statusFilter}
					workflow={workflowFilter}
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
					<div className="min-h-0 flex-1">
						<TaskKanbanBoard
							onDelete={deleteTask}
							onMarkComplete={(taskId) => markTasksComplete([taskId])}
							onMoveTask={moveTask}
							onSelect={setSelectedTask}
							onSendReminder={(taskId) => sendReminder([taskId])}
							tasks={filteredTasks}
						/>
					</div>
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
	if (activeView === "mine") return task.assignee === "Connor";
	if (activeView === "team") return true;
	if (activeView === "completed") return Boolean(task.completed) || task.status === "Delivered";
	return true;
}

function matchesSearch(task: DeliveryTask, normalizedQuery: string) {
	if (!normalizedQuery) return true;

	return [
		task.name,
		task.project,
		task.client,
		task.phase,
		task.assignee,
		task.waitingOn,
		task.description,
	]
		.join(" ")
		.toLowerCase()
		.includes(normalizedQuery);
}

function matchesDueFilter(task: DeliveryTask, dueFilter: TaskDueFilter) {
	if (dueFilter === "all") return true;
	if (dueFilter === "today") return task.due.toLowerCase() === "today";
	if (dueFilter === "due-soon") return task.dueRank <= 3 && !isCompletedTask(task);
	if (dueFilter === "overdue") return task.due.toLowerCase() === "overdue";
	return true;
}

function matchesWorkflowFilter(task: DeliveryTask, workflowFilter: TaskWorkflowFilter) {
	if (workflowFilter === "all") return true;
	if (workflowFilter === "approvals") {
		return ["Review", "Client Review"].includes(task.status);
	}
	if (workflowFilter === "launches") {
		return ["Launch Prep", "Ready to Launch"].includes(task.phase) || task.status === "Ready to Launch";
	}
	return true;
}

function isCompletedTask(task: DeliveryTask) {
	return Boolean(task.completed) || task.status === "Delivered";
}

function reorderTasks(
	tasks: DeliveryTask[],
	taskId: string,
	status: TaskStatus,
	orderedTaskIds: string[]
) {
	const movingTask = tasks.find((task) => task.id === taskId);
	if (!movingTask) return tasks;

	const movedTask = {
		...movingTask,
		completed: status === "Delivered",
		completedAt: status === "Delivered" ? movingTask.completedAt ?? "Just now" : null,
		status,
	};
	const remainingTasks = tasks.filter((task) => task.id !== taskId);
	const nextTasks = [...remainingTasks];
	const targetIndex = orderedTaskIds.indexOf(taskId);
	const beforeTaskId = targetIndex >= 0 ? orderedTaskIds[targetIndex + 1] : undefined;
	const afterTaskId = targetIndex > 0 ? orderedTaskIds[targetIndex - 1] : undefined;
	const beforeIndex = beforeTaskId
		? nextTasks.findIndex((task) => task.id === beforeTaskId)
		: -1;

	if (beforeIndex >= 0) {
		nextTasks.splice(beforeIndex, 0, movedTask);
		return nextTasks;
	}

	const afterIndex = afterTaskId
		? nextTasks.findIndex((task) => task.id === afterTaskId)
		: -1;

	if (afterIndex >= 0) {
		nextTasks.splice(afterIndex + 1, 0, movedTask);
		return nextTasks;
	}

	return [movedTask, ...nextTasks];
}

function ActiveTaskFilters({
	due,
	onClearDue,
	onClearPriority,
	onClearSearch,
	onClearSource,
	onClearStatus,
	onClearWorkflow,
	priority,
	searchQuery,
	source,
	status,
	workflow,
}: {
	due: TaskDueFilter;
	onClearDue: () => void;
	onClearPriority: () => void;
	onClearSearch: () => void;
	onClearSource: () => void;
	onClearStatus: () => void;
	onClearWorkflow: () => void;
	priority: TaskPriority | "all";
	searchQuery: string;
	source: TaskSourceFilter;
	status: TaskStatus | "all";
	workflow: TaskWorkflowFilter;
}) {
	const filters = [
		searchQuery.trim()
			? { label: `Search: ${searchQuery.trim()}`, onClear: onClearSearch }
			: null,
		due !== "all" ? { label: dueFilterLabel(due), onClear: onClearDue } : null,
		workflow !== "all"
			? { label: workflow === "approvals" ? "Approvals" : "Launches", onClear: onClearWorkflow }
			: null,
		status !== "all" ? { label: `Status: ${status}`, onClear: onClearStatus } : null,
		priority !== "all" ? { label: `Priority: ${priority}`, onClear: onClearPriority } : null,
		source !== "all" ? { label: sourceFilterLabel(source), onClear: onClearSource } : null,
	].filter(Boolean) as { label: string; onClear: () => void }[];

	if (!filters.length) return null;

	return (
		<div className="flex flex-wrap items-center gap-2">
			{filters.map((filter) => (
				<Button
					className="h-7 rounded-full border-border/70 bg-muted/35 px-2.5 text-xs text-muted-foreground hover:text-foreground"
					key={filter.label}
					onClick={filter.onClear}
					variant="outline"
				>
					{filter.label}
					<XIcon className="size-3.5" />
				</Button>
			))}
		</div>
	);
}

function dueFilterLabel(due: TaskDueFilter) {
	if (due === "today") return "Due today";
	if (due === "due-soon") return "Due soon";
	if (due === "overdue") return "Overdue";
	return "Any due date";
}

function sourceFilterLabel(source: TaskSourceFilter) {
	if (source === "user") return "Created by user";
	if (source === "client") return "Client-created";
	if (source === "system") return "System-created";
	return "Any source";
}
