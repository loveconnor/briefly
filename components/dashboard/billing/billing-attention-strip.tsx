import { cn } from "@/lib/utils";

import type { BillingData } from "@/lib/app-data";
import { billingStatusClass } from "./billing-status";

export function BillingAttentionStrip({
	items,
	processingNote,
}: {
	items: BillingData["attentionSummary"];
	processingNote?: string;
}) {
	if (items.length === 0 && !processingNote) return null;

	return (
		<section className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
			<span className="font-medium text-foreground">Attention needed</span>
			{items.map((item) => (
				<span className={cn("font-medium", billingStatusClass[item.status])} key={item.label}>
					{item.label}
				</span>
			))}
			{processingNote ? <span className="text-muted-foreground/70">{processingNote}</span> : null}
		</section>
	);
}
