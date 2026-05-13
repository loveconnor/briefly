"use client";

import { useMemo, useState } from "react";

import { TemplateSystemList } from "./template-system-list";
import { TemplatesHeader } from "./templates-header";
import { TemplatesToolbar } from "./templates-toolbar";
import {
	type TemplateCategory,
	type TemplateSystem,
} from "./templates-data";

export function TemplatesPage({
	initialCategory = "all",
	templates,
}: {
	initialCategory?: TemplateCategory | "all";
	templates: TemplateSystem[];
}) {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState<TemplateCategory | "all">(
		initialCategory
	);

	const filteredTemplates = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return templates.filter((template) => {
			const matchesCategory =
				category === "all" || template.category === category;
			const matchesQuery =
				!normalizedQuery ||
				[
					template.name,
					template.summary,
					template.description,
					template.typeLabel,
					...template.workflowIncludes,
				]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);

			return matchesCategory && matchesQuery;
		});
	}, [category, query, templates]);

	return (
		<div className="mx-auto w-full max-w-[1280px] space-y-7">
			<TemplatesHeader />
			<TemplatesToolbar
				category={category}
				onCategoryChange={setCategory}
				onQueryChange={setQuery}
				query={query}
			/>
			<TemplateSystemList templates={filteredTemplates} />
		</div>
	);
}
