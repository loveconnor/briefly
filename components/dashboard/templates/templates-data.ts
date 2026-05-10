export type TemplateCategory =
	| "website"
	| "branding"
	| "seo"
	| "retainers"
	| "custom";

export type TemplatePhase = {
	approvals: string[];
	clientRequests: string[];
	name: string;
	summary: string;
	tasks: string[];
};

export type ClientPortalPreviewItem = {
	label: string;
	status: string;
	type: "approval" | "task" | "upload" | "deliverable";
};

export type TemplateSystem = {
	automationRules: string[];
	category: TemplateCategory;
	clientForms: number;
	clientPortalPreview: ClientPortalPreviewItem[];
	clientVisibility: string;
	createdBy: string;
	defaultApprovals: string[];
	defaultRoles: string[];
	description: string;
	estimatedTimeline: string;
	forms: string[];
	lastUpdated: string;
	metrics: {
		approvals: number;
		automations: number;
		phases: number;
		tasks: number;
	};
	name: string;
	portalStructure: string[];
	slug: string;
	summary: string;
	syncVersion: string;
	typeLabel: string;
	usedCount: number;
	workflowIncludes: string[];
	phases: TemplatePhase[];
};

export const templateFilters: Array<{
	label: string;
	value: TemplateCategory | "all";
}> = [
	{ label: "All", value: "all" },
	{ label: "Website", value: "website" },
	{ label: "Branding", value: "branding" },
	{ label: "SEO", value: "seo" },
	{ label: "Retainers", value: "retainers" },
	{ label: "Custom", value: "custom" },
];

export const templateSystems: TemplateSystem[] = [
	{
		automationRules: [
			"Approval follow-up after 3 days",
			"Weekly client update every Friday",
			"Launch checklist unlocks after final signoff",
			"Internal QA reminder 48 hours before launch",
		],
		category: "website",
		clientForms: 2,
		clientPortalPreview: [
			{ label: "Homepage review", status: "Waiting on client", type: "approval" },
			{ label: "Brand assets", status: "Upload requested", type: "upload" },
			{ label: "Staging link", status: "Visible after QA", type: "deliverable" },
			{ label: "Launch checklist", status: "Internal only", type: "task" },
		],
		clientVisibility: "Portal enabled for approvals, uploads, files, and updates",
		createdBy: "Connor",
		defaultApprovals: ["Homepage review", "Copy review", "Launch signoff"],
		defaultRoles: ["Strategist", "Designer", "Developer", "Client owner"],
		description: "For full client website redesign workflows.",
		estimatedTimeline: "6-8 weeks",
		forms: ["Website intake", "Launch access request"],
		lastUpdated: "4d ago",
		metrics: { approvals: 3, automations: 6, phases: 4, tasks: 12 },
		name: "Website Redesign System",
		portalStructure: ["Files", "Updates", "Tasks", "Approvals"],
		slug: "website-redesign-system",
		summary: "Website delivery workflow",
		syncVersion: "Website Redesign System v2",
		typeLabel: "Website delivery",
		usedCount: 18,
		workflowIncludes: [
			"Phased website delivery",
			"Client approval gates",
			"Asset upload requests",
			"Launch automation defaults",
		],
		phases: [
			{
				approvals: ["Discovery signoff"],
				clientRequests: ["Brand assets", "Analytics access"],
				name: "Discovery",
				summary: "Inputs, goals, access, and project boundaries.",
				tasks: ["Kickoff agenda", "Stakeholder notes", "Sitemap audit"],
			},
			{
				approvals: ["Homepage signoff", "Brand direction signoff"],
				clientRequests: ["Design feedback"],
				name: "Design",
				summary: "Visual direction, core screens, and client review cycles.",
				tasks: ["Homepage review", "Mobile review", "Final copy approval", "Design QA", "Handoff notes"],
			},
			{
				approvals: ["Staging review"],
				clientRequests: ["Content gap review"],
				name: "Development",
				summary: "Build, QA, content loading, and staging review.",
				tasks: ["Component build", "CMS setup", "Responsive QA", "Staging walkthrough"],
			},
			{
				approvals: ["Launch signoff"],
				clientRequests: ["DNS access"],
				name: "Launch",
				summary: "Final checks, deployment, and post-launch handoff.",
				tasks: ["Launch checklist", "Redirect QA", "Analytics validation", "Handoff update"],
			},
		],
	},
	{
		automationRules: [
			"Monthly report draft on day 25",
			"Content approval reminder after 5 days",
			"Ranking snapshot attached to update",
		],
		category: "seo",
		clientForms: 1,
		clientPortalPreview: [
			{ label: "Monthly report", status: "Scheduled", type: "deliverable" },
			{ label: "Blog outline approval", status: "Needs review", type: "approval" },
			{ label: "Keyword access", status: "Requested", type: "upload" },
		],
		clientVisibility: "Reports, approvals, recurring tasks, and ranking snapshots",
		createdBy: "Connor",
		defaultApprovals: ["Content brief approval", "Monthly report review"],
		defaultRoles: ["SEO lead", "Content strategist", "Client owner"],
		description: "For recurring search campaigns with client-visible reporting.",
		estimatedTimeline: "Monthly cadence",
		forms: ["SEO access intake"],
		lastUpdated: "1w ago",
		metrics: { approvals: 2, automations: 5, phases: 3, tasks: 10 },
		name: "SEO Campaign Operating System",
		portalStructure: ["Reports", "Content", "Tasks", "Rankings"],
		slug: "seo-campaign-operating-system",
		summary: "Recurring SEO delivery workflow",
		syncVersion: "SEO Campaign Operating System v1",
		typeLabel: "SEO campaigns",
		usedCount: 11,
		workflowIncludes: ["Recurring reporting", "Content approvals", "Ranking snapshots", "Monthly delivery rhythm"],
		phases: [
			{
				approvals: ["SEO plan approval"],
				clientRequests: ["Search Console access"],
				name: "Setup",
				summary: "Access, baseline snapshots, and campaign plan.",
				tasks: ["Keyword baseline", "Technical audit", "Reporting setup"],
			},
			{
				approvals: ["Content brief approval"],
				clientRequests: ["Subject matter notes"],
				name: "Monthly Delivery",
				summary: "Content, fixes, optimization, and implementation tracking.",
				tasks: ["Content brief", "On-page updates", "Backlog grooming", "Ranking snapshot"],
			},
			{
				approvals: ["Report review"],
				clientRequests: ["Priority feedback"],
				name: "Review",
				summary: "Client update, insights, and next-month priorities.",
				tasks: ["Monthly report", "Wins and risks", "Next sprint update"],
			},
		],
	},
	{
		automationRules: [
			"Moodboard review reminder after 2 days",
			"Export package task after final approval",
			"Client delivery update after files are attached",
		],
		category: "branding",
		clientForms: 2,
		clientPortalPreview: [
			{ label: "Moodboard review", status: "Ready", type: "approval" },
			{ label: "Logo package", status: "Hidden until approved", type: "deliverable" },
			{ label: "Brand inputs", status: "Requested", type: "upload" },
		],
		clientVisibility: "Moodboards, approvals, uploads, and final brand exports",
		createdBy: "Connor",
		defaultApprovals: ["Moodboard approval", "Logo direction", "Final identity"],
		defaultRoles: ["Brand strategist", "Designer", "Client owner"],
		description: "For brand identity systems with staged client review.",
		estimatedTimeline: "4-6 weeks",
		forms: ["Brand discovery", "Asset collection"],
		lastUpdated: "2w ago",
		metrics: { approvals: 3, automations: 4, phases: 4, tasks: 14 },
		name: "Brand Identity Blueprint",
		portalStructure: ["Moodboards", "Approvals", "Files", "Updates"],
		slug: "brand-identity-blueprint",
		summary: "Branding system workflow",
		syncVersion: "Brand Identity Blueprint v3",
		typeLabel: "Branding systems",
		usedCount: 9,
		workflowIncludes: ["Moodboard review", "Asset collection", "Brand approvals", "Export delivery"],
		phases: [
			{
				approvals: ["Discovery alignment"],
				clientRequests: ["Existing assets", "Brand questionnaire"],
				name: "Discovery",
				summary: "Positioning, references, and required inputs.",
				tasks: ["Brand interview", "Reference audit", "Audience notes"],
			},
			{
				approvals: ["Moodboard approval"],
				clientRequests: ["Direction feedback"],
				name: "Direction",
				summary: "Moodboards, creative routes, and strategic alignment.",
				tasks: ["Moodboard set", "Creative rationale", "Direction review"],
			},
			{
				approvals: ["Logo direction", "Final identity"],
				clientRequests: ["Revision notes"],
				name: "Identity",
				summary: "Core identity design, revision cycles, and final approval.",
				tasks: ["Logo concepts", "Palette system", "Typography pairing", "Identity QA"],
			},
			{
				approvals: ["Delivery acceptance"],
				clientRequests: ["Export preferences"],
				name: "Delivery",
				summary: "Final files, usage notes, and handoff.",
				tasks: ["Export package", "Guidelines", "Delivery update"],
			},
		],
	},
	{
		automationRules: [
			"Monthly planning update on the 1st",
			"Async request triage every Monday",
			"Client review prompt before renewal window",
		],
		category: "retainers",
		clientForms: 1,
		clientPortalPreview: [
			{ label: "Monthly priorities", status: "Open", type: "task" },
			{ label: "Async request queue", status: "Client visible", type: "task" },
			{ label: "Monthly review", status: "Scheduled", type: "deliverable" },
		],
		clientVisibility: "Requests, updates, monthly reviews, and shared priorities",
		createdBy: "Connor",
		defaultApprovals: ["Monthly plan", "Renewal review"],
		defaultRoles: ["Account lead", "Delivery lead", "Client owner"],
		description: "For ongoing client work with async requests and monthly reviews.",
		estimatedTimeline: "Ongoing",
		forms: ["Retainer intake"],
		lastUpdated: "6d ago",
		metrics: { approvals: 2, automations: 6, phases: 3, tasks: 9 },
		name: "Monthly Retainer Rhythm",
		portalStructure: ["Requests", "Updates", "Files", "Reviews"],
		slug: "monthly-retainer-rhythm",
		summary: "Ongoing client operations workflow",
		syncVersion: "Monthly Retainer Rhythm v2",
		typeLabel: "Monthly retainers",
		usedCount: 15,
		workflowIncludes: ["Recurring updates", "Async requests", "Monthly reviews", "Ongoing task queue"],
		phases: [
			{
				approvals: ["Monthly plan approval"],
				clientRequests: ["Priority input"],
				name: "Plan",
				summary: "Set scope, priorities, and capacity for the month.",
				tasks: ["Priority intake", "Capacity check", "Monthly plan"],
			},
			{
				approvals: ["Request approvals"],
				clientRequests: ["Async requests"],
				name: "Execute",
				summary: "Handle requests, updates, and active delivery.",
				tasks: ["Request triage", "Weekly update", "Delivery queue"],
			},
			{
				approvals: ["Renewal review"],
				clientRequests: ["Feedback"],
				name: "Review",
				summary: "Summarize progress and define next-month improvements.",
				tasks: ["Monthly review", "Work summary", "Next priorities"],
			},
		],
	},
	{
		automationRules: [
			"Custom reminders inherit phase timing",
			"Portal sections stay hidden until assigned",
		],
		category: "custom",
		clientForms: 0,
		clientPortalPreview: [
			{ label: "Custom approval", status: "Draft", type: "approval" },
			{ label: "Shared workspace", status: "Configurable", type: "deliverable" },
		],
		clientVisibility: "Configured per workflow",
		createdBy: "Connor",
		defaultApprovals: ["Custom gate"],
		defaultRoles: ["Owner", "Contributor", "Client owner"],
		description: "For repeatable client systems that do not fit a default category.",
		estimatedTimeline: "Variable",
		forms: [],
		lastUpdated: "3d ago",
		metrics: { approvals: 1, automations: 2, phases: 2, tasks: 6 },
		name: "Custom Client Workflow",
		portalStructure: ["Updates", "Tasks", "Files"],
		slug: "custom-client-workflow",
		summary: "Configurable workflow system",
		syncVersion: "Custom Client Workflow v1",
		typeLabel: "Custom workflows",
		usedCount: 4,
		workflowIncludes: ["Editable phases", "Custom approvals", "Portal defaults", "Automation starting points"],
		phases: [
			{
				approvals: ["Scope approval"],
				clientRequests: ["Inputs"],
				name: "Setup",
				summary: "Define the operating model and required client inputs.",
				tasks: ["Workflow outline", "Portal defaults", "Role assignment"],
			},
			{
				approvals: ["Delivery approval"],
				clientRequests: ["Feedback"],
				name: "Delivery",
				summary: "Run the repeatable work and collect decisions.",
				tasks: ["Task sequence", "Client update", "Delivery note"],
			},
		],
	},
];

export function getTemplateBySlug(slug: string) {
	return templateSystems.find((template) => template.slug === slug) ?? null;
}
