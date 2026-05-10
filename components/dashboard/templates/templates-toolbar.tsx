import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { templateFilters, type TemplateCategory } from "./templates-data";

export function TemplatesToolbar({
	category,
	onCategoryChange,
	onQueryChange,
	query,
}: {
	category: TemplateCategory | "all";
	onCategoryChange: (category: TemplateCategory | "all") => void;
	onQueryChange: (query: string) => void;
	query: string;
}) {
	return (
		<div className="space-y-4">
			<label className="relative block max-w-xl">
				<span className="sr-only">Search templates</span>
				<SearchIcon className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					className="pl-9"
					onChange={(event) => onQueryChange(event.target.value)}
					placeholder="Search templates..."
					value={query}
				/>
			</label>

			<nav aria-label="Template filters" className="flex flex-wrap gap-x-4 gap-y-2">
				{templateFilters.map((filter) => (
					<button
						className={cn(
							"text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							category === filter.value && "text-foreground"
						)}
						key={filter.value}
						onClick={() => onCategoryChange(filter.value)}
						type="button"
					>
						{filter.label}
					</button>
				))}
			</nav>
		</div>
	);
}
