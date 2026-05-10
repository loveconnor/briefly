import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function UseTemplateDialog() {
	const fields = [
		{ label: "Project name", placeholder: "Acme website redesign" },
		{ label: "Client", placeholder: "Acme Co." },
		{ label: "Start date", placeholder: "May 20, 2026" },
		{ label: "Team", placeholder: "Connor, Maya, Dev lead" },
	];

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button>
						<SparklesIcon className="size-4" />
						Use template
					</Button>
				}
			/>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate project</DialogTitle>
					<DialogDescription>
						Create the project, portal, approvals, automations, and update
						structure together.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 sm:grid-cols-2">
					{fields.map((field) => (
						<label className="space-y-1.5" key={field.label}>
							<span className="text-xs font-medium text-muted-foreground">
								{field.label}
							</span>
							<Input placeholder={field.placeholder} />
						</label>
					))}
					<label className="flex items-center justify-between gap-4 rounded-md bg-muted/35 px-3 py-2.5 sm:col-span-2">
						<span>
							<span className="block text-sm font-medium">Portal enabled</span>
							<span className="block text-sm text-muted-foreground">
								Client tasks, approvals, uploads, and deliverables are generated.
							</span>
						</span>
						<input
							className="size-4 accent-foreground"
							defaultChecked
							type="checkbox"
						/>
					</label>
				</div>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button>
						<SparklesIcon className="size-4" />
						Generate project
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
