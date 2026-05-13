import Link from "next/link";
import { MessageCircleIcon, PlusIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PortalData } from "./client-portal-data";
import { StateItem } from "./state-item";

export function PortalHeader({ data }: { data: PortalData }) {
	return (
		<>
			<header className="border-b bg-background/95 backdrop-blur">
				<div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
					<Link className="text-sm font-semibold tracking-tight" href="/dashboard/portals">
						Briefly
					</Link>
					<nav
						aria-label="Client portal"
						className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex"
					>
						<a className="transition-colors hover:text-foreground" href="#portal-tabs">
							Overview
						</a>
						<a className="transition-colors hover:text-foreground" href="#portal-tabs">
							Files
						</a>
						<a className="transition-colors hover:text-foreground" href="#portal-tabs">
							Activity
						</a>
					</nav>
				</div>
			</header>

			<section className="mx-auto w-full max-w-[1240px] px-5 py-8 sm:px-8 sm:py-10">
				<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
					<div className="min-w-0">
						<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
							{data.projectName}
						</h1>
						<p className="mt-3 text-base text-muted-foreground">
							{data.phase} Phase / Updated {data.updated}
						</p>
					</div>
					<div className="flex flex-col gap-2 sm:flex-row">
						<Button className="min-h-10" variant="outline">
							<MessageCircleIcon className="size-4" />
							Message team
						</Button>
						<Button className="min-h-10" variant="outline">
							<UploadIcon className="size-4" />
							Upload file
						</Button>
						<Button className="min-h-10" variant="outline">
							<PlusIcon className="size-4" />
							Request something
						</Button>
					</div>
				</div>

				<div className="mt-7 grid gap-3 bg-muted/60 px-4 py-3.5 text-sm sm:grid-cols-3">
					{data.stateItems.map((item) => (
						<StateItem key={item.label} label={item.label} value={item.value} />
					))}
				</div>
			</section>
		</>
	);
}
