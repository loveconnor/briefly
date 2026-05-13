import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

import { type Automation, filterOptions } from "./automations-data";
import { type AutomationFilter } from "./automations-display";
import { AutomationRow } from "./automation-row";

export function AutomationRulesSection({
	automations,
	filter,
	onFilterChange,
	onQueryChange,
	onSelect,
	query,
}: {
	automations: Automation[];
	filter: AutomationFilter;
	onFilterChange: (filter: AutomationFilter) => void;
	onQueryChange: (query: string) => void;
	onSelect: (automation: Automation) => void;
	query: string;
}) {
	return (
		<section className="space-y-5 pt-4">
			<div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
				<div>
					<h2 className="text-xl font-semibold tracking-normal">Automation rules</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Live operational rules across reminders, approvals, updates, and workflow steps.
					</p>
				</div>
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<Field className="min-w-0 sm:w-72">
						<InputGroup>
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupInput
							aria-label="Search automations"
							onChange={(event) => onQueryChange(event.target.value)}
							placeholder="Search automations..."
							type="search"
							value={query}
						/>
						</InputGroup>
					</Field>
					<Button className="h-8 justify-start" size="sm" variant="outline">
						<ListFilterIcon />
						Filters
					</Button>
				</div>
			</div>

			<div className="flex gap-1 overflow-x-auto pb-1">
				{filterOptions.map((option) => (
					<button
						className={cn(
							"shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
							filter === option.value && "bg-accent text-foreground"
						)}
						key={option.value}
						onClick={() => onFilterChange(option.value)}
						type="button"
					>
						{option.label}
					</button>
				))}
			</div>

			<div className="space-y-2">
				{automations.map((automation) => (
					<AutomationRow
						automation={automation}
						key={automation.slug}
						onSelect={onSelect}
					/>
				))}
				{automations.length === 0 ? (
					<div className="flex min-h-48 flex-col items-center justify-center px-4 text-center">
						<p className="font-medium">No automations match this view.</p>
						<p className="mt-1 max-w-sm text-sm text-muted-foreground">
							Search by automation name, trigger, action, or project scope.
						</p>
					</div>
				) : null}
			</div>
		</section>
	);
}
