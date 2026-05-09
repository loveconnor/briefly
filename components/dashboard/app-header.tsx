"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/dashboard/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/dashboard/custom-sidebar-trigger";
import { navLinks } from "@/components/dashboard/app-shared";
import { NavUser } from "@/components/dashboard/nav-user";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import type { AppShellUser } from "@/components/dashboard/app-shell";
import { BellIcon } from "lucide-react";
import { usePathname } from "next/navigation";

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
				<Button aria-label="Notifications" size="icon-sm" variant="ghost">
					<BellIcon
					/>
				</Button>
				<Separator
					className="h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<NavUser user={user} />
			</div>
		</header>
	);
}
