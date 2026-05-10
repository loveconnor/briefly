import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseTemplateDialog } from "./use-template-dialog";
import { TemplateContextPanel } from "./template-context-panel";
import { AutomationTab } from "./template-automation-tab";
import { BuilderTab } from "./template-builder-tab";
import { OverviewTab } from "./template-overview-tab";
import { PortalPreviewTab } from "./template-portal-preview-tab";
import { WorkflowTab } from "./template-workflow-tab";
import type { TemplateSystem } from "./templates-data";

export function TemplateDetailPage({ template }: { template: TemplateSystem }) {
	return (
		<div className="mx-auto w-full max-w-[1280px] space-y-7">
			<Link
				className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				href="/dashboard/templates"
			>
				<ArrowLeftIcon className="size-4" />
				Templates
			</Link>

			<header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<Badge className="mb-3" variant="outline">
						{template.typeLabel}
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight">{template.name}</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						{template.description}
					</p>
					<div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
						<span>Used {template.usedCount} times</span>
						<span>Last updated {template.lastUpdated}</span>
						<span>Created by {template.createdBy}</span>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					<UseTemplateDialog />
					<Button variant="outline">Edit</Button>
				</div>
			</header>

			<Tabs className="gap-7" defaultValue="overview">
				<TabsList
					className="flex w-fit max-w-full flex-wrap justify-start gap-1 bg-muted/35 p-1"
					variant="default"
				>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="workflow">Workflow</TabsTrigger>
					<TabsTrigger value="portal">Portal Preview</TabsTrigger>
					<TabsTrigger value="builder">Builder</TabsTrigger>
					<TabsTrigger value="automation">Automation</TabsTrigger>
				</TabsList>

				<div className="grid gap-8 xl:grid-cols-[minmax(0,980px)_260px]">
					<main className="min-w-0">
						<TabsContent value="overview">
							<OverviewTab template={template} />
						</TabsContent>
						<TabsContent value="workflow">
							<WorkflowTab template={template} />
						</TabsContent>
						<TabsContent id="portal" value="portal">
							<PortalPreviewTab template={template} />
						</TabsContent>
						<TabsContent value="builder">
							<BuilderTab template={template} />
						</TabsContent>
						<TabsContent id="automation" value="automation">
							<AutomationTab template={template} />
						</TabsContent>
					</main>

					<TemplateContextPanel template={template} />
				</div>
			</Tabs>
		</div>
	);
}
