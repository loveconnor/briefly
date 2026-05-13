import { NextResponse } from "next/server"

import { createProject } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const payload = await request.json()
    const result = await createProject(session.user, payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
