import { NextResponse } from "next/server"

import { createApiKey } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const payload = await request.json().catch(() => ({}))
    const result = await createApiKey(session.user.id, payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
