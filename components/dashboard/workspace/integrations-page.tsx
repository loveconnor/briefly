import { Button } from "@/components/ui/button";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { BrandLogo } from "./brand-logo";
import type { Integration, WorkspaceData } from "./workspace-data";
import { StatusText } from "./workspace-primitives";

export function IntegrationsPage({
	integrationGroups,
	onOpen,
}: {
	integrationGroups: WorkspaceData["integrationGroups"];
	onOpen: (integration: Integration) => void;
}) {
	return (
		<div className="space-y-10">
			<section>
				<h2 className="text-base font-semibold">Connected integrations</h2>
				<div className="mt-5 divide-y border-y">
					{integrationGroups
						.flatMap((group) => group.items)
						.filter((item) => item.status === "Connected")
						.map((item) => (
							<IntegrationRow item={item} key={item.name} onOpen={onOpen} />
						))}
					{integrationGroups.flatMap((group) => group.items).filter((item) => item.status === "Connected").length === 0 ? (
						<DashboardEmptyState className="my-6" title="No connected integrations yet" />
					) : null}
				</div>
			</section>
			{integrationGroups.map((group) => (
				<section key={group.label}>
					<h2 className="text-base font-semibold">{group.label}</h2>
					<div className="mt-4 divide-y border-y">
						{group.items.map((item) => (
							<IntegrationRow item={item} key={item.name} onOpen={onOpen} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}

function IntegrationRow({
	item,
	onOpen,
}: {
	item: Integration;
	onOpen: (integration: Integration) => void;
}) {
	const connected = item.status === "Connected";

	return (
		<div className="grid w-full gap-5 py-6 md:grid-cols-[minmax(0,1fr)_12rem_auto] md:items-center">
			<div className="flex items-center gap-5">
				<BrandLogo name={item.name} />
				<div>
					<p className="font-medium">{item.name}</p>
					<p className="mt-1 text-sm leading-6 text-muted-foreground">
						{connected ? item.detail : item.description}
					</p>
				</div>
			</div>
			<StatusText status={item.status} />
			<Button
				onClick={() => onOpen(item)}
				size="sm"
				variant={connected ? "outline" : "default"}
			>
				{connected ? "Manage" : "Connect"}
			</Button>
		</div>
	);
}
