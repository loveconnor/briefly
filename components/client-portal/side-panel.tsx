import { StateItem } from "./state-item";

export function SidePanel() {
	return (
		<div className="space-y-7 text-sm">
			<section>
				<p className="font-medium">Project status</p>
				<div className="mt-3 space-y-3">
					<StateItem label="Current state" value="Awaiting approval" />
					<StateItem label="Next milestone" value="Development handoff" />
					<StateItem label="Expected launch" value="May 28" />
				</div>
			</section>

			<section>
				<p className="font-medium">Team</p>
				<div className="mt-3 space-y-2 text-muted-foreground">
					<p>Connor / Design lead</p>
					<p>Dana Ellis / Client owner</p>
					<p>Marcus Chen / Brand lead</p>
				</div>
			</section>
		</div>
	);
}
