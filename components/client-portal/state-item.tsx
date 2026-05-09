export function StateItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-muted-foreground">{label}</p>
			<p className="mt-1 font-medium">{value}</p>
		</div>
	);
}
