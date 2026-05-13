import { BriefcaseBusiness, ClipboardCheck, MessageSquareWarning, SendHorizontal } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { OverviewData } from "@/lib/app-data";
import { cn } from "@/lib/utils";

const iconMap = {
  approvals: ClipboardCheck,
  blockers: MessageSquareWarning,
  projects: BriefcaseBusiness,
  updates: SendHorizontal,
};

export function SummaryCards({ summary }: { summary: OverviewData["summary"] }) {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {summary.map((item) => {
        const Icon = iconMap[item.icon];

        return (
          <Card key={item.label} className="p-6 py-4 shadow-2xs">
            <CardContent className="p-0">
              <dt className="flex items-center justify-between gap-3 text-sm font-medium lowercase text-muted-foreground">
                <span>{item.label}</span>
                <Icon className="size-4 shrink-0" strokeWidth={2.2} />
              </dt>
              <dd className="mt-2 flex items-baseline space-x-2.5">
                <span
                  className={cn(
                    "font-display tabular-nums text-3xl font-semibold leading-none text-foreground"
                  )}
                >
                  {item.value}
                </span>
              </dd>
            </CardContent>
          </Card>
        );
      })}
    </dl>
  );
}
