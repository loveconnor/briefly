export function PortalHeader({
	summary,
}: {
	summary: Array<{ value: string; label: string }>;
}) {
	return (
		<header className="space-y-6 border-b border-border/80 pb-6">
			<div className="max-w-3xl">
				<h1 className="text-2xl font-bold tracking-tight">Portals</h1>
				<p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
					Client-facing workspaces, approvals, uploads, and visibility signals.
				</p>
			</div>
			<div className="flex flex-wrap gap-x-10 gap-y-4">
				{summary.map((metric) => (
					<div className="min-w-24" key={metric.label}>
						<div className="text-xl font-semibold leading-none tracking-tight">
							{metric.value}
						</div>
						<div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
					</div>
				))}
			</div>
		</header>
	);
}
