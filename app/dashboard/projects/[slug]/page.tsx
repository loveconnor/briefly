import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { getProject, projects } from "@/components/dashboard/projects/project-data";
import { ProjectWorkspace } from "@/components/dashboard/projects/project-workspace";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return generateMeta({
			title: "Project",
			description: "Project delivery workspace.",
			canonical: "/dashboard/projects",
		});
	}

	return generateMeta({
		title: project.name,
		description: `${project.name} project workspace with tasks, approvals, deliverables, files, and activity.`,
		canonical: `/dashboard/projects/${project.slug}`,
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
	const project = getProject(slug);

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
