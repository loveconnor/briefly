"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	portalPerformance,
	type PortalStatus,
	type SortKey,
} from "./analytics-data";

function statusTone(status: PortalStatus) {
	return {
		"Awaiting approval": "border-warning text-warning-foreground",
		"In review": "border-info text-info-foreground",
		Stalled: "border-destructive text-destructive-foreground",
		Approved: "border-success text-success-foreground",
	}[status];
}

function SortButton({
	active,
	direction,
	label,
	onClick,
}: {
	active: boolean;
	direction: "asc" | "desc";
	label: string;
	onClick: () => void;
}) {
	const Icon = active
		? direction === "asc"
			? ArrowUpIcon
			: ArrowDownIcon
		: ArrowUpDownIcon;

	return (
		<button
			className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
			onClick={onClick}
			type="button"
		>
			{label}
			<Icon className="size-3" />
		</button>
	);
}

export function PortalPerformanceTable({ project }: { project: string }) {
	const router = useRouter();
	const [sortKey, setSortKey] = useState<SortKey>("lastActivity");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const sortedPortals = useMemo(() => {
		return portalPerformance
			.filter((portal) => project === "all" || portal.category === project)
			.sort((a, b) => {
				const aValue =
					sortKey === "lastActivity"
						? a.lastActivityRank
						: sortKey === "avgReviewTime"
							? a.avgReviewTime
							: a[sortKey];
				const bValue =
					sortKey === "lastActivity"
						? b.lastActivityRank
						: sortKey === "avgReviewTime"
							? b.avgReviewTime
							: b[sortKey];

				const result =
					typeof aValue === "number" && typeof bValue === "number"
						? aValue - bValue
						: String(aValue).localeCompare(String(bValue));

				return sortDirection === "asc" ? result : -result;
			});
	}, [project, sortDirection, sortKey]);

	function handleSort(key: SortKey) {
		if (sortKey === key) {
			setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
			return;
		}
		setSortKey(key);
		setSortDirection("asc");
	}

	return (
		<section className="space-y-4">
			<div className="flex items-end justify-between gap-4">
				<div>
					<h2 className="text-lg font-semibold">Portal Performance</h2>
					<p className="text-sm text-muted-foreground">
						Sorted by the signal most likely to need action.
					</p>
				</div>
			</div>
			<div className="overflow-hidden rounded-lg ring-1 ring-border/60">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead>
								<SortButton
									active={sortKey === "portal"}
									direction={sortDirection}
									label="Portal"
									onClick={() => handleSort("portal")}
								/>
							</TableHead>
							<TableHead>
								<SortButton
									active={sortKey === "status"}
									direction={sortDirection}
									label="Status"
									onClick={() => handleSort("status")}
								/>
							</TableHead>
							<TableHead className="text-right">
								<SortButton
									active={sortKey === "views"}
									direction={sortDirection}
									label="Views"
									onClick={() => handleSort("views")}
								/>
							</TableHead>
							<TableHead>
								<SortButton
									active={sortKey === "avgReviewTime"}
									direction={sortDirection}
									label="Avg Review Time"
									onClick={() => handleSort("avgReviewTime")}
								/>
							</TableHead>
							<TableHead className="text-right">
								<SortButton
									active={sortKey === "downloads"}
									direction={sortDirection}
									label="Downloads"
									onClick={() => handleSort("downloads")}
								/>
							</TableHead>
							<TableHead className="text-right">
								<SortButton
									active={sortKey === "comments"}
									direction={sortDirection}
									label="Comments"
									onClick={() => handleSort("comments")}
								/>
							</TableHead>
							<TableHead>
								<SortButton
									active={sortKey === "lastActivity"}
									direction={sortDirection}
									label="Last Activity"
									onClick={() => handleSort("lastActivity")}
								/>
							</TableHead>
							<TableHead>
								<SortButton
									active={sortKey === "conversion"}
									direction={sortDirection}
									label="Conversion"
									onClick={() => handleSort("conversion")}
								/>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedPortals.map((portal) => (
							<TableRow
								className="group cursor-pointer border-l-2 border-l-transparent hover:border-l-foreground/25 hover:bg-muted/30"
								key={portal.id}
								onClick={() => router.push(`/dashboard/portals?portal=${portal.id}`)}
								onKeyDown={(event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										router.push(`/dashboard/portals?portal=${portal.id}`);
									}
								}}
								role="link"
								tabIndex={0}
							>
								<TableCell>
									<div className="block min-w-44">
										<span className="font-medium group-hover:underline">{portal.portal}</span>
										<span className="mt-0.5 block text-xs text-muted-foreground">
											{portal.client}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<span
										className={cn(
											"inline-flex border-l-2 pl-2 text-sm",
											statusTone(portal.status)
										)}
									>
										{portal.status}
									</span>
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums">
									{portal.views}
								</TableCell>
								<TableCell>{portal.reviewLabel}</TableCell>
								<TableCell className="text-right font-mono tabular-nums">
									{portal.downloads}
								</TableCell>
								<TableCell className="text-right font-mono tabular-nums">
									{portal.comments}
								</TableCell>
								<TableCell className="text-muted-foreground">{portal.lastActivity}</TableCell>
								<TableCell>{portal.conversion}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
