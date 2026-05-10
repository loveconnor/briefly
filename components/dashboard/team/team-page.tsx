"use client";

import { useMemo, useState } from "react";
import { UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteDialog } from "@/components/dashboard/team/invite-dialog";
import { InvitationsSection } from "@/components/dashboard/team/invitations-section";
import { MemberSheet } from "@/components/dashboard/team/member-sheet";
import { MembersSection } from "@/components/dashboard/team/members-section";
import { OwnershipSection } from "@/components/dashboard/team/ownership-section";
import { RoleSheet } from "@/components/dashboard/team/role-sheet";
import { RolesSection } from "@/components/dashboard/team/roles-section";
import { SummaryStrip } from "@/components/dashboard/team/summary-strip";
import { invitations, members, roles } from "@/components/dashboard/team/team-data";
import type { Member, Role, TeamFilter } from "@/components/dashboard/team/team-types";

export function TeamPage() {
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<TeamFilter>("All");
	const [selectedMember, setSelectedMember] = useState<Member | null>(null);
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);
	const [inviteOpen, setInviteOpen] = useState(false);

	const visibleMembers = useMemo(() => {
		const normalized = query.trim().toLowerCase();

		return members.filter((member) => {
			const matchesQuery =
				!normalized ||
				member.name.toLowerCase().includes(normalized) ||
				member.email.toLowerCase().includes(normalized) ||
				member.access.toLowerCase().includes(normalized);
			const matchesFilter =
				filter === "All" ||
				(filter === "Internal" && member.type === "internal") ||
				(filter === "Clients" && member.type === "client");

			return matchesQuery && matchesFilter;
		});
	}, [filter, query]);

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
			<header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<h1 className="text-3xl font-semibold tracking-tight">Team</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Manage workspace members, collaboration access, and client visibility.
					</p>
				</div>
				<Button className="w-full rounded-full sm:w-auto" onClick={() => setInviteOpen(true)} size="lg">
					<UserPlusIcon />
					Invite member
				</Button>
			</header>

			<SummaryStrip />

			<MembersSection
				filter={filter}
				members={visibleMembers}
				onFilterChange={setFilter}
				onMemberOpen={setSelectedMember}
				onQueryChange={setQuery}
				query={query}
			/>

			<section className="grid gap-14 lg:grid-cols-[1fr_.9fr]">
				<RolesSection onRoleOpen={setSelectedRole} roles={roles} />
				<InvitationsSection invitations={invitations} />
			</section>

			<OwnershipSection />

			<MemberSheet member={selectedMember} onClose={() => setSelectedMember(null)} />
			<RoleSheet role={selectedRole} onClose={() => setSelectedRole(null)} />
			<InviteDialog onOpenChange={setInviteOpen} open={inviteOpen} />
		</div>
	);
}
