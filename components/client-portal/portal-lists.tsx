import {
	CheckCircle2Icon,
	CheckIcon,
	DownloadIcon,
	EyeIcon,
	FileTextIcon,
	ImageIcon,
	UploadIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { activity, feedItems, files, tasks } from "./client-portal-data";

export function TaskList({ limit }: { limit?: number }) {
	return (
		<div>
			{tasks.slice(0, limit).map((task) => (
				<div className="flex items-start gap-4 py-3.5" key={task.title}>
					<span
						className={cn(
							"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border",
							task.state === "done" &&
								"border-primary bg-primary text-primary-foreground"
						)}
					>
						{task.state === "done" ? <CheckIcon className="size-3.5" /> : null}
					</span>
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
		</div>
	);
}

export function MessageList({ limit }: { limit?: number }) {
	return (
		<div className="space-y-6">
			{feedItems.slice(0, limit).map((item) => (
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
		</div>
	);
}

export function FileList({ limit }: { limit?: number }) {
	return (
		<div>
			{files.slice(0, limit).map((file) => (
				<a
					className="grid gap-3 py-3.5 transition-colors hover:text-foreground sm:grid-cols-[1fr_auto] sm:items-center"
					href="#portal-tabs"
					key={file.name}
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
					<span className="flex items-center gap-1 text-sm font-medium sm:justify-self-end">
						{file.action === "Download" ? <DownloadIcon className="size-4" /> : null}
						{file.action}
					</span>
				</a>
			))}
		</div>
	);
}

export function ActivityList() {
	return (
		<div className="space-y-1">
			{activity.map((item) => (
				<div
					className="grid gap-3 py-4 sm:grid-cols-[2.25rem_minmax(0,1fr)_7rem]"
					key={`${item.actor}-${item.action}`}
				>
					<span className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
						<ActivityIcon type={item.type} />
					</span>
					<div className="min-w-0">
						<p className="font-medium">
							{item.actor}{" "}
							<span className="font-normal text-muted-foreground">
								{item.action}
							</span>
						</p>
						<p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
							{item.context}
						</p>
					</div>
					<p className="text-sm text-muted-foreground sm:text-right">{item.time}</p>
				</div>
			))}
		</div>
	);
}

function FileIcon({ type }: { type: (typeof files)[number]["icon"] }) {
	if (type === "image") {
		return <ImageIcon className="size-5" />;
	}

	return <FileTextIcon className="size-5" />;
}

function ActivityIcon({ type }: { type: (typeof activity)[number]["type"] }) {
	if (type === "view") {
		return <EyeIcon className="size-4" />;
	}

	if (type === "upload") {
		return <UploadIcon className="size-4" />;
	}

	return <CheckCircle2Icon className="size-4" />;
}
