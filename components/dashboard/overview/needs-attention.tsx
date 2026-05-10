import { AlertTriangle, CalendarClock, FolderOpenDot, MessageCircleWarning } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const items = [
  {
    icon: AlertTriangle,
    title: "Waiting for Acme approval",
    detail: "Homepage design has been idle for 3 days.",
    label: "Overdue",
    variant: "error" as const
  },
  {
    icon: FolderOpenDot,
    title: "Missing assets from Nova",
    detail: "Product photography is blocking the services page.",
    label: "Blocked",
    variant: "warning" as const
  },
  {
    icon: CalendarClock,
    title: "Launch scheduled tomorrow",
    detail: "Final QA needs sign-off before 3 PM.",
    label: "Due soon",
    variant: "info" as const
  },
  {
    icon: MessageCircleWarning,
    title: "Brightside feedback pending",
    detail: "Copy review comments have not been resolved.",
    label: "Client",
    variant: "outline" as const
  }
];

export function NeedsAttention() {
  const [primary, ...secondary] = items;
  const PrimaryIcon = primary.icon;

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
            <Badge variant={primary.variant}>{primary.label}</Badge>
          </div>
          <p className="text-muted-foreground text-sm">{primary.detail}</p>
        </div>
        <div className="space-y-5">
          {secondary.map((item) => {
            const Icon = item.icon;

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
