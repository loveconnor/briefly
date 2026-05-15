"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import type { WeeklyActivitySummary } from "@/lib/app-data";

const emptyActivity: WeeklyActivitySummary = {
	href: "/dashboard/inbox/all-activity",
	items: [],
	label: "THIS WEEK",
};

export function WeeklyActivityCard({ activity = emptyActivity }: { activity?: WeeklyActivitySummary }) {
	const [isOpen, setIsOpen] = useState(true);

	if (!isOpen || activity.items.length === 0) {
		return null;
	}

	return (
		<div
			className={cn(
				"group/weekly-activity-card cn-rounded size-full min-h-31 justify-center border bg-background",
				"relative flex size-full flex-col gap-2 overflow-hidden px-4 py-3 *:text-nowrap",
				"transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
			)}
		>
			<span className="font-light font-mono text-[10px] text-muted-foreground">
				{activity.label}
			</span>
			<div className="flex flex-col gap-1">
				{activity.items.map((item) => (
					<p className="text-xs font-medium leading-4" key={item}>
						{item}
					</p>
				))}
			</div>
			<Button
				asChild
				className="h-auto w-max px-0 py-0 font-light text-xs"
				size="sm"
				variant="link"
			>
				<a href={activity.href}>View activity -&gt;</a>
			</Button>
			<Button
				className="absolute top-2 right-2 z-10 size-6 rounded-full opacity-0 transition-opacity group-hover/weekly-activity-card:opacity-100"
				onClick={() => setIsOpen(false)}
				size="icon-sm"
				variant="ghost"
			>
				<XIcon className="size-3.5 text-muted-foreground" />{" "}
			</Button>
		</div>
	);
}
