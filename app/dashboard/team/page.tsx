import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { TeamPage } from "@/components/dashboard/team/team-page";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getTeamData } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Team",
		description:
			"Manage workspace members, collaboration access, client visibility, and invitations.",
		canonical: "/dashboard/team",
	});
}

export default async function DashboardTeamPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const onboarding = await getOnboardingStatus(session.user.id);

	if (!onboarding.completed) {
		return <OnboardingFlow />;
	}

	const team = await getTeamData(session.user);

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<TeamPage data={team} />
		</AppShell>
	);
}
