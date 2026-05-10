import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { SettingsPage } from "@/components/dashboard/settings/settings-page";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Settings",
		description:
			"Configure workspace identity, client experience, operations, security, and system defaults.",
		canonical: "/dashboard/settings",
	});
}

export default async function DashboardSettingsPage() {
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
			<SettingsPage />
		</AppShell>
	);
}
