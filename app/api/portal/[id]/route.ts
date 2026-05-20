import { NextResponse } from "next/server"

import { AppMutationError, submitPortalAction } from "@/lib/app-mutations"

export const runtime = "nodejs"

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params
    const payload = await request.json().catch(() => ({}))
    const result = await submitPortalAction(decodeURIComponent(id), payload)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof AppMutationError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    console.error(error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
