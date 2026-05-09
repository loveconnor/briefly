import { BriefcaseBusiness, ClipboardCheck, MessageSquareWarning, SendHorizontal } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const summaryIconClassName = "text-muted-foreground size-4 stroke-current lg:size-6";

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>8 in motion across client workspaces</CardDescription>
          <CardAction>
            <BriefcaseBusiness className={summaryIconClassName} strokeWidth={2.5} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="font-display text-2xl lg:text-3xl">8</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Design, copy, and launch sign-offs</CardDescription>
          <CardAction>
            <ClipboardCheck className={summaryIconClassName} strokeWidth={2.5} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="font-display text-2xl lg:text-3xl">5</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Waiting on Clients</CardTitle>
          <CardDescription>Responses needed before work moves forward</CardDescription>
          <CardAction>
            <MessageSquareWarning className={summaryIconClassName} strokeWidth={2.5} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="font-display text-2xl lg:text-3xl">3</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Updates This Week</CardTitle>
          <CardDescription>Client updates delivered on schedule</CardDescription>
          <CardAction>
            <SendHorizontal className={summaryIconClassName} strokeWidth={2.5} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="font-display text-2xl lg:text-3xl">12</div>
        </CardContent>
      </Card>
    </div>
  );
}
