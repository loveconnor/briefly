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
				path: "/dashboard/projects",
				icon: <SquareKanbanIcon />,
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
				path: "/dashboard/templates",
				icon: <BriefcaseBusinessIcon />,
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
