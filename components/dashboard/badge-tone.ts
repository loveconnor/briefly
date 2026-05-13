import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";

type BadgeTone = "default" | "error" | "info" | "success" | "warning";

const badgeToneClasses: Record<BadgeTone, string> = {
	default: "",
	error: "border-destructive/24 bg-destructive/8 text-destructive-foreground",
	info: "border-info/24 bg-info/8 text-info-foreground",
	success: "border-success/24 bg-success/8 text-success-foreground",
	warning: "border-warning/28 bg-warning/10 text-warning-foreground",
};

export function badgeToneVariant(tone: BadgeTone): BadgeVariant {
	return tone === "error" ? "destructive" : tone === "default" ? "outline" : "outline";
}

export function badgeToneClassName(tone: BadgeTone, className?: string) {
	return cn(badgeToneClasses[tone], className);
}

export type { BadgeTone, BadgeVariant };
