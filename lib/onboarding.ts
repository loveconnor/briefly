import { db } from "@/lib/db"
import { syncOnboardingToAppData } from "@/lib/app-data"

export type WorkType =
  | "web-dev"
  | "designer"
  | "seo"
  | "marketing"
  | "video"
  | "consultant"
  | "other"

export type ProjectTemplate =
  | "web-design"
  | "web-dev"
  | "seo"
  | "branding"
  | "retainer"
  | "custom"

export type OnboardingPayload = {
  workType?: WorkType | null
  businessName?: string | null
  brandColor?: string | null
  logoDataUrl?: string | null
  firstClient?: {
    name: string
    email: string
    company?: string | null
  } | null
  firstProject?: {
    name: string
    template: ProjectTemplate
    duration?: string | null
    milestones?: { text: string; week: string; done: boolean }[]
  } | null
}

export type OnboardingStatus = {
  completed: boolean
  profile: {
    workType: string | null
    businessName: string | null
    brandColor: string | null
  } | null
}

const DEFAULT_BRAND_COLOR = "#6366f1"

export async function ensureOnboardingTables() {
  await db.query(`
    create table if not exists onboarding_profiles (
      user_id text primary key,
      work_type text,
      business_name text,
      brand_color text not null default '${DEFAULT_BRAND_COLOR}',
      logo_data_url text,
      completed_at timestamptz,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists onboarding_first_clients (
      user_id text primary key,
      name text not null,
      email text not null,
      company text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)

  await db.query(`
    create table if not exists onboarding_first_projects (
      user_id text primary key,
      name text not null,
      template text not null,
      duration text,
      milestones jsonb not null default '[]'::jsonb,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `)
}

export async function getOnboardingStatus(
  userId: string,
): Promise<OnboardingStatus> {
  await ensureOnboardingTables()

  const result = await db.query<{
    work_type: string | null
    business_name: string | null
    brand_color: string | null
    completed_at: Date | null
  }>(
    `
      select work_type, business_name, brand_color, completed_at
      from onboarding_profiles
      where user_id = $1
      limit 1
    `,
    [userId],
  )

  const row = result.rows[0]

  return {
    completed: Boolean(row?.completed_at),
    profile: row
      ? {
          workType: row.work_type,
          businessName: row.business_name,
          brandColor: row.brand_color,
        }
      : null,
  }
}

export async function saveOnboarding(userId: string, payload: OnboardingPayload) {
  await ensureOnboardingTables()

  await db.query(
    `
      insert into onboarding_profiles (
        user_id,
        work_type,
        business_name,
        brand_color,
        logo_data_url,
        completed_at,
        updated_at
      )
      values ($1, $2, $3, $4, $5, now(), now())
      on conflict (user_id) do update set
        work_type = excluded.work_type,
        business_name = excluded.business_name,
        brand_color = excluded.brand_color,
        logo_data_url = excluded.logo_data_url,
        completed_at = now(),
        updated_at = now()
    `,
    [
      userId,
      payload.workType ?? null,
      cleanString(payload.businessName),
      cleanString(payload.brandColor) ?? DEFAULT_BRAND_COLOR,
      cleanString(payload.logoDataUrl),
    ],
  )

  if (payload.firstClient) {
    await db.query(
      `
        insert into onboarding_first_clients (
          user_id,
          name,
          email,
          company,
          updated_at
        )
        values ($1, $2, $3, $4, now())
        on conflict (user_id) do update set
          name = excluded.name,
          email = excluded.email,
          company = excluded.company,
          updated_at = now()
      `,
      [
        userId,
        payload.firstClient.name.trim(),
        payload.firstClient.email.trim().toLowerCase(),
        cleanString(payload.firstClient.company),
      ],
    )
  }

  if (payload.firstProject) {
    await db.query(
      `
        insert into onboarding_first_projects (
          user_id,
          name,
          template,
          duration,
          milestones,
          updated_at
        )
        values ($1, $2, $3, $4, $5::jsonb, now())
        on conflict (user_id) do update set
          name = excluded.name,
          template = excluded.template,
          duration = excluded.duration,
          milestones = excluded.milestones,
          updated_at = now()
      `,
      [
        userId,
        payload.firstProject.name.trim(),
        payload.firstProject.template,
        cleanString(payload.firstProject.duration),
        JSON.stringify(payload.firstProject.milestones ?? []),
      ],
    )
  }

  await syncOnboardingToAppData(userId)
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}
