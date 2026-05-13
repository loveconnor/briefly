import { SearchIcon } from "lucide-react";

import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
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
			<Field className="max-w-xl">
				<span className="sr-only">Search templates</span>
				<InputGroup>
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupInput
					onChange={(event) => onQueryChange(event.target.value)}
					placeholder="Search templates..."
					value={query}
				/>
				</InputGroup>
			</Field>

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
