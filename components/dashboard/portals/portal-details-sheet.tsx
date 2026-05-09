import type { ReactNode } from "react";
import {
	ArrowUpRightIcon,
	CheckCircle2Icon,
	CopyIcon,
	EyeIcon,
	MessageSquareTextIcon,
	SendIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { portalToneStyles } from "./portal-tone";
import type { Portal } from "./portals-data";

export function PortalDetailsSheet({
	onOpenChange,
	portal,
}: {
	onOpenChange: (open: boolean) => void;
	portal: Portal | null;
}) {
	return (
		<Sheet onOpenChange={onOpenChange} open={Boolean(portal)}>
			<SheetContent
				className="w-[calc(100%-(--spacing(8)))] max-w-[440px] gap-0 overflow-y-auto p-7"
				side="right"
			>
				{portal ? <PortalDetails portal={portal} /> : null}
			</SheetContent>
		</Sheet>
	);
}

function PortalDetails({ portal }: { portal: Portal }) {
	const tone = portalToneStyles[portal.tone];

	return (
		<div className="flex min-h-full flex-col">
			<div className="space-y-7">
				<div>
					<SheetTitle className="pr-8 text-lg leading-6">
						{portal.activityTitle}
					</SheetTitle>
					<SheetDescription className="mt-2">
						{portal.project}
					</SheetDescription>
					<p className={cn("mt-2 text-sm font-medium", tone.text)}>
						{portal.status}
					</p>
				</div>

				<div className="space-y-3 border-t pt-6">
					<h3 className="text-sm font-semibold">Portal activity</h3>
					{portal.activity.map((item) => (
						<div className="flex gap-3 text-sm" key={item}>
							<span className={cn("size-1.5 rounded-full", tone.dot)} />
							<span className="text-muted-foreground">{item}</span>
						</div>
					))}
				</div>

				<div className="space-y-4 border-t pt-6 text-sm">
					<ActivityField
						icon={<MessageSquareTextIcon className="size-4" />}
						label="Latest action"
						value={portal.latestAction}
					/>
					<ActivityField
						icon={<CheckCircle2Icon className="size-4" />}
						label="Approval state"
						value={portal.approvalState}
					/>
					<ActivityField
						icon={<EyeIcon className="size-4" />}
						label="Visibility signal"
						value={portal.visibility}
					/>
				</div>
			</div>

			<div className="mt-auto pt-8">
				<div className="grid gap-2">
					<Button type="button">
						<ArrowUpRightIcon className="size-4" />
						Open portal
					</Button>
					<div className="grid grid-cols-2 gap-2">
						<Button type="button" variant="outline">
							<SendIcon className="size-4" />
							Share update
						</Button>
						<Button type="button" variant="outline">
							<CopyIcon className="size-4" />
							Copy link
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ActivityField({
	icon,
	label,
	value,
}: {
	icon: ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex gap-3">
			<span className="mt-0.5 text-muted-foreground">{icon}</span>
			<div>
				<p className="text-xs font-medium text-muted-foreground">{label}</p>
				<p className="mt-1 text-foreground/90">{value}</p>
			</div>
		</div>
	);
}
