import {
	CopyIcon,
	MoreHorizontalIcon,
	PauseIcon,
	PencilIcon,
	ShieldCheckIcon,
	Trash2Icon,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { categoryLabels, type Automation } from "./automations-data";
import { statusClass, statusLabel } from "./automations-display";

export function AutomationRow({
	automation,
	onSelect,
}: {
	automation: Automation;
	onSelect: (automation: Automation) => void;
}) {
	const Icon = automation.icon;

	return (
		<div
			className={cn(
				"group grid gap-3 rounded-lg px-2 py-3.5 transition-colors hover:bg-accent/35 md:grid-cols-[minmax(0,1fr)_auto] md:items-start",
				automation.status === "paused" && "opacity-62"
			)}
		>
			<button
				className="min-w-0 text-left"
				onClick={() => onSelect(automation)}
				type="button"
			>
				<div className="flex min-w-0 items-start gap-3">
					<div className="mt-1 flex size-5 shrink-0 items-center justify-center text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
						<Icon className="size-3.5" />
					</div>
					<div className="min-w-0">
						<h3 className="font-medium">{automation.name}</h3>
						<p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
							{automation.rule}
						</p>
						<p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
							<span>{categoryLabels[automation.category]}</span>
							<span className="text-muted-foreground/35">/</span>
							<span className={cn("font-medium", statusClass[automation.status])}>
								{statusLabel[automation.status]}
							</span>
							<span className="text-muted-foreground/35">/</span>
							<span className="tabular-nums">{automation.runsPerMonth} runs/mo</span>
							<span className="text-muted-foreground/35">/</span>
							<span>triggered {automation.lastTriggered}</span>
						</p>
					</div>
				</div>
			</button>
			<div className="flex items-center gap-1 pl-8 md:pl-0">
				<Button
					className="h-8 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100"
					onClick={() => onSelect(automation)}
					size="sm"
					variant="ghost"
				>
					Inspect
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label={`${automation.name} options`}
						className={buttonVariants({ className: "size-8", size: "icon", variant: "ghost" })}
					>
						<MoreHorizontalIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						<DropdownMenuItem onClick={() => onSelect(automation)}>
							<ShieldCheckIcon />
							Inspect rule
						</DropdownMenuItem>
						<DropdownMenuItem>
							<PencilIcon />
							Edit automation
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CopyIcon />
							Duplicate
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<PauseIcon />
							Pause
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">
							<Trash2Icon />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
