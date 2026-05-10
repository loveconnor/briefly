import { CreditCardIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ClientPortalBilling() {
	return (
		<section className="space-y-5 pt-2">
			<div>
				<h2 className="text-base font-semibold">Client billing experience</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Clients can review invoices, payment status, saved cards, receipts, and retainer summaries without leaving Briefly.
				</p>
			</div>

			<div className="grid gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-accent/30 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
				<div className="min-w-0">
					<p className="text-xs font-medium text-muted-foreground/60">Outstanding invoice</p>
					<h3 className="mt-2 font-medium">Website Redesign Final Payment</h3>
					<p className="mt-1 text-sm text-muted-foreground/75">Due Aug 12 · $4,200</p>
				</div>
				<Button className="h-8 sm:self-start" size="sm" variant="outline">
					<CreditCardIcon />
					Open portal preview
				</Button>
			</div>
			<div className="flex flex-wrap gap-x-5 gap-y-2 px-2 text-sm text-muted-foreground/65">
				<span>Past invoices</span>
				<span>Payment methods</span>
				<span className="inline-flex items-center gap-1.5">
					<DownloadIcon className="size-3.5" />
					Receipts
				</span>
			</div>
		</section>
	);
}
