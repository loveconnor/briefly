import { BriefcaseBusiness, ClipboardCheck, MessageSquareWarning, SendHorizontal } from "lucide-react";

const summary = [
  {
    icon: BriefcaseBusiness,
    value: "8",
    label: "active projects"
  },
  {
    icon: ClipboardCheck,
    value: "5",
    label: "approvals pending"
  },
  {
    icon: MessageSquareWarning,
    value: "3",
    label: "client blockers"
  },
  {
    icon: SendHorizontal,
    value: "12",
    label: "updates sent this week"
  }
];

export function SummaryCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {summary.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="flex items-center gap-3">
            <div className="text-muted-foreground flex size-8 shrink-0 items-center justify-center">
              <Icon className="size-4" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <div className="font-display text-2xl leading-none tracking-tight lg:text-3xl">{item.value}</div>
              <div className="text-muted-foreground mt-1 text-sm leading-5">{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
