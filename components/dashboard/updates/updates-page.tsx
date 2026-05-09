"use client";

import { useMemo, useState } from "react";

import { UpdateDetailSheet } from "@/components/dashboard/updates/update-detail-sheet";
import { UpdateStream } from "@/components/dashboard/updates/update-stream";
import { updateGroups, updateProjects, updateRanges, updateStates, updates, updateTypes } from "@/components/dashboard/updates/updates-data";
import { UpdatesEmptyState } from "@/components/dashboard/updates/updates-empty-state";
import { UpdatesHeader } from "@/components/dashboard/updates/updates-header";
import { UpdatesToolbar } from "@/components/dashboard/updates/updates-toolbar";

export function UpdatesPage() {
	const [query, setQuery] = useState("");
	const [project, setProject] = useState("All projects");
	const [type, setType] = useState("All types");
	const [state, setState] = useState("Sent");
	const [range, setRange] = useState("This month");
	const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);

	const filteredUpdates = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return updates.filter((update) => {
			const matchesQuery =
				!normalizedQuery ||
				[
					update.title,
					update.project,
					update.type,
					update.body,
					update.recipients.join(" "),
					update.attachments.join(" "),
				]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);
			const matchesProject = project === "All projects" || update.project === project;
			const matchesType = type === "All types" || update.type === type;
			const matchesState =
				state === "Sent" || update.visibility.state === state.toLowerCase();
			const matchesRange =
				range === "This month" ||
				update.group === range ||
				(range === "Today" && update.group === "Today") ||
				(range === "This week" && ["Today", "Yesterday", "This week"].includes(update.group));

			return matchesQuery && matchesProject && matchesType && matchesState && matchesRange;
		});
	}, [project, query, range, state, type]);

	const selectedUpdate =
		filteredUpdates.find((update) => update.id === selectedUpdateId) ?? null;

	return (
		<div className="space-y-6">
			<UpdatesHeader />
			<UpdatesToolbar
				onProjectChange={setProject}
				onQueryChange={setQuery}
				onRangeChange={setRange}
				onStateChange={setState}
				onTypeChange={setType}
				project={project}
				projects={updateProjects}
				query={query}
				range={range}
				ranges={updateRanges}
				state={state}
				states={updateStates}
				type={type}
				types={updateTypes}
			/>

			{filteredUpdates.length > 0 ? (
				<>
					<UpdateStream
						groups={updateGroups}
						onSelectUpdate={setSelectedUpdateId}
						selectedUpdateId={selectedUpdateId}
						updates={filteredUpdates}
					/>
					<UpdateDetailSheet
						onOpenChange={(open) => {
							if (!open) setSelectedUpdateId(null);
						}}
						update={selectedUpdate}
					/>
				</>
			) : (
				<UpdatesEmptyState />
			)}
		</div>
	);
}
