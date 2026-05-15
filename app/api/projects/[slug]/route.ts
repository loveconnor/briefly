import { NextResponse } from "next/server"

import { deleteProject } from "@/lib/app-mutations"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const { slug } = await params
    const result = await deleteProject(session.user.id, slug)
    return NextResponse.json(result)
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
