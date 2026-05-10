import { ArrowRightIcon } from "lucide-react";

import { TemplateSectionIntro } from "./template-section-intro";
import type { TemplateSystem } from "./templates-data";

export function WorkflowSnapshot({ template }: { template: TemplateSystem }) {
	return (
		<section className="space-y-4">
			<TemplateSectionIntro title="Workflow snapshot" />
			<div className="rounded-md bg-muted/20 p-4">
				<div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)_24px_minmax(0,1fr)] md:items-center">
					{template.phases.map((phase, index) => (
						<div className="contents" key={phase.name}>
							<div className="rounded-md bg-background px-3 py-3 shadow-xs">
								<div className="flex items-center gap-2 text-sm font-medium">
									<span className="flex size-5 items-center justify-center rounded-full bg-muted text-[0.65rem]">
										{index + 1}
									</span>
									{phase.name}
								</div>
								<div className="mt-3 text-xs text-muted-foreground">
									{phase.tasks.length} tasks · {phase.approvals.length} gates
								</div>
							</div>
							{index < template.phases.length - 1 ? (
								<ArrowRightIcon className="hidden size-4 justify-self-center text-muted-foreground md:block" />
							) : null}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
