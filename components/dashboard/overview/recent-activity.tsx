import { CheckCircle2, FileUp, GitPullRequestArrow, MessageSquareText, Send } from "lucide-react";

import { cn } from "@/lib/utils";

const activity = [
  {
    icon: CheckCircle2,
    title: "Acme approved homepage design",
    detail: "Homepage moved from review to build.",
    time: "12 min ago",
    tone: "success"
  },
  {
    icon: FileUp,
    title: "Nova uploaded branding assets",
    detail: "Logo files and type guidelines are ready.",
    time: "42 min ago",
    tone: "info"
  },
  {
    icon: GitPullRequestArrow,
    title: "Landing page moved to review",
    detail: "Client preview is live for Brightside.",
    time: "2 hr ago",
    tone: "warning"
  },
  {
    icon: Send,
    title: "Weekly update delivered",
    detail: "Progress summary sent to five active clients.",
    time: "Yesterday",
    tone: "default"
  },
  {
    icon: MessageSquareText,
    title: "Client requested revisions",
    detail: "Northstar left comments on the pricing section.",
    time: "Yesterday",
    tone: "error"
  }
];

const toneClassMap = {
  default: "bg-muted text-muted-foreground",
  error: "bg-destructive/8 text-destructive-foreground",
  info: "bg-info/8 text-info-foreground",
  success: "bg-success/8 text-success-foreground",
  warning: "bg-warning/8 text-warning-foreground"
};

export function RecentActivity() {
  return (
    <section className="h-full">
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Recent Activity</h2>
        <p className="text-muted-foreground mt-1 text-sm">Recent approvals, uploads, reviews, and client updates.</p>
      </div>
      <div className="space-y-5">
        {activity.map((item) => {
          const Icon = item.icon;

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
      </div>
    </section>
  );
}
