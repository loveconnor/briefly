import { AlertTriangle, CalendarClock, FolderOpenDot, MessageCircleWarning } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { badgeToneClassName, badgeToneVariant, type BadgeTone } from "@/components/dashboard/badge-tone";
import type { OverviewAttentionItem } from "@/lib/app-data";

const iconMap = {
  alert: AlertTriangle,
  calendar: CalendarClock,
  folder: FolderOpenDot,
  message: MessageCircleWarning,
};

export function NeedsAttention({ items }: { items: OverviewAttentionItem[] }) {
  if (items.length === 0) {
    return (
      <section className="h-full">
        <div className="mb-4">
          <h2 className="font-display text-lg font-medium tracking-tight">Needs Attention</h2>
          <p className="text-muted-foreground mt-1 text-sm">Items most likely to slow delivery.</p>
        </div>
        <p className="text-sm text-muted-foreground">No blockers or pending decisions recorded.</p>
      </section>
    );
  }

  const [primary, ...secondary] = items;
  const PrimaryIcon = iconMap[primary.icon];

  return (
    <section className="h-full">
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Needs Attention</h2>
        <p className="text-muted-foreground mt-1 text-sm">Items most likely to slow delivery.</p>
      </div>
      <div className="space-y-5">
        <div className="rounded-lg bg-destructive/5 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="bg-background flex size-8 shrink-0 items-center justify-center rounded-md">
                <PrimaryIcon className="text-destructive-foreground size-4" />
              </div>
              <p className="font-medium leading-5">{primary.title}</p>
            </div>
            <Badge
              className={badgeToneClassName(primary.variant as BadgeTone)}
              variant={badgeToneVariant(primary.variant as BadgeTone)}
            >
              {primary.label}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{primary.detail}</p>
        </div>
        <div className="space-y-5">
          {secondary.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="text-muted-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium leading-5">{item.title}</p>
                    <span className="text-muted-foreground shrink-0 text-sm">{item.label}</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
