"use client";

import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Member, Role } from "@/components/dashboard/team/team-types";
import { getPresence, getPresenceContext } from "@/components/dashboard/team/team-utils";

export function MemberSheet({
	member,
	onClose,
	roles,
}: {
	member: Member | null;
	onClose: () => void;
	roles: Role[];
}) {
	const presence = member ? getPresence(member.status) : "Offline";
	const context = member ? getPresenceContext(member) : "";
	const role = member ? roles.find((item) => item.name === member.role) : null;

	return (
		<Sheet onOpenChange={(open) => !open && onClose()} open={Boolean(member)}>
			<SheetContent className="w-[calc(100%-(--spacing(8)))] max-w-md overflow-y-auto p-0 sm:max-w-lg">
				{member && (
					<>
						<SheetHeader className="border-b p-6">
							<div className="flex items-start justify-between gap-4 pr-6">
								<div className="flex min-w-0 gap-4">
									<Avatar className="size-16 rounded-full border">
										<AvatarFallback className="rounded-full bg-accent text-base">
											{member.initials}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0">
										<SheetTitle className="truncate text-xl">{member.name}</SheetTitle>
										<SheetDescription className="mt-1 flex items-center gap-2">
											<span>{member.role}</span>
											<span>·</span>
											<span>{member.access}</span>
										</SheetDescription>
										<div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
											<span className={cn("size-2 rounded-full bg-muted-foreground/40", presence === "Online" && "bg-success")} />
											<span>{presence}</span>
											<span>·</span>
											<span>Last active {member.lastActive}</span>
										</div>
									</div>
								</div>
								<Button className="rounded-full" size="sm" variant="secondary">Message</Button>
							</div>
						</SheetHeader>

						<div className="space-y-7 p-6">
							<section>
								<div className="flex items-baseline justify-between gap-4">
									<h3 className="text-sm font-semibold">Assigned projects</h3>
									<span className="text-xs text-muted-foreground">{member.assignedProjects.length} total</span>
								</div>
								<div className="mt-3 space-y-1">
									{member.assignedProjects.map((project) => (
										<button
											className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent/40"
											key={project}
											type="button"
										>
											<span>{project}</span>
											<ChevronRightIcon className="size-4 text-muted-foreground" />
										</button>
									))}
								</div>
							</section>

							<section>
								<div className="flex items-baseline justify-between gap-4">
									<h3 className="text-sm font-semibold">Permissions</h3>
									<button className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground" type="button">
										Edit role
									</button>
								</div>
								<div className="mt-3 space-y-4">
									{role?.permissions.map((group) => {
										const enabledCount = group.items.filter((item) => item.enabled).length;

										return (
											<div key={group.group}>
												<div className="flex items-center justify-between text-xs">
													<div className="font-medium text-muted-foreground">{group.group}</div>
													<div className="text-muted-foreground">
														{enabledCount}/{group.items.length}
													</div>
												</div>
												<div className="mt-2 grid gap-1.5">
													{group.items.map((item) => (
														<div
															className="flex items-center justify-between rounded-lg bg-muted/45 px-2.5 py-2 text-sm"
															key={`${group.group}-${item.label}`}
														>
															<span className={cn(!item.enabled && "text-muted-foreground")}>
																{item.label}
															</span>
															<span
																className={cn(
																	"flex size-5 items-center justify-center rounded-full",
																	item.enabled
																		? "bg-success/10 text-success-foreground"
																		: "bg-background text-muted-foreground"
																)}
															>
																{item.enabled ? <CheckIcon className="size-3.5" /> : <span className="h-px w-2 bg-current" />}
															</span>
														</div>
													))}
												</div>
											</div>
										);
									})}
								</div>
							</section>

							<section>
								<h3 className="text-sm font-semibold">Recent activity</h3>
								<div className="mt-3 space-y-4">
									{member.recentActivity.map((activity) => (
										<div className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-x-3" key={`${activity.label}-${activity.time}`}>
											<span className="mt-1.5 size-2 rounded-full bg-muted-foreground/35" />
											<div>
												<div className="text-sm font-medium">{activity.label}</div>
												<div className="mt-1 text-xs text-muted-foreground">{activity.time}</div>
											</div>
										</div>
									))}
									{context && (
										<div className="grid grid-cols-[0.5rem_minmax(0,1fr)] gap-x-3">
											<span className="mt-1.5 size-2 rounded-full bg-success" />
											<div>
												<div className="text-sm font-medium">{context}</div>
												<div className="mt-1 text-xs text-muted-foreground">Current context</div>
											</div>
										</div>
									)}
								</div>
							</section>

							<section className="border-t pt-5">
								<div className="grid gap-2 text-sm">
									<button className="flex items-center justify-between rounded-lg px-2 py-2 font-medium text-foreground transition-colors hover:bg-accent/40" type="button">
										Change role
										<ChevronRightIcon className="size-4 text-muted-foreground" />
									</button>
									{member.role !== "Owner" && (
										<>
											<button className="rounded-lg px-2 py-2 text-left font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground" type="button">
												Deactivate access
											</button>
											<button className="rounded-lg px-2 py-2 text-left font-medium text-muted-foreground transition-colors hover:bg-destructive/8 hover:text-destructive-foreground" type="button">
												Remove member
											</button>
										</>
									)}
								</div>
							</section>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
