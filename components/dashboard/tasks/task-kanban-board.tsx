import {
	useEffect,
	useCallback,
	useMemo,
	useRef,
	useState,
	type PointerEvent,
	type ReactNode,
} from "react";
import {
	CircleCheckIcon,
	CircleDotIcon,
	CircleIcon,
	OctagonAlertIcon,
} from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";
import { cn } from "@/lib/utils";

import { TaskActionsMenu } from "./task-actions-menu";
import { statusTone, type DeliveryTask, type TaskStatus } from "./tasks-data";

type WorkflowStage = {
	id: string;
	title: string;
	icon: ReactNode;
	nextStatus: TaskStatus;
	statuses: TaskStatus[];
};

type DragPreview = {
	index: number;
	stageId: string;
};

type ActiveDrag = {
	height: number;
	moved: boolean;
	offsetX: number;
	offsetY: number;
	originIndex: number;
	originStageId: string;
	taskId: string;
	width: number;
	x: number;
	y: number;
};

const DRAG_START_DISTANCE = 5;

const workflowStages: WorkflowStage[] = [
	{
		id: "queued",
		title: "Queued",
		icon: <CircleIcon className="size-4 text-muted-foreground" />,
		nextStatus: "Scheduled",
		statuses: ["Scheduled"],
	},
	{
		id: "in-progress",
		title: "In Progress",
		icon: <CircleDotIcon className="size-4 text-info-foreground" />,
		nextStatus: "Active",
		statuses: ["Active"],
	},
	{
		id: "waiting",
		title: "Waiting",
		icon: <CircleIcon className="size-4 text-warning-foreground" />,
		nextStatus: "Waiting",
		statuses: ["Waiting"],
	},
	{
		id: "review",
		title: "Review",
		icon: <CircleDotIcon className="size-4 text-info-foreground" />,
		nextStatus: "Review",
		statuses: ["Review", "Client Review", "Internal QA", "Ready to Launch"],
	},
	{
		id: "blocked",
		title: "Blocked",
		icon: <OctagonAlertIcon className="size-4 text-destructive-foreground" />,
		nextStatus: "Blocked",
		statuses: ["Blocked"],
	},
	{
		id: "done",
		title: "Done",
		icon: <CircleCheckIcon className="size-4 text-success-foreground" />,
		nextStatus: "Delivered",
		statuses: ["Delivered"],
	},
];

const signalDotClassName: Record<ReturnType<typeof statusToneForTask>, string> = {
	default: "bg-muted-foreground/45",
	error: "bg-destructive",
	info: "bg-info",
	success: "bg-success",
	warning: "bg-warning",
};

export function TaskKanbanBoard({
	onDelete,
	onMarkComplete,
	onMoveTask,
	onSelect,
	onSendReminder,
	tasks,
}: {
	onDelete: (taskId: string) => void;
	onMarkComplete: (taskId: string) => void;
	onMoveTask: (taskId: string, status: TaskStatus, orderedTaskIds: string[]) => void;
	onSelect: (task: DeliveryTask) => void;
	onSendReminder: (taskId: string) => void;
	tasks: DeliveryTask[];
}) {
	const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
	const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
	const suppressClickTaskId = useRef<string | null>(null);
	const tasksByStage = useMemo(() => {
		return Object.fromEntries(
			workflowStages.map((stage) => [
				stage.id,
				tasks.filter((task) => stage.statuses.includes(task.status)),
			])
		) as Record<string, DeliveryTask[]>;
	}, [tasks]);
	const activeTask = activeDrag
		? tasks.find((task) => task.id === activeDrag.taskId) ?? null
		: null;

	function clearDragState() {
		setActiveDrag(null);
		setDragPreview(null);
	}

	const orderedTaskIdsForDrop = useCallback(function orderedTaskIdsForDrop(stage: WorkflowStage, index: number, taskId: string) {
		const currentTaskIds = tasksByStage[stage.id]
			.map((task) => task.id)
			.filter((id) => id !== taskId);

		const nextTaskIds = [...currentTaskIds];
		nextTaskIds.splice(Math.min(index, nextTaskIds.length), 0, taskId);
		return nextTaskIds;
	}, [tasksByStage]);

	function dragPreviewForPoint(clientX: number, clientY: number, taskId: string) {
		const stageElement = document
			.elementFromPoint(clientX, clientY)
			?.closest<HTMLElement>("[data-kanban-stage-id]");
		const stageId = stageElement?.dataset.kanbanStageId;
		const stage = workflowStages.find((item) => item.id === stageId);

		if (!stageElement || !stage) return null;

		const cards = Array.from(
			stageElement.querySelectorAll<HTMLElement>("[data-kanban-card-id]")
		).filter((card) => card.dataset.kanbanCardId !== taskId);
		const index = cards.findIndex((card) => {
			const rect = card.getBoundingClientRect();
			return clientY < rect.top + rect.height / 2;
		});

		return {
			index: index === -1 ? cards.length : index,
			stageId: stage.id,
		};
	}

	useEffect(() => {
		if (!activeDrag) return;
		const drag = activeDrag;

		function onPointerMove(event: globalThis.PointerEvent) {
			setActiveDrag((current) => {
				if (!current) return current;
				const moved =
					current.moved ||
					Math.abs(event.clientX - current.x) > DRAG_START_DISTANCE ||
					Math.abs(event.clientY - current.y) > DRAG_START_DISTANCE;

				if (moved) {
					setDragPreview(dragPreviewForPoint(event.clientX, event.clientY, current.taskId));
				}

				return {
					...current,
					moved,
					x: event.clientX,
					y: event.clientY,
				};
			});
		}

		function onPointerUp() {
			const preview = dragPreview;
			clearDragState();

			if (drag.moved) suppressClickTaskId.current = drag.taskId;
			if (!drag.moved || !preview) return;

			const stage = workflowStages.find((item) => item.id === preview.stageId);
			if (!stage) return;

			onMoveTask(
				drag.taskId,
				stage.nextStatus,
				orderedTaskIdsForDrop(stage, preview.index, drag.taskId)
			);
		}

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp, { once: true });

		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
		};
	}, [activeDrag, dragPreview, onMoveTask, orderedTaskIdsForDrop, tasksByStage]);

	if (!tasks.length) {
		return (
			<DashboardEmptyState
				className="my-6"
				title="No tasks match the current filters"
			/>
		);
	}

	return (
		<div className="h-full min-h-[520px] overflow-x-auto pb-2">
			<div className="grid h-full min-w-[1120px] auto-rows-fr grid-cols-6 gap-3">
				{workflowStages.map((stage) => {
					const columnTasks = tasksByStage[stage.id];
					const previewIndex =
						dragPreview?.stageId === stage.id ? dragPreview.index : null;

					return (
						<section key={stage.id}>
							<Frame
								className="h-full min-h-0 rounded-lg bg-muted/35 p-1"
								data-kanban-stage-id={stage.id}
							>
								<FrameHeader className="flex flex-row items-center gap-2 px-3 py-2.5">
									{stage.icon}
									<FrameTitle className="truncate">{stage.title}</FrameTitle>
									<Badge
										className="ml-auto tabular-nums"
										variant="outline"
									>
										{columnTasks.length}
									</Badge>
								</FrameHeader>
								<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-0.5">
									{columnTasks.map((task, index) => (
										<div key={task.id} className="contents">
											{previewIndex === index ? <KanbanDropPlaceholder /> : null}
							<KanbanTaskCard
												dragging={activeDrag?.taskId === task.id && activeDrag.moved}
												onDelete={() => onDelete(task.id)}
												onPointerDown={(event) => {
													if (!event.isPrimary) return;
													if (isInteractiveDragTarget(event.target)) return;

													const rect = event.currentTarget.getBoundingClientRect();
													event.preventDefault();
													setActiveDrag({
														height: rect.height,
														moved: false,
														offsetX: event.clientX - rect.left,
														offsetY: event.clientY - rect.top,
														originIndex: index,
														originStageId: stage.id,
														taskId: task.id,
														width: rect.width,
														x: event.clientX,
														y: event.clientY,
													});
												}}
												onMarkComplete={() => onMarkComplete(task.id)}
												onSelect={() => {
													if (suppressClickTaskId.current === task.id) {
														suppressClickTaskId.current = null;
														return;
													}

													onSelect(task);
												}}
												onSendReminder={() => onSendReminder(task.id)}
												task={task}
											/>
										</div>
									))}
									{previewIndex === columnTasks.length ? <KanbanDropPlaceholder /> : null}
									{!columnTasks.length && previewIndex === null ? (
										<div className="px-2 py-6 text-center text-xs text-muted-foreground/70">
											No tasks
										</div>
									) : null}
								</div>
							</Frame>
						</section>
					);
				})}
			</div>
			{activeDrag?.moved && activeTask ? (
				<KanbanDragOverlay drag={activeDrag} task={activeTask} />
			) : null}
		</div>
	);
}

function KanbanTaskCard({
	dragging,
	onDelete,
	onMarkComplete,
	onPointerDown,
	onSelect,
	onSendReminder,
	task,
}: {
	dragging: boolean;
	onDelete: () => void;
	onMarkComplete: () => void;
	onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
	onSelect: () => void;
	onSendReminder: () => void;
	task: DeliveryTask;
}) {
	return (
		<Frame
			className={cn(
				"group cursor-grab rounded-md bg-transparent p-0 active:cursor-grabbing",
				dragging && "opacity-45"
			)}
			data-kanban-card-id={task.id}
			onClick={onSelect}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					onSelect();
				}
			}}
			onPointerDown={onPointerDown}
			role="button"
			tabIndex={0}
		>
			<FramePanel className="rounded-md p-2.5 transition-colors group-hover:bg-muted/35">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<span className="block truncate text-sm font-medium">{task.name}</span>
						<p className="mt-0.5 truncate text-xs text-muted-foreground/75">
							{task.project}
						</p>
					</div>
					<TaskActionsMenu
						onDelete={onDelete}
						onMarkComplete={onMarkComplete}
						onSelect={onSelect}
						onSendReminder={onSendReminder}
						task={task}
					/>
				</div>
				<div className="mt-2 grid gap-1.5 text-xs text-muted-foreground">
					<span className="flex min-w-0 items-center gap-1.5">
						<span
							className={cn(
								"size-1.5 shrink-0 rounded-full",
								signalDotClassName[statusToneForTask(task)]
							)}
						/>
						<span className="truncate">{task.waitingOn}</span>
					</span>
					<span className="flex min-w-0 items-center justify-between gap-2">
						<span className={cn("truncate", task.due === "Overdue" && "font-medium text-destructive-foreground")}>
							Due {task.due}
						</span>
						<span className="truncate text-muted-foreground/70">{task.assignee}</span>
					</span>
				</div>
			</FramePanel>
		</Frame>
	);
}

function KanbanDropPlaceholder() {
	return (
		<div
			aria-hidden="true"
			className="min-h-[5.75rem] rounded-md border-2 border-dashed border-border bg-muted/10"
		/>
	);
}

function KanbanDragOverlay({
	drag,
	task,
}: {
	drag: ActiveDrag;
	task: DeliveryTask;
}) {
	return (
		<div
			className="pointer-events-none fixed z-50 opacity-95 shadow-2xl"
			style={{
				height: drag.height,
				left: drag.x - drag.offsetX,
				top: drag.y - drag.offsetY,
				width: drag.width,
			}}
		>
			<Frame className="rounded-md bg-transparent p-0">
				<FramePanel className="rounded-md p-2.5">
					<div className="min-w-0">
						<span className="block truncate text-sm font-medium">{task.name}</span>
						<p className="mt-0.5 truncate text-xs text-muted-foreground/75">
							{task.project}
						</p>
					</div>
					<div className="mt-2 grid gap-1.5 text-xs text-muted-foreground">
						<span className="flex min-w-0 items-center gap-1.5">
							<span
								className={cn(
									"size-1.5 shrink-0 rounded-full",
									signalDotClassName[statusToneForTask(task)]
								)}
							/>
							<span className="truncate">{task.waitingOn}</span>
						</span>
						<span className="flex min-w-0 items-center justify-between gap-2">
							<span className={cn("truncate", task.due === "Overdue" && "font-medium text-destructive-foreground")}>
								Due {task.due}
							</span>
							<span className="truncate text-muted-foreground/70">{task.assignee}</span>
						</span>
					</div>
				</FramePanel>
			</Frame>
		</div>
	);
}

function isInteractiveDragTarget(target: EventTarget) {
	if (!(target instanceof HTMLElement)) return false;

	return Boolean(
		target.closest(
			"button, a, input, textarea, select, [role='menu'], [role='menuitem'], [data-slot='dropdown-menu-trigger']"
		)
	);
}

function statusToneForTask(task: DeliveryTask) {
	return statusTone[task.status];
}
