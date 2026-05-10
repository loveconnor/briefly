import type { AutomationCategory } from "./automations-data";

export type AutomationFilter = AutomationCategory | "all" | "paused";

export const statusLabel = {
	active: "Active",
	paused: "Paused",
	"needs-attention": "Needs attention",
} as const;

export const statusClass = {
	active: "text-success-foreground",
	paused: "text-muted-foreground",
	"needs-attention": "text-warning-foreground",
} as const;

export const runStatusClass = {
	delivered: "text-success-foreground",
	opened: "text-info-foreground",
	waiting: "text-warning-foreground",
	failed: "text-destructive-foreground",
} as const;
