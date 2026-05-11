import type { ReactNode } from "react";
import {
	BarChart3Icon,
	BriefcaseBusinessIcon,
	Building2Icon,
	CreditCardIcon,
	FileTextIcon,
	FilesIcon,
	InboxIcon,
	LayoutGridIcon,
	BellIcon,
	PanelsTopLeftIcon,
	Settings2Icon,
	SquareKanbanIcon,
	UserCogIcon,
	UsersIcon,
	WorkflowIcon,
} from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
	{
		items: [
			{
				title: "Overview",
				path: "/dashboard",
				icon: <LayoutGridIcon />,
			},
			{
				title: "Inbox",
				icon: <InboxIcon />,
				subItems: [
					{ title: "All Activity", path: "/dashboard/inbox/all-activity" },
					{ title: "Approvals", path: "/dashboard/inbox/approvals" },
					{ title: "Requests", path: "/dashboard/inbox/requests" },
					{ title: "Archived", path: "/dashboard/inbox/archived" },
				],
			},
			{
				title: "Projects",
				icon: <SquareKanbanIcon />,
				subItems: [
					{ title: "Acme Website", path: "/dashboard/projects/acme-website" },
					{ title: "Nova Redesign", path: "/dashboard/projects/nova-redesign" },
					{ title: "Gym Launch", path: "/dashboard/projects/gym-launch" },
					{ title: "View All", path: "/dashboard/projects" },
				],
			},
			{
				title: "Clients",
				path: "/dashboard/clients",
				icon: <UsersIcon />,
			},
			{
				title: "Portals",
				path: "/dashboard/portals",
				icon: <PanelsTopLeftIcon />,
			},
			{
				title: "Updates",
				path: "/dashboard/updates",
				icon: <FileTextIcon />,
			},
			{
				title: "Files",
				path: "/dashboard/files",
				icon: <FilesIcon />,
			},
			{
				title: "Analytics",
				path: "/dashboard/analytics",
				icon: <BarChart3Icon />,
			},
		],
	},
	{
		label: "Workspace Tools",
		items: [
			{
				title: "Templates",
				icon: <BriefcaseBusinessIcon />,
				subItems: [
					{ title: "Website delivery", path: "/dashboard/templates/website-redesign-system" },
					{ title: "SEO campaigns", path: "/dashboard/templates/seo-campaign-operating-system" },
					{ title: "Branding systems", path: "/dashboard/templates/brand-identity-blueprint" },
					{ title: "Monthly retainers", path: "/dashboard/templates/monthly-retainer-rhythm" },
					{ title: "Custom workflows", path: "/dashboard/templates/custom-client-workflow" },
				],
			},
			{
				title: "Automations",
				path: "/dashboard/automations",
				icon: <WorkflowIcon />,
			},
			{
				title: "Team",
				path: "/dashboard/team",
				icon: <UserCogIcon />,
			},
		],
	},
	{
		label: "Preferences",
		items: [
			{
				title: "Workspace",
				icon: <Building2Icon />,
				subItems: [
					{ title: "Branding", path: "/dashboard/workspace/branding" },
					{ title: "Domains", path: "/dashboard/workspace/domains" },
					{ title: "Integrations", path: "/dashboard/workspace/integrations" },
					{ title: "Notifications", path: "/dashboard/workspace/notifications" },
					{ title: "API", path: "/dashboard/workspace/api" },
				],
			},
			{
				title: "Settings",
				path: "/dashboard/settings",
				icon: <Settings2Icon />,
			},
			{
				title: "Billing",
				path: "/dashboard/billing",
				icon: <CreditCardIcon />,
			},
		],
	},
];



export const navLinks: SidebarNavItem[] = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	),
	{
		title: "Notifications",
		path: "/dashboard/notifications",
		icon: <BellIcon />,
	},
];
