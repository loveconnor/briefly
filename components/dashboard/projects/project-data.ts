import type { LucideIcon } from "lucide-react";

export type ProjectPhase =
	| "Strategy"
	| "Design"
	| "Development"
	| "QA"
	| "Launch"
	| "Complete";

export type ProjectStatus = "Active" | "Waiting" | "Blocked" | "Complete";

export type ProjectTaskStatus = "Ready" | "In progress" | "Waiting" | "Blocked";

export type Project = {
	slug: string;
	name: string;
	client: string;
	owner: string;
	started: string;
	timeline: string;
	budget: string;
	budgetUsed: string;
	budgetPercent: number;
	status: ProjectStatus;
	phase: ProjectPhase;
	due: string;
	summary: string;
	phaseDetail: string;
	deliverablesComplete: number;
	deliverablesTotal: number;
	risk: "Healthy" | "At risk" | "Blocked";
	riskDetail: string;
	phases: Array<{
		name: ProjectPhase;
		state: "complete" | "current" | "upcoming";
	}>;
	activeWork: Array<{
		title: string;
		status: ProjectTaskStatus;
		owner: string;
		due: string;
		detail: string;
	}>;
	upcomingDeliverables: Array<{
		title: string;
		due: string;
		phase: ProjectPhase;
		state: "On track" | "Needs approval" | "At risk";
	}>;
	blockers: Array<{
		title: string;
		waitingOn: string;
		since: string;
	}>;
	clientActivity: string[];
	team: Array<{
		name: string;
		role: string;
	}>;
	tasks: Array<{
		title: string;
		assignee: string;
		due: string;
		status: ProjectTaskStatus;
		blocker?: string;
	}>;
	timelineEvents: Array<{
		date: string;
		items: Array<{
			title: string;
			detail: string;
			time: string;
			type: "approval" | "upload" | "delivery" | "comment" | "phase";
		}>;
	}>;
	approvals: Array<{
		title: string;
		status: "Waiting" | "Approved" | "Changes requested";
		reviewer: string;
		waiting: string;
		asset: string;
		assetType: string;
		latestComment: string;
		updated: string;
	}>;
	deliverables: Array<{
		week: string;
		items: Array<{
			title: string;
			due: string;
			phase: ProjectPhase;
			status: "Scheduled" | "In progress" | "Waiting approval" | "Delivered";
		}>;
	}>;
	files: Array<{
		name: string;
		type: string;
		status: string;
		updated: string;
		owner: string;
	}>;
	activity: Array<{
		title: string;
		detail: string;
		time: string;
	}>;
	settings: Array<{
		label: string;
		value: string;
		action: string;
	}>;
};

export const projects: Project[] = [
	{
		slug: "acme-website",
		name: "Acme Website Redesign",
		client: "Acme",
		owner: "Connor",
		started: "Apr 2",
		timeline: "6 weeks",
		budget: "$12,500",
		budgetUsed: "$8,200",
		budgetPercent: 65,
		status: "Active",
		phase: "Design",
		due: "May 28",
		summary: "Homepage review waiting on approval.",
		phaseDetail: "3 of 5 deliverables complete",
		deliverablesComplete: 3,
		deliverablesTotal: 5,
		risk: "At risk",
		riskDetail: "Client response delayed 5 days.",
		phases: [
			{ name: "Strategy", state: "complete" },
			{ name: "Design", state: "current" },
			{ name: "Development", state: "upcoming" },
			{ name: "QA", state: "upcoming" },
			{ name: "Launch", state: "upcoming" },
			{ name: "Complete", state: "upcoming" },
		],
		activeWork: [
			{
				title: "Homepage design review",
				status: "Waiting",
				owner: "Acme",
				due: "Friday",
				detail: "Waiting on approval",
			},
			{
				title: "Services page copy",
				status: "In progress",
				owner: "Jordan",
				due: "Monday",
				detail: "First draft in review",
			},
			{
				title: "Mobile QA",
				status: "Blocked",
				owner: "Maya",
				due: "May 17",
				detail: "Blocked by brand photography",
			},
		],
		upcomingDeliverables: [
			{ title: "Homepage approval", due: "Friday", phase: "Design", state: "Needs approval" },
			{ title: "Development handoff", due: "Monday", phase: "Development", state: "On track" },
			{ title: "Launch checklist", due: "May 28", phase: "Launch", state: "On track" },
		],
		blockers: [
			{ title: "Homepage approval", waitingOn: "Dana at Acme", since: "3 days" },
			{ title: "Brand photography", waitingOn: "Client upload", since: "5 days" },
		],
		clientActivity: [
			"Viewed portal yesterday",
			"Commented on homepage",
			"Uploaded logo assets",
		],
		team: [
			{ name: "Connor", role: "Lead" },
			{ name: "Maya", role: "Design" },
			{ name: "Jordan", role: "Copy" },
		],
		tasks: [
			{ title: "Homepage wireframes", assignee: "Maya", due: "Tomorrow", status: "Waiting", blocker: "Client approval" },
			{ title: "Mobile responsiveness QA", assignee: "Connor", due: "Friday", status: "Blocked", blocker: "Brand assets" },
			{ title: "Launch redirect setup", assignee: "Connor", due: "May 24", status: "Ready" },
			{ title: "Services page copy pass", assignee: "Jordan", due: "Monday", status: "In progress" },
			{ title: "Portal update draft", assignee: "Connor", due: "Today", status: "Ready" },
		],
		timelineEvents: [
			{
				date: "Today",
				items: [
					{ title: "Homepage review entered approval", detail: "Design review is now waiting on Acme decision.", time: "2h ago", type: "approval" },
					{ title: "Services copy moved into review", detail: "Copy is ready for internal pass before client share.", time: "4h ago", type: "delivery" },
				],
			},
			{
				date: "Yesterday",
				items: [
					{ title: "Wireframes delivered", detail: "Homepage and services wireframes marked delivered.", time: "3:42 PM", type: "delivery" },
					{ title: "Launch schedule adjusted", detail: "Development handoff moved to Monday.", time: "10:15 AM", type: "phase" },
				],
			},
			{
				date: "Monday",
				items: [
					{ title: "Project moved to Design", detail: "Strategy phase completed by Connor", time: "9:30 AM", type: "phase" },
				],
			},
		],
		approvals: [
			{ title: "Homepage design review", status: "Waiting", reviewer: "Dana at Acme", waiting: "Waiting 3 days", asset: "Homepage Preview.png", assetType: "PNG", latestComment: "Hero section still feels crowded.", updated: "May 7" },
			{ title: "Logo concepts", status: "Approved", reviewer: "Marcus at Acme", waiting: "Approved yesterday", asset: "Logo Concepts.pdf", assetType: "PDF", latestComment: "Approved concept B for launch direction.", updated: "May 8" },
			{ title: "Services page copy", status: "Changes requested", reviewer: "Dana at Acme", waiting: "Updated 2 days ago", asset: "Copy deck.pdf", assetType: "PDF", latestComment: "Needs a clearer CTA before final approval.", updated: "May 6" },
		],
		deliverables: [
			{
				week: "This week",
				items: [
					{ title: "Homepage review", due: "Friday", phase: "Design", status: "Waiting approval" },
					{ title: "Services copy", due: "Monday", phase: "Design", status: "In progress" },
				],
			},
			{
				week: "May 20 - May 28",
				items: [
					{ title: "Development handoff", due: "May 21", phase: "Development", status: "Scheduled" },
					{ title: "Launch assets", due: "May 28", phase: "Launch", status: "Scheduled" },
				],
			},
		],
		files: [
			{ name: "Homepage Preview.png", type: "Design", status: "Needs approval", updated: "May 7", owner: "Connor" },
			{ name: "Brand assets.zip", type: "Assets", status: "Awaiting review", updated: "2h ago", owner: "Jordan" },
			{ name: "Copy deck.pdf", type: "Copy", status: "Missing feedback", updated: "Yesterday", owner: "Maya" },
			{ name: "Launch checklist.pdf", type: "Handoff", status: "Ready", updated: "May 5", owner: "Connor" },
		],
		activity: [
			{ title: "Dana commented on homepage", detail: "Asked to reduce the hero copy length.", time: "2h ago" },
			{ title: "Jordan uploaded brand photography", detail: "8 new image assets added to project files.", time: "Yesterday" },
			{ title: "Maya completed wireframe updates", detail: "Services and about pages moved to design review.", time: "Yesterday" },
			{ title: "Connor changed project phase", detail: "Strategy moved to complete, Design is now active.", time: "Monday" },
			{ title: "Acme uploaded logo assets", detail: "New SVG and PNG exports available in files.", time: "May 5" },
		],
		settings: [
			{ label: "Client access", value: "Portal enabled for Dana and Marcus", action: "Manage access" },
			{ label: "Project status", value: "Active, visible to client", action: "Change status" },
			{ label: "Billing", value: "$12,500 fixed project", action: "Edit billing" },
			{ label: "Notifications", value: "Approval reminders every 48 hours", action: "Configure" },
			{ label: "Archive", value: "Keep project active until launch handoff", action: "Archive project" },
		],
	},
	{
		slug: "nova-redesign",
		name: "Nova Redesign",
		client: "Nova Studio",
		owner: "Connor",
		started: "Apr 18",
		timeline: "4 weeks",
		budget: "$9,800",
		budgetUsed: "$5,900",
		budgetPercent: 60,
		status: "Active",
		phase: "Development",
		due: "May 22",
		summary: "Development handoff is moving; copy QA is next.",
		phaseDetail: "4 of 6 deliverables complete",
		deliverablesComplete: 4,
		deliverablesTotal: 6,
		risk: "Healthy",
		riskDetail: "Handoff accepted and client response is within SLA.",
		phases: [
			{ name: "Strategy", state: "complete" },
			{ name: "Design", state: "complete" },
			{ name: "Development", state: "current" },
			{ name: "QA", state: "upcoming" },
			{ name: "Launch", state: "upcoming" },
			{ name: "Complete", state: "upcoming" },
		],
		activeWork: [
			{ title: "CMS collection build", status: "In progress", owner: "Connor", due: "Tomorrow", detail: "Case study model in progress" },
			{ title: "Copy QA", status: "Ready", owner: "Jordan", due: "Friday", detail: "Ready after CMS structure lands" },
		],
		upcomingDeliverables: [
			{ title: "CMS preview", due: "Friday", phase: "Development", state: "On track" },
			{ title: "QA pass", due: "May 19", phase: "QA", state: "On track" },
		],
		blockers: [],
		clientActivity: ["Approved handoff yesterday", "Viewed staging link", "Resolved 2 comments"],
		team: [
			{ name: "Connor", role: "Lead" },
			{ name: "Jordan", role: "Copy" },
		],
		tasks: [
			{ title: "CMS collection build", assignee: "Connor", due: "Tomorrow", status: "In progress" },
			{ title: "Staging deployment", assignee: "Connor", due: "Friday", status: "Ready" },
			{ title: "Copy QA", assignee: "Jordan", due: "Friday", status: "Ready" },
		],
		timelineEvents: [
			{ date: "Today", items: [{ title: "CMS build started", detail: "Project moved into implementation.", time: "11:00 AM", type: "phase" }] },
			{ date: "Yesterday", items: [{ title: "Design handoff approved", detail: "Development phase is unblocked.", time: "2:20 PM", type: "approval" }] },
		],
		approvals: [
			{ title: "Design handoff", status: "Approved", reviewer: "Ella at Nova", waiting: "Approved yesterday", asset: "Handoff.pdf", assetType: "PDF", latestComment: "Approved for development.", updated: "May 8" },
		],
		deliverables: [
			{ week: "This week", items: [{ title: "CMS preview", due: "Friday", phase: "Development", status: "In progress" }] },
			{ week: "Next week", items: [{ title: "QA pass", due: "May 19", phase: "QA", status: "Scheduled" }] },
		],
		files: [
			{ name: "Handoff.pdf", type: "Handoff", status: "Approved", updated: "Yesterday", owner: "Connor" },
			{ name: "CMS schema.csv", type: "Data", status: "Ready", updated: "Today", owner: "Connor" },
		],
		activity: [
			{ title: "Ella approved design handoff", detail: "Project moved to Development.", time: "Yesterday" },
			{ title: "Connor created staging environment", detail: "Preview link added internally.", time: "Today" },
		],
		settings: [
			{ label: "Client access", value: "Portal enabled for Ella", action: "Manage access" },
			{ label: "Project status", value: "Active, visible to client", action: "Change status" },
			{ label: "Billing", value: "$9,800 fixed project", action: "Edit billing" },
		],
	},
	{
		slug: "gym-launch",
		name: "Gym Launch",
		client: "Forge Fitness",
		owner: "Maya",
		started: "May 1",
		timeline: "3 weeks",
		budget: "$6,400",
		budgetUsed: "$2,100",
		budgetPercent: 33,
		status: "Blocked",
		phase: "Strategy",
		due: "May 30",
		summary: "Offer direction is blocked until the intake is complete.",
		phaseDetail: "1 of 4 deliverables complete",
		deliverablesComplete: 1,
		deliverablesTotal: 4,
		risk: "Blocked",
		riskDetail: "Client intake is incomplete and launch scope is not approved.",
		phases: [
			{ name: "Strategy", state: "current" },
			{ name: "Design", state: "upcoming" },
			{ name: "Development", state: "upcoming" },
			{ name: "QA", state: "upcoming" },
			{ name: "Launch", state: "upcoming" },
			{ name: "Complete", state: "upcoming" },
		],
		activeWork: [
			{ title: "Launch offer outline", status: "Blocked", owner: "Maya", due: "Today", detail: "Needs completed intake" },
			{ title: "Landing page sitemap", status: "Ready", owner: "Connor", due: "Monday", detail: "Ready after offer outline" },
		],
		upcomingDeliverables: [
			{ title: "Offer approval", due: "Monday", phase: "Strategy", state: "At risk" },
			{ title: "Landing page wireframes", due: "May 17", phase: "Design", state: "On track" },
		],
		blockers: [{ title: "Client intake", waitingOn: "Forge Fitness", since: "4 days" }],
		clientActivity: ["Opened intake form yesterday", "No uploads received"],
		team: [
			{ name: "Maya", role: "Lead" },
			{ name: "Connor", role: "Build" },
		],
		tasks: [
			{ title: "Launch offer outline", assignee: "Maya", due: "Today", status: "Blocked", blocker: "Client intake" },
			{ title: "Landing page sitemap", assignee: "Connor", due: "Monday", status: "Ready" },
		],
		timelineEvents: [
			{ date: "Yesterday", items: [{ title: "Strategy phase blocked", detail: "Offer direction is waiting on completed intake.", time: "5:10 PM", type: "phase" }] },
		],
		approvals: [
			{ title: "Launch offer", status: "Waiting", reviewer: "Forge Fitness", waiting: "Waiting 4 days", asset: "Offer outline", assetType: "DOC", latestComment: "Need confirmation on founding member discount.", updated: "May 5" },
		],
		deliverables: [
			{ week: "This week", items: [{ title: "Offer approval", due: "Monday", phase: "Strategy", status: "Waiting approval" }] },
		],
		files: [
			{ name: "Intake notes.docx", type: "Strategy", status: "Incomplete", updated: "Yesterday", owner: "Maya" },
		],
		activity: [
			{ title: "Maya requested intake completion", detail: "Reminder sent to project contact.", time: "Yesterday" },
		],
		settings: [
			{ label: "Client access", value: "Portal enabled for Forge owner", action: "Manage access" },
			{ label: "Project status", value: "Blocked, visible to client", action: "Change status" },
			{ label: "Notifications", value: "Daily intake reminders", action: "Configure" },
		],
	},
];

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export type EventIconMap = Record<Project["timelineEvents"][number]["items"][number]["type"], LucideIcon>;
