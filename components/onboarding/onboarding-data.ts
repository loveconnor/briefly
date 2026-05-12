import type { ProjectTemplate, WorkType } from "@/lib/onboarding"

export type OnboardingStep = (typeof STEPS)[number]

export type WorkOption = {
  value: WorkType
  label: string
  description: string
}

export type OnboardingTemplate = {
  value: ProjectTemplate
  label: string
  description: string
  title: string
  color: string
  duration: string
  milestones: { text: string; week: string; done: boolean }[]
}

export const STEPS = ["Work", "Brand", "Client", "Project", "Ready"] as const

export const STEP_PARTICLE_ASSETS: Record<OnboardingStep, string> = {
  Work: "/assets/clusters.png",
  Brand: "/assets/dusty-field.png",
  Client: "/assets/empty-room.png",
  Project: "/assets/team.png",
  Ready: "/assets/welcome.png",
}

export const workOptions: WorkOption[] = [
  {
    value: "web-dev",
    label: "Web developer",
    description: "Coding, APIs, frameworks",
  },
  {
    value: "designer",
    label: "Designer",
    description: "UI, brand, visual work",
  },
  {
    value: "seo",
    label: "SEO freelancer",
    description: "Rankings, audits, content",
  },
  {
    value: "marketing",
    label: "Marketing agency",
    description: "Campaigns, clients, copy",
  },
  {
    value: "video",
    label: "Video editor",
    description: "Edits, scripts, post-production",
  },
  {
    value: "consultant",
    label: "Consultant",
    description: "Strategy, advising, decks",
  },
  {
    value: "other",
    label: "Something else",
    description: "Tell us more after setup",
  },
]

export const templates: OnboardingTemplate[] = [
  {
    value: "web-design",
    label: "Website Design",
    description: "Wireframes to handoff",
    title: "Website Design",
    color: "#6366f1",
    duration: "4 weeks",
    milestones: [
      { text: "Discovery and wireframes", week: "Week 1", done: false },
      { text: "Visual design mockups", week: "Week 2-3", done: false },
      { text: "Client handoff and assets", week: "Week 4", done: false },
    ],
  },
  {
    value: "web-dev",
    label: "Website Dev",
    description: "Build, test, deploy",
    title: "Website Development",
    color: "#0ea5e9",
    duration: "6 weeks",
    milestones: [
      { text: "Repo setup and dev environment", week: "Week 1", done: false },
      { text: "Core build and integrations", week: "Week 2-4", done: false },
      { text: "QA, launch and handover", week: "Week 5-6", done: false },
    ],
  },
  {
    value: "seo",
    label: "SEO Campaign",
    description: "Audit, optimize, rank",
    title: "SEO Campaign",
    color: "#10b981",
    duration: "3 months",
    milestones: [
      {
        text: "Technical audit and keyword research",
        week: "Month 1",
        done: false,
      },
      { text: "On-page optimization", week: "Month 2", done: false },
      { text: "Link building and reporting", week: "Month 3", done: false },
    ],
  },
  {
    value: "branding",
    label: "Branding",
    description: "Logo, identity, guide",
    title: "Branding Project",
    color: "#ec4899",
    duration: "3 weeks",
    milestones: [
      { text: "Brand strategy and moodboard", week: "Week 1", done: false },
      { text: "Logo concepts and refinement", week: "Week 2", done: false },
      { text: "Brand guidelines delivery", week: "Week 3", done: false },
    ],
  },
  {
    value: "retainer",
    label: "Monthly Retainer",
    description: "Recurring deliverables",
    title: "Monthly Retainer",
    color: "#f59e0b",
    duration: "Ongoing",
    milestones: [
      { text: "Scope and deliverables agreed", week: "Month 1", done: true },
      { text: "Monthly delivery cycle", week: "Recurring", done: false },
      { text: "Monthly review and report", week: "End of month", done: false },
    ],
  },
  {
    value: "custom",
    label: "Custom",
    description: "Start from scratch",
    title: "",
    color: "#6366f1",
    duration: "TBD",
    milestones: [
      { text: "Define scope", week: "Phase 1", done: false },
      { text: "Execute and deliver", week: "Phase 2", done: false },
      { text: "Review and close", week: "Phase 3", done: false },
    ],
  },
]

export const brandColors = [
  "#6366f1",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#1d4ed8",
  "#0f172a",
]
