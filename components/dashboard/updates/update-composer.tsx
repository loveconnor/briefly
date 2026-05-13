"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

export function UpdateComposer({ projects = [] }: { projects?: string[] }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [project, setProject] = useState(projects[0] ?? "");
	const [recipients, setRecipients] = useState("");
	const [body, setBody] = useState("");
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);
	const projectItems = projects.map((projectName) => ({
		label: projectName,
		value: projectName,
	}));

	async function submitUpdate(draft: boolean) {
		setError("");
		setPending(true);

		try {
			const response = await fetch("/api/updates", {
				body: JSON.stringify({
					body,
					draft,
					project,
					recipients,
					title,
					type: "STATUS",
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to save update.");
			}

			setTitle("");
			setProject(projects[0] ?? "");
			setRecipients("");
			setBody("");
			setOpen(false);
			router.refresh();
		} catch (submitError) {
			setError(submitError instanceof Error ? submitError.message : "Unable to save update.");
		} finally {
			setPending(false);
		}
	}

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<Button onClick={() => setOpen(true)}>
				<PlusIcon />
				New update
			</Button>
			<SheetContent className="w-[calc(100%-(--spacing(8)))] max-w-[520px] gap-0 overflow-y-auto p-0" side="right">
				<SheetHeader className="border-b border-border/70 p-6">
					<SheetTitle>New update</SheetTitle>
					<SheetDescription>
						Send structured client communication tied to a project, deliverable, or approval.
					</SheetDescription>
				</SheetHeader>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						void submitUpdate(false);
					}}
				>
					<div className="space-y-5 p-6">
						<ComposerField label="Update title">
							<Input
								onChange={(event) => setTitle(event.target.value)}
								required
								value={title}
							/>
						</ComposerField>
						<ComposerField label="Project">
							<Field>
								<Select
									items={projectItems}
									onValueChange={(value) => value != null && setProject(value)}
									value={project}
								>
									<SelectTrigger aria-label="Project">
										<SelectValue />
									</SelectTrigger>
									<SelectContent alignItemWithTrigger={false}>
										<SelectGroup>
											{projectItems.map((item) => (
												<SelectItem key={item.value} value={item.value}>
													{item.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</Field>
						</ComposerField>
						<ComposerField label="Recipients">
							<Input
								onChange={(event) => setRecipients(event.target.value)}
								placeholder="client@example.com, teammate@example.com"
								value={recipients}
							/>
						</ComposerField>
						<ComposerField label="Message">
							<Textarea
								className="[&_[data-slot=textarea]]:min-h-40"
								onChange={(event) => setBody(event.target.value)}
								value={body}
							/>
						</ComposerField>
						<ComposerField label="Attachments">
							<div className="flex flex-wrap gap-2">
								<Button size="sm" type="button" variant="outline">
									<PlusIcon />
									Add file
								</Button>
							</div>
						</ComposerField>
						<ComposerField label="Visibility options">
							<div className="space-y-2 text-sm text-muted-foreground">
								<label className="flex items-center gap-2">
									<input className="accent-foreground" defaultChecked type="checkbox" />
									Track views and opens
								</label>
								<label className="flex items-center gap-2">
									<input className="accent-foreground" defaultChecked type="checkbox" />
									Request acknowledgement
								</label>
								<label className="flex items-center gap-2">
									<input className="accent-foreground" type="checkbox" />
									Send reminder if not viewed after 3 days
								</label>
							</div>
						</ComposerField>
						{error ? <p className="text-sm text-destructive-foreground">{error}</p> : null}
					</div>
					<SheetFooter className="border-t border-border/70 p-6 sm:flex-row sm:justify-end">
						<Button
							disabled={pending || !title.trim()}
							onClick={() => void submitUpdate(true)}
							type="button"
							variant="outline"
						>
							Save draft
						</Button>
						<Button disabled={pending || !title.trim()} type="submit">
							<SendIcon />
							{pending ? "Sending..." : "Send update"}
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}

function ComposerField({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="space-y-2">
			<Label className="font-medium">{label}</Label>
			{children}
		</div>
	);
}
