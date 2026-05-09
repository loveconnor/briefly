import type { ReactNode } from "react";

export function SummarySection({
	action,
	children,
	eyebrow,
	title,
}: {
	action?: ReactNode;
	children: ReactNode;
	eyebrow: string;
	title: string;
}) {
	return (
		<section>
			<div className="mb-5 flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
					<h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
				</div>
				{action}
			</div>
			{children}
		</section>
	);
}
