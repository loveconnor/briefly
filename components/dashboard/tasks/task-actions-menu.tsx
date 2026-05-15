import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { DeliveryTask } from "./tasks-data";

export function TaskActionsMenu({
	onDelete,
	onMarkComplete,
	onSelect,
	onSendReminder,
	task,
}: {
	onDelete: () => void;
	onMarkComplete: () => void;
	onSelect: () => void;
	onSendReminder: () => void;
	task: DeliveryTask;
}) {
	return (
		<span
			onClick={(event) => event.stopPropagation()}
			onKeyDown={(event) => event.stopPropagation()}
		>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							aria-label={`Task actions for ${task.name}`}
							size="icon-sm"
							variant="ghost"
						>
							<MoreHorizontalIcon className="size-4" />
						</Button>
					}
				/>
				<DropdownMenuContent align="end" className="w-40">
					<DropdownMenuItem onClick={onSelect}>Open details</DropdownMenuItem>
					<DropdownMenuItem onClick={onMarkComplete}>Mark complete</DropdownMenuItem>
					<DropdownMenuItem onClick={onSendReminder}>Send reminder</DropdownMenuItem>
					{task.createdBy === "user" ? <DropdownMenuSeparator /> : null}
					{task.createdBy === "user" ? (
						<DropdownMenuItem onClick={onDelete} variant="destructive">
							Delete task
						</DropdownMenuItem>
					) : null}
					<DropdownMenuSeparator />
					<DropdownMenuItem>Copy task link</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</span>
	);
}
