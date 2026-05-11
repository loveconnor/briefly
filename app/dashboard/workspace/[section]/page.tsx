import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import {
	WorkspacePage,
} from "@/components/dashboard/workspace/workspace-page";
import {
	workspaceSections,
	type WorkspaceSection,
} from "@/components/dashboard/workspace/workspace-sections";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

type WorkspaceRouteProps = {
	params: Promise<{ section: string }>;
};

export function generateStaticParams() {
	return workspaceSections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: WorkspaceRouteProps) {
	const { section } = await params;
	const title = section.charAt(0).toUpperCase() + section.slice(1);

	return generateMeta({
		title: `Workspace ${title}`,
		description: "Configure workspace infrastructure for client operations.",
		canonical: `/dashboard/workspace/${section}`,
	});
}

export default async function DashboardWorkspacePage({
	params,
}: WorkspaceRouteProps) {
	const { section } = await params;

	if (!workspaceSections.includes(section as WorkspaceSection)) {
		notFound();
	}

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

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<WorkspacePage section={section as WorkspaceSection} />
		</AppShell>
	);
}
