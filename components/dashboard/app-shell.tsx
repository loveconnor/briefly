import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { auth } from "@/lib/auth";
import { getWeeklyActivitySummary } from "@/lib/app-data";
import { headers } from "next/headers";

export type AppShellUser = {
	name: string | null;
	email: string;
	image?: string | null;
};

export async function AppShell({
	children,
	user,
}: {
	children: React.ReactNode;
	user: AppShellUser;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const weeklyActivity = session
		? await getWeeklyActivitySummary(session.user.id)
		: { href: "/dashboard/inbox/all-activity", items: [], label: "THIS WEEK" };

	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh">
				<AppSidebar weeklyActivity={weeklyActivity} />
				<SidebarInset className="md:peer-data-[variant=inset]:ml-0">
					<AppHeader user={user} />
					<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
