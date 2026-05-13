"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	ReferenceDot,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import type { AnalyticsData } from "./analytics-data";

function TimelineTooltip({
	active,
	label,
	payload,
	events,
}: {
	active?: boolean;
	events: AnalyticsData["timelineEvents"];
	label?: string;
	payload?: Array<{ name: string; value: number }>;
}) {
	if (!active || !payload?.length) return null;
	const event = events.find((item) => item.day === label);

	return (
		<div className="min-w-44 rounded-md border bg-background px-3 py-2 text-xs shadow-xl">
			<div className="mb-1 font-medium text-foreground">{label}</div>
			<div className="space-y-1 text-muted-foreground">
				{payload.map((item) => (
					<div className="flex items-center justify-between gap-4" key={item.name}>
						<span>{item.name}</span>
						<span className="font-mono text-foreground">{item.value}</span>
					</div>
				))}
			</div>
			{event ? (
				<div className="mt-2 border-t pt-2 text-foreground">{event.event}</div>
			) : null}
		</div>
	);
}

export function EngagementTimeline({
	data,
	events,
}: {
	data: AnalyticsData["timelineData"];
	events: AnalyticsData["timelineEvents"];
}) {
	return (
		<div className="min-w-0">
			<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold">Engagement Timeline</h2>
					<p className="text-sm text-muted-foreground">
						Portal opens, comments, downloads, uploads, and approval moments.
					</p>
				</div>
				<div className="flex flex-wrap gap-4 text-xs">
					<span className="inline-flex items-center gap-1.5 text-info-foreground">
						<span className="h-px w-4 bg-info" />
						Opens
					</span>
					<span className="inline-flex items-center gap-1.5 text-warning-foreground">
						<span className="h-px w-4 bg-warning" />
						Comments
					</span>
					<span className="inline-flex items-center gap-1.5 text-success-foreground">
						<span className="h-px w-4 bg-success" />
						Approvals
					</span>
				</div>
			</div>
			<div className="h-[340px] rounded-lg bg-card/40 p-2 ring-1 ring-border/60">
				<ResponsiveContainer height="100%" width="100%">
					<LineChart
						data={data}
						margin={{ bottom: 8, left: -18, right: 18, top: 12 }}
					>
						<CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
						<XAxis
							axisLine={false}
							dataKey="day"
							tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
							tickLine={false}
						/>
						<YAxis
							axisLine={false}
							tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
							tickLine={false}
							width={34}
						/>
						<Tooltip content={<TimelineTooltip events={events} />} cursor={{ stroke: "var(--border)" }} />
						<Line
							activeDot={{ r: 4, strokeWidth: 0 }}
							dataKey="opens"
							dot={false}
							name="opens"
							stroke="var(--info)"
							strokeWidth={1.8}
							type="monotone"
						/>
						<Line
							dataKey="comments"
							dot={false}
							name="comments"
							stroke="var(--warning)"
							strokeWidth={1.4}
							type="monotone"
						/>
						<Line
							dataKey="downloads"
							dot={false}
							name="downloads"
							stroke="var(--muted-foreground)"
							strokeWidth={1.2}
							type="monotone"
						/>
						<Line
							dataKey="approvals"
							dot={false}
							name="approvals"
							stroke="var(--success)"
							strokeWidth={1.4}
							type="monotone"
						/>
						<Line
							dataKey="uploads"
							dot={false}
							name="uploads"
							stroke="var(--foreground)"
							strokeOpacity={0.35}
							strokeWidth={1.1}
							type="monotone"
						/>
						{events.map((event) => (
							<ReferenceDot
								fill="var(--background)"
								ifOverflow="extendDomain"
								key={event.event}
								r={4}
								stroke="var(--foreground)"
								strokeWidth={1.5}
								x={event.day}
								y={event.y}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
				{events.map((event) => (
					<div className="flex min-w-0 items-center gap-2" key={event.event}>
						<span className="h-px w-3 shrink-0 bg-border" />
						<span className="truncate">
							{event.event} <span className="text-foreground">{event.day}</span>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
