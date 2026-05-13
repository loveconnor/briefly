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
import type { AnalyticsData } from "./analytics-data";

export function AnalyticsPage({ data }: { data: AnalyticsData }) {
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
			<InlineMetrics metrics={data.metrics} />
			<section className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
				<EngagementTimeline data={data.timelineData} events={data.timelineEvents} />
				<LiveActivityFeed activityFeed={data.activityFeed} />
			</section>
			<PortalPerformanceTable portalPerformance={data.portalPerformance} project={project} />
			<InsightsAndSignals bottlenecks={data.bottlenecks} insights={data.insights} />
			<ApprovalFunnel funnel={data.funnel} />
			<MomentumSignals momentum={data.momentum} />
		</div>
	);
}
