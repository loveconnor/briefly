import { createHash, randomBytes, randomUUID } from "crypto"

import { ensureAppDataTables } from "@/lib/app-data"
import { db } from "@/lib/db"

type SessionUser = {
  email: string
  id: string
  name?: string | null
}

export class AppMutationError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = "AppMutationError"
    this.status = status
  }
}

const clientStatuses = new Set(["Active", "Waiting", "Blocked", "Paused", "Completed", "Archived"])
const projectTemplates = new Set(["web-design", "web-dev", "seo", "branding", "retainer", "custom"])
const updateTypes = new Set(["APPROVAL", "DELIVERABLE", "FOLLOW-UP", "LAUNCH", "REVISION", "STATUS"])

export async function createClient(
  userId: string,
  payload: {
    company?: unknown
    email?: unknown
    name?: unknown
    status?: unknown
  },
) {
  await ensureAppDataTables()

  const name = requiredString(payload.name, "Client name is required.")
  const company = optionalString(payload.company)
  const email = optionalEmail(payload.email)
  const status = enumValue(payload.status, clientStatuses, "Active")
  const slug = await uniqueSlug(userId, "app_clients", company ?? name)
  const id = `client:${randomUUID()}`

  await db.query(
    `
      insert into app_clients (
        id,
        user_id,
        slug,
        name,
        email,
        company,
        status,
        health,
        response_time,
        portal_activity,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, 'Healthy', 'No response history yet', 'No portal activity yet', now())
    `,
    [id, userId, slug, company ?? name, email, company, status],
  )

  await addActivity(userId, {
    clientId: id,
    detail: email ? `Primary contact: ${email}` : "Client profile created.",
    title: `${company ?? name} added`,
    tone: "info",
    type: "update",
  })

  return {
    client: {
      initials: initials(company ?? name),
      name: company ?? name,
      slug,
      status,
    },
  }
}

export async function createProject(
  user: SessionUser,
  payload: {
    budget?: unknown
    clientSlug?: unknown
    dueLabel?: unknown
    name?: unknown
    summary?: unknown
    template?: unknown
    timeline?: unknown
  },
) {
  await ensureAppDataTables()

  const name = requiredString(payload.name, "Project name is required.")
  const template = enumValue(payload.template, projectTemplates, "custom")
  const slug = await uniqueSlug(user.id, "app_projects", name)
  const id = `project:${randomUUID()}`
  const clientSlug = optionalString(payload.clientSlug)
  const timeline = optionalString(payload.timeline)
  const dueLabel = optionalString(payload.dueLabel)
  const summary = optionalString(payload.summary) ?? "Project is ready for planning."
  const budgetCents = moneyToCents(payload.budget)
  const client = clientSlug ? await getClientBySlug(user.id, clientSlug) : null

  await db.query(
    `
      insert into app_projects (
        id,
        user_id,
        client_id,
        slug,
        name,
        template,
        status,
        phase,
        started_label,
        timeline,
        budget_cents,
        due_label,
        summary,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, 'Active', 'Strategy', $7, $8, $9, $10, $11, now())
    `,
    [
      id,
      user.id,
      client?.id ?? null,
      slug,
      name,
      template,
      formatDateLabel(new Date()),
      timeline,
      budgetCents,
      dueLabel,
      summary,
    ],
  )

  const portalId = `${slug}-${shortKey(user.id)}`
  await db.query(
    `
      insert into app_portals (
        id,
        user_id,
        project_id,
        name,
        status,
        status_detail,
        visibility,
        engagement,
        latest_action,
        approval_state,
        preview_type,
        preview_label,
        updated_at
      )
      values ($1, $2, $3, $4, 'Draft', 'Portal is ready to configure', 'No client views yet', 'No stakeholder activity yet', 'No client action yet', 'No approvals requested', $5, $6, now())
    `,
    [portalId, user.id, id, name, previewTypeForTemplate(template), previewLabelForTemplate(template)],
  )

  await seedProjectPlan(user.id, id, template)
  await addActivity(user.id, {
    clientId: client?.id,
    detail: client ? `Created for ${client.name}.` : "Project created without a client assignment.",
    projectId: id,
    title: `${name} created`,
    tone: "success",
    type: "phase",
  })

  return {
    project: {
      name,
      slug,
    },
  }
}

export async function createClientUpdate(
  userId: string,
  payload: {
    body?: unknown
    draft?: unknown
    project?: unknown
    recipients?: unknown
    title?: unknown
    type?: unknown
  },
) {
  await ensureAppDataTables()

  const title = requiredString(payload.title, "Update title is required.")
  const body = optionalString(payload.body) ?? ""
  const recipients = parseRecipients(payload.recipients)
  const type = enumValue(payload.type, updateTypes, "STATUS")
  const projectName = optionalString(payload.project)
  const project = projectName ? await getProjectByName(userId, projectName) : null
  const draft = Boolean(payload.draft)
  const id = `update:${randomUUID()}`

  await db.query(
    `
      insert into app_client_updates (
        id,
        user_id,
        project_id,
        title,
        update_type,
        body,
        recipients,
        attachments,
        visibility,
        sent_at
      )
      values ($1, $2, $3, $4, $5, $6, $7::jsonb, '[]'::jsonb, $8::jsonb, now())
    `,
    [
      id,
      userId,
      project?.id ?? null,
      title,
      type,
      body,
      JSON.stringify(recipients),
      JSON.stringify({
        delivery: draft ? "Draft" : "Delivered",
        firstViewed: "Not viewed",
        label: draft ? "Draft saved" : "Awaiting first view",
        opened: "No opens",
        replyState: "No reply",
        state: "awaiting",
      }),
    ],
  )

  if (!draft) {
    await addActivity(userId, {
      clientId: project?.client_id,
      detail: body || "Client update sent.",
      projectId: project?.id,
      title,
      tone: "success",
      type: "send",
    })
  }

  return {
    update: {
      id,
      title,
    },
  }
}

export async function deleteProject(userId: string, slug: string) {
  await ensureAppDataTables()

  const project = await db.query<{ id: string; name: string }>(
    `
      select id, name
      from app_projects
      where user_id = $1 and slug = $2
      limit 1
    `,
    [userId, slug],
  )
  const row = project.rows[0]

  if (!row) {
    throw new AppMutationError("Project not found.", 404)
  }

  const client = await db.connect()

  try {
    await client.query("begin")
    await client.query("delete from app_project_members where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_project_tasks where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_project_deliverables where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_project_approvals where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_files where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_activity where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_client_updates where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_portals where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_requests where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_billing_activity where user_id = $1 and project_id = $2", [userId, row.id])
    await client.query("delete from app_projects where user_id = $1 and id = $2", [userId, row.id])
    await client.query("commit")
  } catch (error) {
    await client.query("rollback")
    throw error
  } finally {
    client.release()
  }

  return {
    project: {
      name: row.name,
      slug,
    },
  }
}

export async function addProjectMember(
  userId: string,
  slug: string,
  payload: {
    name?: unknown
    role?: unknown
  },
) {
  await ensureAppDataTables()

  const project = await getProjectBySlug(userId, slug)
  const name = requiredString(payload.name, "Member name is required.")
  const role = optionalString(payload.role) ?? "Member"
  const id = `project-member:${randomUUID()}`

  await db.query(
    `
      insert into app_project_members (
        id,
        user_id,
        project_id,
        name,
        role
      )
      values ($1, $2, $3, $4, $5)
    `,
    [id, userId, project.id, name, role],
  )

  return {
    member: {
      id,
      name,
      removable: true,
      role,
    },
  }
}

export async function removeProjectMember(userId: string, slug: string, memberId: string) {
  await ensureAppDataTables()

  const project = await getProjectBySlug(userId, slug)
  const result = await db.query(
    `
      delete from app_project_members
      where user_id = $1 and project_id = $2 and id = $3
    `,
    [userId, project.id, memberId],
  )

  if (!result.rowCount) {
    throw new AppMutationError("Project member not found.", 404)
  }

  return { member: { id: memberId } }
}

export async function createTeamInvitation(
  userId: string,
  payload: {
    email?: unknown
    message?: unknown
    project?: unknown
    role?: unknown
  },
) {
  await ensureAppDataTables()
  await ensureTeamInvitationColumns()

  const email = requiredEmail(payload.email, "A valid invite email is required.")
  const role = optionalString(payload.role) ?? "Member"
  const project = optionalString(payload.project)
  const message = optionalString(payload.message)
  const id = `invite:${randomUUID()}`

  await db.query(
    `
      insert into app_team_invitations (
        id,
        user_id,
        email,
        state,
        sent_label,
        role,
        project_scope,
        message
      )
      values ($1, $2, $3, 'Pending', 'Sent just now', $4, $5, $6)
    `,
    [id, userId, email, role, project, message],
  )

  return {
    invitation: {
      email,
      sent: "Sent just now",
      state: "Pending",
    },
  }
}

export async function createApiKey(userId: string, payload: { name?: unknown }) {
  await ensureAppDataTables()

  const name = optionalString(payload.name) ?? "Production key"
  const secret = createSecret()
  const id = `key:${randomUUID()}`
  const preview = secretPreview(secret)

  await db.query(
    `
      insert into app_api_keys (
        id,
        user_id,
        name,
        key_preview,
        secret_hash,
        created_label,
        used_label
      )
      values ($1, $2, $3, $4, $5, 'Created just now', 'Never used')
    `,
    [id, userId, name, preview, hashSecret(secret)],
  )

  return {
    key: {
      created: "Created just now",
      id,
      key: preview,
      name,
      secret,
      used: "Never used",
    },
  }
}

export async function rotateApiKey(userId: string, keyId: string) {
  await ensureAppDataTables()

  const secret = createSecret()
  const preview = secretPreview(secret)
  const result = await db.query<{ id: string; name: string }>(
    `
      update app_api_keys
      set key_preview = $1, secret_hash = $2, used_label = 'Rotated just now'
      where user_id = $3 and id = $4
      returning id, name
    `,
    [preview, hashSecret(secret), userId, keyId],
  )

  const key = result.rows[0]
  if (!key) throw new AppMutationError("API key not found.", 404)

  return {
    key: {
      created: "Existing key",
      id: key.id,
      key: preview,
      name: key.name,
      secret,
      used: "Rotated just now",
    },
  }
}

export async function revokeApiKey(userId: string, keyId: string) {
  await ensureAppDataTables()

  const result = await db.query(
    `
      delete from app_api_keys
      where user_id = $1 and id = $2
    `,
    [userId, keyId],
  )

  if (!result.rowCount) throw new AppMutationError("API key not found.", 404)

  return { ok: true }
}

export async function createWebhook(
  userId: string,
  payload: {
    endpoint?: unknown
    event?: unknown
  },
) {
  await ensureAppDataTables()

  const event = requiredString(payload.event, "Webhook event is required.")
  const endpoint = validUrl(payload.endpoint, "A valid webhook endpoint URL is required.")
  const id = `webhook:${randomUUID()}`

  await db.query(
    `
      insert into app_webhooks (
        id,
        user_id,
        event,
        endpoint,
        status,
        last_label
      )
      values ($1, $2, $3, $4, 'Active', 'Added just now')
    `,
    [id, userId, event, endpoint],
  )

  return {
    webhook: {
      endpoint,
      event,
      last: "Added just now",
      status: "Active",
    },
  }
}

export async function createDomain(userId: string, payload: { name?: unknown }) {
  await ensureAppDataTables()

  const name = normalizeDomain(payload.name)
  const existing = await db.query(
    `
      select 1
      from app_domains
      where user_id = $1 and lower(name) = lower($2)
      limit 1
    `,
    [userId, name],
  )

  if (existing.rows[0]) {
    throw new AppMutationError("That domain is already connected.", 409)
  }

  await db.query(
    `
      insert into app_domains (
        id,
        user_id,
        name,
        status,
        ssl,
        connected
      )
      values ($1, $2, $3, 'DNS pending', 'SSL waiting', 'Added just now')
    `,
    [`domain:${randomUUID()}`, userId, name],
  )

  return {
    domain: {
      connected: "Added just now",
      name,
      ssl: "SSL waiting",
      status: "DNS pending",
    },
  }
}

export async function recheckDomain(userId: string, name: string) {
  await ensureAppDataTables()

  const result = await db.query<{ connected: string; name: string; ssl: string; status: string }>(
    `
      update app_domains
      set connected = 'Checked just now'
      where user_id = $1 and lower(name) = lower($2)
      returning name, status, ssl, connected
    `,
    [userId, name],
  )

  const domain = result.rows[0]
  if (!domain) throw new AppMutationError("Domain not found.", 404)

  return { domain }
}

export async function removeDomain(userId: string, name: string) {
  await ensureAppDataTables()

  const result = await db.query(
    `
      delete from app_domains
      where user_id = $1 and lower(name) = lower($2)
    `,
    [userId, name],
  )

  if (!result.rowCount) throw new AppMutationError("Domain not found.", 404)

  return { ok: true }
}

async function addActivity(
  userId: string,
  input: {
    clientId?: string | null
    detail?: string
    projectId?: string | null
    title: string
    tone?: string
    type?: string
  },
) {
  await db.query(
    `
      insert into app_activity (
        id,
        user_id,
        project_id,
        client_id,
        type,
        title,
        detail,
        actor,
        tone
      )
      values ($1, $2, $3, $4, $5, $6, $7, 'Workspace', $8)
    `,
    [
      `activity:${randomUUID()}`,
      userId,
      input.projectId ?? null,
      input.clientId ?? null,
      input.type ?? "update",
      input.title,
      input.detail ?? null,
      input.tone ?? "default",
    ],
  )
}

async function ensureTeamInvitationColumns() {
  await db.query(`alter table app_team_invitations add column if not exists role text`)
  await db.query(`alter table app_team_invitations add column if not exists project_scope text`)
  await db.query(`alter table app_team_invitations add column if not exists message text`)
}

async function getClientBySlug(userId: string, slug: string) {
  const result = await db.query<{
    id: string
    name: string
  }>(
    `
      select id, name
      from app_clients
      where user_id = $1 and slug = $2
      limit 1
    `,
    [userId, slug],
  )

  return result.rows[0] ?? null
}

async function getProjectByName(userId: string, name: string) {
  const result = await db.query<{
    client_id: string | null
    id: string
    name: string
  }>(
    `
      select id, name, client_id
      from app_projects
      where user_id = $1 and name = $2
      limit 1
    `,
    [userId, name],
  )

  return result.rows[0] ?? null
}

async function getProjectBySlug(userId: string, slug: string) {
  const result = await db.query<{
    client_id: string | null
    id: string
    name: string
  }>(
    `
      select id, name, client_id
      from app_projects
      where user_id = $1 and slug = $2
      limit 1
    `,
    [userId, slug],
  )
  const project = result.rows[0]

  if (!project) {
    throw new AppMutationError("Project not found.", 404)
  }

  return project
}

async function seedProjectPlan(userId: string, projectId: string, template: string) {
  const deliverables = defaultDeliverables(template)
  const tasks = defaultTasks(template)

  for (const [index, deliverable] of deliverables.entries()) {
    await db.query(
      `
        insert into app_project_deliverables (
          id,
          user_id,
          project_id,
          title,
          due_label,
          phase,
          status,
          state,
          group_label,
          source,
          sort_order,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, 'Scheduled', 'On track', $7, 'project-create', $8, now())
      `,
      [
        `deliverable:${randomUUID()}`,
        userId,
        projectId,
        deliverable.title,
        deliverable.due,
        deliverable.phase,
        deliverable.group,
        index,
      ],
    )
  }

  for (const [index, task] of tasks.entries()) {
    await db.query(
      `
        insert into app_project_tasks (
          id,
          user_id,
          project_id,
          title,
          assignee,
          due_label,
          status,
          detail,
          source,
          sort_order,
          updated_at
        )
        values ($1, $2, $3, $4, 'Workspace owner', $5, 'Ready', $6, 'project-create', $7, now())
      `,
      [`task:${randomUUID()}`, userId, projectId, task.title, task.due, task.detail, index],
    )
  }
}

function defaultDeliverables(template: string) {
  if (template === "branding") {
    return [
      { due: "Week 1", group: "Brand system", phase: "Strategy", title: "Brand direction" },
      { due: "Week 2", group: "Brand system", phase: "Design", title: "Logo and color system" },
      { due: "Week 3", group: "Brand system", phase: "Launch", title: "Brand handoff kit" },
    ]
  }

  if (template === "seo") {
    return [
      { due: "Week 1", group: "SEO setup", phase: "Strategy", title: "Technical audit" },
      { due: "Week 2", group: "SEO setup", phase: "Development", title: "Priority fixes" },
      { due: "Week 4", group: "SEO setup", phase: "Launch", title: "Performance report" },
    ]
  }

  return [
    { due: "Week 1", group: "Project plan", phase: "Strategy", title: "Kickoff brief" },
    { due: "Week 2", group: "Project plan", phase: "Design", title: "First review" },
    { due: "Week 4", group: "Project plan", phase: "Launch", title: "Launch handoff" },
  ]
}

function defaultTasks(template: string) {
  if (template === "retainer") {
    return [
      { detail: "Confirm monthly priorities and stakeholders.", due: "This week", title: "Set retainer priorities" },
      { detail: "Collect access, source files, and reporting context.", due: "This week", title: "Collect operating context" },
    ]
  }

  return [
    { detail: "Confirm goals, scope, stakeholders, and decision owners.", due: "This week", title: "Confirm kickoff details" },
    { detail: "Prepare the first client-facing checkpoint.", due: "Next week", title: "Prepare first review" },
  ]
}

async function uniqueSlug(userId: string, table: "app_clients" | "app_projects", value: string) {
  const base = slugify(value)

  for (let index = 0; index < 50; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`
    const result = await db.query(
      `
        select 1
        from ${table}
        where user_id = $1 and slug = $2
        limit 1
      `,
      [userId, slug],
    )

    if (!result.rows[0]) return slug
  }

  return `${base}-${randomBytes(3).toString("hex")}`
}

function createSecret() {
  return `brf_live_${randomBytes(24).toString("base64url")}`
}

function enumValue<T extends string>(value: unknown, allowed: ReadonlySet<string>, fallback: T): T {
  return typeof value === "string" && allowed.has(value) ? (value as T) : fallback
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date)
}

function hashSecret(secret: string) {
  return createHash("sha256").update(secret).digest("hex")
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function moneyToCents(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.round(value * 100))
  if (typeof value !== "string") return 0
  const parsed = Number(value.replace(/[^0-9.]/g, ""))
  return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed * 100)) : 0
}

function normalizeDomain(value: unknown) {
  const raw = requiredString(value, "Domain is required.")
  const withoutProtocol = raw.replace(/^https?:\/\//, "").split("/")[0]?.trim().toLowerCase() ?? ""
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(withoutProtocol)) {
    throw new AppMutationError("Enter a valid domain name.")
  }
  return withoutProtocol
}

function optionalEmail(value: unknown) {
  const email = optionalString(value)
  if (!email) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppMutationError("Enter a valid email address.")
  }
  return email.toLowerCase()
}

function optionalString(value: unknown) {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function parseRecipients(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value !== "string") return []

  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function previewLabelForTemplate(template: string) {
  if (template === "branding") return "Brand"
  if (template === "seo") return "Content"
  if (template === "retainer") return "Content"
  return "Homepage"
}

function previewTypeForTemplate(template: string) {
  if (template === "branding") return "brand"
  if (template === "seo" || template === "retainer") return "content"
  return "homepage"
}

function requiredEmail(value: unknown, message: string) {
  const email = optionalEmail(value)
  if (!email) throw new AppMutationError(message)
  return email
}

function requiredString(value: unknown, message: string) {
  const stringValue = optionalString(value)
  if (!stringValue) throw new AppMutationError(message)
  return stringValue
}

function secretPreview(secret: string) {
  return `brf_live_********${secret.slice(-4)}`
}

function shortKey(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "portal"
}

function slugify(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug || "item"
}

function validUrl(value: unknown, message: string) {
  const raw = requiredString(value, message)

  try {
    const url = new URL(raw)
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new AppMutationError(message)
    }
    return url.toString()
  } catch {
    throw new AppMutationError(message)
  }
}
