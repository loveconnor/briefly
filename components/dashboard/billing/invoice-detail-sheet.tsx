import { CopyIcon, DownloadIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";

import type { BillingActivityItem } from "./billing-data";
import { BillingStatusText } from "./billing-status";

export function InvoiceDetailSheet({
	item,
	onOpenChange,
}: {
	item: BillingActivityItem | null;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<Sheet onOpenChange={onOpenChange} open={Boolean(item)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[460px] gap-0 overflow-y-auto p-7"
				side="right"
			>
				{item ? <InvoiceDetails item={item} /> : null}
			</SheetContent>
		</Sheet>
	);
}

function InvoiceDetails({ item }: { item: BillingActivityItem }) {
	return (
		<div className="flex min-h-full flex-col">
			<div className="space-y-7">
				<div>
					<SheetTitle className="pr-8 text-lg leading-6">
						{item.id.startsWith("inv") ? item.detail.split(" · ")[0] : item.title}
					</SheetTitle>
					<SheetDescription className="mt-2">{item.project}</SheetDescription>
					<div className="mt-3 text-sm leading-5">
						<BillingStatusText status={item.status} />
						<p className="mt-0.5 text-muted-foreground/70 tabular-nums">
							{item.amountDetail}
						</p>
					</div>
				</div>

				<div className="space-y-4 border-t pt-6">
					<h3 className="text-sm font-semibold">Line items</h3>
					{item.lineItems?.length ? (
						<div className="space-y-3">
							{item.lineItems.map((lineItem) => (
								<div
									className="flex items-baseline justify-between gap-4 text-sm"
									key={lineItem.label}
								>
									<span className="text-muted-foreground">{lineItem.label}</span>
									<span className="font-medium tabular-nums">{lineItem.amount}</span>
								</div>
							))}
						</div>
					) : (
						<p className="text-sm text-muted-foreground">
							No line items are attached to this activity.
						</p>
					)}
				</div>

				<div className="space-y-4 border-t pt-6">
					<h3 className="text-sm font-semibold">Timeline</h3>
					<div className="space-y-3">
						{(item.timeline ?? [`${item.title} recorded`, item.timestamp]).map((event) => (
							<div className="flex gap-3 text-sm" key={event}>
								<span className="mt-2 size-1.5 rounded-full bg-muted-foreground/35" />
								<span className="text-muted-foreground">{event}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="mt-auto pt-8">
				<div className="grid gap-2">
					<Button>
						<SendIcon />
						Send reminder
					</Button>
					<div className="grid grid-cols-2 gap-2">
						<Button type="button" variant="outline">
							<DownloadIcon />
							Download PDF
						</Button>
						<Button type="button" variant="outline">
							<CopyIcon />
							Duplicate
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
