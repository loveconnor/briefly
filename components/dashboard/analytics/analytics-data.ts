import type { LucideIcon } from "lucide-react";
import {
	CheckIcon,
	DownloadIcon,
	EyeIcon,
	MessageSquareTextIcon,
	MousePointerClickIcon,
	UploadIcon,
} from "lucide-react";

export type PortalStatus = "Awaiting approval" | "In review" | "Stalled" | "Approved";

export type SortKey =
	| "portal"
	| "status"
	| "views"
	| "avgReviewTime"
	| "downloads"
	| "comments"
	| "lastActivity"
	| "conversion";

export type PortalPerformance = {
	id: string;
	portal: string;
	client: string;
	category: "website" | "brand" | "launch";
	status: PortalStatus;
	views: number;
	avgReviewTime: number;
	reviewLabel: string;
	downloads: number;
	comments: number;
	lastActivity: string;
	lastActivityRank: number;
	conversion: "Pending" | "Approved" | "Blocked" | "Converted";
};

export type ActivityItem = {
	person: string;
	action: string;
	time: string;
	icon: LucideIcon;
};

export const timelineData = [
	{ day: "Mon", opens: 18, comments: 4, downloads: 2, approvals: 1, uploads: 1 },
	{ day: "Tue", opens: 24, comments: 5, downloads: 3, approvals: 0, uploads: 2 },
	{ day: "Wed", opens: 31, comments: 9, downloads: 4, approvals: 2, uploads: 1 },
	{ day: "Thu", opens: 28, comments: 6, downloads: 6, approvals: 1, uploads: 3 },
	{ day: "Fri", opens: 46, comments: 13, downloads: 7, approvals: 3, uploads: 2 },
	{ day: "Sat", opens: 37, comments: 7, downloads: 5, approvals: 2, uploads: 0 },
	{ day: "Sun", opens: 41, comments: 10, downloads: 8, approvals: 1, uploads: 1 },
];

export const timelineEvents = [
	{ day: "Wed", y: 31, event: "Homepage review sent" },
	{ day: "Fri", y: 46, event: "Client opened proposal" },
	{ day: "Sun", y: 41, event: "Brand package downloaded" },
];

export const activityFeed: ActivityItem[] = [
	{
		person: "Dana Ellis",
		action: "viewed Homepage Review",
		time: "2m ago",
		icon: EyeIcon,
	},
	{
		person: "Marcus Chen",
		action: "downloaded BrandAssets.zip",
		time: "8m ago",
		icon: DownloadIcon,
	},
	{
		person: "Priya Shah",
		action: "commented on Services Copy",
		time: "12m ago",
		icon: MessageSquareTextIcon,
	},
	{
		person: "Jon Bell",
		action: "uploaded final headshots",
		time: "21m ago",
		icon: UploadIcon,
	},
	{
		person: "Ava Stone",
		action: "approved Launch Checklist",
		time: "34m ago",
		icon: CheckIcon,
	},
	{
		person: "Mina Park",
		action: "opened Proposal V2",
		time: "48m ago",
		icon: MousePointerClickIcon,
	},
];

export const portalPerformance: PortalPerformance[] = [
	{
		id: "homepage-review",
		portal: "Homepage Review",
		client: "Acme Studio",
		category: "website",
		status: "Awaiting approval",
		views: 12,
		avgReviewTime: 3,
		reviewLabel: "3m",
		downloads: 4,
		comments: 2,
		lastActivity: "2h ago",
		lastActivityRank: 2,
		conversion: "Pending",
	},
	{
		id: "launch-hand-off",
		portal: "Launch Hand-off",
		client: "Northstar Labs",
		category: "launch",
		status: "Stalled",
		views: 0,
		avgReviewTime: 840,
		reviewLabel: "5.8d",
		downloads: 0,
		comments: 0,
		lastActivity: "6d ago",
		lastActivityRank: 144,
		conversion: "Blocked",
	},
	{
		id: "brand-package",
		portal: "Brand Package",
		client: "Nova Cafe",
		category: "brand",
		status: "In review",
		views: 18,
		avgReviewTime: 605,
		reviewLabel: "4.2d",
		downloads: 11,
		comments: 6,
		lastActivity: "5h ago",
		lastActivityRank: 5,
		conversion: "Pending",
	},
	{
		id: "proposal-v2",
		portal: "Proposal V2",
		client: "Atlas Club",
		category: "website",
		status: "Approved",
		views: 21,
		avgReviewTime: 128,
		reviewLabel: "2.1h",
		downloads: 3,
		comments: 4,
		lastActivity: "1d ago",
		lastActivityRank: 24,
		conversion: "Converted",
	},
	{
		id: "services-copy",
		portal: "Services Copy",
		client: "Mosaic",
		category: "website",
		status: "Awaiting approval",
		views: 9,
		avgReviewTime: 319,
		reviewLabel: "5.3h",
		downloads: 2,
		comments: 8,
		lastActivity: "42m ago",
		lastActivityRank: 0.7,
		conversion: "Pending",
	},
];

export const insights = [
	{
		label: "Most engaged client",
		value: "Acme Studio",
		detail: "18 opens this week, concentrated after proposal updates.",
	},
	{
		label: "Slowest review cycle",
		value: "Nova Cafe",
		detail: "Average response time is 4.2 days across brand review assets.",
	},
	{
		label: "Most downloaded asset",
		value: "BrandGuidelines.pdf",
		detail: "Downloaded 11 times by 4 stakeholders.",
	},
	{
		label: "Highest engagement portal",
		value: "Homepage Review",
		detail: "Spike followed the review reminder and revised header concept.",
	},
];

export const bottlenecks = [
	{
		signal: "3 approvals stalled over 5 days",
		detail: "Launch Hand-off, SEO Audit, and Content Freeze need follow-up.",
		tone: "danger",
	},
	{
		signal: "Launch Hand-off has not been viewed",
		detail: "Sent 6 days ago to two stakeholders with no client activity.",
		tone: "warning",
	},
	{
		signal: "Approval opened but no response",
		detail: "Services Copy has 8 comments but no decision owner assigned.",
		tone: "warning",
	},
	{
		signal: "Fastest approval this week",
		detail: "Proposal V2 moved from viewed to approved in 2.1 hours.",
		tone: "info",
	},
] as const;

export const momentum = [
	{
		label: "Engagement rising",
		detail: "+24% opens vs previous period",
		tone: "text-success-foreground",
	},
	{
		label: "Activity slowing",
		detail: "Brand Package comments down 18%",
		tone: "text-warning-foreground",
	},
	{
		label: "No stakeholder response",
		detail: "Launch Hand-off untouched for 6 days",
		tone: "text-destructive-foreground",
	},
];

export const funnel = [
	{ label: "Sent", value: 32, tone: "bg-info" },
	{ label: "Viewed", value: 27, tone: "bg-info" },
	{ label: "Commented", value: 14, tone: "bg-warning" },
	{ label: "Approved", value: 9, tone: "bg-success" },
];
