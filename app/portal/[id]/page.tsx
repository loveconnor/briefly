import type { Metadata } from "next";

import { PortalHeader } from "@/components/client-portal/portal-header";
import {
	ActivityTab,
	FilesTab,
	MessagesTab,
	OverviewTab,
	ReviewTab,
	TasksTab,
} from "@/components/client-portal/portal-tab-panels";
import { SidePanel } from "@/components/client-portal/side-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function formatPortalTitle(id: string) {
	return id
		.split("-")
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const title = formatPortalTitle(id);

	return {
		title: `${title} Portal`,
		description: `Client portal for ${title}.`,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const projectName = formatPortalTitle(id) || "Client Portal";

	return (
		<div className="min-h-svh bg-background text-foreground">
			<PortalHeader projectName={projectName} />

			<main className="mx-auto w-full max-w-[1240px] px-5 pb-28 sm:px-8 sm:pb-16">
				<Tabs className="gap-7" defaultValue="overview" id="portal-tabs">
					<div className="sticky top-0 z-10 -mx-5 overflow-x-auto bg-background/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
						<TabsList
							className="*:data-[slot=tabs-trigger]:hover:bg-transparent"
							variant="underline"
						>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="review">Review</TabsTrigger>
							<TabsTrigger value="tasks">Tasks</TabsTrigger>
							<TabsTrigger value="messages">Messages</TabsTrigger>
							<TabsTrigger value="files">Files</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
						</TabsList>
					</div>

					<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
						<div className="min-w-0">
							<TabsContent value="overview">
								<OverviewTab projectName={projectName} />
							</TabsContent>
							<TabsContent value="review">
								<ReviewTab projectName={projectName} />
							</TabsContent>
							<TabsContent value="tasks">
								<TasksTab />
							</TabsContent>
							<TabsContent value="messages">
								<MessagesTab />
							</TabsContent>
							<TabsContent value="files">
								<FilesTab />
							</TabsContent>
							<TabsContent value="activity">
								<ActivityTab />
							</TabsContent>
						</div>

						<aside className="sticky top-16 hidden pt-1 lg:block">
							<SidePanel />
						</aside>
					</div>
				</Tabs>
			</main>

			<div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/94 p-4 backdrop-blur sm:hidden">
				<div className="grid grid-cols-2 gap-2">
					<Button className="min-h-12 text-base">Approve</Button>
					<Button className="min-h-12 text-base" variant="outline">
						Request changes
					</Button>
				</div>
			</div>
		</div>
	);
}
