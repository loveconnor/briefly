import { ArchiveIcon, BarChart3Icon, PanelsTopLeftIcon } from "lucide-react";

import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortalDetailsSheet } from "./portal-details-sheet";
import { PortalEmptyState } from "./portal-empty-state";
import { PortalRow } from "./portal-row";
import type { Portal } from "./portals-data";

export function PortalTabs({
	onSelectPortal,
	portals,
	selectedPortal,
}: {
	onSelectPortal: (portalId: string) => void;
	portals: Portal[];
	selectedPortal: Portal | null;
}) {
	return (
		<>
			<div className="flex justify-center">
				<TabsList
					className="w-fit text-muted-foreground/80"
					variant="line"
				>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="archived">Archived</TabsTrigger>
					<TabsTrigger value="templates">Templates</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="active">
				<>
					<main className="min-w-0">
						{portals.length ? (
							<div className="divide-y divide-border/35">
								{portals.map((portal) => (
									<PortalRow
										key={portal.id}
										onSelect={() => onSelectPortal(portal.id)}
										portal={portal}
									/>
								))}
							</div>
						) : (
							<PortalEmptyState
								action="Create portal"
								description="Client-facing workspaces will appear here after a project has a portal record."
								icon={PanelsTopLeftIcon}
								secondaryAction="View templates"
								title="No active portals yet"
							/>
						)}
					</main>

					<PortalDetailsSheet
						onOpenChange={(open) => {
							if (!open && selectedPortal) onSelectPortal("");
						}}
						portal={selectedPortal}
					/>
				</>
			</TabsContent>

			<TabsContent value="archived">
				<PortalEmptyState
					action="Create portal"
					description="Archived portals will appear here after client-facing workspaces are closed out."
					icon={ArchiveIcon}
					secondaryAction="View active"
					title="No archived portals yet"
				/>
			</TabsContent>
			<TabsContent value="templates">
				<PortalEmptyState
					action="Create template"
					description="Save repeatable portal structures for approvals, handoffs, uploads, and client reviews."
					icon={PanelsTopLeftIcon}
					secondaryAction="Browse examples"
					title="No portal templates yet"
				/>
			</TabsContent>
			<TabsContent value="analytics">
				<PortalEmptyState
					action="Open active portals"
					description="Portal analytics will appear once clients start viewing, commenting, approving, and uploading."
					icon={BarChart3Icon}
					secondaryAction="Learn more"
					title="No portal analytics yet"
				/>
			</TabsContent>
		</>
	);
}
