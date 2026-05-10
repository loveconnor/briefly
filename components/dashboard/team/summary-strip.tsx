export function SummaryStrip() {
	const stats = ["8 members", "3 clients", "12 active projects", "2 pending invites"];

	return (
		<div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
			{stats.map((stat) => (
				<span key={stat}>{stat}</span>
			))}
		</div>
	);
}
