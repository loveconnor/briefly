"use client";

import { useState } from "react";

import { BillingActivity } from "./billing-activity";
import { BillingAttentionStrip } from "./billing-attention-strip";
import type { BillingActivityItem } from "./billing-data";
import { BillingHeader } from "./billing-header";
import { BillingSummaryStrip } from "./billing-summary-strip";
import { ClientPortalBilling } from "./client-portal-billing";
import { InvoiceDetailSheet } from "./invoice-detail-sheet";
import { RetainersSection } from "./retainers-section";
import type { BillingData } from "@/lib/app-data";

export function BillingPage({ data }: { data: BillingData }) {
	const [selectedItem, setSelectedItem] = useState<BillingActivityItem | null>(null);

	return (
		<div className="mx-auto w-full max-w-[980px] space-y-6">
			<BillingHeader />
			<BillingSummaryStrip metrics={data.summary} />
			<BillingAttentionStrip items={data.attentionSummary} processingNote={data.paymentSettings[0]?.value} />

			<div className="space-y-12 pt-2">
				<BillingActivity activity={data.activity} onSelect={setSelectedItem} />
				<RetainersSection retainers={data.retainers} />
				<ClientPortalBilling portal={data.clientPortal} />
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
