import {
	CalendarClockIcon,
	TimerIcon,
	ZapIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TemplateSectionIntro } from "./template-section-intro";
import type { TemplateSystem } from "./templates-data";

function formatAutomation(rule: string) {
	if (rule.toLowerCase().includes("after")) {
		return { condition: "IF approval pending", icon: TimerIcon, outcome: rule, tag: "Delay" };
	}

	if (rule.toLowerCase().includes("every") || rule.toLowerCase().includes("monthly")) {
		return { condition: "ON schedule", icon: CalendarClockIcon, outcome: rule, tag: "Scheduled" };
	}

	return { condition: "WHEN workflow advances", icon: ZapIcon, outcome: rule, tag: "Active" };
}

export function AutomationTab({ template }: { template: TemplateSystem }) {
	return (
		<section className="space-y-5">
			<TemplateSectionIntro
				description="Automation defaults are shown as compact operating rules instead of setup notes."
				title="Automation rules"
			/>
			<div className="grid gap-2">
				{template.automationRules.map((rule) => {
					const automation = formatAutomation(rule);
					const Icon = automation.icon;

					return (
						<div
							className="grid gap-3 rounded-md bg-muted/20 px-3 py-3 text-sm transition-colors hover:bg-muted/30 md:grid-cols-[220px_1fr_auto]"
							key={rule}
						>
							<div className="flex items-center gap-2 font-medium">
								<span className="flex size-7 items-center justify-center rounded-md bg-background">
									<Icon className="size-4" />
								</span>
								{automation.condition}
							</div>
							<div className="self-center text-muted-foreground">
								THEN {automation.outcome}
							</div>
							<Badge className="w-fit self-center" variant="outline">
								{automation.tag}
							</Badge>
						</div>
					);
				})}
			</div>
		</section>
	);
}
