import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getOnboardingStatus } from "@/lib/onboarding"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { AppShell } from "@/components/dashboard/app-shell"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  const onboarding = await getOnboardingStatus(session.user.id)

  if (!onboarding.completed) {
    return <OnboardingFlow />
  }

  return (
    <AppShell
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
    >
      <DashboardSkeleton />
    </AppShell>
  )
}
