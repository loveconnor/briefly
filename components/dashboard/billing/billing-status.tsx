import { cn } from "@/lib/utils";

import type { BillingStatus } from "./billing-data";

export const billingStatusLabel: Record<BillingStatus, string> = {
	paid: "Paid",
	overdue: "Overdue",
	draft: "Draft",
	processing: "Processing",
	scheduled: "Scheduled",
};

export const billingStatusClass: Record<BillingStatus, string> = {
	paid: "text-success-foreground",
	overdue: "text-destructive-foreground",
	draft: "text-muted-foreground",
	processing: "text-info-foreground",
	scheduled: "text-foreground/80",
};

export function BillingStatusText({ status }: { status: BillingStatus }) {
	return (
		<span className={cn("font-medium", billingStatusClass[status])}>
			{billingStatusLabel[status]}
		</span>
	);
}
