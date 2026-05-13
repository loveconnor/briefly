"use client";

import { useMemo, useState } from "react";

import { AutomationDetailSheet } from "./automation-detail-sheet";
import { AutomationHealthSection } from "./automation-health-section";
import { AutomationRulesSection } from "./automation-rules-section";
import { AutomationTemplates } from "./automation-templates";
import { AutomationsHeader } from "./automations-header";
import type { Automation } from "./automations-data";
import { type AutomationFilter } from "./automations-display";
import { OperationalSummaryStrip } from "./operational-summary-strip";
import type { AutomationsData } from "@/lib/app-data";

type AutomationsPageProps = {
	data: AutomationsData;
	initialFilter?: AutomationFilter;
};

export function AutomationsPage({ data, initialFilter = "all" }: AutomationsPageProps) {
	const [filter, setFilter] = useState<AutomationFilter>(initialFilter);
	const [query, setQuery] = useState("");
	const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

	const filteredAutomations = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return data.automations.filter((automation) => {
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
	}, [data.automations, filter, query]);

	return (
		<div className="mx-auto w-full max-w-[1360px] space-y-6">
			<AutomationsHeader />
			<OperationalSummaryStrip summary={data.summary} />
			<AutomationHealthSection
				automations={data.automations}
				attentionItems={data.attentionItems}
				onSelect={setSelectedAutomation}
				recentActivity={data.recentActivity}
			/>
			<AutomationRulesSection
				automations={filteredAutomations}
				filter={filter}
				onFilterChange={setFilter}
				onQueryChange={setQuery}
				onSelect={setSelectedAutomation}
				query={query}
			/>
			<AutomationTemplates templates={data.templates} />
			<AutomationDetailSheet
				automation={selectedAutomation}
				onClose={() => setSelectedAutomation(null)}
			/>
		</div>
	);
}
