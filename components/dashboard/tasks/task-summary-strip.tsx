import type { DeliveryTask } from "./tasks-data";

export function TaskSummaryStrip({
	tasks,
	weekStartMs,
}: {
	tasks: DeliveryTask[];
	weekStartMs: number;
}) {
	const summary = [
		{
			label: "due today",
			value: String(tasks.filter((task) => task.due.toLowerCase() === "today" && !task.completed).length),
			tone: "text-foreground",
		},
		{
			label: "blocked",
			value: String(tasks.filter((task) => task.status === "Blocked").length),
			tone: "text-destructive-foreground",
		},
		{
			label: "waiting on client",
			value: String(tasks.filter((task) => task.waitingOn.toLowerCase().includes("client")).length),
			tone: "text-warning-foreground",
		},
		{
			label: "overdue",
			value: String(tasks.filter((task) => task.dueRank < 0 && !task.completed).length),
			tone: "text-destructive-foreground",
		},
		{
			label: "completed this week",
			value: String(
				tasks.filter((task) => {
					if (!task.completedAt) return false;
					return new Date(task.completedAt).getTime() >= weekStartMs;
				}).length
			),
			tone: "text-success-foreground",
		},
	];

	return (
		<section className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pb-1 text-sm leading-none">
			{summary.map((metric, index) => (
				<span className="contents" key={metric.label}>
					{index > 0 ? <span className="translate-y-px text-muted-foreground/30">/</span> : null}
					<span className="inline-flex items-baseline gap-1.5">
						<strong className={`${metric.tone} font-semibold leading-none tabular-nums`}>
							{metric.value}
						</strong>
						<span className="leading-none text-muted-foreground">{metric.label}</span>
					</span>
				</span>
			))}
		</section>
	);
}
