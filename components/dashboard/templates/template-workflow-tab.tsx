import { PhaseBlock } from "./phase-block";
import { TemplateSectionIntro } from "./template-section-intro";
import type { TemplateSystem } from "./templates-data";

export function WorkflowTab({ template }: { template: TemplateSystem }) {
	return (
		<section className="space-y-5">
			<TemplateSectionIntro
				description="Timeline-based phases with tasks, approval gates, and client requests. One phase is expanded by default to keep the blueprint scannable."
				title="Workflow structure"
			/>
			<div className="space-y-2">
				{template.phases.map((phase, index) => (
					<PhaseBlock
						defaultOpen={index === 1}
						index={index}
						key={phase.name}
						phase={phase}
					/>
				))}
			</div>
		</section>
	);
}
