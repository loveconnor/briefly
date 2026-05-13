import type { AutomationsData } from "@/lib/app-data";

export function OperationalSummaryStrip({
	summary,
}: {
	summary: AutomationsData["summary"];
}) {
	return (
		<section className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-1 text-sm leading-none">
			{summary.map((metric, index) => (
				<span className="contents" key={metric.label}>
					{index > 0 ? <span className="translate-y-px text-muted-foreground/30">/</span> : null}
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
