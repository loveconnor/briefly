"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { FilterSelect } from "@/components/dashboard/updates/filter-select";
import { formatUpdateType } from "@/components/dashboard/updates/format-update-type";
import type { UpdateType } from "@/components/dashboard/updates/types";

function formatTypeOption(option: string) {
	return option === "All types" ? option : formatUpdateType(option as UpdateType);
}

export function UpdatesToolbar({
	onProjectChange,
	onQueryChange,
	onRangeChange,
	onStateChange,
	onTypeChange,
	project,
	projects,
	query,
	range,
	ranges,
	state,
	states,
	type,
	types,
}: {
	onProjectChange: (value: string) => void;
	onQueryChange: (value: string) => void;
	onRangeChange: (value: string) => void;
	onStateChange: (value: string) => void;
	onTypeChange: (value: string) => void;
	project: string;
	projects: string[];
	query: string;
	range: string;
	ranges: string[];
	state: string;
	states: string[];
	type: string;
	types: Array<"All types" | UpdateType>;
}) {
	return (
		<div className="flex flex-col gap-3 xl:flex-row xl:items-center">
			<div className="relative min-w-0 flex-1">
				<SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					aria-label="Search updates"
					className="[&_[data-slot=input]]:pl-9"
					onChange={(event) => onQueryChange(event.currentTarget.value)}
					placeholder="Search updates..."
					type="search"
					value={query}
				/>
			</div>
			<div className="grid grid-cols-2 gap-2 md:flex">
				<FilterSelect label="Project" onChange={onProjectChange} options={projects} value={project} />
				<FilterSelect
					formatOption={formatTypeOption}
					label="Type"
					onChange={onTypeChange}
					options={types}
					value={type}
				/>
				<FilterSelect label="State" onChange={onStateChange} options={states} value={state} />
				<FilterSelect label="Date range" onChange={onRangeChange} options={ranges} value={range} />
			</div>
		</div>
	);
}
