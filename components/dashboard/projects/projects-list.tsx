"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckIcon, CircleIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { badgeToneClassName, badgeToneVariant, type BadgeTone } from "@/components/dashboard/badge-tone";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ClientRecord } from "@/components/dashboard/clients/client-data";
import type { Project } from "./project-data";

const statusVariant: Record<Project["status"], BadgeTone> = {
	Active: "success",
	Blocked: "error",
	Complete: "info",
	Waiting: "warning",
};

const templateItems = [
	{ label: "Website design", value: "web-design" },
	{ label: "Website development", value: "web-dev" },
	{ label: "SEO", value: "seo" },
	{ label: "Branding", value: "branding" },
	{ label: "Retainer", value: "retainer" },
	{ label: "Custom", value: "custom" },
];

export function ProjectsList({
	clients,
	projects,
}: {
	clients: ClientRecord[];
	projects: Project[];
}) {
	const router = useRouter();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [name, setName] = useState("");
	const [clientSlug, setClientSlug] = useState(clients[0]?.slug ?? "none");
	const [template, setTemplate] = useState("custom");
	const [timeline, setTimeline] = useState("");
	const [dueLabel, setDueLabel] = useState("");
	const [budget, setBudget] = useState("");
	const [summary, setSummary] = useState("");
	const [error, setError] = useState("");
	const [pending, setPending] = useState(false);
	const clientItems = [
		{ label: "No client", value: "none" },
		...clients.map((client) => ({ label: client.name, value: client.slug })),
	];

	async function createProject(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setPending(true);

		try {
			const response = await fetch("/api/projects", {
				body: JSON.stringify({
					budget,
					clientSlug: clientSlug === "none" ? null : clientSlug,
					dueLabel,
					name,
					summary,
					template,
					timeline,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const payload = await response.json();

			if (!response.ok) {
				throw new Error(payload.error ?? "Unable to create project.");
			}

			setDialogOpen(false);
			router.push(`/dashboard/projects/${payload.project.slug}`);
			router.refresh();
		} catch (createError) {
			setError(createError instanceof Error ? createError.message : "Unable to create project.");
		} finally {
			setPending(false);
		}
	}

	return (
		<div className="mx-auto w-full max-w-[1280px] space-y-7">
			<header className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Projects</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Active delivery work, blockers, approvals, and next project movement.
					</p>
				</div>
				<Button onClick={() => setDialogOpen(true)}>
					<PlusIcon className="size-4" />
					New project
				</Button>
			</header>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-lg">
					<form onSubmit={createProject}>
						<DialogHeader>
							<DialogTitle>New project</DialogTitle>
							<DialogDescription>
								Create a project with starter tasks, deliverables, and a client portal.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-2">
							<label className="grid gap-2 text-sm">
								<span className="font-medium">Project name</span>
								<Input
									onChange={(event) => setName(event.target.value)}
									required
									value={name}
								/>
							</label>
							<div className="grid gap-2 text-sm">
								<span className="font-medium">Client</span>
								<Field>
									<Select
										items={clientItems}
										onValueChange={(value) => value != null && setClientSlug(value)}
										value={clientSlug}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent alignItemWithTrigger={false}>
											<SelectGroup>
												{clientItems.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
							</div>
							<div className="grid gap-2 text-sm">
								<span className="font-medium">Template</span>
								<Field>
									<Select
										items={templateItems}
										onValueChange={(value) => value != null && setTemplate(value)}
										value={template}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent alignItemWithTrigger={false}>
											<SelectGroup>
												{templateItems.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
							</div>
							<div className="grid gap-3 sm:grid-cols-3">
								<label className="grid gap-2 text-sm">
									<span className="font-medium">Timeline</span>
									<Input
										onChange={(event) => setTimeline(event.target.value)}
										placeholder="4 weeks"
										value={timeline}
									/>
								</label>
								<label className="grid gap-2 text-sm">
									<span className="font-medium">Due</span>
									<Input
										onChange={(event) => setDueLabel(event.target.value)}
										placeholder="Jun 15"
										value={dueLabel}
									/>
								</label>
								<label className="grid gap-2 text-sm">
									<span className="font-medium">Budget</span>
									<Input
										onChange={(event) => setBudget(event.target.value)}
										placeholder="$8,000"
										value={budget}
									/>
								</label>
							</div>
							<label className="grid gap-2 text-sm">
								<span className="font-medium">Summary</span>
								<Textarea
									onChange={(event) => setSummary(event.target.value)}
									value={summary}
								/>
							</label>
							{error ? <p className="text-sm text-destructive-foreground">{error}</p> : null}
						</div>
						<DialogFooter>
							<Button
								onClick={() => setDialogOpen(false)}
								type="button"
								variant="outline"
							>
								Cancel
							</Button>
							<Button disabled={pending || !name.trim()} type="submit">
								{pending ? "Creating..." : "Create project"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<section className="space-y-1">
				{projects.map((project) => (
					<Link
						className="grid gap-3 rounded-md px-2 py-5 transition-colors hover:bg-muted/35 lg:grid-cols-[minmax(260px,1fr)_220px_180px_130px_36px] lg:items-center"
						href={`/dashboard/projects/${project.slug}`}
						key={project.slug}
					>
						<div className="min-w-0">
							<div className="truncate font-semibold">{project.name}</div>
							<div className="mt-1 text-sm text-muted-foreground">{project.summary}</div>
						</div>
						<div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
							{project.phases.map((phase) => (
								<span
									className={cn(
										"flex items-center gap-1",
										phase.state === "current" && "font-medium text-foreground"
									)}
									key={phase.name}
								>
									{phase.state === "complete" ? (
										<CheckIcon className="size-3 text-success-foreground" />
									) : phase.state === "current" ? (
										<ArrowRightIcon className="size-3 text-foreground" />
									) : (
										<CircleIcon className="size-2" />
									)}
									<span className="sr-only">{phase.name}</span>
								</span>
							))}
							<span className="truncate">{project.phase}</span>
						</div>
						<div className="text-sm text-muted-foreground">
							{project.blockers.length ? `${project.blockers.length} blocker${project.blockers.length > 1 ? "s" : ""}` : "No blockers"}
						</div>
						<Badge
							className={badgeToneClassName(statusVariant[project.status], "w-fit")}
							variant={badgeToneVariant(statusVariant[project.status])}
						>
							{project.status}
						</Badge>
						<ArrowRightIcon className="hidden size-4 text-muted-foreground lg:block" />
					</Link>
				))}
			</section>
		</div>
	);
}
