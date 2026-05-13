import type { BillingData } from "@/lib/app-data";

export function BillingSummaryStrip({ metrics }: { metrics: BillingData["summary"] }) {
	return (
		<section className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-1 text-sm leading-none">
			{metrics.map((metric) => (
				<span className="inline-flex items-baseline gap-1.5" key={metric.label}>
					<strong className={`${metric.tone} font-semibold leading-none tabular-nums`}>
						{metric.value}
					</strong>
					<span className="leading-none text-muted-foreground/80">{metric.label}</span>
				</span>
			))}
		</section>
	);
}
