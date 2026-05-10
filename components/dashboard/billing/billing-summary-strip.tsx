export function BillingSummaryStrip() {
	const metrics = [
		{ value: "$48,200", label: "collected this month", tone: "text-foreground" },
		{ value: "6", label: "outstanding invoices", tone: "text-foreground" },
		{ value: "$12,400", label: "overdue", tone: "text-destructive-foreground" },
		{ value: "4", label: "active retainers", tone: "text-success-foreground" },
		{ value: "Friday", label: "next payout", tone: "text-foreground" },
	];

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
