import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/dashboard/app-shell";
import { TasksPage } from "@/components/dashboard/tasks/tasks-page";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getDeliveryTasks, getTaskProjectOptions } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
	return generateMeta({
		title: "Tasks",
		description: "Operational work across projects, approvals, launches, and client delivery.",
		canonical: "/dashboard/tasks",
	});
}

export default async function DashboardTasksPage() {
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

	const [tasks, projectOptions] = await Promise.all([
		getDeliveryTasks(session.user),
		getTaskProjectOptions(session.user),
	]);

	return (
		<AppShell
			user={{
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			}}
		>
			<TasksPage initialProjectOptions={projectOptions} initialTasks={tasks} />
		</AppShell>
	);
}
