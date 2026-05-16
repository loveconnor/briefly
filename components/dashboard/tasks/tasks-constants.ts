import type { DeliveryTask, TaskPriority, TaskStatus } from "./tasks-data";

export type DisplayMode = "list" | "kanban";
export type TaskDueFilter = "all" | "today" | "due-soon" | "overdue";
export type TaskSourceFilter = DeliveryTask["createdBy"] | "all";
export type TaskWorkflowFilter = "all" | "approvals" | "launches";

export const statusItems: TaskStatus[] = [
	"Active",
	"Waiting",
	"Blocked",
	"Review",
	"Scheduled",
	"Delivered",
	"Client Review",
	"Internal QA",
	"Ready to Launch",
];

export const phaseItems = [
	"Discovery",
	"Content",
	"Design Review",
	"Engineering",
	"Internal QA",
	"Approvals",
	"Launch Prep",
	"Delivery",
];

export const assigneeItems = ["Connor", "Maya", "Jules", "Lena", "Sam"];
export const priorityItems: TaskPriority[] = ["Urgent", "High", "Normal", "Low"];
export const dueFilterItems: { label: string; value: TaskDueFilter }[] = [
	{ label: "Any due date", value: "all" },
	{ label: "Due today", value: "today" },
	{ label: "Due soon", value: "due-soon" },
	{ label: "Overdue", value: "overdue" },
];
export const workflowFilterItems: { label: string; value: TaskWorkflowFilter }[] = [
	{ label: "Any work type", value: "all" },
	{ label: "Approvals", value: "approvals" },
	{ label: "Launches", value: "launches" },
];
