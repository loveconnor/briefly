import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export type AppShellUser = {
	name: string | null;
	email: string;
	image?: string | null;
};

export function AppShell({
	children,
	user,
}: {
	children: React.ReactNode;
	user: AppShellUser;
}) {
	return (
		<div className="overflow-hidden">
			<SidebarProvider className="relative h-svh">
				<AppSidebar />
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
