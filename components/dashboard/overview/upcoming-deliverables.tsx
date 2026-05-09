import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const deliverables = [
  {
    title: "Homepage Design Review",
    client: "Acme Studio",
    due: "Tomorrow",
    status: "Review"
  },
  {
    title: "Website Launch",
    client: "Northstar Labs",
    due: "Friday",
    status: "QA"
  },
  {
    title: "SEO Audit Delivery",
    client: "Brightside",
    due: "Monday",
    status: "Draft"
  },
  {
    title: "Brand Asset Handoff",
    client: "Nova Collective",
    due: "May 15",
    status: "Packaging"
  }
];

export function UpcomingDeliverables() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deliverables</CardTitle>
        <CardDescription>What is due next across active clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {deliverables.map((deliverable) => (
            <div key={deliverable.title} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
                <CalendarDays className="text-muted-foreground size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-5">{deliverable.title}</p>
                <p className="text-muted-foreground text-sm">{deliverable.client}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="text-sm font-medium">{deliverable.due}</span>
                <Badge variant="outline">{deliverable.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
