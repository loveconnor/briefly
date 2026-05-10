import { ChevronRightIcon } from "lucide-react";
import type { Role } from "@/components/dashboard/team/team-types";

export function RolesSection({
	onRoleOpen,
	roles,
}: {
	onRoleOpen: (role: Role) => void;
	roles: Role[];
}) {
	return (
		<div>
			<div className="mb-3">
				<h2 className="text-lg font-semibold">Roles & Access</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Simple role defaults for how people collaborate.
				</p>
			</div>
			<div className="space-y-1">
				{roles.map((role) => (
					<button
						className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-3 text-left transition-colors hover:bg-accent/35"
						key={role.name}
						onClick={() => onRoleOpen(role)}
						type="button"
					>
						<div>
							<div className="font-semibold">{role.name}</div>
							<div className="mt-1 text-sm text-muted-foreground">{role.description}</div>
						</div>
						<ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
					</button>
				))}
			</div>
		</div>
	);
}
