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
import { useState } from "react";

export function NavGroup({ label, items }: SidebarNavGroup) {
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
					const isOpen = Boolean(openItems[item.title]);

					return (
						<SidebarMenuItem key={item.title}>
							{item.subItems?.length ? (
								<>
									<SidebarMenuButton
										aria-expanded={isOpen}
										isActive={item.isActive}
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
													<SidebarMenuSubButton asChild isActive={subItem.isActive}>
														<a href={subItem.path}>
															{subItem.icon}
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									) : null}
								</>
							) : (
								<SidebarMenuButton asChild isActive={item.isActive}>
									<a href={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							)}
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
