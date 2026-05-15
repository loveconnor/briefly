import type { DeliveryTask, TaskPriority, TaskStatus } from "./tasks-data";

export type DisplayMode = "list" | "kanban";
export type TaskSourceFilter = DeliveryTask["createdBy"] | "all";

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

export const kanbanStatuses: TaskStatus[] = [
	"Active",
	"Waiting",
	"Blocked",
	"Review",
	"Client Review",
	"Internal QA",
	"Ready to Launch",
	"Delivered",
];
