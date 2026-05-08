import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { getOnboardingStatus } from "@/lib/onboarding"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

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
    <main className="min-h-screen bg-muted px-6 py-8 text-foreground">
      <Card variant="outline" className="mx-auto max-w-5xl rounded-lg shadow-sm">
        <CardHeader>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="font-heading text-4xl">
            {onboarding.profile?.businessName || session.user.name || "Briefly"}
          </h1>
        </CardHeader>
        <CardContent>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Your onboarding is saved. The dashboard can now build from the
            stored work type, portal branding, first client, and first project
            data.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
