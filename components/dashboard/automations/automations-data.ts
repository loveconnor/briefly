import type { Automation, AutomationCategory, AutomationIcon, AutomationRun, AutomationStatus } from "@/lib/app-data";

export type {
	Automation,
	AutomationCategory,
	AutomationIcon,
	AutomationRun,
	AutomationStatus,
};

export const filterOptions: Array<{
	label: string;
	value: AutomationCategory | "all" | "paused";
}> = [
	{ label: "All", value: "all" },
	{ label: "Approval reminders", value: "approval-reminders" },
	{ label: "Weekly updates", value: "weekly-updates" },
	{ label: "Status changes", value: "status-changes" },
	{ label: "Internal workflows", value: "internal-workflows" },
	{ label: "Paused", value: "paused" },
];

export const categoryLabels: Record<AutomationCategory, string> = {
	"approval-reminders": "Approval reminders",
	"weekly-updates": "Weekly updates",
	"status-changes": "Status changes",
	"internal-workflows": "Internal workflows",
};
