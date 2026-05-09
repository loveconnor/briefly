import {
	ArrowUpRightIcon,
	CopyIcon,
	EyeIcon,
	MoreHorizontalIcon,
	SendIcon,
} from "lucide-react";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { portalToneStyles } from "./portal-tone";
import type { Portal } from "./portals-data";

export function PortalRow({
	onSelect,
	portal,
}: {
	onSelect: () => void;
	portal: Portal;
}) {
	const tone = portalToneStyles[portal.tone];
	const portalHref = portal.clientHref ?? `/portal/${portal.id}`;

	return (
		<article className="group grid gap-5 px-2 py-4 transition-colors hover:bg-muted/18 sm:px-3 lg:grid-cols-[minmax(320px,1.35fr)_minmax(260px,0.95fr)_96px] lg:items-start">
			<button
				className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onSelect}
				type="button"
			>
				<div className="min-w-0 space-y-2.5">
					<div>
						<h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-foreground">
							{portal.name}
						</h2>
						<p className="mt-1 text-sm text-muted-foreground">{portal.project}</p>
					</div>

					<div className={cn("text-sm font-medium", tone.text)}>
						{portal.status}
					</div>

					<p className="text-sm text-foreground/80">{portal.statusDetail}</p>
				</div>
			</button>

			<button
				className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onSelect}
				type="button"
			>
				<div className="grid gap-3 text-sm sm:grid-cols-[minmax(0,1fr)_140px]">
					<div className="min-w-0">
						<div className="text-xs font-medium text-muted-foreground">Activity</div>
						<p className="mt-1 text-foreground/75">{portal.engagement}</p>
						<div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
							<span>{portal.visibility}</span>
							<span aria-hidden="true">/</span>
							<span>{portal.updated}</span>
						</div>
					</div>
					<div>
						<div className="text-xs font-medium text-muted-foreground">Engagement</div>
						<div className="mt-1 space-y-1 text-xs leading-5 text-muted-foreground">
							{portal.metrics.map((metric) => (
								<div key={metric}>{metric}</div>
							))}
						</div>
					</div>
				</div>
			</button>

			<div className="flex items-center gap-2 text-xs lg:justify-end">
				<Link
					className="flex items-center gap-1.5 whitespace-nowrap font-medium text-foreground transition-colors hover:text-foreground/80"
					href={portalHref}
				>
					Open
					<ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</Link>
				<PortalActionsMenu
					onSelect={onSelect}
					portalHref={portalHref}
					portalName={portal.name}
				/>
			</div>
		</article>
	);
}

function PortalActionsMenu({
	onSelect,
	portalHref,
	portalName,
}: {
	onSelect: () => void;
	portalHref: string;
	portalName: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label={`More actions for ${portalName}`}
				className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
			>
				<MoreHorizontalIcon className="size-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem render={<Link href={portalHref} />}>
					<ArrowUpRightIcon className="size-4" />
					Open portal
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<CopyIcon className="size-4" />
					Copy link
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SendIcon className="size-4" />
					Share update
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onSelect}>
					<EyeIcon className="size-4" />
					View analytics
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
