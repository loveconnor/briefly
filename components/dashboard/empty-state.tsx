import { InboxIcon, type LucideIcon } from "lucide-react";

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

export function DashboardEmptyState({
	className,
	description,
	icon: Icon = InboxIcon,
	title,
}: {
	className?: string;
	description?: string;
	icon?: LucideIcon;
	title: string;
}) {
	return (
		<Empty className={cn("min-h-24 border-0 bg-transparent p-0", className)}>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Icon className="size-4" />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				{description ? <EmptyDescription>{description}</EmptyDescription> : null}
			</EmptyHeader>
		</Empty>
	);
}
