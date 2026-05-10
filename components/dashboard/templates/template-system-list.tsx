import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TemplateSystem } from "./templates-data";

function TemplateRow({ template }: { template: TemplateSystem }) {
	return (
		<Link
			className={cn(
				"group grid gap-3 rounded-md px-2 py-4 transition-all hover:-mx-2 hover:bg-muted/45 hover:px-4 hover:shadow-sm",
				"lg:grid-cols-[minmax(280px,1fr)_260px_150px_150px_132px] lg:items-center"
			)}
			href={`/dashboard/templates/${template.slug}`}
		>
			<div className="min-w-0">
				<div className="truncate font-semibold">{template.name}</div>
				<div className="mt-1 text-sm text-muted-foreground">{template.summary}</div>
			</div>
			<div className="text-sm text-muted-foreground">
				{template.metrics.tasks} tasks · {template.metrics.approvals} approvals ·{" "}
				{template.metrics.phases} phases
			</div>
			<div className="text-sm text-muted-foreground">
				Used {template.usedCount} times
			</div>
			<div className="text-sm text-muted-foreground">
				Updated {template.lastUpdated}
			</div>
			<div className="flex items-center justify-between gap-2 lg:justify-end">
				<span
					className={cn(
						buttonVariants({ size: "sm", variant: "outline" })
					)}
				>
					<SparklesIcon className="size-4" />
					Use template
				</span>
			</div>
		</Link>
	);
}

export function TemplateSystemList({
	templates,
}: {
	templates: TemplateSystem[];
}) {
	return (
		<section aria-label="Template systems" className="space-y-2">
			<div className="hidden grid-cols-[minmax(280px,1fr)_260px_150px_150px_132px] rounded-md bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground lg:grid">
				<span>System</span>
				<span>Structure</span>
				<span>Usage</span>
				<span>Freshness</span>
				<span className="text-right">Action</span>
			</div>

			{templates.length ? (
				templates.map((template) => (
					<TemplateRow key={template.slug} template={template} />
				))
			) : (
				<div className="rounded-md bg-muted/30 px-4 py-12 text-sm text-muted-foreground">
					No templates match this search. Create a custom workflow or clear the filters.
				</div>
			)}
		</section>
	);
}
