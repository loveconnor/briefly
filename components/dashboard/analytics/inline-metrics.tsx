import type { AnalyticsData } from "./analytics-data";

export function InlineMetrics({ metrics }: { metrics: AnalyticsData["metrics"] }) {
	return (
		<section className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-2 text-sm leading-none">
			{metrics.map((metric, index) => (
				<span className="contents" key={metric.label}>
					{index > 0 ? <span className="translate-y-px text-border">/</span> : null}
					<span className="inline-flex items-baseline gap-1.5">
						<strong className={`${metric.tone ?? "text-foreground"} font-semibold leading-none tabular-nums`}>
							{metric.value}
						</strong>
						<span className="leading-none text-muted-foreground">{metric.label}</span>
					</span>
				</span>
			))}
		</section>
	);
}
