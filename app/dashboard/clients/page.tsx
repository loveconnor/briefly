import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/dashboard/app-shell";
import { ClientsBoard } from "@/components/dashboard/clients/clients-board";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Clients",
		description:
			"See client relationship health, blockers, delivery state, responsiveness, and portal visibility.",
		canonical: "/dashboard/clients",
	});
}

export default async function ClientsPage() {
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
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold tracking-tight">Clients</h1>
				<p className="max-w-3xl text-sm text-muted-foreground">
					Relationship operations across active work, blockers, response state, upcoming delivery, and client portal visibility.
				</p>
			</div>
			<ClientsBoard />
		</AppShell>
	);
}
