import type { LucideIcon } from "lucide-react";

export type {
	Project,
	ProjectPhase,
	ProjectStatus,
	ProjectTaskStatus,
} from "@/lib/app-data";

export type EventIconMap = Record<
	"approval" | "upload" | "delivery" | "comment" | "phase",
	LucideIcon
>;
