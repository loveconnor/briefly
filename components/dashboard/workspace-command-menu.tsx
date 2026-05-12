"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
	BarChart3Icon,
	BellIcon,
	BriefcaseBusinessIcon,
	CheckCircle2Icon,
	CreditCardIcon,
	FileTextIcon,
	FilesIcon,
	InboxIcon,
	LayoutGridIcon,
	PanelsTopLeftIcon,
	PlusIcon,
	SearchIcon,
	SendIcon,
	Settings2Icon,
	SquareKanbanIcon,
	UploadIcon,
	UserCogIcon,
	UsersIcon,
	WorkflowIcon,
	type LucideIcon,
} from "lucide-react";

import { projects } from "@/components/dashboard/projects/project-data";
import { clients } from "@/components/dashboard/clients/client-data";
import { templateSystems } from "@/components/dashboard/templates/templates-data";
import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";

type CommandMenuItem = {
	icon: LucideIcon;
	label: string;
	href: string;
	keywords?: string;
	shortcutKey?: string;
};

const navigationItems: CommandMenuItem[] = [
	{ icon: LayoutGridIcon, label: "Overview", href: "/dashboard", shortcutKey: "o" },
	{ icon: InboxIcon, label: "Inbox", href: "/dashboard/inbox/all-activity", shortcutKey: "i" },
	{ icon: SquareKanbanIcon, label: "Projects", href: "/dashboard/projects", shortcutKey: "p" },
	{ icon: UsersIcon, label: "Clients", href: "/dashboard/clients", shortcutKey: "c" },
	{ icon: PanelsTopLeftIcon, label: "Portals", href: "/dashboard/portals", shortcutKey: "l" },
	{ icon: FileTextIcon, label: "Updates", href: "/dashboard/updates", shortcutKey: "u" },
	{ icon: FilesIcon, label: "Files", href: "/dashboard/files", shortcutKey: "f" },
	{ icon: BarChart3Icon, label: "Analytics", href: "/dashboard/analytics", shortcutKey: "a" },
];

const actionItems: CommandMenuItem[] = [
	{
		icon: PlusIcon,
		label: "New project",
		href: "/dashboard/projects",
		keywords: "create project start work",
		shortcutKey: "n",
	},
	{
		icon: SendIcon,
		label: "Send client update",
		href: "/dashboard/updates",
		keywords: "compose update message status",
	},
	{
		icon: CheckCircle2Icon,
		label: "Review approvals",
		href: "/dashboard/inbox/approvals",
		keywords: "approve signoff waiting",
	},
	{
		icon: UploadIcon,
		label: "Upload or find files",
		href: "/dashboard/files",
		keywords: "assets documents repository",
	},
	{
		icon: BellIcon,
		label: "Notifications",
		href: "/dashboard/notifications",
		keywords: "alerts reminders activity",
	},
];

const workspaceItems: CommandMenuItem[] = [
	{ icon: BriefcaseBusinessIcon, label: "Templates", href: "/dashboard/templates", keywords: "workflow systems" },
	{ icon: WorkflowIcon, label: "Automations", href: "/dashboard/automations", keywords: "rules triggers follow up" },
	{ icon: UserCogIcon, label: "Team", href: "/dashboard/team", keywords: "members roles invites" },
	{ icon: CreditCardIcon, label: "Billing", href: "/dashboard/billing", keywords: "invoices retainers revenue" },
	{ icon: Settings2Icon, label: "Settings", href: "/dashboard/settings", keywords: "preferences account workspace" },
];

function getIsMacPlatform() {
	if (typeof navigator === "undefined") {
		return true;
	}

	const browserNavigator = navigator as Navigator & {
		userAgentData?: { platform?: string };
	};
	const platform = browserNavigator.userAgentData?.platform ?? browserNavigator.platform;

	return /Mac|iPhone|iPad|iPod/i.test(platform);
}

export function WorkspaceCommandMenu() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [isMac] = React.useState(getIsMacPlatform);

	const shortcutItems = React.useMemo(
		() =>
			[...navigationItems, ...actionItems, ...workspaceItems].filter(
				(item): item is CommandMenuItem & { shortcutKey: string } =>
					Boolean(item.shortcutKey)
			),
		[]
	);

	const runCommand = React.useCallback(
		(href: string) => {
			setOpen(false);
			router.push(href);
		},
		[router]
	);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();
			const usesShortcutModifier = isMac ? event.metaKey : event.shiftKey;

			if ((event.metaKey || event.ctrlKey) && key === "k") {
				event.preventDefault();
				setOpen((current) => !current);
				return;
			}

			if (!usesShortcutModifier || event.altKey || event.ctrlKey || key === "shift") {
				return;
			}

			const shortcutItem = shortcutItems.find((item) => item.shortcutKey === key);

			if (!shortcutItem) {
				return;
			}

			event.preventDefault();
			runCommand(shortcutItem.href);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isMac, runCommand, shortcutItems]);

	return (
		<>
			<Button
				aria-label="Search workspace"
				className="size-8 group-data-[collapsible=icon]:opacity-0"
				onClick={() => setOpen(true)}
				size="icon"
				variant="outline"
			>
				<SearchIcon />
				<span className="sr-only">Search workspace</span>
			</Button>
			<CommandDialog
				description="Search Briefly projects, clients, workflows, and workspace tools."
				open={open}
				title="Search Briefly"
				onOpenChange={setOpen}
			>
				<CommandInput placeholder="Search projects, clients, actions..." />
				<CommandList className="max-h-[420px]">
					<CommandEmpty>No matching workspace items.</CommandEmpty>
					<CommandGroup heading="Navigation">
						{navigationItems.map((item) => (
							<WorkspaceCommandItem
								isMac={isMac}
								item={item}
								key={item.label}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Actions">
						{actionItems.map((item) => (
							<WorkspaceCommandItem
								isMac={isMac}
								item={item}
								key={item.label}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Active Projects">
						{projects.slice(0, 5).map((project) => (
							<WorkspaceCommandItem
								item={{
									icon: SquareKanbanIcon,
									label: project.name,
									href: `/dashboard/projects/${project.slug}`,
									keywords: `${project.client} ${project.status} ${project.phase} ${project.risk}`,
								}}
								isMac={isMac}
								key={project.slug}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Clients">
						{clients.slice(0, 5).map((client) => (
							<WorkspaceCommandItem
								item={{
									icon: UsersIcon,
									label: client.name,
									href: `/dashboard/clients/${client.slug}`,
									keywords: `${client.status} ${client.health} ${client.waitingOn}`,
								}}
								isMac={isMac}
								key={client.slug}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Workflow Systems">
						{templateSystems.slice(0, 4).map((template) => (
							<WorkspaceCommandItem
								item={{
									icon: BriefcaseBusinessIcon,
									label: template.name,
									href: `/dashboard/templates/${template.slug}`,
									keywords: `${template.typeLabel} ${template.summary} ${template.description}`,
								}}
								isMac={isMac}
								key={template.slug}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Workspace">
						{workspaceItems.map((item) => (
							<WorkspaceCommandItem
								isMac={isMac}
								item={item}
								key={item.label}
								onSelect={runCommand}
							/>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}

function WorkspaceCommandItem({
	isMac,
	item,
	onSelect,
}: {
	isMac: boolean;
	item: CommandMenuItem;
	onSelect: (href: string) => void;
}) {
	const Icon = item.icon;
	const shortcut = item.shortcutKey
		? `${isMac ? "⌘" : "⇧"}${item.shortcutKey.toUpperCase()}`
		: null;

	return (
		<CommandItem
			value={`${item.label} ${item.keywords ?? ""}`}
			onSelect={() => onSelect(item.href)}
		>
			<Icon />
			<span>{item.label}</span>
			{shortcut ? (
				<CommandShortcut className="min-w-11 text-right font-mono tracking-normal">
					{shortcut}
				</CommandShortcut>
			) : null}
		</CommandItem>
	);
}
