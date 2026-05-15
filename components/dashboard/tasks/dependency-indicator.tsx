export function DependencyIndicator({ value }: { value: string }) {
	return (
		<span className="flex min-w-0 items-center gap-2 text-muted-foreground">
			<span className="size-1.5 shrink-0 rounded-full bg-warning/70" />
			<span className="truncate">{value}</span>
		</span>
	);
}
