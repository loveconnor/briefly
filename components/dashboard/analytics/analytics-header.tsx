"use client";

import { FileDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type AnalyticsHeaderProps = {
	compare: string;
	onCompareChange: (value: string) => void;
	onProjectChange: (value: string) => void;
	onRangeChange: (value: string) => void;
	project: string;
	range: string;
};

const rangeItems = [
	{ label: "Last 7 days", value: "7d" },
	{ label: "Last 30 days", value: "30d" },
	{ label: "Last 90 days", value: "90d" },
];

const projectItems = [
	{ label: "All projects", value: "all" },
	{ label: "Website projects", value: "website" },
	{ label: "Brand portals", value: "brand" },
	{ label: "Launch work", value: "launch" },
];

const compareItems = [
	{ label: "Compare previous", value: "previous" },
	{ label: "No comparison", value: "none" },
	{ label: "Same period last month", value: "month" },
];

export function AnalyticsHeader({
	compare,
	onCompareChange,
	onProjectChange,
	onRangeChange,
	project,
	range,
}: AnalyticsHeaderProps) {
	return (
		<header className="flex flex-col gap-4 pb-2 lg:flex-row lg:items-end lg:justify-between">
			<div className="min-w-0">
				<h1 className="text-2xl font-semibold tracking-normal">Analytics</h1>
				<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
					Client engagement, approvals, activity, and portal performance.
				</p>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Field className="w-32">
					<Select items={rangeItems} onValueChange={(value) => value != null && onRangeChange(value)} value={range}>
						<SelectTrigger aria-label="Date range" className="h-8 w-full">
							<SelectValue />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectGroup>
								{rangeItems.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
				<Field className="w-40">
					<Select items={projectItems} onValueChange={(value) => value != null && onProjectChange(value)} value={project}>
						<SelectTrigger aria-label="Project filter" className="h-8 w-full">
							<SelectValue />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectGroup>
								{projectItems.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
				<Field className="w-40">
					<Select items={compareItems} onValueChange={(value) => value != null && onCompareChange(value)} value={compare}>
						<SelectTrigger aria-label="Compare period" className="h-8 w-full">
							<SelectValue />
						</SelectTrigger>
						<SelectContent alignItemWithTrigger={false}>
							<SelectGroup>
								{compareItems.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</Field>
				<Button className="h-8" size="sm" variant="outline">
					<FileDownIcon />
					Export
				</Button>
			</div>
		</header>
	);
}
