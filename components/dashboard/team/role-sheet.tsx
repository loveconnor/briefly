"use client";

import { CheckIcon, ChevronRightIcon, XIcon } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Role } from "@/components/dashboard/team/team-types";

export function RoleSheet({
	role,
	onClose,
}: {
	role: Role | null;
	onClose: () => void;
}) {
	return (
		<Sheet onOpenChange={(open) => !open && onClose()} open={Boolean(role)}>
			<SheetContent className="max-w-md overflow-y-auto p-0">
				{role && (
					<>
						<SheetHeader className="border-b p-6">
							<SheetTitle className="text-xl">{role.name}</SheetTitle>
							<SheetDescription>{role.description}</SheetDescription>
						</SheetHeader>
						<div className="space-y-6 p-6">
							{role.permissions.map((group) => (
								<section key={group.group}>
									<h3 className="text-sm font-semibold">{group.group}</h3>
									<div className="mt-3 grid gap-2">
										{group.items.map((item) => (
											<div className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm" key={item.label}>
												<span>{item.label}</span>
												<span className={cn("flex size-5 items-center justify-center rounded-full", item.enabled ? "bg-success/10 text-success-foreground" : "bg-muted text-muted-foreground")}>
													{item.enabled ? <CheckIcon className="size-3.5" /> : <XIcon className="size-3.5" />}
												</span>
											</div>
										))}
									</div>
								</section>
							))}
							<button className="flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-accent" type="button">
								Advanced permissions
								<ChevronRightIcon className="size-4 text-muted-foreground" />
							</button>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
