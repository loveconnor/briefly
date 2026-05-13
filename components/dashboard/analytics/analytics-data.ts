export type {
	AnalyticsData,
	PortalPerformance,
	PortalStatus,
} from "@/lib/app-data";

export type SortKey =
	| "portal"
	| "status"
	| "views"
	| "avgReviewTime"
	| "downloads"
	| "comments"
	| "lastActivity"
	| "conversion";
