import { cn } from "@/lib/utils";
import { momentum } from "./analytics-data";

export function MomentumSignals() {
	return (
		<section className="grid gap-3 pb-2 md:grid-cols-3">
			{momentum.map((item) => (
				<div className="border-t pt-3" key={item.label}>
					<div className={cn("text-sm font-medium", item.tone)}>{item.label}</div>
					<div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
				</div>
			))}
		</section>
	);
}
