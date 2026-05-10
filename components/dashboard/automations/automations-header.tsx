import { FileClockIcon, PlusIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AutomationsHeader() {
	return (
		<header className="flex flex-col gap-4 pb-1 lg:flex-row lg:items-end lg:justify-between">
			<div className="min-w-0">
				<h1 className="text-2xl font-semibold tracking-normal">Automations</h1>
				<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
					Operational rules for reminders, approvals, updates, and client workflows.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button className="h-8" size="sm">
					<PlusIcon />
					New automation
				</Button>
				<Button className="h-8" size="sm" variant="outline">
					<SparklesIcon />
					Templates
				</Button>
				<Button className="h-8" size="sm" variant="outline">
					<FileClockIcon />
					Activity log
				</Button>
			</div>
		</header>
	);
}
