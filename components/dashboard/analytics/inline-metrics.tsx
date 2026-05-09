export function InlineMetrics() {
	return (
		<section className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-2 text-sm leading-none">
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-foreground tabular-nums">14</strong>
				<span className="leading-none text-muted-foreground">active portals</span>
			</span>
			<span className="translate-y-px text-border">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-warning-foreground tabular-nums">32</strong>
				<span className="leading-none text-muted-foreground">approvals pending</span>
			</span>
			<span className="translate-y-px text-border">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-foreground tabular-nums">87</strong>
				<span className="leading-none text-muted-foreground">client opens today</span>
				<span className="leading-none text-success-foreground tabular-nums">+24%</span>
			</span>
			<span className="translate-y-px text-border">/</span>
			<span className="inline-flex items-baseline gap-1.5">
				<strong className="font-semibold leading-none text-destructive-foreground tabular-nums">6</strong>
				<span className="leading-none text-muted-foreground">stalled reviews</span>
			</span>
		</section>
	);
}
