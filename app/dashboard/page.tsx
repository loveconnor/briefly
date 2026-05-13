import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateMeta } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { getOverviewData } from "@/lib/app-data";
import { getOnboardingStatus } from "@/lib/onboarding";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { AppShell } from "@/components/dashboard/app-shell";

import CalendarDateRangePicker from "@/components/ui/custom-date-range-picker";

import { SummaryCards } from "@/components/dashboard/overview/summary-cards";
import { RecentActivity } from "@/components/dashboard/overview/recent-activity";
import { NeedsAttention } from "@/components/dashboard/overview/needs-attention";
import { TableRecentProjects } from "@/components/dashboard/overview/table-recent-projects";
import { UpcomingDeliverables } from "@/components/dashboard/overview/upcoming-deliverables";
import { RecentUpdates } from "@/components/dashboard/overview/recent-updates";

export async function generateMetadata() {
  return generateMeta({
    title: "Client Operations Dashboard",
    description:
      "Track approvals, client responses, project progress, and upcoming deliverables from one operations workspace.",
    canonical: "/dashboard"
  });
}

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const onboarding = await getOnboardingStatus(session.user.id);

  if (!onboarding.completed) {
    return <OnboardingFlow />;
  }

  const overview = await getOverviewData(session.user);

  return (
    <AppShell
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
        </div>
      </div>

      <div className="space-y-8">
        <SummaryCards summary={overview.summary} />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity activity={overview.recentActivity} />
          </div>
          <NeedsAttention items={overview.attentionItems} />
        </div>
        <TableRecentProjects data={overview.projects} />
        <div className="grid gap-8 xl:grid-cols-2">
          <UpcomingDeliverables deliverables={overview.deliverables} />
          <RecentUpdates updates={overview.recentUpdates} />
        </div>
      </div>
    </AppShell>
  );
}
