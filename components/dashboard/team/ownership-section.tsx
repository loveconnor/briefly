import { ArchiveIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OwnershipSection() {
	return (
		<section className="border-t pt-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-sm font-semibold text-muted-foreground">Workspace ownership</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						High-impact workspace changes stay separate from everyday collaboration.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="ghost">
						<ShieldCheckIcon />
						Transfer ownership
					</Button>
					<Button variant="ghost">
						<ArchiveIcon />
						Archive workspace
					</Button>
				</div>
			</div>
		</section>
	);
}
