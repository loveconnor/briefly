import { DownloadIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BillingHeader() {
	return (
		<header className="flex flex-col gap-4 pb-1 lg:flex-row lg:items-end lg:justify-between">
			<div className="min-w-0">
				<h1 className="text-2xl font-semibold tracking-normal">Billing</h1>
				<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
					Track invoices, retainers, payments, and client billing activity.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button className="h-8" size="sm">
					<PlusIcon />
					New invoice
				</Button>
				<Button className="h-8" size="sm" variant="outline">
					<DownloadIcon />
					Export
				</Button>
			</div>
		</header>
	);
}
