export type SettingsKey =
	| "general"
	| "branding"
	| "domains"
	| "members"
	| "roles"
	| "portals"
	| "approvals"
	| "notifications"
	| "updates"
	| "automations"
	| "billing"
	| "templates"
	| "integrations"
	| "security"
	| "api"
	| "data"
	| "logs";

export type SettingsItem = {
	key: SettingsKey;
	label: string;
};

export type SettingsGroup = {
	label: string;
	items: SettingsItem[];
};

export type SheetContent =
	| "member"
	| "domain"
	| "role"
	| "automation"
	| "invoice"
	| "webhook";

export type SheetState = {
	title: string;
	description: string;
	content: SheetContent;
} | null;

export type DirtyHandler = () => void;
export type SheetHandler = (sheet: SheetState) => void;
