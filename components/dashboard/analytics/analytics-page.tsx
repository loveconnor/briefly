"use client";

import { useState } from "react";

import { AnalyticsHeader } from "./analytics-header";
import { ApprovalFunnel } from "./approval-funnel";
import { EngagementTimeline } from "./engagement-timeline";
import { InlineMetrics } from "./inline-metrics";
import { InsightsAndSignals } from "./insights-and-signals";
import { LiveActivityFeed } from "./live-activity-feed";
import { MomentumSignals } from "./momentum-signals";
import { PortalPerformanceTable } from "./portal-performance-table";

export function AnalyticsPage() {
	const [project, setProject] = useState("all");
	const [range, setRange] = useState("7d");
	const [compare, setCompare] = useState("previous");

	return (
		<div className="mx-auto w-full max-w-[1480px] space-y-7">
			<AnalyticsHeader
				compare={compare}
				onCompareChange={setCompare}
				onProjectChange={setProject}
				onRangeChange={setRange}
				project={project}
				range={range}
			/>
			<InlineMetrics />
			<section className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
				<EngagementTimeline />
				<LiveActivityFeed />
			</section>
			<PortalPerformanceTable project={project} />
			<InsightsAndSignals />
			<ApprovalFunnel />
			<MomentumSignals />
		</div>
	);
}
