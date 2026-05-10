export type MemberType = "internal" | "client";

export type MemberStatus = "Online" | "Active" | "Away" | "Viewing portal";

export type TeamFilter = "All" | "Internal" | "Clients" | "Pending";

export type Member = {
	id: string;
	name: string;
	email: string;
	initials: string;
	role: "Owner" | "Admin" | "Designer" | "Client";
	type: MemberType;
	access: string;
	projects: string;
	activity: string;
	status: MemberStatus;
	lastActive: string;
	assignedProjects: string[];
	recentActivity: { label: string; time: string }[];
};

export type Role = {
	name: Member["role"];
	description: string;
	permissions: {
		group: string;
		items: { label: string; enabled: boolean }[];
	}[];
};

export type Invitation = {
	email: string;
	sent: string;
	state: string;
};
