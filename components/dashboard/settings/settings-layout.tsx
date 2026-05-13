import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SettingsHeader({
	description,
	onSave,
	title,
}: {
	description: string;
	onSave: () => void;
	title: string;
}) {
	return (
		<div className="flex flex-col gap-4 border-b pb-8 md:flex-row md:items-start md:justify-between">
			<div>
				<h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					{description}
				</p>
			</div>
			<div className="flex items-center gap-3 text-sm text-muted-foreground">
				<span>Last updated May 8, 2026</span>
				<Button onClick={onSave} size="sm">
					Save changes
				</Button>
			</div>
		</div>
	);
}

export function SettingsSection({
	children,
	description,
	title,
}: {
	children: ReactNode;
	description?: string;
	title: string;
}) {
	return (
		<section className="py-7 first:pt-0">
			<div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)]">
				<div>
					<h2 className="text-base font-semibold">{title}</h2>
					{description ? (
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							{description}
						</p>
					) : null}
				</div>
				<div className="divide-y">{children}</div>
			</div>
		</section>
	);
}

export function SettingRow({
	action,
	children,
	description,
	status,
	title,
	value,
}: {
	action?: ReactNode;
	children?: ReactNode;
	description?: string;
	status?: ReactNode;
	title: string;
	value?: string;
}) {
	return (
		<div className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_minmax(11rem,auto)] md:items-center">
			<div>
				<div className="font-medium">{title}</div>
				{description ? (
					<p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
						{description}
					</p>
				) : null}
			</div>
			<div className="flex min-w-0 items-center justify-start gap-3 md:justify-end">
				{value ? (
					<span className="max-w-72 truncate text-sm text-muted-foreground">
						{value}
					</span>
				) : null}
				{status}
				{children}
				{action}
			</div>
		</div>
	);
}

export function SegmentedControl({
	options,
	value,
	onChange,
}: {
	options: string[];
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="inline-flex rounded-lg bg-muted/60 p-0.5">
			{options.map((option) => (
				<button
					className={cn(
						"rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
						value === option && "bg-background text-foreground shadow-xs"
					)}
					key={option}
					onClick={() => onChange(option)}
					type="button"
				>
					{option}
				</button>
			))}
		</div>
	);
}

export function OptionSetting({
	description,
	label,
	onChange,
	options,
	value,
	width = "w-72",
}: {
	description?: string;
	label: string;
	onChange: (value: string) => void;
	options: string[];
	value: string;
	width?: string;
}) {
	return (
		<SettingRow title={label} description={description}>
			<OptionSelectControl
				label={label}
				onChange={onChange}
				options={options}
				value={value}
				width={width}
			/>
		</SettingRow>
	);
}

export function OptionSelectControl({
	label,
	onChange,
	options,
	value,
	width = "w-72",
}: {
	label: string;
	onChange: (value: string) => void;
	options: string[];
	value: string;
	width?: string;
}) {
	const items = options.map((option) => ({ label: option, value: option }));

	return (
		<Field className={width}>
			<Select items={items} onValueChange={(nextValue) => nextValue != null && onChange(nextValue)} value={value}>
				<SelectTrigger aria-label={label} className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent alignItemWithTrigger={false}>
					<SelectGroup>
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	);
}

export function UnsavedChangesBar({
	onDiscard,
	onSave,
}: {
	onDiscard: () => void;
	onSave: () => void;
}) {
	return (
		<div className="fixed bottom-5 right-5 z-40 flex items-center gap-4 rounded-lg border bg-popover px-4 py-3 text-sm shadow-lg">
			<span className="font-medium">Unsaved changes</span>
			<Button onClick={onDiscard} size="sm" variant="ghost">
				Discard
			</Button>
			<Button onClick={onSave} size="sm">
				Save changes
			</Button>
		</div>
	);
}
