import { RefreshCwIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Retainer } from "./billing-data";

export function RetainersSection({ retainers }: { retainers: Retainer[] }) {
	return (
		<section className="space-y-5 pt-2">
			<div>
				<h2 className="text-base font-semibold">Retainers and subscriptions</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Recurring client billing stays attached to the work it funds.
				</p>
			</div>

			<div className="space-y-2">
				{retainers.map((retainer) => (
					<div className="rounded-lg px-2 py-4 transition-colors hover:bg-accent/30" key={retainer.id}>
						<div className="flex min-w-0 items-start gap-3">
							<div className="mt-1 flex size-5 shrink-0 items-center justify-center text-muted-foreground/55">
								<RefreshCwIcon className="size-3.5" />
							</div>
							<div className="min-w-0">
								<h3 className="font-medium">{retainer.client}</h3>
								<p className="mt-1 text-sm text-muted-foreground/80">{retainer.name}</p>
								<p
									className={cn(
										"mt-2 text-xs font-medium",
										retainer.state === "active" && "text-success-foreground",
										retainer.state === "paused" && "text-destructive-foreground",
										retainer.state === "renewal" && "text-warning-foreground"
									)}
								>
									{retainer.state === "active"
										? "Active"
										: retainer.state === "paused"
											? "Paused"
											: "Renewal pending"}
								</p>
								<p className="mt-2 text-sm text-muted-foreground/75">
									<span className="font-medium text-foreground/90 tabular-nums">
										{retainer.amount}
									</span>{" "}
									<span>{retainer.renewal}</span>
								</p>
								<p className="mt-1 text-xs text-muted-foreground/55">
									{retainer.method}
									{retainer.state === "active" ? " · Auto-billed monthly" : ""}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
