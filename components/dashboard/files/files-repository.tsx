"use client";

import { useMemo, useState } from "react";
import {
	ArchiveIcon,
	DownloadIcon,
	FileArchiveIcon,
	FileImageIcon,
	FileTextIcon,
	FileUpIcon,
	MoreVerticalIcon,
	PinIcon,
	PinOffIcon,
	SearchIcon,
	Share2Icon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { MissingFile, RepositoryFile } from "@/lib/app-data";

const dateOptions = ["Any date", "Today", "This week", "This month"];

const statusClassMap: Record<RepositoryFile["status"], string> = {
	Ready: "text-success-foreground",
	"Needs approval": "text-warning-foreground",
	"Awaiting review": "text-info-foreground",
	"Missing feedback": "text-destructive-foreground",
	Shared: "text-foreground",
	"Not shared": "text-muted-foreground",
	Archived: "text-muted-foreground",
};

const iconMap: Record<RepositoryFile["format"], LucideIcon> = {
	DOCX: FileTextIcon,
	PDF: FileTextIcon,
	PNG: FileImageIcon,
	ZIP: FileArchiveIcon,
};

export function FilesRepository({
	files,
	missingFiles,
}: {
	files: RepositoryFile[];
	missingFiles: MissingFile[];
}) {
	const [query, setQuery] = useState("");
	const [type, setType] = useState("All types");
	const [status, setStatus] = useState("All statuses");
	const [owner, setOwner] = useState("Anyone");
	const [date, setDate] = useState("Any date");
	const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
	const [pinnedFileIds, setPinnedFileIds] = useState<string[]>(() =>
		files.filter((file) => file.pinned).map((file) => file.id)
	);
	const typeOptions = useMemo(() => ["All types", ...Array.from(new Set(files.map((file) => file.type)))], [files]);
	const statusOptions = useMemo(() => ["All statuses", ...Array.from(new Set(files.map((file) => file.status)))], [files]);
	const ownerOptions = useMemo(() => ["Anyone", ...Array.from(new Set(files.map((file) => file.owner)))], [files]);

	const visibleFiles = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return files.filter((file) => {
			const matchesQuery =
				!normalizedQuery ||
				[file.name, file.type, file.status, file.owner, file.format]
					.join(" ")
					.toLowerCase()
					.includes(normalizedQuery);
			const matchesType = type === "All types" || file.type === type;
			const matchesStatus = status === "All statuses" || file.status === status;
			const matchesOwner = owner === "Anyone" || file.owner === owner;
			const matchesDate =
				date === "Any date" ||
				(date === "Today" && (file.updated.includes("m ago") || file.updated.includes("h ago") || file.updated === "Just now")) ||
				(date === "This week" && !file.updated.includes(",")) ||
				date === "This month";

			return matchesQuery && matchesType && matchesStatus && matchesOwner && matchesDate;
		});
	}, [date, owner, query, status, type]);

	const pinnedFiles = visibleFiles.filter((file) => pinnedFileIds.includes(file.id));
	const recentFiles = visibleFiles.filter((file) => !pinnedFileIds.includes(file.id));
	const selectedFile = files.find((file) => file.id === selectedFileId);
	const togglePinnedFile = (fileId: string) => {
		setPinnedFileIds((currentIds) =>
			currentIds.includes(fileId)
				? currentIds.filter((currentId) => currentId !== fileId)
				: [...currentIds, fileId]
		);
	};

	return (
		<div className="mx-auto w-full max-w-[1400px] space-y-7">
			<header className="space-y-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Files</h1>
					<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
						Assets, handoffs, and shared working files for this client.
					</p>
				</div>
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<Field className="min-w-0 flex-1">
						<InputGroup>
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupInput
							aria-label="Search files"
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search files..."
							type="search"
							value={query}
						/>
						</InputGroup>
					</Field>
					<div className="grid gap-2 sm:grid-cols-2 lg:flex">
						<FilterSelect label="Type" onChange={setType} options={typeOptions} value={type} />
						<FilterSelect label="Status" onChange={setStatus} options={statusOptions} value={status} />
						<FilterSelect label="Uploaded by" onChange={setOwner} options={ownerOptions} value={owner} />
						<FilterSelect label="Date" onChange={setDate} options={dateOptions} value={date} />
					</div>
					<Button className="lg:ml-1" type="button">
						<FileUpIcon className="size-4" />
						Upload
					</Button>
				</div>
			</header>

			<div className="min-h-[620px]">
				<main className="min-w-0 space-y-10">
					<FileSection
						files={pinnedFiles}
						isFilePinned={(fileId) => pinnedFileIds.includes(fileId)}
						onSelectFile={setSelectedFileId}
						onTogglePinned={togglePinnedFile}
						selectedFileId={selectedFile?.id}
						title="Pinned"
					/>
					<FileSection
						emptyText="No recent files match the current filters."
						files={recentFiles}
						isFilePinned={(fileId) => pinnedFileIds.includes(fileId)}
						onSelectFile={setSelectedFileId}
						onTogglePinned={togglePinnedFile}
						selectedFileId={selectedFile?.id}
						title="Recent Files"
					/>
					<MissingFilesSection items={missingFiles} />
				</main>
			</div>

			<Sheet
				onOpenChange={(open) => {
					if (!open) setSelectedFileId(null);
				}}
				open={Boolean(selectedFile)}
			>
				<SheetContent
					className="w-[calc(100%-(--spacing(8)))] max-w-[440px] gap-0 overflow-y-auto p-7"
					side="right"
				>
					{selectedFile ? <FileDetails file={selectedFile} /> : null}
				</SheetContent>
			</Sheet>
		</div>
	);
}

function FilterSelect({
	label,
	onChange,
	options,
	value,
}: {
	label: string;
	onChange: (value: string) => void;
	options: string[];
	value: string;
}) {
	const items = options.map((option) => ({ label: option, value: option }));

	return (
		<Field className="lg:w-36">
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

function FileSection({
	emptyText = "No files match the current filters.",
	files: sectionFiles,
	isFilePinned,
	onSelectFile,
	onTogglePinned,
	selectedFileId,
	title,
}: {
	emptyText?: string;
	files: RepositoryFile[];
	isFilePinned: (id: string) => boolean;
	onSelectFile: (id: string) => void;
	onTogglePinned: (id: string) => void;
	selectedFileId?: string;
	title: string;
}) {
	return (
		<section className="space-y-2">
			<div className="px-2">
				<h2 className="text-sm font-semibold">{title}</h2>
			</div>
			<div className="space-y-1">
				{sectionFiles.map((file) => (
					<FileRow
						file={file}
						isPinned={isFilePinned(file.id)}
						isSelected={selectedFileId === file.id}
						key={file.id}
						onSelect={() => onSelectFile(file.id)}
						onTogglePinned={() => onTogglePinned(file.id)}
					/>
				))}
				{sectionFiles.length === 0 ? (
					<p className="px-2 py-4 text-sm text-muted-foreground">{emptyText}</p>
				) : null}
			</div>
		</section>
	);
}

function FileRow({
	file,
	isPinned,
	isSelected,
	onSelect,
	onTogglePinned,
}: {
	file: RepositoryFile;
	isPinned: boolean;
	isSelected: boolean;
	onSelect: () => void;
	onTogglePinned: () => void;
}) {
	const Icon = iconMap[file.format];

	return (
		<div
			className={cn(
				"group grid w-full gap-3 rounded-md px-2 py-4 text-left transition-colors hover:bg-muted/35 lg:grid-cols-[minmax(260px,1fr)_minmax(560px,auto)_44px] lg:items-center lg:gap-5",
				isSelected && "bg-muted/45"
			)}
		>
			<button
				aria-current={isSelected ? "true" : undefined}
				className="flex min-w-0 items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
				onClick={onSelect}
				type="button"
			>
				<span className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
					<Icon className="size-4" />
				</span>
				<span className="min-w-0">
					<span className="block truncate text-sm font-medium">{file.name}</span>
					<span className="mt-0.5 block text-xs text-muted-foreground">
						{file.size} · {file.format}
					</span>
				</span>
			</button>
			<FileMetadata file={file} />
			<div className="flex items-center justify-start lg:justify-end">
				<FileActions fileName={file.name} isPinned={isPinned} onTogglePinned={onTogglePinned} />
			</div>
		</div>
	);
}

function FileMetadata({ file }: { file: RepositoryFile }) {
	return (
		<div className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground sm:grid-cols-[90px_minmax(130px,1fr)_90px_80px_90px] lg:w-[560px] lg:grid-cols-[90px_160px_90px_80px_90px]">
			<span className="truncate">{file.type}</span>
			<span className={cn("truncate font-medium", statusClassMap[file.status])}>
				{file.status}
			</span>
			<span className="truncate">{file.shared}</span>
			<span className="truncate tabular-nums">{file.updated}</span>
			<span className="truncate">{file.owner}</span>
		</div>
	);
}

function FileActions({
	fileName,
	isPinned,
	onTogglePinned,
}: {
	fileName: string;
	isPinned: boolean;
	onTogglePinned: () => void;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					buttonVariants({ variant: "ghost", size: "icon" }),
					"size-8 text-muted-foreground opacity-100 hover:text-foreground"
				)}
			>
				<span className="sr-only">Open actions for {fileName}</span>
				<MoreVerticalIcon className="size-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onTogglePinned}>
					{isPinned ? <PinOffIcon className="size-4" /> : <PinIcon className="size-4" />}
					{isPinned ? "Unpin file" : "Pin file"}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Preview</DropdownMenuItem>
				<DropdownMenuItem>Download</DropdownMenuItem>
				<DropdownMenuItem>Share</DropdownMenuItem>
				<DropdownMenuItem>Archive</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MissingFilesSection({ items }: { items: MissingFile[] }) {
	return (
		<section className="space-y-2">
			<div className="px-2">
				<h2 className="text-sm font-semibold">Missing From Client</h2>
			</div>
			<div className="space-y-1">
				{items.map((item) => (
					<div
						className="rounded-md px-2 py-4 text-sm transition-colors hover:bg-muted/35"
						key={item.id}
					>
						<div className="font-medium">{item.name}</div>
						<div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
							<span>Needed for {item.neededFor}</span>
							<span aria-hidden="true">·</span>
							<span>Due {item.due}</span>
							<span aria-hidden="true">·</span>
							<span>{item.requestState}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function FileDetails({ file }: { file: RepositoryFile }) {
	return (
		<div className="flex min-h-full flex-col">
			<div className="space-y-7">
				<div className="border-b pb-6">
					<SheetTitle className="pr-8 text-lg leading-6">{file.name}</SheetTitle>
					<SheetDescription className="mt-2">
						{file.format} · {file.size}
					</SheetDescription>
					<div className="mt-4 space-y-1 text-sm text-muted-foreground">
						<p>Uploaded by {file.uploadedBy}</p>
						<p>Updated {file.updated}</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
					<DetailField label="Status" value={file.status} valueClassName={statusClassMap[file.status]} />
					<DetailField label="Shared with client" value={file.shared === "Shared" ? "Yes" : "No"} />
				</div>

				<div>
					<h3 className="text-sm font-semibold">Used in</h3>
					<div className="mt-2 space-y-1 text-sm text-muted-foreground">
						{file.usedIn.map((item) => (
							<p key={item}>
								{item}
							</p>
						))}
					</div>
				</div>

				<ActivityTimeline items={file.activity} />
			</div>

			<div className="mt-auto pt-8">
				<div className="grid grid-cols-2 gap-2">
					<Button className="col-span-2 justify-center" variant="outline" type="button">
						<FileImageIcon className="size-4" />
						Preview
					</Button>
					<Button variant="outline" type="button">
						<DownloadIcon className="size-4" />
						Download
					</Button>
					<Button variant="outline" type="button">
						<Share2Icon className="size-4" />
						Share
					</Button>
					<Button className="col-span-2 justify-center text-muted-foreground hover:text-foreground" variant="outline" type="button">
						<ArchiveIcon className="size-4" />
						Archive
					</Button>
				</div>
			</div>
		</div>
	);
}

function ActivityTimeline({ items }: { items: string[] }) {
	return (
		<div>
			<h3 className="text-sm font-semibold">Activity</h3>
			<div className="relative mt-4 space-y-4 before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-border/70">
				{items.map((item) => (
					<div className="relative flex gap-3 text-sm" key={item}>
						<span className="mt-1.5 size-2.5 shrink-0 rounded-full border border-border bg-popover ring-4 ring-popover" />
						<div className="min-w-0">
							<p className="text-foreground/90">{item}</p>
							<p className="mt-0.5 text-xs text-muted-foreground">File activity</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function DetailField({
	label,
	value,
	valueClassName,
}: {
	label: string;
	value: string;
	valueClassName?: string;
}) {
	return (
		<div>
			<div className="text-xs font-medium text-muted-foreground">{label}</div>
			<div className={cn("mt-1 font-medium", valueClassName)}>{value}</div>
		</div>
	);
}
