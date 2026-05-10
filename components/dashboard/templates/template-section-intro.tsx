export function TemplateSectionIntro({
	description,
	title,
}: {
	description?: string;
	title: string;
}) {
	return (
		<div>
			<h2 className="text-sm font-semibold">{title}</h2>
			{description ? (
				<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
					{description}
				</p>
			) : null}
		</div>
	);
}
