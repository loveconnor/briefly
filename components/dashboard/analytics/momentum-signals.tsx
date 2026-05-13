import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { cn } from "@/lib/utils";
import type { AnalyticsData } from "./analytics-data";

export function MomentumSignals({ momentum }: { momentum: AnalyticsData["momentum"] }) {
	return (
		<section className="grid gap-3 pb-2 md:grid-cols-3">
			{momentum.map((item) => (
				<div className="border-t pt-3" key={item.label}>
					<div className={cn("text-sm font-medium", item.tone)}>{item.label}</div>
					<div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
				</div>
			))}
			{momentum.length === 0 ? (
				<DashboardEmptyState className="md:col-span-3" title="No momentum signals yet" />
			) : null}
		</section>
	);
}
