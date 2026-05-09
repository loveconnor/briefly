"use client";

import { PaperclipIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatUpdateType } from "@/components/dashboard/updates/format-update-type";
import type { ClientUpdate, DateGroup } from "@/components/dashboard/updates/types";
import {
	visibilityIcons,
	visibilityTextStyles,
} from "@/components/dashboard/updates/updates-visibility";

export function UpdateStream({
	groups,
	onSelectUpdate,
	selectedUpdateId,
	updates,
}: {
	groups: DateGroup[];
	onSelectUpdate: (id: string) => void;
	selectedUpdateId: string | null;
	updates: ClientUpdate[];
}) {
	return (
		<main className="min-w-0">
			{groups.map((group) => {
				const groupUpdates = updates.filter((update) => update.group === group);

				if (!groupUpdates.length) return null;

				return (
					<section key={group} className="border-t border-border/70 first:border-t-0">
						<h2 className="px-1 py-4 text-sm font-semibold text-muted-foreground">
							{group}
						</h2>
						<div className="divide-y divide-border/70">
							{groupUpdates.map((update) => (
								<UpdateStreamItem
									key={update.id}
									isSelected={selectedUpdateId === update.id}
									onSelect={() => onSelectUpdate(update.id)}
									update={update}
								/>
							))}
						</div>
					</section>
				);
			})}
		</main>
	);
}

function UpdateStreamItem({
	isSelected,
	onSelect,
	update,
}: {
	isSelected: boolean;
	onSelect: () => void;
	update: ClientUpdate;
}) {
	const VisibilityIcon = visibilityIcons[update.visibility.state];

	return (
		<button
			className={cn(
				"group w-full px-2 py-4 text-left transition-colors hover:bg-muted/30 dark:hover:bg-white/[0.02]",
				isSelected && "bg-muted/40 dark:bg-white/[0.03]"
			)}
			onClick={onSelect}
			type="button"
		>
			<div className="min-w-0">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="text-[17px] font-semibold leading-6 text-foreground">
						{update.title}
					</h3>
					<Badge className="border-border/60 bg-transparent tracking-normal" size="sm" variant="outline">
						{formatUpdateType(update.type)}
					</Badge>
				</div>
				<p className="mt-0.5 text-sm font-medium text-muted-foreground">
					{update.project}
				</p>
				<div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
					<span>{update.sentMeta}</span>
					<span
						className={cn(
							"inline-flex items-center gap-1 font-medium transition-colors group-hover:brightness-110",
							visibilityTextStyles[update.visibility.state]
						)}
					>
						<VisibilityIcon className="size-3.5" />
						{update.visibility.label}
					</span>
				</div>
				<p className="mt-1.5 max-w-4xl text-sm leading-6 text-muted-foreground">
					{update.body}
				</p>
				<div className="mt-2.5 flex flex-wrap items-center gap-2">
					{update.attachments.map((attachment) => (
						<span
							key={attachment}
							className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-1.5 py-0.5 text-xs text-muted-foreground/90 transition-colors group-hover:border-border/70 group-hover:text-muted-foreground"
						>
							<PaperclipIcon className="size-3" />
							{attachment}
						</span>
					))}
				</div>
			</div>
		</button>
	);
}
