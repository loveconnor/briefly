import {
	ArrowRightIcon,
	Clock3Icon,
	Settings2Icon,
	UsersIcon,
} from "lucide-react";

import type { TemplateSystem } from "./templates-data";

export function TemplateContextPanel({ template }: { template: TemplateSystem }) {
	return (
		<aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
			<div className="rounded-md bg-muted/25 p-4">
				<div className="grid gap-4 text-sm">
					<div>
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Clock3Icon className="size-4" />
							Timeline
						</div>
						<div className="mt-1 font-medium">{template.estimatedTimeline}</div>
					</div>
					<div>
						<div className="text-xs font-medium text-muted-foreground">
							Portal
						</div>
						<div className="mt-1 font-medium">Enabled</div>
					</div>
					<div>
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<UsersIcon className="size-4" />
							Default roles
						</div>
						<div className="mt-1 text-muted-foreground">
							{template.defaultRoles.slice(0, 3).join(", ")}
						</div>
					</div>
					<div>
						<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<Settings2Icon className="size-4" />
							Automations
						</div>
						<div className="mt-1 font-medium">
							{template.metrics.automations} default rules
						</div>
					</div>
				</div>
			</div>
			<div className="space-y-2 text-sm">
				<a className="flex items-center justify-between rounded-md px-1 py-1 font-medium text-muted-foreground transition-colors hover:text-foreground" href="#automation">
					View automation rules
					<ArrowRightIcon className="size-4" />
				</a>
				<a className="flex items-center justify-between rounded-md px-1 py-1 font-medium text-muted-foreground transition-colors hover:text-foreground" href="#portal">
					View portal structure
					<ArrowRightIcon className="size-4" />
				</a>
			</div>
		</aside>
	);
}
