"use client";

import { useState, type ReactNode } from "react";
import { PaperclipIcon, PlusIcon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
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
import { updateProjects } from "@/components/dashboard/updates/updates-data";

export function UpdateComposer() {
	const [open, setOpen] = useState(false);

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
				<div className="space-y-5 p-6">
					<ComposerField label="Update title">
						<Input defaultValue="Homepage review ready" />
					</ComposerField>
					<ComposerField label="Project">
						<Select defaultValue="Acme Website Redesign">
							<SelectTrigger aria-label="Project">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{updateProjects.slice(1).map((projectName) => (
									<SelectItem key={projectName} value={projectName}>
										{projectName}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</ComposerField>
					<ComposerField label="Recipients">
						<Input defaultValue="Dana Ellis, Marcus Chen" />
					</ComposerField>
					<ComposerField label="Message">
						<Textarea
							className="[&_[data-slot=textarea]]:min-h-40"
							defaultValue={
								"The homepage and services layouts are ready for review.\n\nPlease focus on:\n- hero messaging\n- mobile navigation\n- CTA placement"
							}
						/>
					</ComposerField>
					<ComposerField label="Attachments">
						<div className="flex flex-wrap gap-2">
							{["HomepagePreview.png", "MobileReview.pdf"].map((attachment) => (
								<span
									key={attachment}
									className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-2.5 py-1.5 text-sm text-muted-foreground"
								>
									<PaperclipIcon className="size-4" />
									{attachment}
								</span>
							))}
							<Button size="sm" variant="outline">
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
				</div>
				<SheetFooter className="border-t border-border/70 p-6 sm:flex-row sm:justify-end">
					<Button variant="outline">Save draft</Button>
					<Button>
						<SendIcon />
						Send update
					</Button>
				</SheetFooter>
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
