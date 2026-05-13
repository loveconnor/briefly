import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { ClientDetail } from "@/components/dashboard/clients/client-detail";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getClientBySlug } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return generateMeta({
		title: "Client",
		description: "Client relationship dashboard.",
		canonical: `/dashboard/clients/${slug}`,
	});
}

export default async function ClientDetailPage({
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
	const client = await getClientBySlug(session.user, slug);

	if (!client) {
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
			<ClientDetail client={client} />
		</AppShell>
	);
}
