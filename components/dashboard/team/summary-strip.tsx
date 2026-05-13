export function SummaryStrip({ stats }: { stats: string[] }) {
	return (
		<div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
			{stats.map((stat) => (
				<span key={stat}>{stat}</span>
			))}
		</div>
	);
}
