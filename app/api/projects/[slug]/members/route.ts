import { NextResponse } from "next/server"

import { addProjectMember, removeProjectMember } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { slug } = await params
    const payload = await request.json()
    const result = await addProjectMember(session.user.id, slug, payload)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { slug } = await params
    const payload = await request.json()
    const memberId = typeof payload.memberId === "string" ? payload.memberId : ""
    const result = await removeProjectMember(session.user.id, slug, memberId)
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
