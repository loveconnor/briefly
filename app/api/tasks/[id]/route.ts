import { NextResponse } from "next/server"

import {
  deleteDeliveryTask,
  markDeliveryTaskComplete,
  sendDeliveryTaskReminder,
  updateDeliveryTaskStatus,
} from "@/lib/app-mutations"
import { getDeliveryTasks } from "@/lib/app-data"
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
    const payload = await request.json().catch(() => ({}))
    if (payload.action === "send-reminder") {
      await sendDeliveryTaskReminder(session.user.id, decodeURIComponent(id))
    } else if (payload.action === "mark-complete") {
      await markDeliveryTaskComplete(session.user.id, decodeURIComponent(id))
    } else if (payload.action === "update-status") {
      await updateDeliveryTaskStatus(
        session.user.id,
        decodeURIComponent(id),
        payload.status,
        payload.orderedTaskIds,
      )
    } else {
      return NextResponse.json({ error: "Invalid task action." }, { status: 400 })
    }

    const tasks = await getDeliveryTasks(session.user)
    return NextResponse.json({ tasks })
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
    await deleteDeliveryTask(session.user.id, decodeURIComponent(id))
    const tasks = await getDeliveryTasks(session.user)
    return NextResponse.json({ tasks })
  } catch (error) {
    return mutationErrorResponse(error)
  }
}
