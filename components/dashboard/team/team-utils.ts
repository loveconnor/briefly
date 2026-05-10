import type { Member, MemberStatus } from "@/components/dashboard/team/team-types";

export function getPresence(status: MemberStatus) {
	if (status === "Away") return "Away";
	return "Online";
}

export function getPresenceContext(member: Member) {
	if (member.status === "Viewing portal") return "Viewing portal";
	if (member.status === "Active") return member.type === "client" ? "Reviewing work" : "Working now";
	return member.activity.replace("Last active ", "").replace("Updated ", "").replace("Viewed ", "");
}
