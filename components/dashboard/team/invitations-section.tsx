import { Button } from "@/components/ui/button";
import type { Invitation } from "@/components/dashboard/team/team-types";

export function InvitationsSection({ invitations }: { invitations: Invitation[] }) {
	return (
		<div>
			<div className="mb-3">
				<h2 className="text-lg font-semibold">Pending Invitations</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					People who have been invited but have not joined yet.
				</p>
			</div>
			<div className="space-y-2">
				{invitations.map((invite) => (
					<div className="rounded-lg px-2 py-3 transition-colors hover:bg-accent/35" key={invite.email}>
						<div className="min-w-0">
							<div className="truncate font-semibold">{invite.email}</div>
							<div className="mt-1 text-sm text-muted-foreground">
								{invite.sent} · {invite.state}
							</div>
						</div>
						<div className="mt-3 flex gap-1">
							<Button size="sm" variant="ghost">Resend</Button>
							<Button size="sm" variant="ghost">Cancel</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
