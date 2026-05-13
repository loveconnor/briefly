import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { ProjectWorkspace } from "@/components/dashboard/projects/project-workspace";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getProjectBySlug } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return generateMeta({
		title: "Project",
		description: "Project delivery workspace.",
		canonical: `/dashboard/projects/${slug}`,
	});
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
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

	const { slug } = await params;
	const project = await getProjectBySlug(session.user, slug);

	if (!project) {
		notFound();
	}

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<ProjectWorkspace project={project} />
		</AppShell>
	);
}
