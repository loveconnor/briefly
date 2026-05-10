"use client";

import { useMemo, useState } from "react";

import { pageCopy, searchIndex } from "./settings-data";
import { SettingsContent } from "./settings-content";
import {
	SettingsHeader,
	UnsavedChangesBar,
} from "./settings-layout";
import { SettingsSheet } from "./settings-sheet";
import { SettingsSidebar } from "./settings-sidebar";
import type { SettingsKey, SheetState } from "./settings-types";

export function SettingsPage() {
	const [active, setActive] = useState<SettingsKey>("general");
	const [query, setQuery] = useState("");
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [sheet, setSheet] = useState<SheetState>(null);
	const activeCopy = pageCopy[active];

	const searchResults = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		if (!normalized) return [];

		return searchIndex.filter((item) =>
			`${item.label} ${item.group} ${item.copy}`
				.toLowerCase()
				.includes(normalized)
		);
	}, [query]);

	const clearUnsavedChanges = () => setHasUnsavedChanges(false);

	return (
		<div className="min-h-[calc(100svh-6.5rem)] rounded-none bg-background">
			<div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
				<SettingsSidebar
					active={active}
					onActiveChange={setActive}
					onQueryChange={setQuery}
					query={query}
					searchResults={searchResults}
				/>

				<main className="mx-auto w-full max-w-5xl pb-24">
					<SettingsHeader
						description={activeCopy.description}
						onSave={clearUnsavedChanges}
						title={activeCopy.title}
					/>
					<div className="pt-8">
						<SettingsContent
							active={active}
							onDirty={() => setHasUnsavedChanges(true)}
							onOpenSheet={setSheet}
						/>
					</div>
				</main>
			</div>

			{hasUnsavedChanges ? (
				<UnsavedChangesBar
					onDiscard={clearUnsavedChanges}
					onSave={clearUnsavedChanges}
				/>
			) : null}

			<SettingsSheet sheet={sheet} onClose={() => setSheet(null)} />
		</div>
	);
}
