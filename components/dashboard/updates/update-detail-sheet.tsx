"use client";

import {
	ArchiveIcon,
	CheckCircle2Icon,
	CopyIcon,
	Edit3Icon,
	FileTextIcon,
	MoreVerticalIcon,
	RepeatIcon,
	ReplyIcon,
	SendIcon,
} from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { formatUpdateType } from "@/components/dashboard/updates/format-update-type";
import { cn } from "@/lib/utils";
import type { ClientUpdate } from "@/components/dashboard/updates/types";
import { visibilityTextStyles } from "@/components/dashboard/updates/updates-visibility";

export function UpdateDetailSheet({
	onOpenChange,
	update,
}: {
	onOpenChange: (open: boolean) => void;
	update: ClientUpdate | null;
}) {
	return (
		<Sheet onOpenChange={onOpenChange} open={Boolean(update)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[560px] gap-0 overflow-y-auto p-0"
				side="right"
			>
				{update ? <UpdateDetail update={update} /> : null}
			</SheetContent>
		</Sheet>
	);
}

function UpdateDetail({ update }: { update: ClientUpdate }) {
	const sentTime = update.sentMeta.split(" • ").at(-1) ?? "Sent";
	const recipientSummary = formatRecipients(update.recipients);
	const fileDetails = getAttachmentDetails(update.attachments);

	return (
		<div>
			<SheetHeader className="border-b border-white/[0.06] p-6 pr-12">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<SheetTitle className="text-3xl font-semibold leading-9 tracking-tight">{update.title}</SheetTitle>
						<p className="mt-2 text-sm text-muted-foreground">
							<span className="text-foreground/90">{formatUpdateType(update.type)}</span>
							<span aria-hidden="true"> · </span>
							{update.project}
						</p>
						<p className="mt-1 text-sm text-muted-foreground">
							Sent {sentTime} to {recipientSummary}
							<span aria-hidden="true"> · </span>
							<span className="text-info-foreground">{update.visibility.opened}</span>
						</p>
					</div>
					<UpdateActions />
				</div>
			</SheetHeader>

			<div className="space-y-7 p-6">
				<section>
					<p className="max-w-[520px] text-base leading-7 text-foreground/90">
						{update.body}
					</p>
				</section>

				<section className="space-y-3">
					<h3 className="text-sm font-medium text-foreground/80">Attachments</h3>
					<div className="space-y-1">
						{fileDetails.length ? (
							fileDetails.map((file) => (
								<button
									key={file.name}
									className="flex w-full cursor-pointer items-center gap-3 rounded-md px-1.5 py-2 text-left transition-[background-color,translate] hover:-translate-y-px hover:bg-white/[0.03]"
									type="button"
								>
									<span className="flex size-8 items-center justify-center rounded-md bg-muted/70 text-muted-foreground">
										<FileTextIcon className="size-4" />
									</span>
									<span className="min-w-0">
										<span className="block truncate text-sm font-medium">{file.name}</span>
										<span className="block text-xs text-muted-foreground">
											{file.kind} · {file.size}
										</span>
									</span>
								</button>
							))
						) : (
							<DashboardEmptyState
								className="min-h-20"
								icon={FileTextIcon}
								title="No attachments were included"
							/>
						)}
					</div>
				</section>

				<section className="space-y-3">
					<h3 className="text-sm font-medium text-foreground/80">Activity timeline</h3>
					<div className="space-y-2">
						<TimelineItem icon={SendIcon} label={`Sent · ${sentTime}`} />
						<TimelineItem icon={CheckCircle2Icon} label="Delivered immediately" />
						<TimelineItem
							accentClassName={visibilityTextStyles[update.visibility.state]}
							icon={ReplyIcon}
							label={`${update.visibility.label}`}
						/>
						<TimelineItem label={`${update.visibility.opened}`} />
						{update.recentReply ? <TimelineItem label="Replied after latest review" /> : null}
					</div>
				</section>

				<section className="border-t border-white/[0.06] pt-6">
					<h3 className="text-sm font-medium text-foreground/80">Latest response</h3>
					{update.recentReply ? (
						<blockquote className="mt-3 text-base leading-7 text-foreground">
							&quot;{update.recentReply}&quot;
						</blockquote>
					) : (
						<DashboardEmptyState
							className="mt-3 min-h-24"
							icon={ReplyIcon}
							title="No client reply has been received yet"
						/>
					)}
					<p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
						<ReplyIcon className="size-4" />
						<span>{getReplyStateText(update)}</span>
					</p>
				</section>
			</div>
		</div>
	);
}

function UpdateActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Update actions"
				className={cn(buttonVariants({ size: "icon-sm", variant: "ghost" }), "mt-0.5")}
			>
				<MoreVerticalIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-36">
				<DropdownMenuItem>
					<RepeatIcon />
					Resend
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Edit3Icon />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CopyIcon />
					Duplicate
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CopyIcon />
					Copy link
				</DropdownMenuItem>
				<DropdownMenuItem>
					<ArchiveIcon />
					Archive
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function TimelineItem({
	accentClassName,
	icon: Icon,
	label,
}: {
	accentClassName?: string;
	icon?: typeof SendIcon;
	label: string;
}) {
	return (
		<div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3 text-sm leading-5">
			<span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
				{Icon ? <Icon className="size-4" /> : <span className="size-1.5 rounded-full bg-muted-foreground/60" />}
			</span>
			<span className={accentClassName}>
				{label}
			</span>
		</div>
	);
}

function formatRecipients(recipients: string[]) {
	if (recipients.length <= 2) return recipients.join(" + ");

	return `${recipients[0]} + ${recipients.length - 1} others`;
}

function getAttachmentDetails(attachments: string[]) {
	return attachments.map((name, index) => {
		const extension = name.split(".").at(-1)?.toUpperCase() ?? "FILE";
		const fallbackSizes = ["2.3 MB", "8.1 MB", "1.6 MB", "924 KB"];

		return {
			kind: extension,
			name,
			size: fallbackSizes[index] ?? "1.2 MB",
		};
	});
}

function getReplyStateText(update: ClientUpdate) {
	if (update.visibility.replyState === "Awaiting approval") {
		const approver = update.recipients.at(-1) ?? "client";

		return `Awaiting approval from ${approver}`;
	}

	return update.visibility.replyState;
}
