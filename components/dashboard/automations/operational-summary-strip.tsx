export function OperationalSummaryStrip() {
	return (
		<section className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-1 text-sm leading-none">
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-foreground tabular-nums">18</strong>
				<span className="leading-none text-muted-foreground">active automations</span>
			</span>
			<span className="translate-y-px text-muted-foreground/30">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-foreground tabular-nums">124</strong>
				<span className="leading-none text-muted-foreground">actions this week</span>
			</span>
			<span className="translate-y-px text-muted-foreground/30">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-warning-foreground tabular-nums">3</strong>
				<span className="leading-none text-muted-foreground">paused</span>
			</span>
			<span className="translate-y-px text-muted-foreground/30">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-success-foreground tabular-nums">0</strong>
				<span className="leading-none text-muted-foreground">failed runs</span>
			</span>
			<span className="translate-y-px text-muted-foreground/30">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-foreground tabular-nums">4m</strong>
				<span className="leading-none text-muted-foreground">since last trigger</span>
			</span>
		</section>
	);
}
