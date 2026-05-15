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
		<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div className="flex max-w-full gap-0.5 overflow-x-auto">
				{taskViews.map((view) => (
					<Button
						className="h-7 shrink-0 rounded-full px-2.5 text-xs"
						key={view.value}
						onClick={() => onViewChange(view.value)}
						variant={activeView === view.value ? "secondary" : "ghost"}
					>
						{view.label}
					</Button>
				))}
			</div>
			<div className="flex flex-wrap items-end gap-4 lg:justify-end">
				<div className="flex rounded-md bg-muted/25 p-0.5">
					<Button
						className={cn(
							"h-7 px-2 text-xs",
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
							"h-7 px-2 text-xs",
							displayMode === "kanban" && "bg-background text-foreground shadow-xs"
						)}
						onClick={() => onDisplayModeChange("kanban")}
						variant="ghost"
					>
						<Columns3Icon className="size-4" />
						Kanban
					</Button>
				</div>
			</div>
		</div>
	);
}
