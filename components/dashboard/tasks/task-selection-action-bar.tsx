import { Button } from "@/components/ui/button";

export function TaskSelectionActionBar({
	onClear,
	onMarkComplete,
	onSendReminder,
	selectedCount,
}: {
	onClear: () => void;
	onMarkComplete: () => void;
	onSendReminder: () => void;
	selectedCount: number;
}) {
	return (
		<div className="flex flex-wrap items-center gap-2 border-y border-border/60 py-2 text-sm">
			<span className="mr-1 font-medium tabular-nums">
				{selectedCount} selected
			</span>
			<Button className="h-7 px-2 text-xs" onClick={onMarkComplete} variant="outline">
				Mark complete
			</Button>
			<Button className="h-7 px-2 text-xs" onClick={onSendReminder} variant="outline">
				Send reminder
			</Button>
			<Button className="h-7 px-2 text-xs" onClick={onClear} variant="ghost">
				Clear
			</Button>
		</div>
	);
}
