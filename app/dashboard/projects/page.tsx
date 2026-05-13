import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { ProjectsList } from "@/components/dashboard/projects/projects-list";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getClients, getProjects } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Projects",
		description: "Project execution, delivery, approvals, blockers, and activity.",
		canonical: "/dashboard/projects",
	});
}

export default async function ProjectsPage() {
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

	const [clients, projects] = await Promise.all([
		getClients(session.user),
		getProjects(session.user),
	]);

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<ProjectsList clients={clients} projects={projects} />
		</AppShell>
	);
}
