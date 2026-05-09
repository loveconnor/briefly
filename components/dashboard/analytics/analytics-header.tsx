"use client";

import { FileDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
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
				<Select onValueChange={onRangeChange} value={range}>
					<SelectTrigger aria-label="Date range" className="h-8 w-32">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="90d">Last 90 days</SelectItem>
					</SelectContent>
				</Select>
				<Select onValueChange={onProjectChange} value={project}>
					<SelectTrigger aria-label="Project filter" className="h-8 w-40">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All projects</SelectItem>
						<SelectItem value="website">Website projects</SelectItem>
						<SelectItem value="brand">Brand portals</SelectItem>
						<SelectItem value="launch">Launch work</SelectItem>
					</SelectContent>
				</Select>
				<Select onValueChange={onCompareChange} value={compare}>
					<SelectTrigger aria-label="Compare period" className="h-8 w-40">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="previous">Compare previous</SelectItem>
						<SelectItem value="none">No comparison</SelectItem>
						<SelectItem value="month">Same period last month</SelectItem>
					</SelectContent>
				</Select>
				<Button className="h-8" size="sm" variant="outline">
					<FileDownIcon />
					Export
				</Button>
			</div>
		</header>
	);
}
