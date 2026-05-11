import { CheckCircle2Icon, Clock3Icon } from "lucide-react";

import { cn } from "@/lib/utils";

export function SettingsSection({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="mb-6">
				<h2 className="text-base font-semibold">{title}</h2>
				<p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			</div>
			<div className="divide-y border-y">{children}</div>
		</section>
	);
}

export function SettingRow({
	label,
	description,
	action,
}: {
	label: string;
	description: string;
	action: React.ReactNode;
}) {
	return (
		<div className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
			<div>
				<p className="text-sm font-medium">{label}</p>
				<p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
					{description}
				</p>
			</div>
			<div className="sm:justify-self-end">{action}</div>
		</div>
	);
}

export function ColorRow({
	colors,
	selected,
	onSelect,
}: {
	colors: string[];
	selected: string;
	onSelect: (color: string) => void;
}) {
	return (
		<div className="flex gap-2">
			{colors.map((color) => (
				<button
					aria-label={`Use ${color}`}
					className={cn(
						"size-7 rounded-full border ring-offset-2 ring-offset-background transition-shadow",
						selected === color && "ring-2 ring-ring"
					)}
					key={color}
					onClick={() => onSelect(color)}
					style={{ backgroundColor: color }}
					type="button"
				/>
			))}
		</div>
	);
}

export function StatusText({ status }: { status: string }) {
	const pending =
		status.includes("pending") ||
		status.includes("waiting") ||
		status === "Retrying";

	return (
		<span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
			{pending ? (
				<Clock3Icon className="size-3.5 text-warning-foreground" />
			) : (
				<CheckCircle2Icon className="size-3.5 text-success-foreground" />
			)}
			{status}
		</span>
	);
}

export function QuietNote({
	icon,
	title,
	copy,
}: {
	icon: React.ReactNode;
	title: string;
	copy: string;
}) {
	return (
		<div className="flex max-w-3xl gap-3 text-sm">
			<div className="mt-0.5 text-muted-foreground">{icon}</div>
			<div>
				<p className="font-medium">{title}</p>
				<p className="mt-1 leading-6 text-muted-foreground">{copy}</p>
			</div>
		</div>
	);
}

export function PlainValue({ children }: { children: React.ReactNode }) {
	return <span className="text-sm text-muted-foreground">{children}</span>;
}

export function SheetStep({
	number,
	title,
	children,
}: {
	number: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="mb-3 flex items-center gap-2">
				<span className="flex size-5 items-center justify-center rounded-full bg-muted text-xs">
					{number}
				</span>
				<h3 className="text-sm font-medium">{title}</h3>
			</div>
			{children}
		</section>
	);
}
