import { CheckCircle2, Link2, Send, Share2 } from "lucide-react";

const updates = [
  {
    icon: Send,
    title: "Weekly update sent to Acme",
    detail: "Included progress, open approvals, and Friday targets."
  },
  {
    icon: Share2,
    title: "Portal shared with Nova",
    detail: "Client now has access to brand files and next steps."
  },
  {
    icon: CheckCircle2,
    title: "Homepage approved",
    detail: "Approval recorded and build phase opened."
  },
  {
    icon: Link2,
    title: "Preview link refreshed",
    detail: "Brightside received the latest landing page revision."
  }
];

export function RecentUpdates() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Recent Updates</h2>
        <p className="text-muted-foreground mt-1 text-sm">Communication sent and project visibility maintained.</p>
      </div>
      <div className="space-y-5">
        {updates.map((update) => {
          const Icon = update.icon;

          return (
            <div key={update.title} className="flex gap-4">
              <div className="text-muted-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="font-medium leading-5">{update.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{update.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
