import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AnalyticsPage } from "@/components/dashboard/analytics/analytics-page";
import { AppShell } from "@/components/dashboard/app-shell";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getAnalyticsData } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Analytics",
		description:
			"Operational analytics for client engagement, approvals, activity, and portal performance.",
		canonical: "/dashboard/analytics",
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

	const analytics = await getAnalyticsData(session.user.id);

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<AnalyticsPage data={analytics} />
		</AppShell>
	);
}
