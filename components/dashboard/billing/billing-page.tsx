"use client";

import { useState } from "react";

import { BillingActivity } from "./billing-activity";
import { BillingAttentionStrip } from "./billing-attention-strip";
import {
	billingActivity,
	retainers,
	type BillingActivityItem,
} from "./billing-data";
import { BillingHeader } from "./billing-header";
import { BillingSummaryStrip } from "./billing-summary-strip";
import { ClientPortalBilling } from "./client-portal-billing";
import { InvoiceDetailSheet } from "./invoice-detail-sheet";
import { RetainersSection } from "./retainers-section";

export function BillingPage() {
	const [selectedItem, setSelectedItem] = useState<BillingActivityItem | null>(null);

	return (
		<div className="mx-auto w-full max-w-[980px] space-y-6">
			<BillingHeader />
			<BillingSummaryStrip />
			<BillingAttentionStrip />

			<div className="space-y-12 pt-2">
				<BillingActivity activity={billingActivity} onSelect={setSelectedItem} />
				<RetainersSection retainers={retainers} />
				<ClientPortalBilling />
			</div>

			<InvoiceDetailSheet
				item={selectedItem}
				onOpenChange={(open) => {
					if (!open) {
						setSelectedItem(null);
					}
				}}
			/>
		</div>
	);
}
