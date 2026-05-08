import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getOnboardingStatus, saveOnboarding } from "@/lib/onboarding"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const status = await getOnboardingStatus(session.user.id)
  return NextResponse.json(status)
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const payload = await request.json()
  await saveOnboarding(session.user.id, payload)

  return NextResponse.json({ ok: true })
}
