import {
	CheckCircle2Icon,
	CheckIcon,
	DownloadIcon,
	EyeIcon,
	FileTextIcon,
	ImageIcon,
	UploadIcon,
} from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PortalData } from "./client-portal-data";

export function TaskList({
	data,
	limit,
	onCompleteTask,
}: {
	data: PortalData;
	limit?: number;
	onCompleteTask?: (taskId: string) => void;
}) {
	return (
		<div>
			{data.tasks.slice(0, limit).map((task) => (
				<div className="flex items-start gap-4 py-3.5" key={task.id}>
					<button
						aria-label={task.state === "done" ? `${task.title} completed` : `Mark ${task.title} complete`}
						className={cn(
							"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border",
							task.state === "done"
								? "border-primary bg-primary text-primary-foreground"
								: "transition-colors hover:border-primary"
						)}
						disabled={task.state === "done" || !onCompleteTask}
						onClick={() => onCompleteTask?.(task.id)}
						type="button"
					>
						{task.state === "done" ? <CheckIcon className="size-3.5" /> : null}
					</button>
					<div className="min-w-0">
						<p
							className={cn(
								"font-medium",
								task.state === "done" && "text-muted-foreground line-through"
							)}
						>
							{task.title}
						</p>
						<p className="mt-1 text-sm text-muted-foreground">{task.meta}</p>
					</div>
				</div>
			))}
			{data.tasks.length === 0 ? (
				<DashboardEmptyState className="my-3" title="No client tasks recorded" />
			) : null}
		</div>
	);
}

export function MessageList({ data, limit }: { data: PortalData; limit?: number }) {
	return (
		<div className="space-y-6">
			{data.messages.slice(0, limit).map((item) => (
				<article key={`${item.author}-${item.action}`}>
					<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
						<p className="font-semibold">{item.author}</p>
						<p className="text-sm text-muted-foreground">
							{item.action} / {item.time}
						</p>
					</div>
					<p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
						{item.body}
					</p>
					{item.attachment ? (
						<span className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
							<FileTextIcon className="size-4 text-muted-foreground" />
							{item.attachment}
						</span>
					) : null}
				</article>
			))}
			{data.messages.length === 0 ? (
				<DashboardEmptyState title="No messages recorded" />
			) : null}
		</div>
	);
}

export function FileList({
	data,
	limit,
	onDownloadFile,
}: {
	data: PortalData;
	limit?: number;
	onDownloadFile?: (fileName: string) => void;
}) {
	return (
		<div>
			{data.files.slice(0, limit).map((file) => (
				<div
					className="grid gap-3 py-3.5 transition-colors hover:text-foreground sm:grid-cols-[1fr_auto] sm:items-center"
					key={file.id}
				>
					<span className="flex min-w-0 items-center gap-4">
						<span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
							<FileIcon type={file.icon} />
						</span>
						<span className="min-w-0">
							<span className="block truncate font-medium">{file.name}</span>
							<span className="mt-1 block text-sm text-muted-foreground">
								{file.meta}
							</span>
						</span>
					</span>
					<Button
						className="w-fit sm:justify-self-end"
						onClick={() => onDownloadFile?.(file.name)}
						size="sm"
						variant="outline"
					>
						<DownloadIcon className="size-4" />
						Download
					</Button>
				</div>
			))}
			{data.files.length === 0 ? (
				<DashboardEmptyState className="my-3" icon={FileTextIcon} title="No files shared yet" />
			) : null}
		</div>
	);
}

export function ActivityList({ data }: { data: PortalData }) {
	return (
		<div className="space-y-1">
			{data.activity.map((item) => (
				<div
					className="grid gap-3 py-4 sm:grid-cols-[2.25rem_minmax(0,1fr)_7rem]"
					key={`${item.title}-${item.detail}`}
				>
					<span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
						<ActivityIcon type={item.icon} />
					</span>
					<div className="min-w-0">
						<p className="font-medium">{item.title}</p>
						<p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
							{item.detail}
						</p>
					</div>
				</div>
			))}
			{data.activity.length === 0 ? (
				<DashboardEmptyState className="my-3" title="No portal activity recorded" />
			) : null}
		</div>
	);
}

function FileIcon({ type }: { type: PortalData["files"][number]["icon"] }) {
	if (type === "image") {
		return <ImageIcon className="size-5" />;
	}

	return <FileTextIcon className="size-5" />;
}

function ActivityIcon({ type }: { type: PortalData["activity"][number]["icon"] }) {
	if (type === "viewed") {
		return <EyeIcon className="size-4" />;
	}

	if (type === "upload") {
		return <UploadIcon className="size-4" />;
	}

	if (type === "download") {
		return <DownloadIcon className="size-4" />;
	}

	return <CheckCircle2Icon className="size-4" />;
}
