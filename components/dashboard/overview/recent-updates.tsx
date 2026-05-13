import { CheckCircle2, Link2, Send, Share2 } from "lucide-react";

import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import type { OverviewUpdate } from "@/lib/app-data";

const iconMap = {
  approval: CheckCircle2,
  link: Link2,
  send: Send,
  share: Share2,
};

export function RecentUpdates({ updates }: { updates: OverviewUpdate[] }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Recent Updates</h2>
        <p className="text-muted-foreground mt-1 text-sm">Communication sent and project visibility maintained.</p>
      </div>
      <div className="space-y-5">
        {updates.map((update) => {
          const Icon = iconMap[update.icon];

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
        {updates.length === 0 ? <DashboardEmptyState title="No client updates sent yet" /> : null}
      </div>
    </section>
  );
}
