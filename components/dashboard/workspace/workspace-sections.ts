export const workspaceSections = [
	"branding",
	"domains",
	"integrations",
	"notifications",
	"api",
] as const;

export type WorkspaceSection = (typeof workspaceSections)[number];
