import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { ClientDetail } from "@/components/dashboard/clients/client-detail";
import { clients, getClient } from "@/components/dashboard/clients/client-data";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export function generateStaticParams() {
	return clients.map((client) => ({
		slug: client.slug,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const client = getClient(slug);

	if (!client) {
		return generateMeta({
			title: "Client",
			description: "Client relationship dashboard.",
			canonical: "/dashboard/clients",
		});
	}

	return generateMeta({
		title: client.name,
		description: `${client.name} relationship dashboard with projects, timeline, requests, deliverables, and portal visibility.`,
		canonical: `/dashboard/clients/${client.slug}`,
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
	const client = getClient(slug);

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
