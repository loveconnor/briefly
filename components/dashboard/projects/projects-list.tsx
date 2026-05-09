import Link from "next/link";
import { ArrowRightIcon, CheckIcon, CircleIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "./project-data";

const statusVariant: Record<Project["status"], "success" | "warning" | "error" | "info"> = {
	Active: "success",
	Blocked: "error",
	Complete: "info",
	Waiting: "warning",
};

export function ProjectsList({ projects }: { projects: Project[] }) {
	return (
		<div className="mx-auto w-full max-w-[1280px] space-y-7">
			<header className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Projects</h1>
					<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
						Active delivery work, blockers, approvals, and next project movement.
					</p>
				</div>
				<Button>
					<PlusIcon className="size-4" />
					New project
				</Button>
			</header>

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
						<Badge className="w-fit" variant={statusVariant[project.status]}>
							{project.status}
						</Badge>
						<ArrowRightIcon className="hidden size-4 text-muted-foreground lg:block" />
					</Link>
				))}
			</section>
		</div>
	);
}
