"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { PortalHeader } from "@/components/client-portal/portal-header";
import {
	ActivityTab,
	FilesTab,
	MessagesTab,
	OverviewTab,
	ReviewTab,
	TasksTab,
} from "@/components/client-portal/portal-tab-panels";
import { SidePanel } from "@/components/client-portal/side-panel";
import type { PortalData } from "@/components/client-portal/client-portal-data";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type PortalAction = "message" | "request" | "request-changes" | "upload-file";

const actionCopy: Record<PortalAction, { description: string; title: string }> = {
	message: {
		description: "Send a note to the workspace team.",
		title: "Message team",
	},
	request: {
		description: "Create a client request in the project inbox.",
		title: "Request something",
	},
	"request-changes": {
		description: "Send revision notes and move the review back to changes requested.",
		title: "Request changes",
	},
	"upload-file": {
		description: "Record a shared file in the project repository.",
		title: "Upload file",
	},
};

export function ClientPortal({ data }: { data: PortalData }) {
	const router = useRouter();
	const [activeAction, setActiveAction] = useState<PortalAction | null>(null);
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState("");
	const [pending, setPending] = useState("");
	const copy = activeAction ? actionCopy[activeAction] : null;
	const canSubmit = useMemo(() => {
		if (!activeAction) return false;
		if (activeAction === "upload-file") return Boolean(file);
		if (activeAction === "request") return Boolean(title.trim());
		return Boolean(message.trim());
	}, [activeAction, file, message, title]);

	async function submitPortalAction(action: string, body: Record<string, unknown> = {}) {
		setError("");
		setPending(action);

		try {
			const response = await fetch(`/api/portal/${encodeURIComponent(data.id)}`, {
				body: JSON.stringify({
					action,
					name,
					...body,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to update portal.");
			}

			setActiveAction(null);
			setTitle("");
			setMessage("");
			setFile(null);
			router.refresh();
		} catch (submitError) {
			setError(submitError instanceof Error ? submitError.message : "Unable to update portal.");
		} finally {
			setPending("");
		}
	}

	function openAction(action: PortalAction) {
		setError("");
		setTitle("");
		setMessage("");
		setFile(null);
		setActiveAction(action);
	}

	function submitDialog() {
		if (!activeAction) return;

		if (activeAction === "upload-file") {
			if (!file) return;
			void submitPortalAction(activeAction, {
				fileName: file.name,
				fileSize: formatFileSize(file.size),
				format: file.name,
			});
			return;
		}

		void submitPortalAction(activeAction, {
			message,
			title: title.trim() || undefined,
		});
	}

	return (
		<div className="min-h-svh bg-background text-foreground">
			<PortalHeader data={data} onOpenAction={openAction} />

			<main className="mx-auto w-full max-w-[1240px] px-5 pb-28 sm:px-8 sm:pb-16">
				<Tabs className="gap-7" defaultValue="overview" id="portal-tabs">
					<div className="sticky top-0 z-10 -mx-5 overflow-x-auto bg-background/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
						<TabsList
							className="*:data-[slot=tabs-trigger]:hover:bg-transparent"
							variant="line"
						>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="review">Review</TabsTrigger>
							<TabsTrigger value="tasks">Tasks</TabsTrigger>
							<TabsTrigger value="messages">Messages</TabsTrigger>
							<TabsTrigger value="files">Files</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
						</TabsList>
					</div>

					<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
						<div className="min-w-0">
							<TabsContent value="overview">
								<OverviewTab
									data={data}
									onCompleteTask={(taskId) => submitPortalAction("complete-task", { taskId })}
									onDownloadFile={(fileName) => submitPortalAction("download-file", { fileName })}
									onOpenAction={openAction}
									onApprove={() => submitPortalAction("approve")}
								/>
							</TabsContent>
							<TabsContent value="review">
								<ReviewTab
									data={data}
									onApprove={() => submitPortalAction("approve")}
									onOpenAction={openAction}
								/>
							</TabsContent>
							<TabsContent value="tasks">
								<TasksTab
									data={data}
									onCompleteTask={(taskId) => submitPortalAction("complete-task", { taskId })}
									onOpenAction={openAction}
								/>
							</TabsContent>
							<TabsContent value="messages">
								<MessagesTab data={data} />
							</TabsContent>
							<TabsContent value="files">
								<FilesTab
									data={data}
									onDownloadFile={(fileName) => submitPortalAction("download-file", { fileName })}
								/>
							</TabsContent>
							<TabsContent value="activity">
								<ActivityTab data={data} />
							</TabsContent>
						</div>

						<aside className="sticky top-16 hidden pt-1 lg:block">
							<SidePanel data={data} />
						</aside>
					</div>
				</Tabs>
			</main>

			<div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/94 p-4 backdrop-blur sm:hidden">
				<div className="grid grid-cols-2 gap-2">
					<Button
						className="min-h-12 text-base"
						disabled={pending === "approve"}
						onClick={() => void submitPortalAction("approve")}
					>
						{pending === "approve" ? "Approving..." : "Approve"}
					</Button>
					<Button
						className="min-h-12 text-base"
						onClick={() => openAction("request-changes")}
						variant="outline"
					>
						Request changes
					</Button>
				</div>
			</div>

			<Dialog onOpenChange={(open) => !open && setActiveAction(null)} open={Boolean(activeAction)}>
				<DialogContent className="sm:max-w-lg">
					{copy ? (
						<>
							<DialogHeader>
								<DialogTitle>{copy.title}</DialogTitle>
								<DialogDescription>{copy.description}</DialogDescription>
							</DialogHeader>
							<div className="space-y-4">
								<div className="space-y-2">
									<Label>Your name</Label>
									<Input
										onChange={(event) => setName(event.target.value)}
										placeholder="Optional"
										value={name}
									/>
								</div>
								{activeAction === "request" || activeAction === "message" ? (
									<div className="space-y-2">
										<Label>{activeAction === "request" ? "Request title" : "Subject"}</Label>
										<Input
											onChange={(event) => setTitle(event.target.value)}
											placeholder={activeAction === "request" ? "What do you need?" : "Optional"}
											required={activeAction === "request"}
											value={title}
										/>
									</div>
								) : null}
								{activeAction === "upload-file" ? (
									<div className="space-y-2">
										<Label>File</Label>
										<Input
											onChange={(event) => setFile(event.target.files?.[0] ?? null)}
											type="file"
										/>
									</div>
								) : (
									<div className="space-y-2">
										<Label>{activeAction === "request-changes" ? "Revision notes" : "Message"}</Label>
										<Textarea
											className="min-h-32"
											onChange={(event) => setMessage(event.target.value)}
											required
											value={message}
										/>
									</div>
								)}
								{error ? <p className="text-sm text-destructive-foreground">{error}</p> : null}
							</div>
							<DialogFooter>
								<Button onClick={() => setActiveAction(null)} type="button" variant="ghost">
									Cancel
								</Button>
								<Button disabled={!canSubmit || Boolean(pending)} onClick={submitDialog} type="button">
									{pending ? "Saving..." : "Save"}
								</Button>
							</DialogFooter>
						</>
					) : null}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function formatFileSize(bytes: number) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
