"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup } from "@/components/dashboard/app-shared";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function NavGroup({ label, items }: SidebarNavGroup) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPath = searchParams.size
		? `${pathname}?${searchParams.toString()}`
		: pathname;
	const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(
			items
				.filter((item) => item.subItems?.some((subItem) => subItem.isActive))
				.map((item) => [item.title, true])
		)
	);

	return (
		<SidebarGroup>
			{label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) => {
					const hasActiveSubItem = item.subItems?.some(
						(subItem) => subItem.path === currentPath || subItem.path === pathname
					);
					const isOpen = Boolean(openItems[item.title] || hasActiveSubItem);
					const isActive =
						item.path === currentPath || item.path === pathname || hasActiveSubItem;

					return (
						<SidebarMenuItem key={item.title}>
							{item.subItems?.length ? (
								<>
									<SidebarMenuButton
										aria-expanded={isOpen}
										isActive={isActive}
										onClick={() =>
											setOpenItems((current) => ({
												...current,
												[item.title]: !current[item.title],
											}))
										}
									>
										{item.icon}
										<span>{item.title}</span>
										<ChevronRightIcon
											className={cn(
												"ml-auto transition-transform",
												isOpen && "rotate-90"
											)}
										/>
									</SidebarMenuButton>
									{isOpen ? (
										<SidebarMenuSub>
											{item.subItems.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton
														asChild
														isActive={
															subItem.path === currentPath || subItem.path === pathname
														}
													>
														<Link href={subItem.path ?? "#"}>
															{subItem.icon}
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									) : null}
								</>
							) : (
								<SidebarMenuButton asChild isActive={isActive}>
									<Link href={item.path ?? "#"}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
