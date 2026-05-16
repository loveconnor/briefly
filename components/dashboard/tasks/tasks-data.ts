import type { BadgeTone } from "@/components/dashboard/badge-tone";

export type TaskStatus =
	| "Active"
	| "Waiting"
	| "Blocked"
	| "Review"
	| "Scheduled"
	| "Delivered"
	| "Client Review"
	| "Internal QA"
	| "Ready to Launch";

export type TaskPriority = "Low" | "Normal" | "High" | "Urgent";

export type TaskView = "mine" | "team" | "completed";

export type DeliveryTask = {
	id: string;
	name: string;
	project: string;
	client: string;
	phase: string;
	assignee: string;
	status: TaskStatus;
	due: string;
	dueRank: number;
	waitingOn: string;
	priority: TaskPriority;
	activity: string;
	description: string;
	attachments: string[];
	clientComments: string[];
	approvalHistory: string[];
	deliverables: string[];
	dependencies: string[];
	automation: string[];
	timeline: string[];
	completed?: boolean;
	completedAt?: string | null;
	createdBy?: "user" | "client" | "system";
};

export const statusTone: Record<TaskStatus, BadgeTone> = {
	Active: "info",
	Waiting: "warning",
	Blocked: "error",
	Review: "info",
	Scheduled: "default",
	Delivered: "success",
	"Client Review": "warning",
	"Internal QA": "info",
	"Ready to Launch": "success",
};

export const priorityTone: Record<TaskPriority, BadgeTone> = {
	Low: "default",
	Normal: "default",
	High: "warning",
	Urgent: "error",
};

export const taskViews: { label: string; value: TaskView }[] = [
	{ label: "Mine", value: "mine" },
	{ label: "Team", value: "team" },
	{ label: "Completed", value: "completed" },
];
