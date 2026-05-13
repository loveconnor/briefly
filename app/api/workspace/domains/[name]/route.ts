import { NextResponse } from "next/server"

import { recheckDomain, removeDomain } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function PATCH(
  request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { name } = await context.params
    const result = await recheckDomain(session.user.id, decodeURIComponent(name))
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { name } = await context.params
    const result = await removeDomain(session.user.id, decodeURIComponent(name))
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
