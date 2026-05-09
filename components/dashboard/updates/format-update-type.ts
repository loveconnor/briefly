import type { UpdateType } from "@/components/dashboard/updates/types";

export function formatUpdateType(type: UpdateType) {
	return type
		.toLowerCase()
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("-");
}
