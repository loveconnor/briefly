"use client";

import { useMemo, useState } from "react";

import { AutomationDetailSheet } from "./automation-detail-sheet";
import { AutomationHealthSection } from "./automation-health-section";
import { AutomationRulesSection } from "./automation-rules-section";
import { AutomationTemplates } from "./automation-templates";
import { AutomationsHeader } from "./automations-header";
import { automations, type Automation } from "./automations-data";
import { type AutomationFilter } from "./automations-display";
import { OperationalSummaryStrip } from "./operational-summary-strip";

type AutomationsPageProps = {
	initialFilter?: AutomationFilter;
};

export function AutomationsPage({ initialFilter = "all" }: AutomationsPageProps) {
	const [filter, setFilter] = useState<AutomationFilter>(initialFilter);
	const [query, setQuery] = useState("");
	const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

	const filteredAutomations = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return automations.filter((automation) => {
			const matchesFilter =
				filter === "all"
					? true
					: filter === "paused"
						? automation.status === "paused"
						: automation.category === filter;

			const searchable = [
				automation.name,
				automation.rule,
				automation.trigger,
				...automation.actions,
				...automation.appliesTo,
				...automation.scope,
			]
				.join(" ")
				.toLowerCase();

			return matchesFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
		});
	}, [filter, query]);

	return (
		<div className="mx-auto w-full max-w-[1360px] space-y-6">
			<AutomationsHeader />
			<OperationalSummaryStrip />
			<AutomationHealthSection onSelect={setSelectedAutomation} />
			<AutomationRulesSection
				automations={filteredAutomations}
				filter={filter}
				onFilterChange={setFilter}
				onQueryChange={setQuery}
				onSelect={setSelectedAutomation}
				query={query}
			/>
			<AutomationTemplates />
			<AutomationDetailSheet
				automation={selectedAutomation}
				onClose={() => setSelectedAutomation(null)}
			/>
		</div>
	);
}
