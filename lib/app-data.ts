import { db } from "@/lib/db"

export type ActivityTone = "default" | "error" | "info" | "success" | "warning"

export type OverviewProject = {
  id: number
  name: string
  client: {
    avatar?: string
    name: string
  }
  phase: string
  waitingOn: string
  status: "active" | "blocked" | "complete" | "review" | "waiting"
  progress: number
}

export type OverviewActivity = {
  detail: string
  icon: "approval" | "comment" | "delivery" | "phase" | "send" | "upload"
  time: string
  title: string
  tone: ActivityTone
}

export type OverviewAttentionItem = {
  detail: string
  icon: "alert" | "calendar" | "folder" | "message"
  label: string
  title: string
  variant: ActivityTone
}

export type OverviewDeliverable = {
  client: string
  due: string
  status: string
  title: string
}

export type OverviewUpdate = {
  detail: string
  icon: "approval" | "link" | "send" | "share"
  title: string
}

export type OverviewData = {
  attentionItems: OverviewAttentionItem[]
  deliverables: OverviewDeliverable[]
  projects: OverviewProject[]
  recentActivity: OverviewActivity[]
  recentUpdates: OverviewUpdate[]
  summary: Array<{
    icon: "approvals" | "blockers" | "projects" | "updates"
    label: string
    value: string
  }>
}

export type ProjectPhase =
  | "Strategy"
  | "Design"
  | "Development"
  | "QA"
  | "Launch"
  | "Complete"

export type ProjectStatus = "Active" | "Waiting" | "Blocked" | "Complete"
export type ProjectTaskStatus = "Ready" | "In progress" | "Waiting" | "Blocked"

export type Project = {
  slug: string
  name: string
  client: string
  owner: string
  started: string
  timeline: string
  budget: string
  budgetUsed: string
  budgetPercent: number
  status: ProjectStatus
  phase: ProjectPhase
  due: string
  summary: string
  phaseDetail: string
  deliverablesComplete: number
  deliverablesTotal: number
  risk: "Healthy" | "At risk" | "Blocked"
  riskDetail: string
  phases: Array<{
    name: ProjectPhase
    state: "complete" | "current" | "upcoming"
  }>
  activeWork: Array<{
    title: string
    status: ProjectTaskStatus
    owner: string
    due: string
    detail: string
  }>
  upcomingDeliverables: Array<{
    title: string
    due: string
    phase: ProjectPhase
    state: "On track" | "Needs approval" | "At risk"
  }>
  blockers: Array<{
    title: string
    waitingOn: string
    since: string
  }>
  clientActivity: string[]
  team: Array<{
    name: string
    role: string
  }>
  tasks: Array<{
    title: string
    assignee: string
    due: string
    status: ProjectTaskStatus
    blocker?: string
  }>
  timelineEvents: Array<{
    date: string
    items: Array<{
      title: string
      detail: string
      time: string
      type: "approval" | "upload" | "delivery" | "comment" | "phase"
    }>
  }>
  approvals: Array<{
    title: string
    status: "Waiting" | "Approved" | "Changes requested"
    reviewer: string
    waiting: string
    asset: string
    assetType: string
    latestComment: string
    updated: string
  }>
  deliverables: Array<{
    week: string
    items: Array<{
      title: string
      due: string
      phase: ProjectPhase
      status: "Scheduled" | "In progress" | "Waiting approval" | "Delivered"
    }>
  }>
  files: Array<{
    name: string
    type: string
    status: string
    updated: string
    owner: string
  }>
  activity: Array<{
    title: string
    detail: string
    time: string
  }>
  settings: Array<{
    label: string
    value: string
    action: string
  }>
}

export type ClientStatus =
  | "Active"
  | "Waiting"
  | "Blocked"
  | "Paused"
  | "Completed"
  | "Archived"

export type ClientHealth = "Healthy" | "Needs attention" | "At risk" | "Blocked"

export type ClientRecord = {
  slug: string
  name: string
  initials: string
  avatarUrl?: string | null
  status: ClientStatus
  health: ClientHealth
  healthDetail: string
  activeProjects: number
  waitingOn: string
  lastActivity: string
  nextDeliverable: string
  portalActivity: string
  portalTone: "good" | "quiet" | "stale"
  responseTime: string
  projects: {
    name: string
    phase: string
    status: string
    progress: number
    blocker: string
  }[]
  timeline: {
    event: string
    time: string
    type: "approval" | "upload" | "portal" | "request" | "update"
  }[]
  requests: {
    title: string
    owner: string
    due: string
    status: string
  }[]
  deliverables: {
    title: string
    date: string
    state: string
  }[]
  updates: string[]
  files: {
    name: string
    state: string
    updated: string
  }[]
  portalPages: {
    label: string
    meta: string
    value: string
  }[]
}

export type PortalTone = "healthy" | "attention" | "blocked"

export type Portal = {
  id: string
  name: string
  project: string
  status: string
  statusDetail: string
  visibility: string
  updated: string
  engagement: string
  metrics: string[]
  action: string
  activityTitle: string
  activity: string[]
  latestAction: string
  approvalState: string
  tone: PortalTone
  clientHref?: string
  preview: {
    type: "homepage" | "brand" | "launch" | "content"
    label: string
  }
}

export type PortalData = {
  portal: Portal | null
  projectName: string
  phase: string
  updated: string
  stateItems: Array<{ label: string; value: string }>
  changes: string[]
  tasks: Array<{ title: string; meta: string; state: "done" | "open" }>
  messages: Array<{
    action: string
    attachment?: string
    author: string
    body: string
    time: string
  }>
  files: Array<{
    icon: "document" | "image" | "upload"
    meta: string
    name: string
  }>
  activity: Array<{
    detail: string
    icon: "approved" | "download" | "upload" | "viewed"
    title: string
  }>
  team: Array<{ name: string; role: string }>
}

export type RepositoryFile = {
  id: string
  name: string
  type: "Assets" | "Design" | "Copy" | "Handoff" | "Contract"
  format: "ZIP" | "PNG" | "PDF" | "DOCX"
  size: string
  status:
    | "Ready"
    | "Needs approval"
    | "Awaiting review"
    | "Missing feedback"
    | "Shared"
    | "Not shared"
    | "Archived"
  shared: "Shared" | "Not shared"
  updated: string
  owner: string
  uploadedBy: string
  usedIn: string[]
  activity: string[]
  pinned?: boolean
}

export type MissingFile = {
  id: string
  name: string
  neededFor: string
  due: string
  requestState: string
}

export type InboxActivityItem = {
  client: string
  dateRange: string
  detail: string
  icon: "approval" | "comment" | "phase" | "send" | "share" | "upload"
  project: string
  time: string
  title: string
  tone: ActivityTone
  type: string
}

export type InboxApprovalItem = {
  detail: string
  priority: string
  project: string
  requestedBy: string
  source: "client" | "internal"
  title: string
  urgency: number
  variant: "default" | "error" | "warning"
  waiting: string
}

export type InboxRequestItem = {
  assignedTo: string
  detail: string
  from: string
  project: string
  status: string
  time: string
  title: string
}

export type ArchivedInboxItem = {
  completed: string
  dateRange: string
  owner: string
  project: string
  title: string
  type: string
}

export type InboxData = {
  activity: InboxActivityItem[]
  approvals: InboxApprovalItem[]
  archived: ArchivedInboxItem[]
  requests: InboxRequestItem[]
}

export type VisibilityState = "viewed" | "awaiting" | "ignored" | "acknowledged"
export type UpdateType =
  | "APPROVAL"
  | "DELIVERABLE"
  | "FOLLOW-UP"
  | "LAUNCH"
  | "REVISION"
  | "STATUS"

export type ClientUpdate = {
  id: string
  title: string
  project: string
  type: UpdateType
  recipients: string[]
  sentMeta: string
  body: string
  attachments: string[]
  visibility: {
    state: VisibilityState
    label: string
    delivery: string
    opened: string
    firstViewed: string
    replyState: string
  }
  group: "Today" | "Yesterday" | "This week" | "Earlier"
  recentReply?: string
}

export type PortalStatus = "Awaiting approval" | "In review" | "Stalled" | "Approved"

export type PortalPerformance = {
  id: string
  portal: string
  client: string
  category: "website" | "brand" | "launch"
  status: PortalStatus
  views: number
  avgReviewTime: number
  reviewLabel: string
  downloads: number
  comments: number
  lastActivity: string
  lastActivityRank: number
  conversion: "Pending" | "Approved" | "Blocked" | "Converted"
}

export type AnalyticsData = {
  activityFeed: Array<{
    action: string
    icon: "approval" | "comment" | "download" | "open" | "upload"
    person: string
    time: string
  }>
  bottlenecks: Array<{
    detail: string
    signal: string
    tone: "danger" | "info" | "warning"
  }>
  funnel: Array<{ label: string; tone: string; value: number }>
  insights: Array<{ detail: string; label: string; value: string }>
  metrics: Array<{ label: string; tone?: string; value: string }>
  momentum: Array<{ detail: string; label: string; tone: string }>
  portalPerformance: PortalPerformance[]
  timelineData: Array<{
    approvals: number
    comments: number
    day: string
    downloads: number
    opens: number
    uploads: number
  }>
  timelineEvents: Array<{ day: string; event: string; y: number }>
}

export type AutomationCategory =
  | "approval-reminders"
  | "weekly-updates"
  | "status-changes"
  | "internal-workflows"
export type AutomationStatus = "active" | "paused" | "needs-attention"
export type AutomationIcon =
  | "approval"
  | "archive"
  | "bell"
  | "check"
  | "clock"
  | "file"
  | "flag"
  | "mail"
  | "refresh"
  | "shield"
  | "sparkles"
  | "upload"

export type AutomationRun = {
  date: string
  person: string
  result: string
  status: "delivered" | "opened" | "waiting" | "failed"
}

export type Automation = {
  slug: string
  name: string
  category: AutomationCategory
  description: string
  rule: string
  status: AutomationStatus
  runsPerMonth: number
  lastTriggered: string
  icon: AutomationIcon
  trigger: string
  delay: string
  appliesTo: string[]
  actions: string[]
  conditions: string[]
  recentRuns: AutomationRun[]
  performance: string[]
  scope: string[]
  notifications: string[]
  failures: string
  explanation: string
}

export type AutomationsData = {
  attentionItems: Array<{
    description: string
    icon: AutomationIcon
    title: string
    tone: "error" | "warning"
  }>
  automations: Automation[]
  recentActivity: Array<{
    automationSlug: string
    icon: AutomationIcon
    status: string
    time: string
    title: string
    tone: "info" | "success"
  }>
  summary: Array<{ label: string; tone?: string; value: string }>
  templates: Array<{ icon: AutomationIcon; name: string }>
}

export type BillingStatus = "paid" | "overdue" | "draft" | "processing" | "scheduled"
export type BillingIcon = "download" | "invoice" | "payment" | "reminder" | "retainer"

export type BillingActivityItem = {
  id: string
  type: "invoice" | "retainer" | "payment" | "reminder" | "payout"
  title: string
  project: string
  detail: string
  status: BillingStatus
  amount: string
  meta: string
  amountDetail: string
  timestamp: string
  icon: BillingIcon
  operationalNote?: string
  lineItems?: { label: string; amount: string }[]
  timeline?: string[]
  actions?: string[]
}

export type Retainer = {
  id: string
  client: string
  name: string
  state: "active" | "paused" | "renewal"
  amount: string
  renewal: string
  method: string
}

export type BillingData = {
  activity: BillingActivityItem[]
  attentionItems: Array<{ detail: string; label: string; status: BillingStatus }>
  attentionSummary: Array<{ label: string; status: BillingStatus }>
  automations: Array<{ icon: BillingIcon; label: string }>
  clientPortal: {
    detail: string
    title: string
  } | null
  paymentSettings: Array<{ icon: BillingIcon; label: string; value: string }>
  retainers: Retainer[]
  summary: Array<{ label: string; tone: string; value: string }>
}

export type TeamMember = {
  id: string
  name: string
  email: string
  initials: string
  role: "Owner" | "Admin" | "Designer" | "Client"
  type: "internal" | "client"
  access: string
  projects: string
  activity: string
  status: "Online" | "Active" | "Away" | "Viewing portal"
  lastActive: string
  assignedProjects: string[]
  recentActivity: { label: string; time: string }[]
}

export type TeamRole = {
  name: TeamMember["role"]
  description: string
  permissions: {
    group: string
    items: { label: string; enabled: boolean }[]
  }[]
}

export type TeamInvitation = {
  email: string
  sent: string
  state: string
}

export type TeamData = {
  invitations: TeamInvitation[]
  members: TeamMember[]
  projectOptions: string[]
  roles: TeamRole[]
  summary: string[]
}

export type Domain = {
  name: string
  status: string
  ssl: string
  connected: string
}

export type Integration = {
  name: string
  description: string
  status: string
  detail: string
}

export type Webhook = {
  event: string
  endpoint: string
  status: string
  last: string
}

export type WorkspaceData = {
  apiKeys: Array<{
    created: string
    id: string
    key: string
    name: string
    secret: string
    used: string
  }>
  brandColor: string
  businessName: string
  colorPresets: string[]
  domains: Domain[]
  integrationGroups: Array<{ label: string; items: Integration[] }>
  logoDataUrl: string | null
  notificationRows: Array<{ app: boolean; email: boolean; event: string; slack: boolean }>
  recentColors: string[]
  webhooks: Webhook[]
}

export type Notification = {
  id: number
  title: string
  description: string
  type: "approval" | "comment" | "portal" | "billing" | "file" | "team"
  time: string
  status: "read" | "unread"
}

export type TemplateCategory = "website" | "branding" | "seo" | "retainers" | "custom"

export type TemplateSystem = {
  automationRules: string[]
  category: TemplateCategory
  clientForms: number
  clientPortalPreview: Array<{
    label: string
    status: string
    type: "approval" | "task" | "upload" | "deliverable"
  }>
  clientVisibility: string
  createdBy: string
  defaultApprovals: string[]
  defaultRoles: string[]
  description: string
  estimatedTimeline: string
  forms: string[]
  lastUpdated: string
  metrics: {
    approvals: number
    automations: number
    phases: number
    tasks: number
  }
  name: string
  portalStructure: string[]
  slug: string
  summary: string
  syncVersion: string
  typeLabel: string
  usedCount: number
  workflowIncludes: string[]
  phases: Array<{
    approvals: string[]
    clientRequests: string[]
    name: string
    summary: string
    tasks: string[]
  }>
}

type SessionUser = {
  email: string
  id: string
  image?: string | null
  name?: string | null
}

type ProjectRow = {
  budget_cents: number | null
  budget_used_cents: number | null
  client_id: string | null
  client_name: string | null
  created_at: Date
  due_label: string | null
  id: string
  name: string
  phase: ProjectPhase | null
  slug: string
  started_label: string | null
  status: ProjectStatus | null
  summary: string | null
  timeline: string | null
}

type ClientRow = {
  avatar_data_url: string | null
  company: string | null
  created_at: Date
  email: string | null
  health: ClientHealth | null
  id: string
  name: string
  portal_activity: string | null
  response_time: string | null
  slug: string
  status: ClientStatus | null
  updated_at: Date
}

const DEFAULT_BRAND_COLOR = "#7A5AF8"
const PROJECT_PHASES: ProjectPhase[] = [
  "Strategy",
  "Design",
  "Development",
  "QA",
  "Launch",
  "Complete",
]

const DEFAULT_ROLES: TeamRole[] = [
  {
    name: "Owner",
    description: "Full workspace control",
    permissions: [
      { group: "Projects", items: [{ label: "View", enabled: true }, { label: "Edit", enabled: true }] },
      { group: "Files", items: [{ label: "Upload", enabled: true }, { label: "Download", enabled: true }] },
      { group: "Workspace", items: [{ label: "Billing", enabled: true }, { label: "Team settings", enabled: true }] },
    ],
  },
  {
    name: "Admin",
    description: "Workspace and project management",
    permissions: [
      { group: "Projects", items: [{ label: "View", enabled: true }, { label: "Edit", enabled: true }] },
      { group: "Files", items: [{ label: "Upload", enabled: true }, { label: "Download", enabled: true }] },
      { group: "Workspace", items: [{ label: "Billing", enabled: false }, { label: "Team settings", enabled: true }] },
    ],
  },
  {
    name: "Designer",
    description: "Projects, files, approvals",
    permissions: [
      { group: "Projects", items: [{ label: "View", enabled: true }, { label: "Edit", enabled: true }] },
      { group: "Files", items: [{ label: "Upload", enabled: true }, { label: "Download", enabled: true }] },
      { group: "Portals", items: [{ label: "View", enabled: true }, { label: "Respond", enabled: true }] },
    ],
  },
  {
    name: "Client",
    description: "Portal-only visibility",
    permissions: [
      { group: "Projects", items: [{ label: "View", enabled: false }, { label: "Edit", enabled: false }] },
      { group: "Files", items: [{ label: "Upload", enabled: true }, { label: "Download", enabled: true }] },
      { group: "Portals", items: [{ label: "View", enabled: true }, { label: "Respond", enabled: true }] },
    ],
  },
]

export async function ensureAppDataTables() {
  await db.query(`
    create table if not exists app_workspaces (
      user_id text primary key,
      business_name text,
      work_type text,
      brand_color text not null default '${DEFAULT_BRAND_COLOR}',
      logo_data_url text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_clients (
      id text primary key,
      user_id text not null,
      slug text not null,
      name text not null,
      avatar_data_url text,
      email text,
      company text,
      status text not null default 'Active',
      health text not null default 'Healthy',
      response_time text,
      portal_activity text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, slug)
    )
  `)

  await db.query(`
    alter table app_clients
    add column if not exists avatar_data_url text
  `)

  await db.query(`
    create table if not exists app_projects (
      id text primary key,
      user_id text not null,
      client_id text,
      slug text not null,
      name text not null,
      template text,
      status text not null default 'Active',
      phase text not null default 'Strategy',
      started_label text,
      timeline text,
      budget_cents integer not null default 0,
      budget_used_cents integer not null default 0,
      due_label text,
      summary text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, slug)
    )
  `)

  await db.query(`
    create table if not exists app_project_tasks (
      id text primary key,
      user_id text not null,
      project_id text not null,
      title text not null,
      assignee text,
      due_label text,
      status text not null default 'Ready',
      detail text,
      blocker text,
      source text,
      sort_order integer not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_project_deliverables (
      id text primary key,
      user_id text not null,
      project_id text not null,
      title text not null,
      due_label text,
      phase text not null default 'Strategy',
      status text not null default 'Scheduled',
      state text not null default 'On track',
      group_label text not null default 'Upcoming',
      source text,
      sort_order integer not null default 0,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)
  await db.query(`alter table app_project_deliverables add column if not exists source text`)

  await db.query(`
    create table if not exists app_project_approvals (
      id text primary key,
      user_id text not null,
      project_id text not null,
      title text not null,
      status text not null default 'Waiting',
      reviewer text,
      waiting text,
      asset text,
      asset_type text,
      latest_comment text,
      updated_label text,
      source text not null default 'client',
      priority text not null default 'Medium',
      detail text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_files (
      id text primary key,
      user_id text not null,
      project_id text,
      client_id text,
      name text not null,
      file_type text not null default 'Assets',
      format text not null default 'PDF',
      size_label text not null default '0 KB',
      status text not null default 'Ready',
      shared text not null default 'Not shared',
      owner text,
      uploaded_by text,
      used_in jsonb not null default '[]'::jsonb,
      activity jsonb not null default '[]'::jsonb,
      pinned boolean not null default false,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_activity (
      id text primary key,
      user_id text not null,
      project_id text,
      client_id text,
      type text not null default 'update',
      title text not null,
      detail text,
      actor text,
      tone text not null default 'default',
      occurred_at timestamptz not null default now(),
      archived_at timestamptz
    )
  `)

  await db.query(`
    create table if not exists app_client_updates (
      id text primary key,
      user_id text not null,
      project_id text,
      title text not null,
      update_type text not null default 'STATUS',
      body text,
      recipients jsonb not null default '[]'::jsonb,
      attachments jsonb not null default '[]'::jsonb,
      visibility jsonb not null default '{}'::jsonb,
      recent_reply text,
      sent_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_portals (
      id text primary key,
      user_id text not null,
      project_id text,
      name text not null,
      status text not null default 'Draft',
      status_detail text,
      visibility text,
      engagement text,
      latest_action text,
      approval_state text,
      preview_type text not null default 'homepage',
      preview_label text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, project_id)
    )
  `)

  await db.query(`
    create table if not exists app_requests (
      id text primary key,
      user_id text not null,
      project_id text,
      client_id text,
      title text not null,
      detail text,
      from_name text,
      status text not null default 'Open',
      assigned_to text,
      due_label text,
      created_at timestamptz not null default now(),
      resolved_at timestamptz
    )
  `)

  await db.query(`
    create table if not exists app_notifications (
      id text primary key,
      user_id text not null,
      title text not null,
      description text,
      type text not null default 'workspace',
      status text not null default 'Unread',
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_team_invitations (
      id text primary key,
      user_id text not null,
      email text not null,
      state text not null default 'Pending',
      sent_label text,
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_automations (
      id text primary key,
      user_id text not null,
      slug text not null,
      name text not null,
      category text not null,
      description text,
      rule text,
      status text not null default 'active',
      runs_per_month integer not null default 0,
      last_triggered text not null default 'Never',
      icon text not null default 'bell',
      trigger text,
      delay text,
      applies_to jsonb not null default '[]'::jsonb,
      actions jsonb not null default '[]'::jsonb,
      conditions jsonb not null default '[]'::jsonb,
      recent_runs jsonb not null default '[]'::jsonb,
      performance jsonb not null default '[]'::jsonb,
      scope jsonb not null default '[]'::jsonb,
      notifications jsonb not null default '[]'::jsonb,
      failures text not null default '0 failed runs',
      explanation text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, slug)
    )
  `)

  await db.query(`
    create table if not exists app_billing_activity (
      id text primary key,
      user_id text not null,
      project_id text,
      item_type text not null,
      title text not null,
      detail text,
      status text not null,
      amount_label text not null default '$0',
      meta text,
      amount_detail text,
      timestamp_label text,
      icon text not null default 'invoice',
      operational_note text,
      line_items jsonb not null default '[]'::jsonb,
      timeline jsonb not null default '[]'::jsonb,
      actions jsonb not null default '[]'::jsonb,
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_retainers (
      id text primary key,
      user_id text not null,
      client_id text,
      client text not null,
      name text not null,
      state text not null default 'active',
      amount text not null default '$0/mo',
      renewal text not null default 'Not scheduled',
      method text not null default 'Manual'
    )
  `)

  await db.query(`
    create table if not exists app_domains (
      id text primary key,
      user_id text not null,
      name text not null,
      status text not null default 'DNS pending',
      ssl text not null default 'SSL waiting',
      connected text not null default 'Added just now',
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_integrations (
      id text primary key,
      user_id text not null,
      group_label text not null,
      name text not null,
      description text,
      status text not null default 'Available',
      detail text,
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_api_keys (
      id text primary key,
      user_id text not null,
      name text not null,
      key_preview text not null,
      secret_hash text not null,
      created_label text not null default 'Created just now',
      used_label text not null default 'Never used',
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_webhooks (
      id text primary key,
      user_id text not null,
      event text not null,
      endpoint text not null,
      status text not null default 'DNS pending',
      last_label text not null default 'Never delivered',
      created_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists app_templates (
      id text primary key,
      user_id text not null,
      slug text not null,
      name text not null,
      category text not null default 'custom',
      data jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now(),
      unique (user_id, slug)
    )
  `)

  await db.query(`
    create index if not exists app_clients_user_id_idx on app_clients(user_id)
  `)
  await db.query(`
    create index if not exists app_projects_user_id_idx on app_projects(user_id)
  `)
  await db.query(`
    create index if not exists app_activity_user_id_idx on app_activity(user_id, occurred_at desc)
  `)
}

export async function ensureUserAppData(userId: string) {
  await ensureAppDataTables()
  await syncOnboardingToAppData(userId)
}

export async function syncOnboardingToAppData(userId: string) {
  await ensureAppDataTables()

  const profile = await db.query<{
    brand_color: string | null
    business_name: string | null
    logo_data_url: string | null
    work_type: string | null
  }>(
    `
      select work_type, business_name, brand_color, logo_data_url
      from onboarding_profiles
      where user_id = $1
      limit 1
    `,
    [userId],
  )

  const profileRow = profile.rows[0]
  if (profileRow) {
    await db.query(
      `
        insert into app_workspaces (
          user_id,
          business_name,
          work_type,
          brand_color,
          logo_data_url,
          updated_at
        )
        values ($1, $2, $3, $4, $5, now())
        on conflict (user_id) do update set
          business_name = excluded.business_name,
          work_type = excluded.work_type,
          brand_color = excluded.brand_color,
          logo_data_url = excluded.logo_data_url,
          updated_at = now()
      `,
      [
        userId,
        profileRow.business_name,
        profileRow.work_type,
        profileRow.brand_color ?? DEFAULT_BRAND_COLOR,
        profileRow.logo_data_url,
      ],
    )
  }

  const firstClient = await db.query<{
    company: string | null
    email: string
    name: string
  }>(
    `
      select name, email, company
      from onboarding_first_clients
      where user_id = $1
      limit 1
    `,
    [userId],
  )
  const clientRow = firstClient.rows[0]
  const clientId = clientRow ? deterministicId("client", userId, clientRow.email || clientRow.name) : null
  const clientSlug = clientRow ? slugify(clientRow.company || clientRow.name) : null

  if (clientRow && clientSlug) {
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
        values ($1, $2, $3, $4, $5, $6, 'Active', 'Healthy', 'No response history yet', 'No portal activity yet', now())
        on conflict (user_id, slug) do update set
          name = excluded.name,
          email = excluded.email,
          company = excluded.company,
          updated_at = now()
      `,
      [
        clientId,
        userId,
        clientSlug,
        clientRow.company || clientRow.name,
        clientRow.email,
        clientRow.company,
      ],
    )
  }

  const firstProject = await db.query<{
    duration: string | null
    milestones: Array<{ done: boolean; text: string; week: string }> | null
    name: string
    template: string
  }>(
    `
      select name, template, duration, milestones
      from onboarding_first_projects
      where user_id = $1
      limit 1
    `,
    [userId],
  )
  const projectRow = firstProject.rows[0]

  if (!projectRow) return

  const projectSlug = slugify(projectRow.name)
  const projectId = deterministicId("project", userId, projectRow.name)
  const portalId = `${projectSlug}-${shortKey(userId)}`

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
        due_label,
        summary,
        updated_at
      )
      values ($1, $2, $3, $4, $5, $6, 'Active', 'Strategy', $7, $8, null, $9, now())
      on conflict (user_id, slug) do update set
        client_id = excluded.client_id,
        name = excluded.name,
        template = excluded.template,
        timeline = excluded.timeline,
        summary = excluded.summary,
        updated_at = now()
    `,
    [
      projectId,
      userId,
      clientId,
      projectSlug,
      projectRow.name,
      projectRow.template,
      formatDateLabel(new Date()),
      projectRow.duration,
      "Project created from onboarding.",
    ],
  )

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
      on conflict (user_id, project_id) do update set
        name = excluded.name,
        preview_type = excluded.preview_type,
        preview_label = excluded.preview_label,
        updated_at = now()
    `,
    [
      portalId,
      userId,
      projectId,
      projectRow.name,
      previewTypeForTemplate(projectRow.template),
      previewLabelForTemplate(projectRow.template),
    ],
  )

  await db.query(`delete from app_project_tasks where user_id = $1 and project_id = $2 and source = 'onboarding'`, [userId, projectId])
  await db.query(`delete from app_project_deliverables where user_id = $1 and project_id = $2 and source = 'onboarding'`, [userId, projectId])

  const milestones = Array.isArray(projectRow.milestones) ? projectRow.milestones : []
  for (const [index, milestone] of milestones.entries()) {
    const itemSlug = slugify(milestone.text)
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
        values ($1, $2, $3, $4, $5, 'Strategy', $6, $7, 'Onboarding plan', 'onboarding', $8, now())
        on conflict (id) do update set
          title = excluded.title,
          due_label = excluded.due_label,
          status = excluded.status,
          state = excluded.state,
          sort_order = excluded.sort_order,
          updated_at = now()
      `,
      [
        deterministicId("deliverable", projectId, itemSlug),
        userId,
        projectId,
        milestone.text,
        milestone.week,
        milestone.done ? "Delivered" : "Scheduled",
        milestone.done ? "On track" : "On track",
        index,
      ],
    )

    if (!milestone.done) {
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
          values ($1, $2, $3, $4, 'Workspace owner', $5, 'Ready', 'Created from onboarding milestone', 'onboarding', $6, now())
          on conflict (id) do update set
            title = excluded.title,
            due_label = excluded.due_label,
            sort_order = excluded.sort_order,
            updated_at = now()
        `,
        [
          deterministicId("task", projectId, itemSlug),
          userId,
          projectId,
          milestone.text,
          milestone.week,
          index,
        ],
      )
    }
  }
}

export async function getOverviewData(user: SessionUser): Promise<OverviewData> {
  await ensureUserAppData(user.id)
  const projects = await getProjects(user)
  const updates = await getUpdates(user.id)
  const activity = await getActivityRows(user.id, 5)
  const approvals = projects.flatMap((project) => project.approvals)
  const blockers = projects.flatMap((project) =>
    project.blockers.map((blocker) => ({ ...blocker, project: project.name })),
  )
  const deliverables = projects
    .flatMap((project) =>
      project.upcomingDeliverables.map((deliverable) => ({
        client: project.client,
        due: deliverable.due,
        status: deliverable.state,
        title: deliverable.title,
      })),
    )
    .slice(0, 5)

  const attentionItems: OverviewAttentionItem[] = [
    ...blockers.map((blocker) => ({
      detail: `Waiting on ${blocker.waitingOn}.`,
      icon: "folder" as const,
      label: "Blocked",
      title: blocker.title,
      variant: "warning" as const,
    })),
    ...approvals
      .filter((approval) => approval.status === "Waiting")
      .map((approval) => ({
        detail: approval.latestComment || approval.waiting,
        icon: "alert" as const,
        label: "Approval",
        title: approval.title,
        variant: "warning" as const,
      })),
  ].slice(0, 4)

  return {
    attentionItems,
    deliverables,
    projects: projects.map((project, index) => ({
      id: index + 1,
      name: project.name,
      client: { name: project.client },
      phase: project.phase,
      waitingOn: project.blockers[0]?.waitingOn ?? "None",
      status: overviewProjectStatus(project),
      progress: project.deliverablesTotal
        ? Math.round((project.deliverablesComplete / project.deliverablesTotal) * 100)
        : 0,
    })),
    recentActivity: activity.map((item) => ({
      detail: item.detail ?? "",
      icon: activityIcon(item.type),
      time: relativeTime(item.occurred_at),
      title: item.title,
      tone: tone(item.tone),
    })),
    recentUpdates: updates.slice(0, 4).map((update) => ({
      detail: update.body,
      icon: update.type === "APPROVAL" ? "approval" : "send",
      title: update.title,
    })),
    summary: [
      { icon: "projects", value: String(projects.filter((project) => project.status === "Active").length), label: "active projects" },
      { icon: "approvals", value: String(approvals.filter((approval) => approval.status === "Waiting").length), label: "approvals pending" },
      { icon: "blockers", value: String(blockers.length), label: "client blockers" },
      { icon: "updates", value: String(updates.length), label: "updates sent this week" },
    ],
  }
}

export async function getProjects(user: SessionUser): Promise<Project[]> {
  await ensureUserAppData(user.id)
  const result = await db.query<ProjectRow>(
    `
      select
        p.*,
        c.name as client_name
      from app_projects p
      left join app_clients c on c.id = p.client_id
      where p.user_id = $1
      order by p.created_at desc
    `,
    [user.id],
  )

  const projects: Project[] = []
  for (const row of result.rows) {
    projects.push(await buildProject(user, row))
  }
  return projects
}

export async function getProjectBySlug(user: SessionUser, slug: string) {
  const projects = await getProjects(user)
  return projects.find((project) => project.slug === slug) ?? null
}

export async function getClients(user: SessionUser): Promise<ClientRecord[]> {
  await ensureUserAppData(user.id)
  const result = await db.query<ClientRow>(
    `
      select *
      from app_clients
      where user_id = $1
      order by created_at desc
    `,
    [user.id],
  )

  const projects = await getProjects(user)
  const activity = await getActivityRows(user.id, 100)
  const updates = await getUpdates(user.id)
  const clients: ClientRecord[] = []

  for (const row of result.rows) {
    const clientProjects = projects.filter((project) => {
      return project.client === row.name || project.client === row.company
    })
    const projectNames = new Set(clientProjects.map((project) => project.name))
    const clientActivity = activity.filter(
      (item) => item.client_id === row.id || (item.project_name && projectNames.has(item.project_name)),
    )
    const clientRequests = await getRequestRows(user.id, row.id)
    const deliverables = clientProjects.flatMap((project) =>
      project.upcomingDeliverables.map((item) => ({
        title: item.title,
        date: item.due,
        state: item.state,
      })),
    )
    const waitingOn = clientProjects.flatMap((project) => project.blockers)[0]?.waitingOn ?? "No blockers"
    const health = deriveClientHealth(row.health, waitingOn, clientProjects)
    const files = await getClientFileRows(user.id, row.id)

    clients.push({
      slug: row.slug,
      name: row.name,
      initials: initials(row.name),
      avatarUrl: row.avatar_data_url,
      status: deriveClientStatus(row.status, clientProjects),
      health,
      healthDetail: clientHealthDetail(health, waitingOn),
      activeProjects: clientProjects.filter((project) => project.status === "Active").length,
      waitingOn,
      lastActivity: clientActivity[0] ? relativeTime(clientActivity[0].occurred_at) : "No activity yet",
      nextDeliverable: deliverables[0]
        ? `${deliverables[0].title} · ${deliverables[0].date}`
        : "No deliverables scheduled",
      portalActivity: row.portal_activity ?? "No portal activity yet",
      portalTone: clientActivity.length ? "good" : "quiet",
      responseTime: row.response_time ?? "No response history yet",
      projects: clientProjects.map((project) => ({
        name: project.name,
        phase: project.phase,
        status: project.status,
        progress: project.deliverablesTotal
          ? Math.round((project.deliverablesComplete / project.deliverablesTotal) * 100)
          : 0,
        blocker: project.blockers[0]?.waitingOn ?? "None",
      })),
      timeline: clientActivity.slice(0, 6).map((item) => ({
        event: item.title,
        time: relativeTime(item.occurred_at),
        type: clientTimelineType(item.type),
      })),
      requests: clientRequests.map((request) => ({
        title: request.title,
        owner: request.from_name ?? row.name,
        due: request.due_label ?? "Not scheduled",
        status: request.status,
      })),
      deliverables,
      updates: updates
        .filter((update) => projectNames.has(update.project))
        .map((update) => update.title),
      files: files.map((file) => ({
        name: file.name,
        state: file.status,
        updated: relativeTime(file.updated_at),
      })),
      portalPages: clientProjects.map((project) => ({
        label: project.name,
        meta: project.status,
        value: project.approvals.length
          ? `${project.approvals.length} approvals`
          : `${project.tasks.length} tasks`,
      })),
    })
  }

  return clients
}

export async function getClientBySlug(user: SessionUser, slug: string) {
  const clients = await getClients(user)
  return clients.find((client) => client.slug === slug) ?? null
}

export async function getPortals(userId: string): Promise<{ portals: Portal[]; summary: Array<{ value: string; label: string }> }> {
  await ensureUserAppData(userId)
  const result = await db.query<{
    approval_state: string | null
    engagement: string | null
    id: string
    latest_action: string | null
    name: string
    preview_label: string | null
    preview_type: string | null
    project_name: string | null
    status: string
    status_detail: string | null
    updated_at: Date
    visibility: string | null
  }>(
    `
      select
        po.*,
        p.name as project_name
      from app_portals po
      left join app_projects p on p.id = po.project_id
      where po.user_id = $1
      order by po.updated_at desc
    `,
    [userId],
  )

  const portals = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    project: row.project_name ?? "Unassigned project",
    status: row.status,
    statusDetail: row.status_detail ?? "No status detail recorded",
    visibility: row.visibility ?? "No views yet",
    updated: `Updated ${relativeTime(row.updated_at)}`,
    engagement: row.engagement ?? "No engagement yet",
    metrics: ["0 opens", "0 comments", "0 downloads"],
    action: "Open portal",
    activityTitle: row.name,
    activity: [],
    latestAction: row.latest_action ?? "No client action yet",
    approvalState: row.approval_state ?? "No approvals requested",
    tone: portalTone(row.status),
    clientHref: `/portal/${row.id}`,
    preview: {
      type: previewType(row.preview_type),
      label: row.preview_label ?? "Portal",
    },
  }))

  return {
    portals,
    summary: [
      { value: String(portals.length), label: "Active portals" },
      { value: "0", label: "Views today" },
      { value: String(portals.filter((portal) => portal.approvalState.includes("approval")).length), label: "Pending approvals" },
    ],
  }
}

export async function getPortalData(id: string): Promise<PortalData | null> {
  await ensureAppDataTables()
  const result = await db.query<{
    id: string
    name: string
    phase: ProjectPhase | null
    project_id: string | null
    project_name: string | null
    status: string
    updated_at: Date
    user_id: string
  }>(
    `
      select po.id, po.name, po.status, po.updated_at, po.user_id, po.project_id, p.name as project_name, p.phase
      from app_portals po
      left join app_projects p on p.id = po.project_id
      where po.id = $1
      limit 1
    `,
    [id],
  )
  const row = result.rows[0]
  if (!row) return null

  const tasks = row.project_id ? await getTaskRows(row.user_id, row.project_id) : []
  const files = row.project_id ? await getProjectFileRows(row.user_id, row.project_id) : []
  const activity = row.project_id ? await getActivityRows(row.user_id, 20, row.project_id) : []
  const deliverables = row.project_id ? await getDeliverableRows(row.user_id, row.project_id) : []
  const projectName = row.project_name ?? row.name
  const nextMilestone = deliverables[0]?.title ?? "No milestone scheduled"

  return {
    portal: null,
    projectName,
    phase: row.phase ?? "Strategy",
    updated: relativeTime(row.updated_at),
    stateItems: [
      { label: "Waiting on", value: tasks[0]?.title ?? "No client tasks" },
      { label: "Next milestone", value: nextMilestone },
      { label: "Open tasks", value: `${tasks.length} client items` },
    ],
    changes: [],
    tasks: tasks.map((task) => ({
      title: task.title,
      meta: task.due_label ?? "No due date",
      state: task.status === "Blocked" || task.status === "Waiting" ? "open" : "done",
    })),
    messages: [],
    files: files.map((file) => ({
      icon: fileIcon(file.format),
      meta: `${file.status} / ${relativeTime(file.updated_at)}`,
      name: file.name,
    })),
    activity: activity.map((item) => ({
      detail: item.detail ?? "",
      icon: portalActivityIcon(item.type),
      title: item.title,
    })),
    team: [{ name: "Workspace owner", role: "Project owner" }],
  }
}

export async function getFilesData(userId: string): Promise<{ files: RepositoryFile[]; missingFiles: MissingFile[] }> {
  await ensureUserAppData(userId)
  const files = await getProjectFileRows(userId)
  const requests = await getRequestRows(userId)

  return {
    files: files.map((file) => ({
      id: file.id,
      name: file.name,
      type: repositoryFileType(file.file_type),
      format: repositoryFileFormat(file.format),
      size: file.size_label,
      status: repositoryFileStatus(file.status),
      shared: file.shared === "Shared" ? "Shared" : "Not shared",
      updated: relativeTime(file.updated_at),
      owner: file.owner ?? "Workspace owner",
      uploadedBy: file.uploaded_by ?? file.owner ?? "Workspace owner",
      usedIn: jsonArray<string>(file.used_in),
      activity: jsonArray<string>(file.activity),
      pinned: file.pinned,
    })),
    missingFiles: requests
      .filter((request) => request.status === "Assets" || request.title.toLowerCase().includes("asset"))
      .map((request) => ({
        id: request.id,
        name: request.title,
        neededFor: request.project_name ?? "Project",
        due: request.due_label ?? "Not scheduled",
        requestState: request.resolved_at ? "Resolved" : "Open request",
      })),
  }
}

export async function getInboxData(userId: string): Promise<InboxData> {
  await ensureUserAppData(userId)
  const activityRows = await getActivityRows(userId, 100)
  const requestRows = await getRequestRows(userId)
  const approvals = await getApprovalRows(userId)

  return {
    activity: activityRows
      .filter((row) => !row.archived_at)
      .map((row) => ({
        client: row.client_name ?? "No client",
        dateRange: dateRangeFor(row.occurred_at),
        detail: row.detail ?? "",
        icon: inboxActivityIcon(row.type),
        project: row.project_name ?? "No project",
        time: relativeTime(row.occurred_at),
        title: row.title,
        tone: tone(row.tone),
        type: displayType(row.type),
      })),
    approvals: approvals
      .filter((approval) => approval.status !== "Approved")
      .map((approval, index) => ({
        title: approval.title,
        project: approval.project_name ?? "No project",
        requestedBy: approval.reviewer ?? "Client",
        waiting: approval.waiting ?? relativeTime(approval.created_at),
        priority: approval.priority,
        source: approval.source === "internal" ? "internal" : "client",
        detail: approval.detail ?? approval.latest_comment ?? "Approval is waiting for a decision.",
        variant: approval.status === "Changes requested" ? "error" : index === 0 ? "warning" : "default",
        urgency: index,
      })),
    archived: activityRows
      .filter((row) => row.archived_at)
      .map((row) => ({
        title: row.title,
        type: displayType(row.type),
        project: row.project_name ?? "No project",
        completed: row.archived_at ? formatDateLabel(row.archived_at) : "Archived",
        dateRange: "30-days",
        owner: row.actor ?? "Workspace owner",
      })),
    requests: requestRows
      .filter((request) => !request.resolved_at)
      .map((request) => ({
        title: request.title,
        from: request.from_name ?? request.client_name ?? "Client",
        project: request.project_name ?? "No project",
        detail: request.detail ?? "",
        status: request.status,
        assignedTo: request.assigned_to ?? "Workspace owner",
        time: relativeTime(request.created_at),
      })),
  }
}

export async function getUpdates(userId: string): Promise<ClientUpdate[]> {
  await ensureUserAppData(userId)
  const result = await db.query<{
    attachments: string[] | null
    body: string | null
    id: string
    project_name: string | null
    recent_reply: string | null
    recipients: string[] | null
    sent_at: Date
    title: string
    update_type: UpdateType
    visibility: ClientUpdate["visibility"] | null
  }>(
    `
      select u.*, p.name as project_name
      from app_client_updates u
      left join app_projects p on p.id = u.project_id
      where u.user_id = $1
      order by u.sent_at desc
    `,
    [userId],
  )

  return result.rows.map((row) => ({
    id: row.id,
    title: row.title,
    project: row.project_name ?? "No project",
    type: row.update_type,
    recipients: jsonArray<string>(row.recipients),
    sentMeta: `Sent ${relativeTime(row.sent_at)}`,
    body: row.body ?? "",
    attachments: jsonArray<string>(row.attachments),
    visibility: {
      state: row.visibility?.state ?? "awaiting",
      label: row.visibility?.label ?? "Not viewed yet",
      delivery: row.visibility?.delivery ?? "Delivered",
      opened: row.visibility?.opened ?? "No opens",
      firstViewed: row.visibility?.firstViewed ?? "Not viewed",
      replyState: row.visibility?.replyState ?? "No reply",
    },
    group: updateGroup(row.sent_at),
    recentReply: row.recent_reply ?? undefined,
  }))
}

export async function getAnalyticsData(userId: string): Promise<AnalyticsData> {
  await ensureUserAppData(userId)
  const portalData = await getPortals(userId)
  const updates = await getUpdates(userId)
  const activity = await getActivityRows(userId, 20)

  return {
    activityFeed: activity.slice(0, 8).map((row) => ({
      person: row.actor ?? row.client_name ?? "Workspace",
      action: row.title,
      time: relativeTime(row.occurred_at),
      icon: analyticsIcon(row.type),
    })),
    bottlenecks: [],
    funnel: [
      { label: "Sent", value: updates.length, tone: "bg-info" },
      { label: "Viewed", value: updates.filter((update) => update.visibility.state === "viewed").length, tone: "bg-info" },
      { label: "Commented", value: updates.filter((update) => update.recentReply).length, tone: "bg-warning" },
      { label: "Approved", value: 0, tone: "bg-success" },
    ],
    insights: [],
    metrics: [
      { value: String(portalData.portals.length), label: "active portals" },
      { value: "0", label: "approvals pending", tone: "text-warning-foreground" },
      { value: "0", label: "client opens today" },
      { value: "0", label: "stalled reviews", tone: "text-destructive-foreground" },
    ],
    momentum: [],
    portalPerformance: portalData.portals.map((portal) => ({
      id: portal.id,
      portal: portal.name,
      client: portal.project,
      category: portal.preview.type === "brand" ? "brand" : portal.preview.type === "launch" ? "launch" : "website",
      status: portal.status === "Approved" ? "Approved" : portal.tone === "blocked" ? "Stalled" : portal.status.includes("review") ? "In review" : "Awaiting approval",
      views: 0,
      avgReviewTime: 0,
      reviewLabel: "0m",
      downloads: 0,
      comments: 0,
      lastActivity: portal.updated,
      lastActivityRank: 0,
      conversion: "Pending",
    })),
    timelineData: lastSevenDays().map((day) => ({
      day,
      opens: 0,
      comments: 0,
      downloads: 0,
      approvals: 0,
      uploads: 0,
    })),
    timelineEvents: activity.slice(0, 3).map((row) => ({
      day: formatWeekday(row.occurred_at),
      y: 0,
      event: row.title,
    })),
  }
}

export async function getAutomationsData(userId: string): Promise<AutomationsData> {
  await ensureUserAppData(userId)
  const result = await db.query<{
    actions: string[] | null
    applies_to: string[] | null
    category: AutomationCategory
    conditions: string[] | null
    delay: string | null
    description: string | null
    explanation: string | null
    failures: string
    icon: AutomationIcon
    last_triggered: string
    name: string
    notifications: string[] | null
    performance: string[] | null
    recent_runs: AutomationRun[] | null
    rule: string | null
    runs_per_month: number
    scope: string[] | null
    slug: string
    status: AutomationStatus
    trigger: string | null
  }>(
    `
      select *
      from app_automations
      where user_id = $1
      order by created_at desc
    `,
    [userId],
  )

  const automations = result.rows.map((row) => ({
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description ?? "",
    rule: row.rule ?? "",
    status: row.status,
    runsPerMonth: row.runs_per_month,
    lastTriggered: row.last_triggered,
    icon: row.icon,
    trigger: row.trigger ?? "",
    delay: row.delay ?? "",
    appliesTo: jsonArray<string>(row.applies_to),
    actions: jsonArray<string>(row.actions),
    conditions: jsonArray<string>(row.conditions),
    recentRuns: jsonArray<AutomationRun>(row.recent_runs),
    performance: jsonArray<string>(row.performance),
    scope: jsonArray<string>(row.scope),
    notifications: jsonArray<string>(row.notifications),
    failures: row.failures,
    explanation: row.explanation ?? "",
  }))

  return {
    attentionItems: [],
    automations,
    recentActivity: [],
    summary: [
      { value: String(automations.filter((item) => item.status === "active").length), label: "active automations" },
      { value: "0", label: "actions this week" },
      { value: String(automations.filter((item) => item.status === "paused").length), label: "paused", tone: "text-warning-foreground" },
      { value: "0", label: "failed runs", tone: "text-success-foreground" },
    ],
    templates: [],
  }
}

export async function getBillingData(userId: string): Promise<BillingData> {
  await ensureUserAppData(userId)
  const activity = await db.query<{
    actions: string[] | null
    amount_detail: string | null
    amount_label: string
    detail: string | null
    icon: BillingIcon
    id: string
    item_type: BillingActivityItem["type"]
    line_items: BillingActivityItem["lineItems"] | null
    meta: string | null
    operational_note: string | null
    project_name: string | null
    status: BillingStatus
    timeline: string[] | null
    timestamp_label: string | null
    title: string
  }>(
    `
      select b.*, p.name as project_name
      from app_billing_activity b
      left join app_projects p on p.id = b.project_id
      where b.user_id = $1
      order by b.created_at desc
    `,
    [userId],
  )
  const retainers = await db.query<Retainer>(
    `
      select id, client, name, state, amount, renewal, method
      from app_retainers
      where user_id = $1
      order by name
    `,
    [userId],
  )

  const billingActivity = activity.rows.map((row) => ({
    id: row.id,
    type: row.item_type,
    title: row.title,
    project: row.project_name ?? "No project",
    detail: row.detail ?? "",
    status: row.status,
    amount: row.amount_label,
    meta: row.meta ?? "",
    amountDetail: row.amount_detail ?? row.amount_label,
    timestamp: row.timestamp_label ?? "Recorded",
    icon: row.icon,
    operationalNote: row.operational_note ?? undefined,
    lineItems: jsonArray<{ label: string; amount: string }>(row.line_items),
    timeline: jsonArray<string>(row.timeline),
    actions: jsonArray<string>(row.actions),
  }))

  return {
    activity: billingActivity,
    attentionItems: [],
    attentionSummary: [],
    automations: [],
    clientPortal: null,
    paymentSettings: [],
    retainers: retainers.rows,
    summary: [
      { value: "$0", label: "collected this month", tone: "text-foreground" },
      { value: String(billingActivity.filter((item) => item.type === "invoice").length), label: "outstanding invoices", tone: "text-foreground" },
      { value: "$0", label: "overdue", tone: "text-destructive-foreground" },
      { value: String(retainers.rows.length), label: "active retainers", tone: "text-success-foreground" },
    ],
  }
}

export async function getTeamData(user: SessionUser): Promise<TeamData> {
  await ensureUserAppData(user.id)
  const projects = await getProjects(user)
  const invitations = await db.query<TeamInvitation>(
    `
      select email, coalesce(sent_label, 'Invited') as sent, state
      from app_team_invitations
      where user_id = $1
      order by created_at desc
    `,
    [user.id],
  )
  const member: TeamMember = {
    id: user.id,
    name: user.name ?? user.email,
    email: user.email,
    initials: initials(user.name ?? user.email),
    role: "Owner",
    type: "internal",
    access: "Full workspace access",
    projects: `${projects.length} active ${projects.length === 1 ? "project" : "projects"}`,
    activity: "Current session",
    status: "Online",
    lastActive: "Now",
    assignedProjects: projects.map((project) => project.name),
    recentActivity: [],
  }

  return {
    invitations: invitations.rows,
    members: [member],
    projectOptions: projects.map((project) => project.name),
    roles: DEFAULT_ROLES,
    summary: [
      "1 member",
      `${projects.length} active ${projects.length === 1 ? "project" : "projects"}`,
      `${invitations.rows.length} pending ${invitations.rows.length === 1 ? "invite" : "invites"}`,
    ],
  }
}

export async function getWorkspaceData(userId: string): Promise<WorkspaceData> {
  await ensureUserAppData(userId)
  const workspace = await db.query<{
    brand_color: string
    business_name: string | null
    logo_data_url: string | null
  }>(
    `
      select business_name, brand_color, logo_data_url
      from app_workspaces
      where user_id = $1
      limit 1
    `,
    [userId],
  )
  const domains = await db.query<Domain>(
    `
      select name, status, ssl, connected
      from app_domains
      where user_id = $1
      order by created_at desc
    `,
    [userId],
  )
  const integrations = await db.query<Integration & { group_label: string }>(
    `
      select group_label, name, coalesce(description, '') as description, status, coalesce(detail, '') as detail
      from app_integrations
      where user_id = $1
      order by group_label, name
    `,
    [userId],
  )
  const apiKeys = await db.query<WorkspaceData["apiKeys"][number]>(
    `
      select id, name, key_preview as key, '' as secret, created_label as created, used_label as used
      from app_api_keys
      where user_id = $1
      order by created_at desc
    `,
    [userId],
  )
  const webhooks = await db.query<Webhook>(
    `
      select event, endpoint, status, last_label as last
      from app_webhooks
      where user_id = $1
      order by created_at desc
    `,
    [userId],
  )
  const row = workspace.rows[0]
  const integrationGroups = integrations.rows.reduce<WorkspaceData["integrationGroups"]>((groups, integration) => {
    const group = groups.find((item) => item.label === integration.group_label)
    const item = {
      name: integration.name,
      description: integration.description,
      status: integration.status,
      detail: integration.detail,
    }
    if (group) group.items.push(item)
    else groups.push({ label: integration.group_label, items: [item] })
    return groups
  }, [])

  return {
    apiKeys: apiKeys.rows,
    brandColor: row?.brand_color ?? DEFAULT_BRAND_COLOR,
    businessName: row?.business_name ?? "Workspace",
    colorPresets: ["#7A5AF8", "#0E9384", "#DD6B20", "#2563EB", "#111827"],
    domains: domains.rows,
    integrationGroups,
    logoDataUrl: row?.logo_data_url ?? null,
    notificationRows: [],
    recentColors: row?.brand_color ? [row.brand_color] : [],
    webhooks: webhooks.rows,
  }
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  await ensureUserAppData(userId)
  const result = await db.query<{
    created_at: Date
    description: string | null
    id: string
    status: string
    title: string
    type: string
  }>(
    `
      select id, title, description, type, status, created_at
      from app_notifications
      where user_id = $1
      order by created_at desc
    `,
    [userId],
  )

  return result.rows.map((row, index) => ({
    id: index + 1,
    title: row.title,
    description: row.description ?? "",
    type: notificationType(row.type),
    status: row.status.toLowerCase() === "read" ? "read" : "unread",
    time: relativeTime(row.created_at),
  }))
}

export async function getTemplates(userId: string): Promise<TemplateSystem[]> {
  await ensureUserAppData(userId)
  const result = await db.query<{
    category: TemplateCategory
    data: Partial<TemplateSystem>
    name: string
    slug: string
    updated_at: Date
  }>(
    `
      select slug, name, category, data, updated_at
      from app_templates
      where user_id = $1
      order by updated_at desc
    `,
    [userId],
  )

  return result.rows.map((row) => ({
    automationRules: row.data.automationRules ?? [],
    category: row.category,
    clientForms: row.data.clientForms ?? 0,
    clientPortalPreview: row.data.clientPortalPreview ?? [],
    clientVisibility: row.data.clientVisibility ?? "Not configured",
    createdBy: row.data.createdBy ?? "Workspace",
    defaultApprovals: row.data.defaultApprovals ?? [],
    defaultRoles: row.data.defaultRoles ?? [],
    description: row.data.description ?? "",
    estimatedTimeline: row.data.estimatedTimeline ?? "Not estimated",
    forms: row.data.forms ?? [],
    lastUpdated: relativeTime(row.updated_at),
    metrics: row.data.metrics ?? { approvals: 0, automations: 0, phases: 0, tasks: 0 },
    name: row.name,
    portalStructure: row.data.portalStructure ?? [],
    slug: row.slug,
    summary: row.data.summary ?? "",
    syncVersion: row.data.syncVersion ?? row.name,
    typeLabel: row.data.typeLabel ?? row.category,
    usedCount: row.data.usedCount ?? 0,
    workflowIncludes: row.data.workflowIncludes ?? [],
    phases: row.data.phases ?? [],
  }))
}

export async function getTemplateBySlug(userId: string, slug: string) {
  const templates = await getTemplates(userId)
  return templates.find((template) => template.slug === slug) ?? null
}

async function buildProject(user: SessionUser, row: ProjectRow): Promise<Project> {
  const [tasks, deliverables, approvals, files, activity] = await Promise.all([
    getTaskRows(user.id, row.id),
    getDeliverableRows(user.id, row.id),
    getApprovalRows(user.id, row.id),
    getProjectFileRows(user.id, row.id),
    getActivityRows(user.id, 100, row.id),
  ])
  const phase = row.phase ?? "Strategy"
  const deliverablesComplete = deliverables.filter((item) => item.status === "Delivered").length
  const deliverablesTotal = deliverables.length
  const blockers = tasks
    .filter((task) => task.status === "Blocked" || task.blocker)
    .map((task) => ({
      title: task.title,
      waitingOn: task.blocker ?? task.assignee ?? "Client",
      since: task.updated_at ? relativeTime(task.updated_at) : "recently",
    }))
  const waitingApprovals = approvals.filter((approval) => approval.status === "Waiting")
  const risk = blockers.length ? "Blocked" : waitingApprovals.length ? "At risk" : "Healthy"

  return {
    slug: row.slug,
    name: row.name,
    client: row.client_name ?? "No client assigned",
    owner: user.name ?? user.email,
    started: row.started_label ?? formatDateLabel(row.created_at),
    timeline: row.timeline ?? "Not set",
    budget: formatMoney(row.budget_cents ?? 0),
    budgetUsed: formatMoney(row.budget_used_cents ?? 0),
    budgetPercent: percent(row.budget_used_cents ?? 0, row.budget_cents ?? 0),
    status: row.status ?? "Active",
    phase,
    due: row.due_label ?? "Not scheduled",
    summary: row.summary ?? "Project is ready for planning.",
    phaseDetail: deliverablesTotal
      ? `${deliverablesComplete} of ${deliverablesTotal} deliverables complete`
      : "No deliverables yet",
    deliverablesComplete,
    deliverablesTotal,
    risk,
    riskDetail: risk === "Healthy"
      ? "No active blockers recorded."
      : risk === "Blocked"
        ? `${blockers.length} blocker${blockers.length === 1 ? "" : "s"} recorded.`
        : `${waitingApprovals.length} approval${waitingApprovals.length === 1 ? "" : "s"} waiting.`,
    phases: PROJECT_PHASES.map((name) => ({
      name,
      state: phaseState(name, phase),
    })),
    activeWork: tasks.slice(0, 5).map((task) => ({
      title: task.title,
      status: projectTaskStatus(task.status),
      owner: task.assignee ?? "Workspace owner",
      due: task.due_label ?? "Not scheduled",
      detail: task.detail ?? "No detail recorded",
    })),
    upcomingDeliverables: deliverables.slice(0, 5).map((deliverable) => ({
      title: deliverable.title,
      due: deliverable.due_label ?? "Not scheduled",
      phase: projectPhase(deliverable.phase),
      state: deliverableState(deliverable.state, deliverable.status),
    })),
    blockers,
    clientActivity: activity.slice(0, 4).map((item) => item.title),
    team: [{ name: user.name ?? user.email, role: "Owner" }],
    tasks: tasks.map((task) => ({
      title: task.title,
      assignee: task.assignee ?? "Workspace owner",
      due: task.due_label ?? "Not scheduled",
      status: projectTaskStatus(task.status),
      blocker: task.blocker ?? undefined,
    })),
    timelineEvents: groupActivity(activity),
    approvals: approvals.map((approval) => ({
      title: approval.title,
      status: approvalStatus(approval.status),
      reviewer: approval.reviewer ?? "Client",
      waiting: approval.waiting ?? relativeTime(approval.created_at),
      asset: approval.asset ?? "No asset attached",
      assetType: approval.asset_type ?? "FILE",
      latestComment: approval.latest_comment ?? "No comment recorded",
      updated: approval.updated_label ?? relativeTime(approval.updated_at),
    })),
    deliverables: groupDeliverables(deliverables),
    files: files.map((file) => ({
      name: file.name,
      type: file.file_type,
      status: file.status,
      updated: relativeTime(file.updated_at),
      owner: file.owner ?? "Workspace owner",
    })),
    activity: activity.map((item) => ({
      title: item.title,
      detail: item.detail ?? "",
      time: relativeTime(item.occurred_at),
    })),
    settings: [
      { label: "Client access", value: "Portal exists in database", action: "Manage access" },
      { label: "Project status", value: row.status ?? "Active", action: "Change status" },
      { label: "Billing", value: formatMoney(row.budget_cents ?? 0), action: "Edit billing" },
      { label: "Notifications", value: "Database-backed settings", action: "Configure" },
    ],
  }
}

async function getTaskRows(userId: string, projectId: string) {
  const result = await db.query<{
    assignee: string | null
    blocker: string | null
    detail: string | null
    due_label: string | null
    status: string
    title: string
    updated_at: Date
  }>(
    `
      select title, assignee, due_label, status, detail, blocker, updated_at
      from app_project_tasks
      where user_id = $1 and project_id = $2
      order by sort_order, created_at
    `,
    [userId, projectId],
  )
  return result.rows
}

async function getDeliverableRows(userId: string, projectId: string) {
  const result = await db.query<{
    due_label: string | null
    group_label: string
    phase: string
    state: string
    status: string
    title: string
  }>(
    `
      select title, due_label, phase, status, state, group_label
      from app_project_deliverables
      where user_id = $1 and project_id = $2
      order by sort_order, created_at
    `,
    [userId, projectId],
  )
  return result.rows
}

async function getApprovalRows(userId: string, projectId?: string) {
  const result = await db.query<{
    asset: string | null
    asset_type: string | null
    created_at: Date
    detail: string | null
    latest_comment: string | null
    priority: string
    project_name: string | null
    reviewer: string | null
    source: string
    status: string
    title: string
    updated_at: Date
    updated_label: string | null
    waiting: string | null
  }>(
    `
      select a.*, p.name as project_name
      from app_project_approvals a
      left join app_projects p on p.id = a.project_id
      where a.user_id = $1 and ($2::text is null or a.project_id = $2)
      order by a.created_at desc
    `,
    [userId, projectId ?? null],
  )
  return result.rows
}

async function getProjectFileRows(userId: string, projectId?: string) {
  const result = await db.query<{
    activity: unknown
    file_type: string
    format: string
    id: string
    name: string
    owner: string | null
    pinned: boolean
    shared: string
    size_label: string
    status: string
    updated_at: Date
    uploaded_by: string | null
    used_in: unknown
  }>(
    `
      select *
      from app_files
      where user_id = $1 and ($2::text is null or project_id = $2)
      order by pinned desc, updated_at desc
    `,
    [userId, projectId ?? null],
  )
  return result.rows
}

async function getClientFileRows(userId: string, clientId: string) {
  const result = await db.query<{
    name: string
    status: string
    updated_at: Date
  }>(
    `
      select name, status, updated_at
      from app_files
      where user_id = $1 and client_id = $2
      order by updated_at desc
    `,
    [userId, clientId],
  )
  return result.rows
}

async function getActivityRows(userId: string, limit: number, projectId?: string) {
  const result = await db.query<{
    actor: string | null
    archived_at: Date | null
    client_id: string | null
    client_name: string | null
    detail: string | null
    occurred_at: Date
    project_id: string | null
    project_name: string | null
    title: string
    tone: string
    type: string
  }>(
    `
      select
        a.*,
        p.name as project_name,
        c.name as client_name
      from app_activity a
      left join app_projects p on p.id = a.project_id
      left join app_clients c on c.id = a.client_id
      where a.user_id = $1 and ($2::text is null or a.project_id = $2)
      order by a.occurred_at desc
      limit $3
    `,
    [userId, projectId ?? null, limit],
  )
  return result.rows
}

async function getRequestRows(userId: string, clientId?: string) {
  const result = await db.query<{
    assigned_to: string | null
    client_name: string | null
    created_at: Date
    detail: string | null
    due_label: string | null
    from_name: string | null
    id: string
    project_name: string | null
    resolved_at: Date | null
    status: string
    title: string
  }>(
    `
      select
        r.*,
        p.name as project_name,
        c.name as client_name
      from app_requests r
      left join app_projects p on p.id = r.project_id
      left join app_clients c on c.id = r.client_id
      where r.user_id = $1 and ($2::text is null or r.client_id = $2)
      order by r.created_at desc
    `,
    [userId, clientId ?? null],
  )
  return result.rows
}

function activityIcon(typeValue: string): OverviewActivity["icon"] {
  if (typeValue === "approval") return "approval"
  if (typeValue === "upload") return "upload"
  if (typeValue === "phase") return "phase"
  if (typeValue === "comment") return "comment"
  if (typeValue === "delivery") return "delivery"
  return "send"
}

function analyticsIcon(typeValue: string): AnalyticsData["activityFeed"][number]["icon"] {
  if (typeValue === "approval") return "approval"
  if (typeValue === "comment") return "comment"
  if (typeValue === "upload") return "upload"
  if (typeValue === "download") return "download"
  return "open"
}

function approvalStatus(value: string): Project["approvals"][number]["status"] {
  if (value === "Approved") return "Approved"
  if (value === "Changes requested") return "Changes requested"
  return "Waiting"
}

function clientHealthDetail(health: ClientHealth, waitingOn: string) {
  if (health === "Healthy") return "No blockers recorded."
  if (health === "Blocked") return `Blocked by ${waitingOn}.`
  if (health === "At risk") return `Waiting on ${waitingOn}.`
  return "Needs attention from the workspace."
}

function clientTimelineType(typeValue: string): ClientRecord["timeline"][number]["type"] {
  if (typeValue === "approval") return "approval"
  if (typeValue === "upload") return "upload"
  if (typeValue === "request") return "request"
  if (typeValue === "portal") return "portal"
  return "update"
}

function dateRangeFor(date: Date) {
  const days = (Date.now() - date.getTime()) / 86_400_000
  if (days < 1) return "today"
  if (days < 7) return "week"
  return "month"
}

function deliverableState(state: string, status: string): Project["upcomingDeliverables"][number]["state"] {
  if (state === "Needs approval" || status === "Waiting approval") return "Needs approval"
  if (state === "At risk") return "At risk"
  return "On track"
}

function deriveClientHealth(
  health: ClientHealth | null,
  waitingOn: string,
  projects: Project[],
): ClientHealth {
  if (waitingOn !== "No blockers") return "At risk"
  if (projects.some((project) => project.status === "Blocked")) return "Blocked"
  return health ?? "Healthy"
}

function deriveClientStatus(status: ClientStatus | null, projects: Project[]): ClientStatus {
  if (projects.some((project) => project.status === "Blocked")) return "Blocked"
  if (projects.some((project) => project.status === "Waiting")) return "Waiting"
  return status ?? "Active"
}

function deterministicId(prefix: string, ...parts: string[]) {
  return `${prefix}:${parts.join(":")}`
}

function displayType(typeValue: string) {
  return typeValue.charAt(0).toUpperCase() + typeValue.slice(1)
}

function fileIcon(format: string): PortalData["files"][number]["icon"] {
  if (format === "PNG") return "image"
  if (format === "ZIP") return "upload"
  return "document"
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date)
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(cents / 100)
}

function formatWeekday(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date)
}

function groupActivity(rows: Awaited<ReturnType<typeof getActivityRows>>): Project["timelineEvents"] {
  const groups = new Map<string, Project["timelineEvents"][number]["items"]>()
  for (const row of rows) {
    const date = dateGroupLabel(row.occurred_at)
    const items = groups.get(date) ?? []
    items.push({
      title: row.title,
      detail: row.detail ?? "",
      time: relativeTime(row.occurred_at),
      type: projectEventType(row.type),
    })
    groups.set(date, items)
  }
  return Array.from(groups.entries()).map(([date, items]) => ({ date, items }))
}

function groupDeliverables(rows: Awaited<ReturnType<typeof getDeliverableRows>>): Project["deliverables"] {
  const groups = new Map<string, Project["deliverables"][number]["items"]>()
  for (const row of rows) {
    const key = row.group_label || "Upcoming"
    const items = groups.get(key) ?? []
    items.push({
      title: row.title,
      due: row.due_label ?? "Not scheduled",
      phase: projectPhase(row.phase),
      status: deliverableStatus(row.status),
    })
    groups.set(key, items)
  }
  return Array.from(groups.entries()).map(([week, items]) => ({ week, items }))
}

function deliverableStatus(status: string): Project["deliverables"][number]["items"][number]["status"] {
  if (status === "Delivered") return "Delivered"
  if (status === "In progress") return "In progress"
  if (status === "Waiting approval") return "Waiting approval"
  return "Scheduled"
}

function dateGroupLabel(date: Date) {
  const days = (Date.now() - date.getTime()) / 86_400_000
  if (days < 1) return "Today"
  if (days < 2) return "Yesterday"
  return formatDateLabel(date)
}

function inboxActivityIcon(typeValue: string): InboxActivityItem["icon"] {
  if (typeValue === "approval") return "approval"
  if (typeValue === "comment" || typeValue === "request") return "comment"
  if (typeValue === "phase") return "phase"
  if (typeValue === "share") return "share"
  if (typeValue === "upload") return "upload"
  return "send"
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

function jsonArray<T>(value: T[] | unknown | null | undefined): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function lastSevenDays() {
  const days: string[] = []
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - index)
    days.push(formatWeekday(date))
  }
  return days
}

function percent(used: number, total: number) {
  if (!total) return 0
  return Math.min(100, Math.round((used / total) * 100))
}

function notificationType(value: string): Notification["type"] {
  if (value === "approval") return "approval"
  if (value === "comment") return "comment"
  if (value === "portal") return "portal"
  if (value === "billing") return "billing"
  if (value === "file") return "file"
  if (value === "team") return "team"
  return "portal"
}

function phaseState(name: ProjectPhase, current: ProjectPhase): Project["phases"][number]["state"] {
  const currentIndex = PROJECT_PHASES.indexOf(current)
  const index = PROJECT_PHASES.indexOf(name)
  if (index < currentIndex) return "complete"
  if (index === currentIndex) return "current"
  return "upcoming"
}

function portalActivityIcon(typeValue: string): PortalData["activity"][number]["icon"] {
  if (typeValue === "approval") return "approved"
  if (typeValue === "download") return "download"
  if (typeValue === "upload") return "upload"
  return "viewed"
}

function portalTone(status: string): PortalTone {
  if (status.toLowerCase().includes("blocked") || status.toLowerCase().includes("waiting")) return "blocked"
  if (status.toLowerCase().includes("approval") || status.toLowerCase().includes("review")) return "attention"
  return "healthy"
}

function previewLabelForTemplate(template: string) {
  if (template === "branding") return "Brand"
  if (template === "seo") return "Content"
  if (template === "retainer") return "Content"
  return "Homepage"
}

function previewType(value: string | null | undefined): Portal["preview"]["type"] {
  if (value === "brand") return "brand"
  if (value === "launch") return "launch"
  if (value === "content") return "content"
  return "homepage"
}

function previewTypeForTemplate(template: string) {
  if (template === "branding") return "brand"
  if (template === "seo" || template === "retainer") return "content"
  return "homepage"
}

function projectEventType(typeValue: string): Project["timelineEvents"][number]["items"][number]["type"] {
  if (typeValue === "approval") return "approval"
  if (typeValue === "upload") return "upload"
  if (typeValue === "delivery") return "delivery"
  if (typeValue === "phase") return "phase"
  return "comment"
}

function projectPhase(value: string): ProjectPhase {
  return PROJECT_PHASES.includes(value as ProjectPhase) ? (value as ProjectPhase) : "Strategy"
}

function projectTaskStatus(value: string): ProjectTaskStatus {
  if (value === "In progress") return "In progress"
  if (value === "Waiting") return "Waiting"
  if (value === "Blocked") return "Blocked"
  return "Ready"
}

function relativeTime(date: Date) {
  const diff = Date.now() - date.getTime()
  const minutes = Math.max(0, Math.round(diff / 60_000))
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days}d ago`
  return formatDateLabel(date)
}

function repositoryFileFormat(value: string): RepositoryFile["format"] {
  if (value === "DOCX") return "DOCX"
  if (value === "PNG") return "PNG"
  if (value === "ZIP") return "ZIP"
  return "PDF"
}

function repositoryFileStatus(value: string): RepositoryFile["status"] {
  if (value === "Needs approval") return "Needs approval"
  if (value === "Awaiting review") return "Awaiting review"
  if (value === "Missing feedback") return "Missing feedback"
  if (value === "Shared") return "Shared"
  if (value === "Not shared") return "Not shared"
  if (value === "Archived") return "Archived"
  return "Ready"
}

function repositoryFileType(value: string): RepositoryFile["type"] {
  if (value === "Design") return "Design"
  if (value === "Copy") return "Copy"
  if (value === "Handoff") return "Handoff"
  if (value === "Contract") return "Contract"
  return "Assets"
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

function tone(value: string): ActivityTone {
  if (value === "error") return "error"
  if (value === "info") return "info"
  if (value === "success") return "success"
  if (value === "warning") return "warning"
  return "default"
}

function updateGroup(date: Date): ClientUpdate["group"] {
  const days = (Date.now() - date.getTime()) / 86_400_000
  if (days < 1) return "Today"
  if (days < 2) return "Yesterday"
  if (days < 7) return "This week"
  return "Earlier"
}

function overviewProjectStatus(project: Project): OverviewProject["status"] {
  if (project.status === "Complete") return "complete"
  if (project.status === "Blocked") return "blocked"
  if (project.status === "Waiting") return "waiting"
  if (project.approvals.some((approval) => approval.status === "Waiting")) return "review"
  return "active"
}
