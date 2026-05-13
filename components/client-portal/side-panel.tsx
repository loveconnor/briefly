import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import type { PortalData } from "./client-portal-data";
import { StateItem } from "./state-item";

export function SidePanel({ data }: { data: PortalData }) {
	return (
		<div className="space-y-7 text-sm">
			<section>
				<p className="font-medium">Project status</p>
				<div className="mt-3 space-y-3">
					<StateItem label="Current state" value={data.phase} />
					{data.stateItems.map((item) => (
						<StateItem key={item.label} label={item.label} value={item.value} />
					))}
				</div>
			</section>

			<section>
				<p className="font-medium">Team</p>
				<div className="mt-3 space-y-2 text-muted-foreground">
					{data.team.map((member) => (
						<p key={`${member.name}-${member.role}`}>
							{member.name} / {member.role}
						</p>
					))}
					{data.team.length === 0 ? (
						<DashboardEmptyState className="min-h-20" title="No team members recorded" />
					) : null}
				</div>
			</section>
		</div>
	);
}
