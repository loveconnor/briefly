import { AlertTriangle, CalendarClock, FolderOpenDot, MessageCircleWarning } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Needs Attention</CardTitle>
        <CardDescription>Items most likely to slow delivery.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-lg border p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                      <Icon className="text-muted-foreground size-4" />
                    </div>
                    <p className="font-medium leading-5">{item.title}</p>
                  </div>
                  <Badge variant={item.variant}>{item.label}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
