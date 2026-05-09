import { LogoIcon } from "@/components/dashboard/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/dashboard/nav-group";
import { navGroups } from "@/components/dashboard/app-shared";
import { WeeklyActivityCard } from "@/components/dashboard/weekly-activity-card";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenu>
					<SidebarMenuItem>
						<Link
							className={cn(
								"flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding]",
								"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
								"group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate"
							)}
							href="/"
						>
							<LogoIcon />
							<span className="font-medium">Briefly</span>
						</Link>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 justify-center gap-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:[&>span]:hidden"
							tooltip="Quick Create"
						>
							<PlusIcon
							/>
							<span>New Project</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search workspace"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<SearchIcon
							/>
							<span className="sr-only">Search workspace</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
				{navGroups.map((group, index) => (
					<NavGroup key={`sidebar-group-${index}`} {...group} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<WeeklyActivityCard />
			</SidebarFooter>
		</Sidebar>
	);
}
