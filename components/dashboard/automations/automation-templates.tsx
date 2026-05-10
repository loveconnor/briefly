import { Button } from "@/components/ui/button";

import { templates } from "./automations-data";

export function AutomationTemplates() {
	return (
		<section className="space-y-3 pt-2 opacity-80">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h2 className="text-base font-semibold">Templates</h2>
				</div>
				<Button className="h-8" size="sm" variant="outline">
					View all
				</Button>
			</div>
			<div className="flex flex-wrap gap-x-5 gap-y-2">
				{templates.map((template) => {
					return (
						<button
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							key={template.name}
							type="button"
						>
							{template.name}
						</button>
					);
				})}
			</div>
		</section>
	);
}
