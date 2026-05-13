import type { ClientUpdate, UpdateType } from "@/components/dashboard/updates/types";

export type { ClientUpdate, UpdateType };

export const updateStates = ["Sent", "Viewed", "Awaiting", "Ignored", "Acknowledged"];
export const updateRanges = ["This month", "Today", "This week", "Earlier"];
export const updateGroups: ClientUpdate["group"][] = [
	"Today",
	"Yesterday",
	"This week",
	"Earlier",
];
