"use client";

import { useState } from "react";
import { ChevronDownIcon, Clock3Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AnalyticsData } from "./analytics-data";

export function InsightsAndSignals({
	bottlenecks,
	insights,
}: {
	bottlenecks: AnalyticsData["bottlenecks"];
	insights: AnalyticsData["insights"];
}) {
	const [expandedInsight, setExpandedInsight] = useState(insights[0]?.label ?? "");

	return (
		<section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
			<div>
				<h2 className="text-lg font-semibold text-foreground">
					Client Interaction Insights
				</h2>
				<div className="mt-3 divide-y border-y">
					{insights.map((insight) => {
						const expanded = expandedInsight === insight.label;
						return (
							<button
								className="flex min-h-[76px] w-full items-center py-2 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring"
								key={insight.label}
								onClick={() => setExpandedInsight(expanded ? "" : insight.label)}
								type="button"
							>
								<div className="flex w-full items-start justify-between gap-4 px-2">
									<div className="min-w-0">
										<div className="text-xs text-muted-foreground">{insight.label}</div>
										<div className="mt-1 text-base font-semibold">{insight.value}</div>
										{expanded ? (
											<div className="mt-1 text-sm text-muted-foreground">
												{insight.detail}
											</div>
										) : null}
									</div>
									<ChevronDownIcon
										className={cn(
											"mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
											expanded && "rotate-180"
										)}
									/>
								</div>
							</button>
						);
					})}
					{insights.length === 0 ? (
						<p className="py-5 text-sm text-muted-foreground">No interaction insights yet.</p>
					) : null}
				</div>
			</div>

			<div>
				<h2 className="text-lg font-semibold">Attention Signals</h2>
				<div className="mt-3 divide-y border-y">
					{bottlenecks.map((item) => (
						<div className="flex min-h-[76px] items-center py-2" key={item.signal}>
							<div className="flex items-start gap-3 px-2">
								<Clock3Icon
									className={cn(
										"mt-0.5 size-4 shrink-0",
										item.tone === "danger" && "text-destructive-foreground",
										item.tone === "warning" && "text-warning-foreground",
										item.tone === "info" && "text-info-foreground"
									)}
								/>
								<div className="min-w-0">
									<div className="font-medium">{item.signal}</div>
									<div className="mt-1 text-sm text-muted-foreground">
										{item.detail}
									</div>
								</div>
							</div>
						</div>
					))}
					{bottlenecks.length === 0 ? (
						<p className="py-5 text-sm text-muted-foreground">No attention signals recorded.</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
