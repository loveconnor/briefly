import { NextResponse } from "next/server"

import { AppMutationError } from "@/lib/app-mutations"
import { auth } from "@/lib/auth"

export async function getSessionOrUnauthorized(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  return session
}

export function mutationErrorResponse(error: unknown) {
  if (error instanceof AppMutationError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  console.error(error)
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
