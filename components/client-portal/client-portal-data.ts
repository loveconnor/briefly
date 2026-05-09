export const changes = [
	"Reduced hero copy",
	"Updated mobile navigation",
	"Added testimonial section",
];

export const feedItems = [
	{
		author: "Connor",
		action: "updated homepage review",
		time: "2h ago",
		body: "Reduced mobile menu height and prepared the latest homepage revision.",
		attachment: "HomepagePreview.png",
	},
	{
		author: "Dana Ellis",
		action: "left feedback",
		time: "1h ago",
		body: "Hero feels much cleaner now. Can we make the menu label shorter?",
	},
	{
		author: "Marcus Chen",
		action: "uploaded BrandAssets.zip",
		time: "45m ago",
		body: "Added the latest logo exports and social avatar files.",
		attachment: "BrandAssets.zip",
	},
];

export const tasks = [
	{ title: "Review homepage revisions", meta: "Awaiting approval", state: "open" },
	{ title: "Upload logo exports", meta: "Due tomorrow", state: "open" },
	{ title: "Approve sitemap", meta: "Completed yesterday", state: "done" },
] as const;

export const files = [
	{
		icon: "image",
		name: "HomepagePreview.png",
		meta: "Updated today",
		action: "Open",
	},
	{
		icon: "file",
		name: "MobileReview.pdf",
		meta: "Added by Connor",
		action: "Download",
	},
	{
		icon: "file",
		name: "BrandAssets.zip",
		meta: "Uploaded by Dana",
		action: "Download",
	},
] as const;

export const activity = [
	{
		type: "view",
		actor: "Dana Ellis",
		action: "viewed homepage review",
		context: "Opened the latest revision from the approval request.",
		time: "2h ago",
	},
	{
		type: "upload",
		actor: "Connor",
		action: "uploaded revised mockups",
		context: "Added updated desktop and mobile homepage previews.",
		time: "Yesterday",
	},
	{
		type: "approval",
		actor: "Marcus Chen",
		action: "approved logo package",
		context: "Confirmed the brand asset set is ready for launch handoff.",
		time: "Monday",
	},
] as const;
