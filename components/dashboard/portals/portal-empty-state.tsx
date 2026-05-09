import { BookOpenIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function PortalEmptyState({
	action,
	description,
	icon: Icon,
	secondaryAction,
	title,
}: {
	action: string;
	description: string;
	icon: LucideIcon;
	secondaryAction: string;
	title: string;
}) {
	return (
		<div className="flex min-h-[460px] items-center justify-center">
			<Empty className="border-0 bg-transparent p-0">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon />
					</EmptyMedia>
					<EmptyTitle>{title}</EmptyTitle>
					<EmptyDescription>{description}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex flex-wrap justify-center gap-2">
						<Button size="sm" type="button">
							{action}
						</Button>
						<Button size="sm" type="button" variant="outline">
							<BookOpenIcon className="opacity-72" />
							{secondaryAction}
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
