import { cn } from "@/lib/utils";

import { billingAttentionSummary } from "./billing-data";
import { billingStatusClass } from "./billing-status";

export function BillingAttentionStrip() {
	return (
		<section className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
			<span className="font-medium text-foreground">Attention needed</span>
			{billingAttentionSummary.map((item) => (
				<span className={cn("font-medium", billingStatusClass[item.status])} key={item.label}>
					{item.label}
				</span>
			))}
			<span className="text-muted-foreground/70">
				$12,800 processing with $248 fees estimated
			</span>
		</section>
	);
}
