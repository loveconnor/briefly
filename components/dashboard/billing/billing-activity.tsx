import { MoreHorizontalIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { BillingActivityItem } from "./billing-data";
import { BillingStatusText } from "./billing-status";

export function BillingActivity({
	activity,
	onSelect,
}: {
	activity: BillingActivityItem[];
	onSelect: (item: BillingActivityItem) => void;
}) {
	return (
		<section className="space-y-4">
			<div className="flex items-end justify-between gap-4">
				<div>
					<h2 className="text-base font-semibold">Billing activity</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Invoices, retainers, payments, reminders, and payout events tied to delivery.
					</p>
				</div>
				<Button className="hidden h-8 sm:inline-flex" size="sm" variant="ghost">
					View all
				</Button>
			</div>

			<div className="space-y-2">
				{activity.map((item) => (
					<BillingActivityRow item={item} key={item.id} onSelect={onSelect} />
				))}
			</div>
		</section>
	);
}

function BillingActivityRow({
	item,
	onSelect,
}: {
	item: BillingActivityItem;
	onSelect: (item: BillingActivityItem) => void;
}) {
	const Icon = item.icon;

	return (
		<div className="group grid gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-accent/30 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
			<button
				className="min-w-0 text-left"
				onClick={() => onSelect(item)}
				type="button"
			>
				<div className="flex min-w-0 items-start gap-3">
					<div className="mt-1 flex size-5 shrink-0 items-center justify-center text-muted-foreground/55 transition-colors group-hover:text-muted-foreground">
						<Icon className="size-3.5" />
					</div>
					<div className="min-w-0 space-y-1">
						<div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
							<h3 className="font-medium">{item.title}</h3>
							<span className="text-sm text-muted-foreground/80">{item.project}</span>
						</div>
						<p className="text-sm leading-6 text-muted-foreground/75">{item.detail}</p>
						<div className="pt-1 text-sm leading-5">
							<BillingStatusText status={item.status} />
							<p className="mt-0.5 text-muted-foreground/70 tabular-nums">
								{item.amountDetail}
							</p>
						</div>
						{item.operationalNote ? (
							<p className="pt-1 text-xs text-muted-foreground/55">
								{item.operationalNote}
							</p>
						) : null}
					</div>
				</div>
			</button>

			<div className="flex items-center justify-between gap-2 pl-8 md:justify-end md:pl-0">
				<p className="text-xs text-muted-foreground/60">{item.timestamp}</p>
				<DropdownMenu>
					<DropdownMenuTrigger
						aria-label={`${item.title} options`}
						className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "size-8")}
					>
						<MoreHorizontalIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-44">
						<DropdownMenuItem onClick={() => onSelect(item)}>Open details</DropdownMenuItem>
						<DropdownMenuItem>Send reminder</DropdownMenuItem>
						<DropdownMenuItem>Download PDF</DropdownMenuItem>
						<DropdownMenuItem>Duplicate</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
