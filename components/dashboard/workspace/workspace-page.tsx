"use client";

import { useMemo, useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { ApiPage } from "./api-page";
import { BrandingPage } from "./branding-page";
import { DomainsPage } from "./domains-page";
import { IntegrationsPage } from "./integrations-page";
import { NotificationsPage } from "./notifications-page";
import { pageCopy, type Domain, type WorkspaceData } from "./workspace-data";
import type { WorkspaceSection } from "./workspace-sections";
import {
	DomainSheet,
	IntegrationSheet,
	ManageDomainSheet,
	WebhookSheet,
} from "./workspace-sheets";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type SheetState =
	| { type: "domain" }
	| ({ type: "manage-domain" } & Domain)
	| { type: "integration"; name: string; status: string; detail: string }
	| { type: "webhook"; event: string; endpoint: string }
	| null;

export function WorkspacePage({
	data,
	section,
}: {
	data: WorkspaceData;
	section: WorkspaceSection;
}) {
	const [accentColor, setAccentColor] = useState(data.brandColor);
	const [sheet, setSheet] = useState<SheetState>(null);
	const copy = pageCopy[section];

	const sheetContent = useMemo(() => {
		if (!sheet) return null;
		if (sheet.type === "domain") return <DomainSheet />;
		if (sheet.type === "manage-domain") return <ManageDomainSheet {...sheet} />;
		if (sheet.type === "integration") return <IntegrationSheet {...sheet} />;
		return <WebhookSheet {...sheet} />;
	}, [sheet]);

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-9 pb-20">
			<header className="flex flex-col gap-2 pt-1">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
							{copy.description}
						</p>
					</div>
					{section === "api" ? (
						<Button asChild variant="ghost">
							<Link href="/dashboard/workspace/api#api-docs">
								View API documentation <ArrowUpRightIcon />
							</Link>
						</Button>
					) : null}
				</div>
			</header>

			{section === "branding" ? (
				<BrandingPage
					accentColor={accentColor}
					data={data}
					onAccentColorChange={setAccentColor}
				/>
			) : null}
			{section === "domains" ? (
				<DomainsPage
					domains={data.domains}
					onAddDomain={() => setSheet({ type: "domain" })}
					onManageDomain={(domain) =>
						setSheet({
							type: "manage-domain",
							...domain,
						})
					}
				/>
			) : null}
			{section === "integrations" ? (
				<IntegrationsPage
					integrationGroups={data.integrationGroups}
					onOpen={(integration) =>
						setSheet({
							type: "integration",
							name: integration.name,
							status: integration.status,
							detail: integration.detail,
						})
					}
				/>
			) : null}
			{section === "notifications" ? <NotificationsPage notificationRows={data.notificationRows} /> : null}
			{section === "api" ? (
				<ApiPage
					apiKeys={data.apiKeys}
					onOpenWebhook={(webhook) =>
						setSheet({
							type: "webhook",
							event: webhook.event,
							endpoint: webhook.endpoint,
						})
					}
					webhooks={data.webhooks}
				/>
			) : null}

			<Sheet open={Boolean(sheet)} onOpenChange={(open) => !open && setSheet(null)}>
				<SheetContent className="w-[calc(100%-(--spacing(8)))] max-w-xl gap-0">
					{sheetContent}
				</SheetContent>
			</Sheet>
		</div>
	);
}
