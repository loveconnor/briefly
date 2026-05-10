import {
	ArchiveRestoreIcon,
	BellRingIcon,
	Clock3Icon,
	FileCheck2Icon,
	FileTextIcon,
	FlagIcon,
	MailCheckIcon,
	RefreshCcwIcon,
	ShieldCheckIcon,
	SparklesIcon,
	TimerResetIcon,
	UploadCloudIcon,
	type LucideIcon,
} from "lucide-react";

export type AutomationCategory =
	| "approval-reminders"
	| "weekly-updates"
	| "status-changes"
	| "internal-workflows";

export type AutomationStatus = "active" | "paused" | "needs-attention";

export type AutomationRun = {
	date: string;
	person: string;
	result: string;
	status: "delivered" | "opened" | "waiting" | "failed";
};

export type Automation = {
	slug: string;
	name: string;
	category: AutomationCategory;
	description: string;
	rule: string;
	status: AutomationStatus;
	runsPerMonth: number;
	lastTriggered: string;
	icon: LucideIcon;
	trigger: string;
	delay: string;
	appliesTo: string[];
	actions: string[];
	conditions: string[];
	recentRuns: AutomationRun[];
	performance: string[];
	scope: string[];
	notifications: string[];
	failures: string;
	explanation: string;
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

export const automations: Automation[] = [
	{
		slug: "client-approval-follow-up",
		name: "Client approval follow-up",
		category: "approval-reminders",
		description: "Automatically follows up on stalled client approvals.",
		rule: "If approval has no response after 3 days, send follow-up reminder.",
		status: "active",
		runsPerMonth: 18,
		lastTriggered: "2h ago",
		icon: BellRingIcon,
		trigger: "Approval remains pending",
		delay: "3 days",
		appliesTo: ["Homepage review", "Launch signoff", "Final brand direction"],
		actions: ["Send reminder email", "Notify project owner", "Add activity log entry"],
		conditions: ["approval unopened", "project active", "client access enabled"],
		recentRuns: [
			{ date: "Today", person: "Dana Ellis", result: "Delivered", status: "delivered" },
			{ date: "Yesterday", person: "Marcus Chen", result: "Opened after reminder", status: "opened" },
			{ date: "Monday", person: "Ava Stone", result: "Delivered", status: "delivered" },
		],
		performance: [
			"Triggered 28 times this month",
			"61% response rate after reminder",
			"Average approval completion is 1.4 days faster",
		],
		scope: ["Website redesign templates", "Branding projects", "Launch workflows"],
		notifications: ["Email enabled", "Activity feed enabled", "Slack disabled"],
		failures: "0 failed runs",
		explanation:
			"This automation reminds stakeholders when approvals are stalled for over 3 days.",
	},
	{
		slug: "weekly-client-recap",
		name: "Weekly client recap",
		category: "weekly-updates",
		description: "Delivers a calm weekly progress summary to active clients.",
		rule: "Every Friday at 10 AM, send a client recap for active projects.",
		status: "active",
		runsPerMonth: 24,
		lastTriggered: "14m ago",
		icon: FileTextIcon,
		trigger: "Friday weekly update window",
		delay: "10:00 AM local workspace time",
		appliesTo: ["Active retainers", "Website projects", "Brand systems"],
		actions: ["Send weekly update", "Include completed milestones", "List next decisions"],
		conditions: ["project active", "client has portal access", "at least one update this week"],
		recentRuns: [
			{ date: "Today", person: "Acme Studio", result: "Delivered", status: "delivered" },
			{ date: "Today", person: "Northline Co.", result: "Delivered", status: "delivered" },
			{ date: "Last Friday", person: "Vela Labs", result: "Opened", status: "opened" },
		],
		performance: [
			"Triggered 34 times this month",
			"79% client open rate",
			"12 fewer manual update requests",
		],
		scope: ["Monthly retainers", "Website delivery", "SEO campaigns"],
		notifications: ["Email enabled", "Activity feed enabled", "Slack disabled"],
		failures: "Last failure: SMTP timeout 4d ago",
		explanation:
			"This automation sends a clear weekly recap so clients know what changed and what is next.",
	},
	{
		slug: "awaiting-approval-status",
		name: "Awaiting approval status",
		category: "status-changes",
		description: "Keeps project status aligned with active approval requests.",
		rule: "When a review request is sent, change the project status to Awaiting approval.",
		status: "active",
		runsPerMonth: 12,
		lastTriggered: "3h ago",
		icon: RefreshCcwIcon,
		trigger: "Review request sent",
		delay: "Immediately",
		appliesTo: ["Design reviews", "Copy reviews", "Launch reviews"],
		actions: ["Set status to Awaiting approval", "Post status note", "Notify owner"],
		conditions: ["project not paused", "request has client recipient", "approval step is required"],
		recentRuns: [
			{ date: "Today", person: "Gym Launch", result: "Status updated", status: "delivered" },
			{ date: "Yesterday", person: "Nova Redesign", result: "Status updated", status: "delivered" },
			{ date: "Tuesday", person: "Acme Website", result: "Status updated", status: "delivered" },
		],
		performance: [
			"Triggered 19 times this month",
			"94% status accuracy across active projects",
			"8 fewer manual project status edits",
		],
		scope: ["Website delivery", "Brand identity", "Launch workflows"],
		notifications: ["Activity feed enabled", "Owner notification enabled", "Email disabled"],
		failures: "0 failed runs",
		explanation:
			"This automation makes status changes visible when client approval becomes the next dependency.",
	},
	{
		slug: "launch-checklist-unlock",
		name: "Launch checklist unlock",
		category: "internal-workflows",
		description: "Unlocks internal launch tasks after required approvals clear.",
		rule: "When final signoff is approved, unlock launch preparation tasks.",
		status: "active",
		runsPerMonth: 8,
		lastTriggered: "1h ago",
		icon: FileCheck2Icon,
		trigger: "Final signoff approved",
		delay: "Immediately",
		appliesTo: ["Launch signoff", "QA approval"],
		actions: ["Unlock launch checklist", "Assign launch owner", "Add activity log entry"],
		conditions: ["all required approvals complete", "project active", "launch date exists"],
		recentRuns: [
			{ date: "Today", person: "Vela Labs", result: "Checklist unlocked", status: "delivered" },
			{ date: "Last week", person: "Northline Co.", result: "Checklist unlocked", status: "delivered" },
			{ date: "Last week", person: "Aster Works", result: "Waiting on signoff", status: "waiting" },
		],
		performance: [
			"Triggered 9 times this month",
			"100% launch owner assignment rate",
			"2.1 days faster launch preparation start",
		],
		scope: ["Launch workflows", "Website delivery"],
		notifications: ["Activity feed enabled", "Owner notification enabled", "Email disabled"],
		failures: "0 failed runs",
		explanation:
			"This automation opens launch work only after final approval is complete.",
	},
	{
		slug: "missing-asset-follow-up",
		name: "Missing asset follow-up",
		category: "approval-reminders",
		description: "Requests missing client assets before they slow delivery.",
		rule: "If requested assets are missing after 2 days, send a follow-up request.",
		status: "needs-attention",
		runsPerMonth: 14,
		lastTriggered: "6h ago",
		icon: UploadCloudIcon,
		trigger: "Asset request remains incomplete",
		delay: "2 days",
		appliesTo: ["Content collection", "Brand assets", "Launch assets"],
		actions: ["Send asset reminder", "Notify project owner", "Mark request as waiting"],
		conditions: ["request still open", "client access enabled", "project active"],
		recentRuns: [
			{ date: "Today", person: "Luna Cafe", result: "Reminder delivered", status: "delivered" },
			{ date: "Yesterday", person: "Acme Studio", result: "No response yet", status: "waiting" },
			{ date: "Monday", person: "Bento Supply", result: "Reminder delivered", status: "delivered" },
		],
		performance: [
			"Triggered 22 times this month",
			"48% upload rate after reminder",
			"3 asset requests still unopened",
		],
		scope: ["Website delivery", "Branding projects", "Launch workflows"],
		notifications: ["Email enabled", "Activity feed enabled", "Owner notification enabled"],
		failures: "3 approvals have not been opened",
		explanation:
			"This automation follows up on missing assets before delivery work stalls.",
	},
	{
		slug: "proposal-inactivity-warning",
		name: "Proposal inactivity warning",
		category: "internal-workflows",
		description: "Flags proposals that have gone quiet after client viewing.",
		rule: "If a proposal is viewed but unsigned for 5 days, notify the owner.",
		status: "paused",
		runsPerMonth: 5,
		lastTriggered: "9d ago",
		icon: TimerResetIcon,
		trigger: "Proposal viewed but unsigned",
		delay: "5 days",
		appliesTo: ["New business proposals", "Retainer renewals"],
		actions: ["Notify owner", "Add follow-up task"],
		conditions: ["proposal not signed", "opportunity still open", "client viewed proposal"],
		recentRuns: [
			{ date: "Last week", person: "Parker Lee", result: "Owner notified", status: "delivered" },
			{ date: "Last week", person: "Mira Studio", result: "Owner notified", status: "delivered" },
			{ date: "Apr 28", person: "Orbit Co.", result: "Paused before run", status: "waiting" },
		],
		performance: [
			"Triggered 7 times this month",
			"3 proposals recovered after follow-up",
			"Paused by Connor Love",
		],
		scope: ["Proposal templates", "Retainer renewals"],
		notifications: ["Owner notification enabled", "Email disabled", "Activity feed enabled"],
		failures: "0 failed runs",
		explanation:
			"This automation keeps proposal follow-up visible without sending client-facing messages.",
	},
];

export const recentActivity = [
	{
		automationSlug: "client-approval-follow-up",
		icon: BellRingIcon,
		title: "Approval reminder sent to Dana Ellis",
		time: "2m ago",
		status: "Delivered",
		tone: "success",
	},
	{
		automationSlug: "weekly-client-recap",
		icon: MailCheckIcon,
		title: "Weekly update delivered to Acme Studio",
		time: "14m ago",
		status: "Sent",
		tone: "success",
	},
	{
		automationSlug: "launch-checklist-unlock",
		icon: ArchiveRestoreIcon,
		title: "Launch checklist unlocked",
		time: "1h ago",
		status: "Done",
		tone: "success",
	},
	{
		automationSlug: "awaiting-approval-status",
		icon: RefreshCcwIcon,
		title: 'Status changed to "Awaiting approval"',
		time: "3h ago",
		status: "Updated",
		tone: "info",
	},
];

export const attentionItems = [
	{
		icon: Clock3Icon,
		title: "3 approvals have not been opened",
		description: "Last reminder sent 2 days ago",
		tone: "warning",
	},
	{
		icon: FlagIcon,
		title: "Weekly update failed",
		description: "SMTP disconnected",
		tone: "error",
	},
	{
		icon: ShieldCheckIcon,
		title: "Launch checklist delayed",
		description: "Waiting on final signoff",
		tone: "warning",
	},
];

export const templates = [
	{ icon: BellRingIcon, name: "Client approval follow-up" },
	{ icon: FileTextIcon, name: "Weekly client recap" },
	{ icon: TimerResetIcon, name: "Project stalled warning" },
	{ icon: FileCheck2Icon, name: "Launch preparation reminder" },
	{ icon: UploadCloudIcon, name: "Missing asset follow-up" },
	{ icon: SparklesIcon, name: "Proposal inactivity reminder" },
];
