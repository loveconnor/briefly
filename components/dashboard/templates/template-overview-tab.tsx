import { TemplateMetricStrip } from "./template-metric-strip";
import { TemplateSectionIntro } from "./template-section-intro";
import type { TemplateSystem } from "./templates-data";
import { WorkflowSnapshot } from "./workflow-snapshot";

export function OverviewTab({ template }: { template: TemplateSystem }) {
	return (
		<div className="space-y-8">
			<TemplateMetricStrip template={template} />
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
				<section className="space-y-4">
					<TemplateSectionIntro
						description="A fast read on what this reusable system creates and where it fits."
						title="System summary"
					/>
					<div className="grid gap-3 sm:grid-cols-2">
						{template.workflowIncludes.map((item) => (
							<div className="rounded-md bg-muted/25 px-3 py-3 text-sm" key={item}>
								{item}
							</div>
						))}
					</div>
				</section>
				<section className="space-y-4">
					<TemplateSectionIntro title="Operating cadence" />
					<div className="space-y-3 text-sm">
						<div>
							<div className="text-xs font-medium text-muted-foreground">
								Estimated timeline
							</div>
							<div className="mt-1 font-medium">{template.estimatedTimeline}</div>
						</div>
						<div>
							<div className="text-xs font-medium text-muted-foreground">
								Default roles
							</div>
							<div className="mt-1 text-muted-foreground">
								{template.defaultRoles.join(", ")}
							</div>
						</div>
						<div>
							<div className="text-xs font-medium text-muted-foreground">
								Usage
							</div>
							<div className="mt-1 text-muted-foreground">
								Used {template.usedCount} times · updated {template.lastUpdated}
							</div>
						</div>
					</div>
				</section>
			</div>
			<WorkflowSnapshot template={template} />
			<section className="space-y-4">
				<TemplateSectionIntro title="Phase summary" />
				<div className="grid gap-2 md:grid-cols-2">
					{template.phases.map((phase) => (
						<div
							className="rounded-md px-3 py-3 transition-colors hover:bg-muted/30"
							key={phase.name}
						>
							<div className="font-medium">{phase.name}</div>
							<div className="mt-1 text-sm text-muted-foreground">
								{phase.tasks.length} tasks · {phase.approvals.length} approvals
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
