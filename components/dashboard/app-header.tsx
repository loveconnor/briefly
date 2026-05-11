"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/dashboard/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/dashboard/custom-sidebar-trigger";
import { navLinks } from "@/components/dashboard/app-shared";
import { NavUser } from "@/components/dashboard/nav-user";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import type { AppShellUser } from "@/components/dashboard/app-shell";
import { BellIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderNotification = {
	title: string;
	desc: string;
	date: string;
	avatar?: string;
	type?: "confirm";
	unread?: boolean;
};

const headerNotifications: HeaderNotification[] = [
	{
		title: "Acme approval is overdue",
		desc: "Creative proofs have been waiting for client review.",
		date: "12 min ago",
		unread: true,
	},
	{
		title: "Maya Chen commented",
		desc: "Left feedback on the Q2 launch portal.",
		date: "38 min ago",
		unread: true,
	},
	{
		title: "Workspace invite pending",
		desc: "Jordan Lee is requesting access to Briefly Ops.",
		date: "1 hr ago",
		type: "confirm",
	},
	{
		title: "Invoice reminder sent",
		desc: "Retainer renewal notice was delivered to Northstar.",
		date: "Yesterday",
	},
	{
		title: "Portal files synced",
		desc: "Six files were added to the client delivery folder.",
		date: "Yesterday",
	},
];

function NotificationsMenu() {
	const isMobile = useIsMobile();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				nativeButton
				render={
					<Button
						aria-label="Notifications"
						className="relative"
						size="icon-sm"
						variant="ghost"
					>
						<BellIcon />
						<span className="absolute end-0.5 top-0.5 block size-1.5 shrink-0 rounded-full bg-destructive" />
					</Button>
				}
			/>
			<DropdownMenuContent
				align={isMobile ? "center" : "end"}
				className="ms-4 w-80 p-0"
			>
				<DropdownMenuLabel className="sticky top-0 z-10 bg-background p-0 dark:bg-muted">
					<div className="flex items-center justify-between border-b px-6 py-4">
						<div className="font-medium text-foreground">Notifications</div>
						<Button
							asChild
							className="h-auto w-max px-0 py-0 text-xs"
							size="sm"
							variant="link"
						>
							<Link href="/dashboard/notifications">View all</Link>
						</Button>
					</div>
				</DropdownMenuLabel>
				<ScrollArea className="h-[350px]">
					{headerNotifications.map((item) => (
						<DropdownMenuItem
							className="group flex cursor-pointer items-start gap-9 rounded-none border-b px-4 py-3"
							key={`${item.title}-${item.date}`}
						>
							<div className="flex flex-1 items-start gap-2">
								<div className="flex-none">
									<Avatar className="size-8">
										<AvatarImage alt="" src={item.avatar} />
										<AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
									</Avatar>
								</div>
								<div className="flex flex-1 flex-col gap-1 overflow-hidden">
									<div className="truncate text-sm font-medium">
										{item.title}
									</div>
									<div className="line-clamp-1 text-xs text-muted-foreground">
										{item.desc}
									</div>
									{item.type === "confirm" ? (
										<div className="flex items-center gap-2">
											<Button size="xs" variant="outline">
												Accept
											</Button>
											<Button size="xs" variant="destructive">
												Decline
											</Button>
										</div>
									) : null}
									<div className="flex items-center gap-1 text-xs text-muted-foreground">
										<ClockIcon className="size-3" />
										{item.date}
									</div>
								</div>
							</div>
							{item.unread ? (
								<div className="flex-none">
									<span className="block size-2 rounded-full border bg-destructive/80" />
								</div>
							) : null}
						</DropdownMenuItem>
					))}
				</ScrollArea>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function AppHeader({ user }: { user: AppShellUser }) {
	const pathname = usePathname();
	const activeItem = navLinks.find((item) => item.path === pathname);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6"
			)}
		>
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<AppBreadcrumbs page={activeItem} />
			</div>
			<div className="flex items-center gap-3">
				<ThemeToggle />
				<NotificationsMenu />
				<Separator
					className="h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<NavUser user={user} />
			</div>
		</header>
	);
}
