import {
	CheckIcon,
	DownloadIcon,
	EyeIcon,
	MessageSquareTextIcon,
	UploadIcon,
} from "lucide-react";
import type { AnalyticsData } from "./analytics-data";

const iconMap = {
	approval: CheckIcon,
	comment: MessageSquareTextIcon,
	download: DownloadIcon,
	open: EyeIcon,
	upload: UploadIcon,
};

export function LiveActivityFeed({
	activityFeed,
}: {
	activityFeed: AnalyticsData["activityFeed"];
}) {
	return (
		<aside className="min-w-0">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Live Activity</h2>
					<p className="text-sm text-muted-foreground">Latest client signals.</p>
				</div>
				<span className="text-xs text-muted-foreground">Live</span>
			</div>
			<div className="divide-y">
				{activityFeed.map((activity) => {
					const Icon = iconMap[activity.icon];
					return (
						<div className="flex items-start gap-3 py-3" key={`${activity.person}-${activity.time}`}>
							<div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border text-muted-foreground">
								<Icon className="size-3.5" />
							</div>
							<div className="min-w-0 flex-1">
								<p className="truncate text-sm">
									<span className="font-medium">{activity.person}</span>{" "}
									<span className="text-muted-foreground">{activity.action}</span>
								</p>
							</div>
							<time className="shrink-0 text-xs text-muted-foreground">{activity.time}</time>
						</div>
					);
				})}
				{activityFeed.length === 0 ? (
					<p className="py-3 text-sm text-muted-foreground">No client signals recorded yet.</p>
				) : null}
			</div>
		</aside>
	);
}
