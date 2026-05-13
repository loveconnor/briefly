import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import {
	filterOptions,
	type AutomationCategory,
} from "@/components/dashboard/automations/automations-data";
import { AutomationsPage } from "@/components/dashboard/automations/automations-page";
import { AppShell } from "@/components/dashboard/app-shell";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getAutomationsData } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

type PageProps = {
	params: Promise<{ view: string }>;
};

const categoryFilters = new Set<string>(
	filterOptions
		.map((option) => option.value)
		.filter((value) => value !== "all" && value !== "paused")
);

export async function generateMetadata({ params }: PageProps) {
	const { view } = await params;

	return generateMeta({
		title: "Automations",
		description:
			"Operational rules for reminders, approvals, updates, and client workflows.",
		canonical: `/dashboard/automations/${view}`,
	});
}

export default async function Page({ params }: PageProps) {
	const { view } = await params;
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

	const isCategory = categoryFilters.has(view);
	const isPaused = view === "paused";

	if (!isCategory && !isPaused) {
		notFound();
	}

	const automations = await getAutomationsData(session.user.id);

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<AutomationsPage
				data={automations}
				initialFilter={isPaused ? "paused" : (view as AutomationCategory)}
			/>
		</AppShell>
	);
}
