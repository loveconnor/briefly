import type { AutomationsData, Automation } from "@/lib/app-data";
import { cn } from "@/lib/utils";
import { automationIconMap } from "./automation-icons";

export function AutomationHealthSection({
	automations,
	attentionItems,
	onSelect,
	recentActivity,
}: {
	automations: Automation[];
	attentionItems: AutomationsData["attentionItems"];
	onSelect: (automation: Automation) => void;
	recentActivity: AutomationsData["recentActivity"];
}) {
	return (
		<section className="grid gap-7 pt-1 opacity-90 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.75fr)]">
			<RecentAutomationActivity automations={automations} onSelect={onSelect} recentActivity={recentActivity} />
			<AttentionNeeded attentionItems={attentionItems} />
		</section>
	);
}

function RecentAutomationActivity({
	automations,
	onSelect,
	recentActivity,
}: {
	automations: Automation[];
	onSelect: (automation: Automation) => void;
	recentActivity: AutomationsData["recentActivity"];
}) {
	return (
		<section className="min-w-0">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="text-base font-semibold">Recent runs</h2>
					<p className="text-sm text-muted-foreground/80">Live automation activity.</p>
				</div>
				<span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
					<span className="size-1.5 rounded-full bg-success-foreground shadow-[0_0_0_4px_--theme(--color-success/12%)]" />
					Live
				</span>
			</div>
			<div className="space-y-1">
				{recentActivity.map((activity) => {
					const Icon = automationIconMap[activity.icon];
					const automation = automations.find(
						(item) => item.slug === activity.automationSlug
					);

					return (
						<div
							className="group flex items-start gap-3 rounded-md py-2 transition-colors hover:bg-accent/30"
							key={`${activity.title}-${activity.time}`}
						>
							<div className="mt-0.5 flex size-6 shrink-0 items-center justify-center text-muted-foreground/70">
								<Icon className="size-3.5" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm font-medium">{activity.title}</p>
								<button
									className="mt-0.5 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
									onClick={() => automation && onSelect(automation)}
									type="button"
								>
									View automation
								</button>
							</div>
							<div className="flex shrink-0 items-center gap-2">
								<span
									className={cn(
										"text-xs font-medium",
										activity.tone === "info"
											? "text-info-foreground"
											: "text-success-foreground"
									)}
								>
									{activity.status}
								</span>
								<span className="text-xs text-muted-foreground">/</span>
								<time className="text-xs text-muted-foreground">{activity.time}</time>
							</div>
						</div>
					);
				})}
				{recentActivity.length === 0 ? (
					<p className="py-2 text-sm text-muted-foreground">No automation runs recorded yet.</p>
				) : null}
			</div>
		</section>
	);
}

function AttentionNeeded({
	attentionItems,
}: {
	attentionItems: AutomationsData["attentionItems"];
}) {
	return (
		<aside className="min-w-0">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="text-base font-semibold">Attention needed</h2>
					<p className="text-sm text-muted-foreground/80">Quiet checks before work stalls.</p>
				</div>
				<span className="text-sm font-medium tabular-nums text-muted-foreground">{attentionItems.length}</span>
			</div>
			<div className="space-y-1">
				{attentionItems.map((item) => {
					const Icon = automationIconMap[item.icon];
					return (
						<div className="flex items-start gap-3 rounded-md py-2" key={item.title}>
							<div
								className={cn(
									"mt-0.5 flex size-6 shrink-0 items-center justify-center",
									item.tone === "error"
										? "text-destructive-foreground"
										: "text-warning-foreground"
								)}
							>
								<Icon className="size-3.5" />
							</div>
							<div className="min-w-0">
								<p
									className={cn(
										"text-sm font-medium",
										item.tone === "error" && "text-destructive-foreground"
									)}
								>
									{item.title}
								</p>
								<p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
							</div>
						</div>
					);
				})}
				{attentionItems.length === 0 ? (
					<p className="py-2 text-sm text-muted-foreground">No automation issues recorded.</p>
				) : null}
			</div>
		</aside>
	);
}
