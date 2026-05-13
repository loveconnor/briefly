import type { WorkspaceSection } from "@/components/dashboard/workspace/workspace-sections";

export type { Domain, Integration, Webhook, WorkspaceData } from "@/lib/app-data";

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
