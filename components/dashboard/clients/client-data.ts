import {
	AlertTriangleIcon,
	CheckCircle2Icon,
	Clock3Icon,
	PauseCircleIcon,
} from "lucide-react";

export type ClientStatus =
	| "Active"
	| "Waiting"
	| "Blocked"
	| "Paused"
	| "Completed"
	| "Archived";

export type ClientHealth = "Healthy" | "Needs attention" | "At risk" | "Blocked";

export type ClientRecord = {
	slug: string;
	name: string;
	initials: string;
	status: ClientStatus;
	health: ClientHealth;
	healthDetail: string;
	activeProjects: number;
	waitingOn: string;
	lastActivity: string;
	nextDeliverable: string;
	portalActivity: string;
	portalTone: "good" | "quiet" | "stale";
	responseTime: string;
	projects: {
		name: string;
		phase: string;
		status: string;
		progress: number;
		blocker: string;
	}[];
	timeline: {
		event: string;
		time: string;
		type: "approval" | "upload" | "portal" | "request" | "update";
	}[];
	requests: {
		title: string;
		owner: string;
		due: string;
		status: string;
	}[];
	deliverables: {
		title: string;
		date: string;
		state: string;
	}[];
	updates: string[];
};

export const clientStatusOptions: Array<ClientStatus | "All"> = [
	"All",
	"Active",
	"Waiting",
	"Blocked",
	"Paused",
	"Completed",
	"Archived",
];

export const clients: ClientRecord[] = [
	{
		slug: "acme-studio",
		name: "Acme Studio",
		initials: "AS",
		status: "Active",
		health: "Healthy",
		healthDetail: "Portal viewed today and homepage approval cleared.",
		activeProjects: 3,
		waitingOn: "No blockers",
		lastActivity: "2 hours ago",
		nextDeliverable: "SEO audit · Friday",
		portalActivity: "Portal viewed today",
		portalTone: "good",
		responseTime: "Usually replies same day",
		projects: [
			{
				name: "Website refresh",
				phase: "Review",
				status: "Moving",
				progress: 78,
				blocker: "None",
			},
			{
				name: "SEO foundation",
				phase: "Audit",
				status: "On track",
				progress: 42,
				blocker: "None",
			},
		],
		timeline: [
			{ event: "Homepage approved", time: "2 hours ago", type: "approval" },
			{ event: "Portal viewed", time: "Today", type: "portal" },
			{ event: "Weekly summary sent", time: "Yesterday", type: "update" },
		],
		requests: [
			{
				title: "Approve service page copy",
				owner: "Acme Studio",
				due: "Tomorrow",
				status: "Open",
			},
		],
		deliverables: [
			{ title: "SEO audit", date: "Friday", state: "Scheduled" },
			{ title: "Service page wireframes", date: "Next Tuesday", state: "Drafting" },
		],
		updates: ["Weekly progress summary", "Homepage review notes"],
	},
	{
		slug: "nova-cafe",
		name: "Nova Cafe",
		initials: "NC",
		status: "Waiting",
		health: "At risk",
		healthDetail: "Waiting on menu assets for 6 days.",
		activeProjects: 2,
		waitingOn: "Menu photography",
		lastActivity: "6 days ago",
		nextDeliverable: "Launch checklist · Monday",
		portalActivity: "No portal activity in 5 days",
		portalTone: "stale",
		responseTime: "Replies after reminders",
		projects: [
			{
				name: "Local launch site",
				phase: "Content",
				status: "Waiting",
				progress: 54,
				blocker: "Menu photography",
			},
			{
				name: "Reservation flow",
				phase: "Build",
				status: "Moving",
				progress: 66,
				blocker: "None",
			},
		],
		timeline: [
			{ event: "Asset request sent", time: "6 days ago", type: "request" },
			{ event: "Launch checklist shared", time: "Last week", type: "update" },
			{ event: "Portal viewed", time: "5 days ago", type: "portal" },
		],
		requests: [
			{
				title: "Upload menu photography",
				owner: "Nova Cafe",
				due: "Overdue",
				status: "Waiting",
			},
			{
				title: "Confirm opening hours",
				owner: "Nova Cafe",
				due: "Friday",
				status: "Open",
			},
		],
		deliverables: [
			{ title: "Launch checklist", date: "Monday", state: "Blocked by assets" },
			{ title: "Reservation QA", date: "Next Wednesday", state: "Queued" },
		],
		updates: ["Asset reminder", "Launch readiness summary"],
	},
	{
		slug: "northline-fitness",
		name: "Northline Fitness",
		initials: "NF",
		status: "Blocked",
		health: "Blocked",
		healthDetail: "Brand assets are overdue and campaign pages cannot move.",
		activeProjects: 1,
		waitingOn: "Brand assets",
		lastActivity: "9 days ago",
		nextDeliverable: "Campaign page review · Blocked",
		portalActivity: "Has not viewed portal in 9 days",
		portalTone: "stale",
		responseTime: "Unresponsive this week",
		projects: [
			{
				name: "Summer campaign",
				phase: "Assets",
				status: "Blocked",
				progress: 31,
				blocker: "Brand assets",
			},
		],
		timeline: [
			{ event: "Revision requested", time: "9 days ago", type: "request" },
			{ event: "Asset upload link sent", time: "9 days ago", type: "update" },
			{ event: "Portal viewed", time: "9 days ago", type: "portal" },
		],
		requests: [
			{
				title: "Upload campaign brand assets",
				owner: "Northline Fitness",
				due: "Overdue",
				status: "Blocked",
			},
		],
		deliverables: [
			{ title: "Campaign page review", date: "Blocked", state: "Blocked" },
		],
		updates: ["Blocked status update", "Asset reminder"],
	},
	{
		slug: "brightpath-law",
		name: "BrightPath Law",
		initials: "BL",
		status: "Active",
		health: "Needs attention",
		healthDetail: "Intake form feedback is open and due tomorrow.",
		activeProjects: 2,
		waitingOn: "Intake form feedback",
		lastActivity: "Yesterday",
		nextDeliverable: "Practice pages · Thursday",
		portalActivity: "Viewed latest revision",
		portalTone: "good",
		responseTime: "Usually replies within 24 hours",
		projects: [
			{
				name: "Practice area pages",
				phase: "Copy review",
				status: "Needs attention",
				progress: 61,
				blocker: "Intake form feedback",
			},
		],
		timeline: [
			{ event: "Viewed latest revision", time: "Yesterday", type: "portal" },
			{ event: "Practice page copy shared", time: "2 days ago", type: "update" },
			{ event: "Assets uploaded", time: "4 days ago", type: "upload" },
		],
		requests: [
			{
				title: "Review intake form questions",
				owner: "BrightPath Law",
				due: "Tomorrow",
				status: "Open",
			},
		],
		deliverables: [
			{ title: "Practice pages", date: "Thursday", state: "In review" },
		],
		updates: ["Copy review packet", "Portal share"],
	},
	{
		slug: "fieldstone-builders",
		name: "Fieldstone Builders",
		initials: "FB",
		status: "Paused",
		health: "Healthy",
		healthDetail: "Paused intentionally until Q3 planning starts.",
		activeProjects: 0,
		waitingOn: "No blockers",
		lastActivity: "3 days ago",
		nextDeliverable: "Q3 roadmap · June 12",
		portalActivity: "Reviewed launch checklist",
		portalTone: "quiet",
		responseTime: "Replies when work is active",
		projects: [
			{
				name: "Q3 roadmap",
				phase: "Paused",
				status: "Paused",
				progress: 12,
				blocker: "Scheduled pause",
			},
		],
		timeline: [
			{ event: "Reviewed launch checklist", time: "3 days ago", type: "portal" },
			{ event: "Roadmap moved to June", time: "Last week", type: "update" },
		],
		requests: [],
		deliverables: [
			{ title: "Q3 roadmap", date: "June 12", state: "Scheduled" },
		],
		updates: ["Pause summary", "Next-phase roadmap"],
	},
	{
		slug: "lumen-interiors",
		name: "Lumen Interiors",
		initials: "LI",
		status: "Completed",
		health: "Healthy",
		healthDetail: "Launch completed and final handoff was viewed.",
		activeProjects: 0,
		waitingOn: "No blockers",
		lastActivity: "Last week",
		nextDeliverable: "Post-launch review · May 24",
		portalActivity: "Final handoff viewed",
		portalTone: "good",
		responseTime: "Project complete",
		projects: [
			{
				name: "Portfolio launch",
				phase: "Complete",
				status: "Complete",
				progress: 100,
				blocker: "None",
			},
		],
		timeline: [
			{ event: "Final handoff viewed", time: "Last week", type: "portal" },
			{ event: "Launch approved", time: "Last week", type: "approval" },
			{ event: "Files delivered", time: "Last week", type: "upload" },
		],
		requests: [],
		deliverables: [
			{ title: "Post-launch review", date: "May 24", state: "Scheduled" },
		],
		updates: ["Launch summary", "Final handoff"],
	},
];

export function getClient(slug: string) {
	return clients.find((client) => client.slug === slug);
}

export function getStatusIcon(status: ClientStatus) {
	if (status === "Blocked") return AlertTriangleIcon;
	if (status === "Waiting") return Clock3Icon;
	if (status === "Paused") return PauseCircleIcon;
	return CheckCircle2Icon;
}
