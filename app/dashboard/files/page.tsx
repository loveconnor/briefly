import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { FilesRepository } from "@/components/dashboard/files/files-repository";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Files",
		description: "Client assets, handoffs, and shared working files.",
		canonical: "/dashboard/files",
	});
}

export default async function FilesPage() {
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
			<FilesRepository />
		</AppShell>
	);
}
