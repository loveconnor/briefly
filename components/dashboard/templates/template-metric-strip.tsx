import type { TemplateSystem } from "./templates-data";

export function TemplateMetricStrip({ template }: { template: TemplateSystem }) {
	const metrics = [
		`${template.metrics.phases} phases`,
		`${template.metrics.tasks} tasks`,
		`${template.metrics.approvals} approvals`,
		`${template.metrics.automations} automations`,
		`${template.clientForms} client forms`,
	];

	return (
		<div className="flex flex-wrap gap-x-6 gap-y-2 rounded-md bg-muted/30 px-4 py-3 text-sm font-medium">
			{metrics.map((metric) => (
				<span key={metric}>{metric}</span>
			))}
		</div>
	);
}
