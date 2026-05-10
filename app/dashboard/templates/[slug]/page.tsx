import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { TemplateDetailPage } from "@/components/dashboard/templates/template-detail-page";
import { getTemplateBySlug, templateSystems } from "@/components/dashboard/templates/templates-data";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateStaticParams() {
	return templateSystems.map((template) => ({
		slug: template.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const template = getTemplateBySlug(slug);

	if (!template) {
		return generateMeta({
			title: "Template",
			description: "Reusable project system.",
			canonical: "/dashboard/templates",
		});
	}

	return generateMeta({
		title: template.name,
		description: template.description,
		canonical: `/dashboard/templates/${template.slug}`,
	});
}

export default async function Page({
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
	const template = getTemplateBySlug(slug);

	if (!template) {
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
			<TemplateDetailPage template={template} />
		</AppShell>
	);
}
