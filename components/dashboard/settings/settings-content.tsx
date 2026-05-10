"use client";

import {
	ApprovalSettings,
	NotificationSettings,
	PortalSettings,
	UpdatesSettings,
} from "./sections/client-experience-settings";
import {
	AutomationSettings,
	BillingSettings,
	IntegrationSettings,
	TemplateSettings,
} from "./sections/operations-settings";
import {
	ApiSettings,
	DataSettings,
	LogsSettings,
	SecuritySettings,
} from "./sections/system-settings";
import {
	BrandingSettings,
	DomainSettings,
	GeneralSettings,
	MemberSettings,
	RoleSettings,
} from "./sections/workspace-settings";
import type { DirtyHandler, SettingsKey, SheetHandler } from "./settings-types";

export function SettingsContent({
	active,
	onDirty,
	onOpenSheet,
}: {
	active: SettingsKey;
	onDirty: DirtyHandler;
	onOpenSheet: SheetHandler;
}) {
	switch (active) {
		case "general":
			return <GeneralSettings onDirty={onDirty} />;
		case "branding":
			return <BrandingSettings onDirty={onDirty} />;
		case "domains":
			return <DomainSettings onOpenSheet={onOpenSheet} />;
		case "members":
			return <MemberSettings onOpenSheet={onOpenSheet} />;
		case "roles":
			return <RoleSettings onOpenSheet={onOpenSheet} />;
		case "portals":
			return <PortalSettings onDirty={onDirty} />;
		case "approvals":
			return <ApprovalSettings onDirty={onDirty} />;
		case "notifications":
			return <NotificationSettings onDirty={onDirty} />;
		case "updates":
			return <UpdatesSettings onDirty={onDirty} />;
		case "automations":
			return <AutomationSettings onDirty={onDirty} />;
		case "billing":
			return <BillingSettings onOpenSheet={onOpenSheet} />;
		case "templates":
			return <TemplateSettings onDirty={onDirty} />;
		case "integrations":
			return <IntegrationSettings />;
		case "security":
			return <SecuritySettings onDirty={onDirty} />;
		case "api":
			return <ApiSettings onOpenSheet={onOpenSheet} />;
		case "data":
			return <DataSettings onDirty={onDirty} />;
		case "logs":
			return <LogsSettings />;
	}
}
