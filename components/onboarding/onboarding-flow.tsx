"use client"

import { useMemo, useState, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { OnboardingPayload, ProjectTemplate, WorkType } from "@/lib/onboarding"

type WorkOption = {
  value: WorkType
  label: string
  description: string
}

type Template = {
  value: ProjectTemplate
  label: string
  description: string
  title: string
  color: string
  duration: string
  milestones: { text: string; week: string; done: boolean }[]
}

const workOptions: WorkOption[] = [
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

const templates: Template[] = [
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

const brandColors = [
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

export function OnboardingFlow() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [workType, setWorkType] = useState<WorkType | null>(null)
  const [businessName, setBusinessName] = useState("")
  const [brandColor, setBrandColor] = useState("#6366f1")
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientCompany, setClientCompany] = useState("")
  const [projectTemplate, setProjectTemplate] = useState<ProjectTemplate | null>(
    null,
  )
  const [customProjectName, setCustomProjectName] = useState("")

  const activeTemplate = templates.find((item) => item.value === projectTemplate)
  const projectName =
    projectTemplate === "custom"
      ? customProjectName.trim()
      : activeTemplate?.title ?? ""
  const portalName = businessName.trim() || "Apex Studio"

  async function finish(options?: { skipClient?: boolean; skipProject?: boolean }) {
    const payload: OnboardingPayload = {
      workType,
      businessName: businessName || null,
      brandColor,
      logoDataUrl,
      firstClient:
        options?.skipClient || !isValidEmail(clientEmail) || !clientName.trim()
          ? null
          : {
              name: clientName,
              email: clientEmail,
              company: clientCompany || null,
            },
      firstProject:
        options?.skipProject || !activeTemplate || !projectName
          ? null
          : {
              name: projectName,
              template: activeTemplate.value,
              duration: activeTemplate.duration,
              milestones: activeTemplate.milestones,
            },
    }

    setSaving(true)
    setError(null)

    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setSaving(false)
      setError("Could not save onboarding. Please try again.")
      return
    }

    router.refresh()
  }

  function onLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setLogoDataUrl(String(reader.result))
    reader.readAsDataURL(file)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <section className="w-full">
          {step === 0 ? (
            <WorkTypeStep
              selected={workType}
              onPick={setWorkType}
              onContinue={() => setStep(1)}
              onSkip={() => setStep(1)}
            />
          ) : null}

          {step === 1 ? (
            <BrandStep
              businessName={businessName}
              brandColor={brandColor}
              logoDataUrl={logoDataUrl}
              portalName={portalName}
              onBusinessNameChange={setBusinessName}
              onBrandColorChange={setBrandColor}
              onLogoChange={onLogoChange}
              onContinue={() => setStep(2)}
              onSkip={() => setStep(2)}
            />
          ) : null}

          {step === 2 ? (
            <ClientStep
              name={clientName}
              email={clientEmail}
              company={clientCompany}
              onNameChange={setClientName}
              onEmailChange={setClientEmail}
              onCompanyChange={setClientCompany}
              onContinue={() => setStep(3)}
              onSkip={() => setStep(3)}
            />
          ) : null}

          {step === 3 ? (
            <ProjectStep
              selected={projectTemplate}
              customName={customProjectName}
              onPick={setProjectTemplate}
              onCustomNameChange={setCustomProjectName}
              onFinish={() => finish()}
              onSkip={() => finish({ skipProject: true })}
              saving={saving}
            />
          ) : null}

          {error ? (
            <p className="border-t border-border px-8 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </section>
      </div>
    </main>
  )
}

function WorkTypeStep({
  selected,
  onPick,
  onContinue,
  onSkip,
}: {
  selected: WorkType | null
  onPick: (value: WorkType) => void
  onContinue: () => void
  onSkip: () => void
}) {
  return (
    <div className="flex min-h-[580px] flex-col items-center justify-center px-6 py-10">
      <StepDots current={0} />
      <h1 className="font-heading text-[28px] leading-tight tracking-normal">
        What kind of work do you <em className="text-muted-foreground">do?</em>
      </h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        We will tailor your experience around your workflow.
      </p>

      <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
        {workOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant="outline"
            onClick={() => onPick(option.value)}
            className={cn(
              "h-auto justify-start whitespace-normal rounded-lg p-4 text-left",
              selected === option.value
                ? "border-primary bg-accent/50 ring-1 ring-primary"
                : "border-border bg-background",
              option.value === "other" && "sm:col-span-2",
            )}
          >
            <span className="flex w-full flex-col items-start">
              <span className="flex size-9 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground">
                <WorkIcon type={option.value} />
              </span>
              <span className="mt-3 block text-sm font-medium text-foreground">
                {option.label}
              </span>
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                {option.description}
              </span>
            </span>
            {selected === option.value ? (
              <Badge className="absolute right-3 top-3" size="sm">
                Selected
              </Badge>
            ) : null}
          </Button>
        ))}
      </div>

      <Button className="mt-7" size="xl" onClick={onContinue} disabled={!selected}>
        Continue
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onSkip} className="mt-2">
        Skip for now
      </Button>
    </div>
  )
}

function BrandStep({
  businessName,
  brandColor,
  logoDataUrl,
  portalName,
  onBusinessNameChange,
  onBrandColorChange,
  onLogoChange,
  onContinue,
  onSkip,
}: {
  businessName: string
  brandColor: string
  logoDataUrl: string | null
  portalName: string
  onBusinessNameChange: (value: string) => void
  onBrandColorChange: (value: string) => void
  onLogoChange: (event: ChangeEvent<HTMLInputElement>) => void
  onContinue: () => void
  onSkip: () => void
}) {
  return (
    <div className="grid min-h-[620px] grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col border-border p-8 md:border-r">
        <StepDots current={1} />
        <h1 className="font-heading text-2xl leading-tight">
          Brand your <em className="text-muted-foreground">portal.</em>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Watch it come to life as you type.
        </p>

        <div className="mt-7 space-y-2">
          <Label
            htmlFor="business-name"
            className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            Business name
          </Label>
          <Input
            id="business-name"
            value={businessName}
            onChange={(event) => onBusinessNameChange(event.target.value)}
            placeholder="e.g. Apex Studio"
            maxLength={32}
            size="lg"
          />
        </div>

        <div className="mt-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Brand color
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Label
              className="relative size-10 overflow-hidden rounded-lg border border-input shadow-xs"
              style={{ backgroundColor: brandColor }}
            >
              <input
                type="color"
                value={brandColor}
                onChange={(event) => onBrandColorChange(event.target.value)}
                className="absolute -inset-1 size-12 cursor-pointer opacity-0"
              />
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {brandColors.map((color) => (
                <Button
                  key={color}
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`Use ${color}`}
                  onClick={() => onBrandColorChange(color)}
                  className="size-6 rounded-full p-0 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    borderColor:
                      brandColor === color ? "var(--foreground)" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <Label className="mt-5 block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>Logo</span>
          <span className="mt-2 flex h-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-border bg-muted text-sm normal-case tracking-normal text-muted-foreground transition-colors hover:border-ring">
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                alt="Logo preview"
                className="max-h-14 max-w-36 rounded object-contain"
              />
            ) : (
              "Click to upload your logo"
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onLogoChange}
              className="sr-only"
            />
          </span>
        </Label>

        <div className="mt-auto pt-8">
          <Button type="button" size="xl" onClick={onContinue} className="w-full">
            Next step
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onSkip} className="mt-2 w-full">
            Set up later
          </Button>
        </div>
      </div>

      <PortalPreview
        businessName={portalName}
        brandColor={brandColor}
        logoDataUrl={logoDataUrl}
      />
    </div>
  )
}

function PortalPreview({
  businessName,
  brandColor,
  logoDataUrl,
}: {
  businessName: string
  brandColor: string
  logoDataUrl: string | null
}) {
  return (
    <div className="flex flex-col bg-muted p-6">
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" />
        Live preview
      </p>

      <Card
        variant="outline"
        className="mt-4 flex min-h-0 flex-1 gap-0 overflow-hidden rounded-lg py-0"
      >
        <div className="flex h-9 items-center gap-1.5 border-b border-border bg-muted px-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            yourportal.app/{slugify(businessName)}
          </span>
        </div>

        <div
          className="flex h-14 items-center gap-3 px-4 text-white"
          style={{ backgroundColor: brandColor }}
        >
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-lg bg-white/20 text-xs font-medium">
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              getInitials(businessName)
            )}
          </div>
          <p className="truncate text-sm font-medium">{businessName}</p>
          <div className="ml-auto hidden gap-4 text-[11px] text-white/65 sm:flex">
            <span>Dashboard</span>
            <span>Projects</span>
            <span>Settings</span>
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-3 p-4">
          <div
            className="rounded-lg p-4 text-white"
            style={{ backgroundColor: brandColor }}
          >
            <p className="text-sm font-medium">Welcome back to {businessName}</p>
            <p className="mt-1 text-xs font-light text-white/65">
              Here is what is happening today.
            </p>
            <span className="mt-3 inline-flex h-7 items-center rounded border border-white/25 bg-white/15 px-3 text-xs">
              View projects
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["Active projects", "Clients", "Revenue"].map((label, index) => (
              <Card key={label} variant="outline" className="gap-1 rounded-lg p-3 py-3 shadow-none">
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="mt-1 text-base font-medium">
                  {index === 0 ? "12" : index === 1 ? "8" : "$24k"}
                </p>
              </Card>
            ))}
          </div>

          <Card variant="outline" className="flex-1 gap-0 rounded-lg p-3 py-3 shadow-none">
            <p className="text-xs font-medium text-muted-foreground">Recent activity</p>
            {["New client onboarded", "Invoice #42 sent", "Project approved"].map(
              (activity, index) => (
                <div
                  key={activity}
                  className="flex items-center gap-2 border-b border-border py-2 last:border-b-0"
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: brandColor, opacity: 1 - index * 0.25 }}
                  />
                  <span className="text-[11px] text-muted-foreground">{activity}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/70">
                    {index === 0 ? "2m ago" : index === 1 ? "1h ago" : "3h ago"}
                  </span>
                </div>
              ),
            )}
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

function ClientStep({
  name,
  email,
  company,
  onNameChange,
  onEmailChange,
  onCompanyChange,
  onContinue,
  onSkip,
}: {
  name: string
  email: string
  company: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onCompanyChange: (value: string) => void
  onContinue: () => void
  onSkip: () => void
}) {
  const ready = Boolean(name.trim() && isValidEmail(email))

  return (
    <div className="mx-auto flex min-h-[560px] w-full max-w-md flex-col justify-center px-6 py-10">
      <StepDots current={2} />
      <h1 className="font-heading text-[28px] leading-tight">
        Add your <em className="text-muted-foreground">first client.</em>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Just the essentials. You can add more details later.
      </p>

      <Card variant="outline" className="mt-8 gap-0 overflow-hidden rounded-lg py-0 shadow-none">
        <CardHeader className="flex grid-cols-none flex-row items-center gap-3 border-b border-border px-5 py-4">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-full border text-xs font-medium",
              name.trim()
                ? "border-transparent bg-info/8 text-info-foreground"
                : "border-border bg-muted text-muted-foreground",
            )}
          >
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "truncate text-sm font-medium",
                name.trim() ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {name || "Client name"}
            </p>
            <p
              className={cn(
                "truncate text-xs",
                company.trim() ? "text-muted-foreground" : "text-muted-foreground/70",
              )}
            >
              {company || "Company"}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-5">
          <ClientInput label="Name" value={name} onChange={onNameChange} />
          <ClientInput
            label="Email"
            value={email}
            onChange={onEmailChange}
            type="email"
          />
          <ClientInput label="Company" value={company} onChange={onCompanyChange} />
        </CardContent>
      </Card>

      <p className="mt-4 min-h-5 text-center text-xs text-muted-foreground">
        {isValidEmail(email) ? (
          <>
            Sending invite to{" "}
            <strong className="font-medium text-foreground">{email}</strong>
          </>
        ) : null}
      </p>

      <Button className="mt-4 w-full" size="xl" onClick={onContinue} disabled={!ready}>
        Add client and continue
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={onSkip} className="mt-2">
        I will add clients later
      </Button>
    </div>
  )
}

function ClientInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label === "Email" ? "Email address" : label}
        size="lg"
      />
    </div>
  )
}

function ProjectStep({
  selected,
  customName,
  onPick,
  onCustomNameChange,
  onFinish,
  onSkip,
  saving,
}: {
  selected: ProjectTemplate | null
  customName: string
  onPick: (value: ProjectTemplate) => void
  onCustomNameChange: (value: string) => void
  onFinish: () => void
  onSkip: () => void
  saving: boolean
}) {
  const activeTemplate = templates.find((item) => item.value === selected)
  const ready = Boolean(
    selected && (selected !== "custom" || customName.trim().length > 0),
  )

  return (
    <div className="grid min-h-[620px] grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col border-border p-8 md:border-r">
        <StepDots current={3} />
        <h1 className="font-heading text-2xl leading-tight">
          Start with a <em className="text-muted-foreground">template.</em>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick one and your project is ready to go.
        </p>

        <p className="mt-7 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Choose a template
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {templates.map((template) => (
            <Button
              key={template.value}
              type="button"
              variant="outline"
              onClick={() => onPick(template.value)}
              className={cn(
                "h-auto justify-start whitespace-normal rounded-md p-3 text-left",
                selected === template.value
                  ? "border-primary bg-accent/50 ring-1 ring-primary"
                  : "border-border bg-background",
              )}
            >
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {template.label}
                </span>
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  {template.description}
                </span>
              </span>
            </Button>
          ))}
        </div>

        {selected === "custom" ? (
          <div className="mt-4 space-y-2">
            <Label
              htmlFor="custom-project-name"
              className="text-xs text-muted-foreground"
            >
              Project name
            </Label>
            <Input
              id="custom-project-name"
              value={customName}
              onChange={(event) => onCustomNameChange(event.target.value)}
              placeholder="Name your project..."
              maxLength={48}
              size="lg"
            />
          </div>
        ) : null}

        <div className="mt-auto pt-8">
          <Button
            type="button"
            size="xl"
            onClick={onFinish}
            disabled={!ready || saving}
            className="w-full"
          >
            {saving ? "Saving..." : "Create project and go to dashboard"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onSkip}
            disabled={saving}
            className="mt-2 w-full"
          >
            I will create a project later
          </Button>
        </div>
      </div>

      <ProjectPreview template={activeTemplate} customName={customName} />
    </div>
  )
}

function ProjectPreview({
  template,
  customName,
}: {
  template: Template | undefined
  customName: string
}) {
  const title = useMemo(() => {
    if (!template) return "Pick a template to begin"
    if (template.value === "custom") return customName.trim() || "Untitled project"
    return template.title
  }, [customName, template])

  const endDate = useMemo(() => getEndDate(template), [template])

  return (
    <div className="flex flex-col bg-muted p-6">
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" />
        Project preview
      </p>

      <Card
        variant="outline"
        className="mt-4 flex flex-1 gap-0 overflow-hidden rounded-lg py-0"
      >
        <CardHeader className="border-b border-border p-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            New project{" "}
            <Badge
              variant="outline"
              size="sm"
              className="ml-1 normal-case tracking-normal"
              style={{
                backgroundColor: hexToRgba(template?.color ?? "#6366f1", 0.12),
                color: template?.color ?? "#6366f1",
              }}
            >
              In progress
            </Badge>
          </p>
          <p
            className={cn(
              "mt-2 text-lg font-medium",
              template ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {title}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Milestones
            </p>
            {(template?.milestones ?? placeholderMilestones).map((milestone) => (
              <div
                key={`${milestone.text}-${milestone.week}`}
                className="flex items-center gap-3 border-b border-border py-2 last:border-b-0"
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full border text-[8px]"
                  style={{
                    backgroundColor: milestone.done
                      ? template?.color ?? "#6366f1"
                      : "transparent",
                    borderColor: milestone.done
                      ? template?.color ?? "#6366f1"
                      : "rgba(0,0,0,0.18)",
                    color: "#fff",
                  }}
                >
                  {milestone.done ? "ok" : ""}
                </span>
                <span className="flex-1 text-xs text-muted-foreground">
                  {milestone.text}
                </span>
                <Badge variant="secondary" size="sm">
                  {milestone.week}
                </Badge>
              </div>
            ))}
          </div>

          <Separator className="mt-auto" />
          <div className="grid grid-cols-3 gap-3 text-[11px] text-muted-foreground">
            <span>Your client</span>
            <span>{endDate}</span>
            <span>{template?.duration ?? "-"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const placeholderMilestones = [
  { text: "-", week: "Week 1", done: false },
  { text: "-", week: "Week 2", done: false },
  { text: "-", week: "Week 3", done: false },
]

function StepDots({ current }: { current: number }) {
  return (
    <div
      className="mb-8 flex w-full max-w-56 flex-col gap-2"
      aria-label={`Step ${current + 1} of 4`}
    >
      <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span>Setup</span>
        <span>{current + 1}/4</span>
      </div>
      <Progress value={(current + 1) * 25} />
    </div>
  )
}

function WorkIcon({ type }: { type: WorkType }) {
  const common = {
    className: "size-4",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  switch (type) {
    case "web-dev":
      return (
        <svg {...common}>
          <path d="m8 9-3 3 3 3" />
          <path d="m16 9 3 3-3 3" />
          <path d="m14 5-4 14" />
        </svg>
      )
    case "designer":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      )
    case "seo":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" />
          <path d="M8.5 12.5 10.5 10l2 1.5 2.5-4" />
        </svg>
      )
    case "marketing":
      return (
        <svg {...common}>
          <path d="M4 14h3l8 4V6l-8 4H4z" />
          <path d="M7 14v4" />
          <path d="M18 9.5c.7.7 1 1.5 1 2.5s-.3 1.8-1 2.5" />
        </svg>
      )
    case "video":
      return (
        <svg {...common}>
          <rect width="13" height="10" x="3" y="7" rx="2" />
          <path d="m16 10 5-3v10l-5-3z" />
        </svg>
      )
    case "consultant":
      return (
        <svg {...common}>
          <path d="M10 6h4a2 2 0 0 1 2 2v1H8V8a2 2 0 0 1 2-2Z" />
          <rect width="18" height="11" x="3" y="9" rx="2" />
          <path d="M3 13h18" />
        </svg>
      )
    case "other":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
        </svg>
      )
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function slugify(name: string) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || "your-portal"
  )
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getEndDate(template: Template | undefined) {
  if (!template) return "-"
  if (template.duration === "Ongoing") return "Ongoing"

  const amount = Number.parseInt(template.duration, 10)
  const days = template.duration.includes("month") ? amount * 30 : amount * 7
  const end = new Date()
  end.setDate(end.getDate() + days)

  return end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}
