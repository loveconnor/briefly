import { CheckCircle2, Link2, Send, Share2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
        <CardDescription>Communication sent and project visibility maintained.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {updates.map((update) => {
            const Icon = update.icon;

            return (
              <div key={update.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
                  <Icon className="text-muted-foreground size-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium leading-5">{update.title}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{update.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
