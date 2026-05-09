import type { PortalTone } from "./portals-data";

export const portalToneStyles: Record<
	PortalTone,
	{
		text: string;
		dot: string;
	}
> = {
	healthy: {
		text: "text-success-foreground",
		dot: "bg-success-foreground",
	},
	attention: {
		text: "text-warning-foreground",
		dot: "bg-warning-foreground",
	},
	blocked: {
		text: "text-destructive-foreground",
		dot: "bg-destructive-foreground",
	},
};
