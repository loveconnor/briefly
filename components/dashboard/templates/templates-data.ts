export type {
	TemplateCategory,
	TemplateSystem,
	TemplateSystem as TemplatePhaseSource,
} from "@/lib/app-data";
export type { TemplateSystem as ClientPortalPreviewSource } from "@/lib/app-data";
export type TemplatePhase = import("@/lib/app-data").TemplateSystem["phases"][number];
export type ClientPortalPreviewItem = import("@/lib/app-data").TemplateSystem["clientPortalPreview"][number];

export const templateFilters: Array<{
	label: string;
	value: import("@/lib/app-data").TemplateCategory | "all";
}> = [
	{ label: "All", value: "all" },
	{ label: "Website", value: "website" },
	{ label: "Branding", value: "branding" },
	{ label: "SEO", value: "seo" },
	{ label: "Retainers", value: "retainers" },
	{ label: "Custom", value: "custom" },
];
