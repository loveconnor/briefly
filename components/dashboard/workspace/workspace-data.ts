import type { WorkspaceSection } from "@/components/dashboard/workspace/workspace-sections";

export const pageCopy: Record<
	WorkspaceSection,
	{ title: string; description: string }
> = {
	branding: {
		title: "Branding",
		description: "Customize how your workspace and client portals appear.",
	},
	domains: {
		title: "Domains",
		description: "Manage client portal and email delivery domains.",
	},
	integrations: {
		title: "Integrations",
		description: "Connect the systems that power client operations.",
	},
	notifications: {
		title: "Notifications",
		description: "Control where important workspace events are delivered.",
	},
	api: {
		title: "API",
		description: "Manage API keys, webhooks, and developer access.",
	},
};

export const colorPresets = ["#7A5AF8", "#0E9384", "#DD6B20", "#2563EB", "#111827"];
export const recentColors = ["#6750A4", "#2F80ED", "#00875A"];

export type Domain = {
	name: string;
	status: string;
	ssl: string;
	connected: string;
};

export const domains: Domain[] = [
	{
		name: "portal.acme.com",
		status: "Verified",
		ssl: "SSL active",
		connected: "Connected 3 days ago",
	},
	{
		name: "clients.studioforge.co",
		status: "Verified",
		ssl: "SSL active",
		connected: "Connected Apr 18",
	},
	{
		name: "updates.novabrand.com",
		status: "DNS pending",
		ssl: "SSL waiting",
		connected: "Added 24 minutes ago",
	},
];

export type Integration = {
	name: string;
	description: string;
	status: string;
	detail: string;
};

export const integrationGroups: Array<{
	label: string;
	items: Integration[];
}> = [
	{
		label: "Communication",
		items: [
			{
				name: "Slack",
				description: "Send approval updates and delivery notifications.",
				status: "Connected",
				detail: "Connected to #client-updates",
			},
			{
				name: "Email",
				description: "Route workspace events through your sending identity.",
				status: "Connected",
				detail: "Using ops@briefly.studio",
			},
			{
				name: "Discord",
				description: "Post selected project events to client channels.",
				status: "Available",
				detail: "No workspace mapping",
			},
		],
	},
	{
		label: "Storage",
		items: [
			{
				name: "Google Drive",
				description: "Sync uploads and final deliverables.",
				status: "Connected",
				detail: "Syncing uploads",
			},
			{
				name: "Dropbox",
				description: "Mirror approved files to client folders.",
				status: "Available",
				detail: "Not connected",
			},
			{
				name: "OneDrive",
				description: "Attach workspace files to Microsoft client folders.",
				status: "Available",
				detail: "Not connected",
			},
		],
	},
	{
		label: "Billing",
		items: [
			{
				name: "Stripe",
				description: "Track invoices, retainers, and payment status.",
				status: "Connected",
				detail: "Last payout Friday",
			},
			{
				name: "QuickBooks",
				description: "Keep client invoices aligned with accounting.",
				status: "Available",
				detail: "Not connected",
			},
		],
	},
	{
		label: "Productivity",
		items: [
			{
				name: "Notion",
				description: "Create client-facing summaries from project docs.",
				status: "Available",
				detail: "Not connected",
			},
			{
				name: "Airtable",
				description: "Map client records and project states.",
				status: "Available",
				detail: "Not connected",
			},
			{
				name: "Zapier",
				description: "Trigger curated workspace automations.",
				status: "Available",
				detail: "Not connected",
			},
		],
	},
];

export const notificationRows = [
	{ event: "Approvals", email: true, slack: false, app: true },
	{ event: "Client replies", email: true, slack: true, app: true },
	{ event: "Delivery accepted", email: true, slack: true, app: true },
	{ event: "Invoice paid", email: true, slack: false, app: false },
	{ event: "Client overdue reminders", email: true, slack: true, app: false },
];

export const apiKeys = [
	{
		name: "Production key",
		created: "Created Apr 12",
		used: "Last used 2h ago",
		key: "••••••••••••••••1Kq9",
	},
	{
		name: "Staging key",
		created: "Created Mar 28",
		used: "Last used yesterday",
		key: "••••••••••••••••8Lp2",
	},
];

export type Webhook = {
	event: string;
	endpoint: string;
	status: string;
	last: string;
};

export const webhooks: Webhook[] = [
	{
		event: "client.approved",
		endpoint: "https://acme.com/webhooks",
		status: "200 OK",
		last: "Last delivery 4m ago",
	},
	{
		event: "invoice.paid",
		endpoint: "https://billing.acme.com/briefly",
		status: "200 OK",
		last: "Last delivery 42m ago",
	},
	{
		event: "project.delivered",
		endpoint: "https://ops.acme.com/events",
		status: "Retrying",
		last: "Next retry in 6m",
	},
];
