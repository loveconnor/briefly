import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Check, Settings } from "lucide-react";
import { generateMeta } from "@/lib/utils";

import { AppShell } from "@/components/dashboard/app-shell";
import { Button } from "@/components/ui/button";
import NotificationsDataTable, { Notification } from "@/components/dashboard/notifications/data-table";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { auth } from "@/lib/auth";
import { getOnboardingStatus } from "@/lib/onboarding";

import notifications from "@/components/dashboard/notifications/data.json";

export async function generateMetadata() {
  return generateMeta({
    title: "Notifications Page",
    additionalTitle: true,
    description:
      "Manage user alerts, mark all as read, and configure notification preferences. A professional notifications page built with React, Next.js, TypeScript, Tailwind CSS, and shadcn/ui.",
    canonical: "/dashboard/notifications"
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

  return (
    <AppShell
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    >
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Notifications</h1>
          <div className="flex items-center gap-2">
            <Button>
              <Check />
              Mark All as Read
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard/workspace/notifications" aria-label="Notification settings">
                <Settings />
              </Link>
            </Button>
          </div>
        </div>
        <NotificationsDataTable data={notifications as Notification[]} />
      </div>
    </AppShell>
  );
}
