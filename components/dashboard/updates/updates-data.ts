import type { ClientUpdate, DateGroup } from "@/components/dashboard/updates/types";

export const updates: ClientUpdate[] = [
	{
		id: "homepage-review",
		title: "Homepage review sent",
		project: "Acme Website Redesign",
		type: "APPROVAL",
		recipients: ["Dana Ellis", "Marcus Chen"],
		sentMeta: "Sent to Dana Ellis and Marcus Chen • 2h ago",
		body: "Requested approval on the homepage hero, mobile navigation, and services layout before the build handoff starts tomorrow.",
		attachments: ["HomepagePreview.png", "MobileReview.pdf"],
		visibility: {
			state: "viewed",
			label: "Viewed 34m ago",
			delivery: "Delivered",
			opened: "Opened 2 times",
			firstViewed: "34m after sending",
			replyState: "Awaiting approval",
		},
		group: "Today",
		recentReply: "Looks great overall. Marcus is checking the mobile menu.",
	},
	{
		id: "launch-checklist",
		title: "Launch checklist shared",
		project: "Nova Cafe",
		type: "LAUNCH",
		recipients: ["Leah Ortiz"],
		sentMeta: "Sent to Leah Ortiz • 5h ago",
		body: "Shared the final launch checklist with hosting, DNS, analytics, and content freeze items called out for client confirmation.",
		attachments: ["LaunchChecklist.pdf", "DNSPlan.pdf"],
		visibility: {
			state: "awaiting",
			label: "Not viewed yet",
			delivery: "Delivered",
			opened: "No opens",
			firstViewed: "Not viewed",
			replyState: "Acknowledgement needed",
		},
		group: "Today",
	},
	{
		id: "copy-review",
		title: "Copy review packet delivered",
		project: "Brightside Landing Page",
		type: "DELIVERABLE",
		recipients: ["Priya Shah", "Owen Lee"],
		sentMeta: "Sent to Priya Shah and Owen Lee • 8h ago",
		body: "Delivered the revised page copy and noted the three sections that need stakeholder review before design lock.",
		attachments: ["CopyDeck.pdf"],
		visibility: {
			state: "acknowledged",
			label: "Client replied today",
			delivery: "Delivered",
			opened: "Opened 4 times",
			firstViewed: "12m after sending",
			replyState: "Client replied",
		},
		group: "Today",
		recentReply: "We are aligned on the new section order.",
	},
	{
		id: "revision-follow-up",
		title: "Revision follow-up",
		project: "Northline Fitness",
		type: "FOLLOW-UP",
		recipients: ["Maya Brooks"],
		sentMeta: "Sent to Maya Brooks • Yesterday",
		body: "Followed up on the open revision notes for pricing, testimonials, and the class schedule module.",
		attachments: ["RevisionNotes.pdf"],
		visibility: {
			state: "ignored",
			label: "No activity after 5 days",
			delivery: "Delivered",
			opened: "No opens",
			firstViewed: "Not viewed",
			replyState: "Response overdue",
		},
		group: "Yesterday",
	},
	{
		id: "weekly-status",
		title: "Weekly progress summary",
		project: "Luma Works Portal",
		type: "STATUS",
		recipients: ["Natalie Ford"],
		sentMeta: "Sent to Natalie Ford • Tue",
		body: "Summarized completed portal setup, remaining file requests, and next-week approval windows.",
		attachments: [],
		visibility: {
			state: "viewed",
			label: "Opened 3 times",
			delivery: "Delivered",
			opened: "Opened 3 times",
			firstViewed: "1h after sending",
			replyState: "No reply requested",
		},
		group: "This week",
	},
	{
		id: "brand-revision",
		title: "Brand revision ready",
		project: "Fieldstone Studio",
		type: "REVISION",
		recipients: ["Evan Kim", "Rachel Green"],
		sentMeta: "Sent to Evan Kim and Rachel Green • Apr 29",
		body: "Shared the updated brand direction with the revised color system and final typography recommendation.",
		attachments: ["BrandRevision.pdf", "Palette.png"],
		visibility: {
			state: "acknowledged",
			label: "Acknowledged Apr 30",
			delivery: "Delivered",
			opened: "Opened 6 times",
			firstViewed: "18m after sending",
			replyState: "Acknowledged",
		},
		group: "Earlier",
		recentReply: "Approved. Please move this into the portal.",
	},
];

export const updateProjects = [
	"All projects",
	...Array.from(new Set(updates.map((update) => update.project))),
];

export const updateTypes = [
	"All types",
	...Array.from(new Set(updates.map((update) => update.type))),
];

export const updateStates = ["Sent", "Viewed", "Awaiting", "Ignored", "Acknowledged"];

export const updateRanges = ["This month", "Today", "This week", "Earlier"];

export const updateGroups: DateGroup[] = ["Today", "Yesterday", "This week", "Earlier"];
