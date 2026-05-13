import { DownloadIcon, MessageSquareTextIcon, SendIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AnalyticsData } from "./analytics-data";

export function ApprovalFunnel({ funnel }: { funnel: AnalyticsData["funnel"] }) {
	const baseValue = funnel[0]?.value || 1;

	return (
		<section className="space-y-4 pt-1">
			<div>
				<h2 className="text-lg font-semibold">Approval Funnel</h2>
				<p className="text-sm text-muted-foreground">
					Sent to approved, with drop-off exposed before it becomes invisible.
				</p>
			</div>
			<div className="grid gap-3 md:grid-cols-4">
				{funnel.map((step, index) => {
					const next = funnel[index + 1];
					const drop = next
						? Math.round(((step.value - next.value) / step.value) * 100)
						: 0;
					return (
						<div className="border-t pt-3" key={step.label}>
							<div className="flex items-center justify-between gap-3">
								<div className="text-sm font-medium">{step.label}</div>
								<div className="font-mono text-sm tabular-nums">{step.value}</div>
							</div>
					<div className="mt-3 h-1.5 rounded-full bg-muted">
						<div
							className={cn("h-full rounded-full", step.tone)}
							style={{
								width: `${Math.max((step.value / baseValue) * 100, 8)}%`,
							}}
						/>
							</div>
							<div className="mt-2 text-[11px] text-muted-foreground/80">
								{next
									? `${drop}% drop to ${next.label.toLowerCase()}`
									: "Decision complete"}
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex flex-wrap gap-2 pt-1 text-xs text-muted-foreground">
				<span className="inline-flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1">
					<SendIcon className="size-3.5" />
					Sent: <span className="text-foreground">{funnel[0]?.value ?? 0}</span>
				</span>
				<span className="inline-flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1">
					<MessageSquareTextIcon className="size-3.5" />
					Commented: <span className="text-foreground">{funnel[2]?.value ?? 0}</span>
				</span>
				<span className="inline-flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1">
					<DownloadIcon className="size-3.5" />
					Approved: <span className="text-foreground">{funnel[3]?.value ?? 0}</span>
				</span>
			</div>
		</section>
	);
}
