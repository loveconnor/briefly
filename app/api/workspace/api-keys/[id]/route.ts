import { NextResponse } from "next/server"

import { revokeApiKey, rotateApiKey } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await context.params
    const result = await rotateApiKey(session.user.id, id)
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { id } = await context.params
    const result = await revokeApiKey(session.user.id, id)
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
