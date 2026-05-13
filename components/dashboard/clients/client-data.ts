import type { ClientHealth, ClientRecord, ClientStatus } from "@/lib/app-data";

export type { ClientHealth, ClientRecord, ClientStatus };

export const clientStatusOptions: Array<ClientStatus | "All"> = [
	"All",
	"Active",
	"Waiting",
	"Blocked",
	"Paused",
	"Completed",
	"Archived",
];
