import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AutomationsPage } from "@/components/dashboard/automations/automations-page";
import { AppShell } from "@/components/dashboard/app-shell";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Automations",
		description:
			"Operational rules for reminders, approvals, updates, and client workflows.",
		canonical: "/dashboard/automations",
	});
}

export default async function Page() {
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
			<AutomationsPage />
		</AppShell>
	);
}
