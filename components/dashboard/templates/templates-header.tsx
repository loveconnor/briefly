import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TemplatesHeader() {
	return (
		<header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Templates</h1>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Reusable project systems for client work.
				</p>
			</div>
			<Button>
				<PlusIcon className="size-4" />
				Create template
			</Button>
		</header>
	);
}
