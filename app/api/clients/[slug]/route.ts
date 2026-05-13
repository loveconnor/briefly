import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import { ensureUserAppData } from "@/lib/app-data"
import { db } from "@/lib/db"

export const runtime = "nodejs"

const clientStatuses = new Set(["Active", "Waiting", "Blocked", "Paused", "Completed", "Archived"])
const maxAvatarLength = 2_500_000

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function cleanAvatarDataUrl(value: unknown) {
  if (value == null || value === "") return null
  if (typeof value !== "string") return undefined
  if (value.length > maxAvatarLength) return undefined
  if (!value.startsWith("data:image/")) return undefined
  return value
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await context.params
  const payload = await request.json()
  const name = cleanString(payload.name)
  const status = cleanString(payload.status)
  const avatarDataUrl = cleanAvatarDataUrl(payload.avatarDataUrl)

  if (!name) {
    return NextResponse.json({ error: "Client name is required." }, { status: 400 })
  }

  if (!clientStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid client status." }, { status: 400 })
  }

  if (avatarDataUrl === undefined) {
    return NextResponse.json({ error: "Avatar must be an image data URL under 2.5 MB." }, { status: 400 })
  }

  await ensureUserAppData(session.user.id)

  const result = await db.query<{
    avatar_data_url: string | null
    name: string
    slug: string
    status: string
  }>(
    `
      update app_clients
      set
        avatar_data_url = $1,
        name = $2,
        status = $3,
        updated_at = now()
      where user_id = $4 and slug = $5
      returning avatar_data_url, name, slug, status
    `,
    [avatarDataUrl, name, status, session.user.id, slug],
  )

  const client = result.rows[0]

  if (!client) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 })
  }

  return NextResponse.json({
    client: {
      avatarUrl: client.avatar_data_url,
      initials: getInitials(client.name),
      name: client.name,
      slug: client.slug,
      status: client.status,
    },
  })
}
