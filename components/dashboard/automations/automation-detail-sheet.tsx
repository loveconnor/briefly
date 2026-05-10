import { PauseIcon, Settings2Icon, ShieldCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { type Automation } from "./automations-data";
import { runStatusClass, statusClass, statusLabel } from "./automations-display";

export function AutomationDetailSheet({
	automation,
	onClose,
}: {
	automation: Automation | null;
	onClose: () => void;
}) {
	if (!automation) {
		return null;
	}

	const Icon = automation.icon;

	return (
		<Sheet onOpenChange={(open) => !open && onClose()} open={Boolean(automation)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[560px] gap-0 overflow-y-auto p-0"
				side="right"
			>
				<SheetHeader className="border-b border-border/70 p-6 pr-12">
					<div className="flex items-start gap-3">
						<div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
							<Icon className="size-4.5" />
						</div>
						<div className="min-w-0">
							<SheetTitle className="text-xl leading-7">{automation.name}</SheetTitle>
							<SheetDescription className="mt-1">
								<span className={cn("font-medium", statusClass[automation.status])}>
									{statusLabel[automation.status]}
								</span>
								<span className="mx-1.5 text-muted-foreground">/</span>
								Last triggered {automation.lastTriggered}
							</SheetDescription>
						</div>
					</div>
				</SheetHeader>

				<div className="space-y-7 p-6">
					<section className="space-y-5">
						<LogicLine label="IF" value={automation.trigger} />
						<LogicLine label="FOR" value={automation.delay} />
						<LogicLine label="THEN" value={automation.actions[0]} />
						<div>
							<p className="text-xs font-medium tracking-normal text-muted-foreground uppercase">
								AND
							</p>
							<ul className="mt-2 space-y-1 text-lg leading-7 font-semibold">
								{automation.actions.slice(1).map((action) => (
									<li key={action}>{action}</li>
								))}
							</ul>
						</div>
						<div>
							<p className="text-xs font-medium tracking-normal text-muted-foreground uppercase">
								Only if
							</p>
							<ul className="mt-2 space-y-1 text-sm text-muted-foreground">
								{automation.conditions.map((condition) => (
									<li className="flex items-center gap-2" key={condition}>
										<span className="size-1 rounded-full bg-muted-foreground" />
										{condition}
									</li>
								))}
							</ul>
						</div>
					</section>

					<SheetSection title="Recent runs">
						<div className="divide-y divide-border/60">
							{automation.recentRuns.map((run) => (
								<div
									className="flex items-center justify-between gap-4 py-2.5 text-sm"
									key={`${run.date}-${run.person}`}
								>
									<span className="min-w-0 truncate font-medium">{run.person}</span>
									<span className="shrink-0 text-right">
										<span className={cn("font-medium", runStatusClass[run.status])}>
											{run.result}
										</span>
										<span className="mx-1.5 text-muted-foreground">/</span>
										<span className="text-muted-foreground">{run.date}</span>
									</span>
								</div>
							))}
						</div>
					</SheetSection>

					<SheetSection title="Performance">
						<ul className="space-y-2 text-sm">
							{automation.performance.map((item) => (
								<li className="flex items-start gap-2" key={item}>
									<span className="mt-2 size-1 rounded-full bg-muted-foreground" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</SheetSection>

					<SheetSection title="Notifications">
						<div className="flex flex-wrap gap-1.5">
							{automation.notifications.map((notification) => (
								<Badge key={notification} variant="outline">
									{notification}
								</Badge>
							))}
						</div>
					</SheetSection>

					<section className="rounded-md bg-muted/45 p-3">
						<div className="mb-2 flex items-center gap-2">
							<ShieldCheckIcon className="size-4 text-muted-foreground" />
							<h3 className="text-sm font-medium">Explain this automation</h3>
						</div>
						<p className="text-sm leading-6 text-muted-foreground">
							{automation.explanation}
						</p>
					</section>
				</div>

				<SheetFooter className="border-t border-border/70 p-6 sm:flex-row sm:justify-end">
					<Button variant="outline">
						<PauseIcon />
						Pause
					</Button>
					<Button>
						<Settings2Icon />
						Edit automation
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

function LogicLine({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-xs font-medium tracking-normal text-muted-foreground uppercase">
				{label}
			</p>
			<p className="mt-2 text-lg leading-7 font-semibold">{value}</p>
		</div>
	);
}

function SheetSection({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<section className="border-t border-border/70 pt-5">
			<h3 className="mb-3 text-sm font-semibold">{title}</h3>
			{children}
		</section>
	);
}
