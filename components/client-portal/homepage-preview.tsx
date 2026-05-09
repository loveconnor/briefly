export function HomepagePreview({ compact = false }: { compact?: boolean }) {
	return (
		<div className="overflow-hidden bg-background/85">
			<div className="border-b px-5 py-4">
				<div className="flex items-center justify-between gap-4">
					<p className="text-sm font-medium">Acme</p>
					<div className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
						<span>Services</span>
						<span>Work</span>
						<span>Contact</span>
					</div>
				</div>
			</div>
			<div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_220px]">
				<div className="min-w-0">
					<p className="text-sm font-medium text-muted-foreground">Homepage hero</p>
					<h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight">
						Growth strategy and launch support for modern teams.
					</h3>
					<p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
						A cleaner opening message, simplified mobile navigation, and clearer
						service path for first-time visitors.
					</p>
					<div className="mt-7 flex flex-wrap gap-3">
						<div className="h-9 w-28 rounded-md bg-primary" />
						<div className="h-9 w-32 rounded-md bg-muted" />
					</div>
				</div>
				<div className="min-h-44 rounded-lg bg-muted" />
			</div>
			{compact ? null : (
				<div className="grid grid-cols-3 gap-3 px-5 pb-5 sm:px-7 sm:pb-7">
					<div className="h-20 rounded-lg bg-muted" />
					<div className="h-20 rounded-lg bg-muted" />
					<div className="h-20 rounded-lg bg-muted" />
				</div>
			)}
		</div>
	);
}
