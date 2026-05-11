import { LinkIcon, ShieldCheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { domains, type Domain } from "./workspace-data";
import { QuietNote, StatusText } from "./workspace-primitives";

export function DomainsPage({
	onAddDomain,
	onManageDomain,
}: {
	onAddDomain: () => void;
	onManageDomain: (domain: Domain) => void;
}) {
	return (
		<div className="space-y-10">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h2 className="text-base font-semibold">Connected domains</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Portal and email domains verified for this workspace.
					</p>
				</div>
				<Button onClick={onAddDomain}>
					<LinkIcon /> Add domain
				</Button>
			</div>
			<div className="divide-y border-y">
				{domains.map((domain) => (
					<div
						className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_8rem_8rem_11rem_auto] md:items-center"
						key={domain.name}
					>
						<div>
							<p className="font-medium">{domain.name}</p>
							<p className="mt-1 text-sm text-muted-foreground">{domain.connected}</p>
						</div>
						<StatusText status={domain.status} />
						<StatusText status={domain.ssl} />
						<p className="text-sm text-muted-foreground">{domain.connected}</p>
						<Button
							onClick={() => onManageDomain(domain)}
							size="sm"
							variant="outline"
						>
							Manage
						</Button>
					</div>
				))}
			</div>
			<QuietNote
				icon={<ShieldCheckIcon className="size-4" />}
				title="Verification is checked automatically"
				copy="Briefly watches DNS and SSL state after records are added. Pending domains continue checking in the background."
			/>
		</div>
	);
}
