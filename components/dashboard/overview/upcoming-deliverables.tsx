import { CalendarDays } from "lucide-react";

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
    <section>
      <div className="mb-4">
        <h2 className="font-display text-lg font-medium tracking-tight">Upcoming Deliverables</h2>
        <p className="text-muted-foreground mt-1 text-sm">What is due next across active clients.</p>
      </div>
      <div className="space-y-5">
        {deliverables.map((deliverable) => (
          <div key={deliverable.title} className="grid grid-cols-[88px_1fr] gap-4 sm:grid-cols-[104px_1fr_auto]">
            <div className="flex items-start gap-2">
              <CalendarDays className="text-muted-foreground mt-0.5 size-4" />
              <span className="text-sm font-medium leading-5">{deliverable.due}</span>
            </div>
            <div className="min-w-0">
              <p className="font-medium leading-5">{deliverable.title}</p>
              <p className="text-muted-foreground mt-1 text-sm">{deliverable.client}</p>
            </div>
            <span className="text-muted-foreground col-start-2 text-sm sm:col-start-auto">{deliverable.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
