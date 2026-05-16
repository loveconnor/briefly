import { Columns3Icon, ListIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { taskViews, type TaskView } from "./tasks-data";
import type { DisplayMode } from "./tasks-constants";

export function TaskDisplayControls({
	activeView,
	displayMode,
	onDisplayModeChange,
	onViewChange,
}: {
	activeView: TaskView;
	displayMode: DisplayMode;
	onDisplayModeChange: (mode: DisplayMode) => void;
	onViewChange: (view: TaskView) => void;
}) {
	return (
		<div className="flex flex-col gap-3 border-b border-border/60 pb-3 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex max-w-full rounded-lg bg-muted/25 p-0.5">
				{taskViews.map((view) => (
					<Button
						className={cn(
							"h-8 shrink-0 rounded-md px-3 text-sm",
							activeView === view.value && "bg-background text-foreground shadow-xs"
						)}
						key={view.value}
						onClick={() => onViewChange(view.value)}
						variant="ghost"
					>
						{view.label}
					</Button>
				))}
			</div>
			<div className="flex flex-wrap items-center gap-3 lg:justify-end">
				<div className="flex rounded-lg bg-muted/25 p-0.5">
					<Button
						className={cn(
							"h-8 rounded-md px-2.5 text-sm",
							displayMode === "list" && "bg-background text-foreground shadow-xs"
						)}
						onClick={() => onDisplayModeChange("list")}
						variant="ghost"
					>
						<ListIcon className="size-4" />
						List
					</Button>
					<Button
						className={cn(
							"h-8 rounded-md px-2.5 text-sm",
							displayMode === "kanban" && "bg-background text-foreground shadow-xs"
						)}
						onClick={() => onDisplayModeChange("kanban")}
						variant="ghost"
					>
						<Columns3Icon className="size-4" />
						Board
					</Button>
				</div>
			</div>
		</div>
	);
}
