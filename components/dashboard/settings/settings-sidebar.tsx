"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { settingsGroups } from "./settings-data";
import type { SettingsKey } from "./settings-types";

type SearchResult = {
	key: SettingsKey;
	label: string;
	group: string;
};

export function SettingsSidebar({
	active,
	onActiveChange,
	onQueryChange,
	query,
	searchResults,
}: {
	active: SettingsKey;
	onActiveChange: (key: SettingsKey) => void;
	onQueryChange: (query: string) => void;
	query: string;
	searchResults: SearchResult[];
}) {
	return (
		<aside className="no-scrollbar lg:sticky lg:top-6 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto lg:pr-1">
			<div className="relative">
				<SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					aria-label="Search settings"
					className="border-transparent bg-muted/55 pl-9 shadow-none"
					onChange={(event) => onQueryChange(event.target.value)}
					placeholder="Search settings..."
					type="search"
					value={query}
				/>
			</div>

			{searchResults.length ? (
				<div className="mt-3 border-b pb-4">
					<p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
						Results
					</p>
					<div className="space-y-1">
						{searchResults.map((item) => (
							<button
								className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
								key={item.key}
								onClick={() => {
									onActiveChange(item.key);
									onQueryChange("");
								}}
								type="button"
							>
								<span className="block font-medium text-foreground">
									{item.label}
								</span>
								<span className="text-xs">{item.group}</span>
							</button>
						))}
					</div>
				</div>
			) : null}

			<nav className="mt-6 space-y-7" aria-label="Settings sections">
				{settingsGroups.map((group) => (
					<div key={group.label}>
						<div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
							{group.label}
						</div>
						<div className="space-y-0.5">
							{group.items.map((item) => {
								const isActive = active === item.key;

								return (
									<button
										className={cn(
											"relative flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/45 hover:text-foreground",
											isActive && "bg-muted/45 font-medium text-foreground"
										)}
										key={item.key}
										onClick={() => onActiveChange(item.key)}
										type="button"
									>
										{item.label}
									</button>
								);
							})}
						</div>
					</div>
				))}
			</nav>
		</aside>
	);
}
