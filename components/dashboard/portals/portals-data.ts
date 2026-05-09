export type PortalTone = "healthy" | "attention" | "blocked";

export type Portal = {
	id: string;
	name: string;
	project: string;
	status: string;
	statusDetail: string;
	visibility: string;
	updated: string;
	engagement: string;
	metrics: string[];
	action: string;
	activityTitle: string;
	activity: string[];
	latestAction: string;
	approvalState: string;
	tone: PortalTone;
	clientHref?: string;
	preview: {
		type: "homepage" | "brand" | "launch" | "content";
		label: string;
	};
};

export const portals: Portal[] = [
	{
		id: "homepage-review",
		name: "Homepage Review",
		project: "Acme Website Redesign",
		status: "Awaiting approval",
		statusDetail: "Waiting on homepage approval",
		visibility: "Viewed 3 times today",
		updated: "Last updated yesterday",
		engagement: "Dana Ellis + Marcus Chen viewed latest revision",
		metrics: ["12 opens", "3m avg review", "Viewed 2h ago"],
		action: "Open portal",
		activityTitle: "Homepage Review",
		activity: [
			"Opened today at 2:14 PM",
			"Viewed by Dana Ellis",
			"Viewed by Marcus Chen",
		],
		latestAction: "Comment left on mobile navigation",
		approvalState: "Awaiting approval",
		tone: "attention",
		preview: {
			type: "homepage",
			label: "Homepage",
		},
	},
	{
		id: "brand-room",
		name: "Brand Room",
		project: "Luma Works Identity",
		status: "Recently viewed",
		statusDetail: "Approved brand system is live",
		visibility: "Viewed today",
		updated: "Last updated 4h ago",
		engagement: "Ella Brooks downloaded the logo package",
		metrics: ["18 opens", "4 downloads", "Viewed 48m ago"],
		action: "Open portal",
		activityTitle: "Brand Room",
		activity: [
			"Opened today at 9:31 AM",
			"Viewed by Ella Brooks",
			"Logo package downloaded",
		],
		latestAction: "Brand guidelines approved",
		approvalState: "Approved",
		tone: "healthy",
		preview: {
			type: "brand",
			label: "Brand",
		},
	},
	{
		id: "launch-handoff",
		name: "Launch Handoff",
		project: "Forge Fitness Launch",
		status: "Waiting on assets",
		statusDetail: "Product photography still needed",
		visibility: "No stakeholder activity in 5 days",
		updated: "Last updated May 4",
		engagement: "Client has not opened the upload request",
		metrics: ["2 opens", "0 uploads", "Viewed 5d ago"],
		action: "Open portal",
		activityTitle: "Launch Handoff",
		activity: [
			"Upload request sent May 4",
			"Viewed by project owner",
			"No new client activity",
		],
		latestAction: "Assets request sent for product photography",
		approvalState: "Waiting on assets",
		tone: "blocked",
		preview: {
			type: "launch",
			label: "Launch",
		},
	},
	{
		id: "content-review",
		name: "Content Review",
		project: "Nova Services Refresh",
		status: "Recently viewed",
		statusDetail: "Copy review is in progress",
		visibility: "Commented yesterday",
		updated: "Last updated 2 days ago",
		engagement: "Priya Shah left 6 comments on service page copy",
		metrics: ["9 opens", "6 comments", "Viewed yesterday"],
		action: "Open portal",
		activityTitle: "Content Review",
		activity: [
			"Opened yesterday at 4:42 PM",
			"Viewed by Priya Shah",
			"Six copy comments added",
		],
		latestAction: "Comment left on pricing section language",
		approvalState: "Review in progress",
		tone: "healthy",
		preview: {
			type: "content",
			label: "Copy",
		},
	},
];

export const portalSummary = [
	{ value: "3", label: "Active portals" },
	{ value: "14", label: "Views today" },
	{ value: "2", label: "Pending approvals" },
];
