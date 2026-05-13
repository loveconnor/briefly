"use client";

import { useState } from "react";

import { Tabs } from "@/components/ui/tabs";
import { PortalHeader } from "./portal-header";
import { PortalTabs } from "./portal-tabs";
import type { Portal } from "./portals-data";

export function PortalsPage({
	portals,
	summary,
}: {
	portals: Portal[];
	summary: Array<{ value: string; label: string }>;
}) {
	const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
	const selectedPortal =
		portals.find((portal) => portal.id === selectedPortalId) ?? null;

	return (
		<div className="mx-auto w-full max-w-[1440px] space-y-7">
			<PortalHeader summary={summary} />
			<Tabs defaultValue="active" className="gap-4">
				<PortalTabs
					onSelectPortal={(portalId) => setSelectedPortalId(portalId || null)}
					portals={portals}
					selectedPortal={selectedPortal}
				/>
			</Tabs>
		</div>
	);
}
