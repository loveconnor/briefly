"use client";

import { Clock3Icon, MailIcon, SearchIcon } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { MemberRow } from "@/components/dashboard/team/member-row";
import type { Member, TeamFilter } from "@/components/dashboard/team/team-types";

const filters: TeamFilter[] = ["All", "Internal", "Clients", "Pending"];

export function MembersSection({
	filter,
	members,
	onFilterChange,
	onMemberOpen,
	onQueryChange,
	query,
}: {
	filter: TeamFilter;
	members: Member[];
	onFilterChange: (filter: TeamFilter) => void;
	onMemberOpen: (member: Member) => void;
	onQueryChange: (query: string) => void;
	query: string;
}) {
	return (
		<section>
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<div>
					<h2 className="text-xl font-semibold">Members</h2>
					<div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
						{filters.map((item) => (
							<div className="flex items-center" key={item}>
								<button
									className={cn(
										"font-medium text-muted-foreground transition-colors hover:text-foreground",
										filter === item && "text-foreground"
									)}
									onClick={() => onFilterChange(item)}
									type="button"
								>
									{item}
								</button>
							</div>
						))}
					</div>
				</div>
				<Field className="min-w-0 md:w-72">
					<InputGroup className="border-transparent bg-muted/60 shadow-none">
						<InputGroupAddon>
							<SearchIcon />
						</InputGroupAddon>
						<InputGroupInput
						aria-label="Search members"
						onChange={(event) => onQueryChange(event.target.value)}
						placeholder="Search members..."
						type="search"
						value={query}
					/>
					</InputGroup>
				</Field>
			</div>
			<div className="mt-6 space-y-2">
				{filter === "Pending" ? (
					<div className="py-12 text-center">
						<Clock3Icon className="mx-auto size-8 text-muted-foreground" />
						<h3 className="mt-3 text-lg font-semibold">Pending invites are below</h3>
						<p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
							Open invitations stay lightweight here until someone joins the workspace.
						</p>
					</div>
				) : members.length ? (
					members.map((member) => (
						<MemberRow
							key={member.id}
							member={member}
							onOpen={onMemberOpen}
						/>
					))
				) : (
					<DashboardEmptyState
						className="my-6 min-h-40"
						description="Try a name, email, project, or access area."
						icon={MailIcon}
						title="No members match this search"
					/>
				)}
			</div>
		</section>
	);
}
