import { CheckCircle2Icon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { changes } from "./client-portal-data";
import { HomepagePreview } from "./homepage-preview";
import { ActivityList, FileList, MessageList, TaskList } from "./portal-lists";
import { SummarySection } from "./summary-section";

export function OverviewTab({ projectName }: { projectName: string }) {
	return (
		<div className="space-y-10">
			<ReviewTab compact projectName={projectName} />
			<div className="grid gap-10 xl:grid-cols-2">
				<SummarySection title="Open Tasks" eyebrow="Client tasks">
					<TaskList limit={2} />
				</SummarySection>
				<SummarySection title="Recent discussion" eyebrow="Messages">
					<MessageList limit={2} />
				</SummarySection>
			</div>
			<SummarySection title="Latest Files" eyebrow="Files & deliverables">
				<FileList limit={2} />
			</SummarySection>
		</div>
	);
}

export function ReviewTab({
	compact = false,
	projectName,
}: {
	compact?: boolean;
	projectName: string;
}) {
	return (
		<section className="bg-muted/35 px-5 py-7 sm:px-7 sm:py-8">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0">
					<p className="text-sm font-medium text-muted-foreground">
						Review needed
					</p>
					<h2 className="mt-1 text-2xl font-semibold tracking-tight">
						Homepage Review
					</h2>
					<p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
						Please review the latest homepage revisions before development begins
						tomorrow.
					</p>
				</div>
				<p className="shrink-0 text-sm text-muted-foreground">
					Latest revision / Updated today
				</p>
			</div>

			<div className="mt-6">
				<HomepagePreview compact={compact} projectName={projectName} />
			</div>

			<div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_220px]">
				<div>
					<p className="text-sm font-medium">Changes in this revision</p>
					<ul className="mt-3 space-y-2.5">
						{changes.map((change) => (
							<li className="flex gap-3 text-base text-muted-foreground" key={change}>
								<CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-success-foreground" />
								<span>{change}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-2.5">
					<Button className="min-h-11 w-full">Approve homepage</Button>
					<Button className="min-h-11 w-full" variant="outline">
						Request changes
					</Button>
				</div>
			</div>
		</section>
	);
}

export function TasksTab() {
	return (
		<SummarySection
			action={
				<Button variant="outline">
					<PlusIcon className="size-4" />
					Request something
				</Button>
			}
			eyebrow="Client tasks"
			title="Open Tasks"
		>
			<TaskList />
		</SummarySection>
	);
}

export function MessagesTab() {
	return (
		<SummarySection eyebrow="Messages" title="Recent discussion">
			<MessageList />
		</SummarySection>
	);
}

export function FilesTab() {
	return (
		<SummarySection eyebrow="Files & deliverables" title="Latest Files">
			<FileList />
		</SummarySection>
	);
}

export function ActivityTab() {
	return (
		<SummarySection eyebrow="Recent Activity" title="Project activity">
			<ActivityList />
		</SummarySection>
	);
}
