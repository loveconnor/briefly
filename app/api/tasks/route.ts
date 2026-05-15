import { NextResponse } from "next/server"

import { createDeliveryTask } from "@/lib/app-mutations"
import { getDeliveryTasks } from "@/lib/app-data"
import { getSessionOrUnauthorized, mutationErrorResponse, unauthorizedResponse } from "@/lib/api-responses"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const tasks = await getDeliveryTasks(session.user)
    return NextResponse.json({ tasks })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}

export async function POST(request: Request) {
  const session = await getSessionOrUnauthorized(request)

  if (!session) {
    return unauthorizedResponse()
  }

  try {
    const payload = await request.json()
    await createDeliveryTask(session.user, payload)
    const tasks = await getDeliveryTasks(session.user)
    return NextResponse.json({ tasks }, { status: 201 })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
