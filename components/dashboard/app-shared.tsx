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
					{ title: "Acme Website", path: "#/projects/acme-website" },
					{ title: "Nova Redesign", path: "#/projects/nova-redesign" },
					{ title: "Gym Launch", path: "#/projects/gym-launch" },
					{ title: "View All", path: "#/projects" },
				],
			},
			{
				title: "Clients",
				path: "/dashboard/clients",
				icon: <UsersIcon />,
			},
			{
				title: "Portals",
				path: "#/portals",
				icon: <PanelsTopLeftIcon />,
			},
			{
				title: "Updates",
				path: "#/updates",
				icon: <FileTextIcon />,
			},
			{
				title: "Files",
				path: "#/files",
				icon: <FilesIcon />,
			},
			{
				title: "Analytics",
				path: "#/analytics",
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
					{ title: "Website Projects", path: "#/templates/website-projects" },
					{ title: "SEO Campaigns", path: "#/templates/seo-campaigns" },
					{ title: "Branding", path: "#/templates/branding" },
					{ title: "Retainers", path: "#/templates/retainers" },
					{ title: "Create Template", path: "#/templates/create" },
				],
			},
			{
				title: "Automations",
				icon: <WorkflowIcon />,
				subItems: [
					{ title: "Approval Reminders", path: "#/automations/approval-reminders" },
					{ title: "Weekly Updates", path: "#/automations/weekly-updates" },
					{ title: "Status Changes", path: "#/automations/status-changes" },
					{ title: "Client Follow-ups", path: "#/automations/client-follow-ups" },
				],
			},
			{
				title: "Team",
				icon: <UserCogIcon />,
				subItems: [
					{ title: "Members", path: "#/team/members" },
					{ title: "Roles", path: "#/team/roles" },
					{ title: "Invitations", path: "#/team/invitations" },
					{ title: "Permissions", path: "#/team/permissions" },
				],
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
					{ title: "Branding", path: "#/workspace/branding" },
					{ title: "Domains", path: "#/workspace/domains" },
					{ title: "Integrations", path: "#/workspace/integrations" },
					{ title: "Notifications", path: "#/workspace/notifications" },
					{ title: "API", path: "#/workspace/api" },
				],
			},
			{
				title: "Settings",
				path: "#/settings",
				icon: <Settings2Icon />,
			},
			{
				title: "Billing",
				path: "#/billing",
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
	)
];
