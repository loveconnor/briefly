import {
	CheckCircle2Icon,
	Clock3Icon,
	EyeIcon,
	TriangleAlertIcon,
} from "lucide-react";

import type { VisibilityState } from "@/components/dashboard/updates/types";

export const visibilityTextStyles: Record<VisibilityState, string> = {
	viewed: "text-info-foreground",
	awaiting: "text-warning-foreground",
	ignored: "text-destructive-foreground",
	acknowledged: "text-success-foreground",
};

export const visibilityIcons = {
	viewed: EyeIcon,
	awaiting: Clock3Icon,
	ignored: TriangleAlertIcon,
	acknowledged: CheckCircle2Icon,
};
