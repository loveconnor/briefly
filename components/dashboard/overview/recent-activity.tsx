import { CheckCircle2, FileUp, GitPullRequestArrow, MessageSquareText, Send } from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { cn } from "@/lib/utils";
import type { OverviewActivity } from "@/lib/app-data";

const iconMap = {
  approval: CheckCircle2,
  comment: MessageSquareText,
  delivery: GitPullRequestArrow,
  phase: GitPullRequestArrow,
  send: Send,
  upload: FileUp,
};

const toneClassMap = {
  default: "bg-muted text-muted-foreground",
  error: "bg-destructive/8 text-destructive-foreground",
  info: "bg-info/8 text-info-foreground",
  success: "bg-success/8 text-success-foreground",
  warning: "bg-warning/8 text-warning-foreground"
};

export function RecentActivity({ activity }: { activity: OverviewActivity[] }) {
  return (
    <section className="h-full">
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Recent Activity</h2>
        <p className="text-muted-foreground mt-1 text-sm">Recent approvals, uploads, reviews, and client updates.</p>
      </div>
      <div className="space-y-5">
        {activity.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <div key={item.title} className="flex gap-4">
              <div
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md",
                  toneClassMap[item.tone as keyof typeof toneClassMap]
                )}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="font-medium leading-5">{item.title}</p>
                  <span className="text-muted-foreground text-sm leading-5">{item.time}</span>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{item.detail}</p>
              </div>
            </div>
          );
        })}
        {activity.length === 0 ? <DashboardEmptyState title="No activity recorded yet" /> : null}
      </div>
    </section>
  );
}
