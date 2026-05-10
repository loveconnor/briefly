import type { SettingsGroup, SettingsKey } from "./settings-types";

export const settingsGroups: SettingsGroup[] = [
	{
		label: "Workspace",
		items: [
			{ key: "general", label: "General" },
			{ key: "branding", label: "Branding" },
			{ key: "domains", label: "Domains" },
			{ key: "members", label: "Members" },
			{ key: "roles", label: "Roles & permissions" },
		],
	},
	{
		label: "Client Experience",
		items: [
			{ key: "portals", label: "Portals" },
			{ key: "approvals", label: "Approvals" },
			{ key: "notifications", label: "Notifications" },
			{ key: "updates", label: "Updates" },
		],
	},
	{
		label: "Operations",
		items: [
			{ key: "automations", label: "Automations" },
			{ key: "billing", label: "Billing" },
			{ key: "templates", label: "Templates" },
			{ key: "integrations", label: "Integrations" },
		],
	},
	{
		label: "System",
		items: [
			{ key: "security", label: "Security" },
			{ key: "api", label: "API" },
			{ key: "data", label: "Data & exports" },
			{ key: "logs", label: "Logs" },
		],
	},
];

export const pageCopy: Record<SettingsKey, { title: string; description: string }> = {
	general: {
		title: "Workspace Settings",
		description: "Manage identity, defaults, and operational behavior.",
	},
	branding: {
		title: "Branding",
		description: "Shape how clients experience your portals, emails, and shared files.",
	},
	domains: {
		title: "Domains",
		description: "Control the trusted URLs clients use to access Briefly.",
	},
	members: {
		title: "Members",
		description: "Manage access without expanding the page into a permission wall.",
	},
	roles: {
		title: "Roles & Permissions",
		description: "Define stable access profiles for your team and client collaborators.",
	},
	portals: {
		title: "Portal Settings",
		description: "Configure what clients see, can upload, and can approve.",
	},
	approvals: {
		title: "Approvals",
		description: "Set default review behavior and the client-facing approval experience.",
	},
	notifications: {
		title: "Notifications",
		description: "Route workspace, client, and operational notifications calmly.",
	},
	updates: {
		title: "Updates",
		description: "Set defaults for client updates, internal notes, and visibility.",
	},
	automations: {
		title: "Automation Settings",
		description: "Configure automation defaults without entering the builder.",
	},
	billing: {
		title: "Billing Settings",
		description: "Manage payout, invoice, tax, and payment behavior.",
	},
	templates: {
		title: "Templates",
		description: "Control template defaults for repeatable agency delivery.",
	},
	integrations: {
		title: "Integrations",
		description: "Review connected services and operational status.",
	},
	security: {
		title: "Security",
		description: "Control sessions, login methods, tokens, and audit posture.",
	},
	api: {
		title: "API",
		description: "Manage tokens, webhooks, and developer access.",
	},
	data: {
		title: "Data & Exports",
		description: "Export workspace data and configure retention defaults.",
	},
	logs: {
		title: "Logs",
		description: "Review system events and sensitive administrative activity.",
	},
};

export const members = [
	["Connor Love", "Owner", "All projects", "Today", "Active"],
	["Maya Chen", "Admin", "8 projects", "Yesterday", "Active"],
	["Jordan Ellis", "Designer", "5 projects", "2 days ago", "Active"],
	["Dana Carter", "Client", "Acme Website", "1 week ago", "Portal-only"],
];

export const searchIndex = settingsGroups.flatMap((group) =>
	group.items.map((item) => ({
		...item,
		group: group.label,
		copy: pageCopy[item.key].description,
	}))
);
