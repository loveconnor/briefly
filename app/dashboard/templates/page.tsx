import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { TemplatesPage } from "@/components/dashboard/templates/templates-page";
import type { TemplateCategory } from "@/components/dashboard/templates/templates-data";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

const categories = new Set([
	"website",
	"branding",
	"seo",
	"retainers",
	"custom",
]);

export async function generateMetadata() {
	return generateMeta({
		title: "Templates",
		description: "Reusable project systems for client work.",
		canonical: "/dashboard/templates",
	});
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ category?: string }>;
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

	const { category } = await searchParams;
	const initialCategory = categories.has(category ?? "")
		? (category as TemplateCategory)
		: "all";

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<TemplatesPage initialCategory={initialCategory} />
		</AppShell>
	);
}
