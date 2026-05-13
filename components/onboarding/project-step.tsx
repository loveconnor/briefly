import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ProjectTemplate } from "@/lib/onboarding"
import { templates, type OnboardingTemplate } from "./onboarding-data"
import { hexToRgba } from "./onboarding-utils"
import { SectionIntro } from "./section-intro"

export function ProjectStep({
  selected,
  customName,
  onPick,
  onCustomNameChange,
  onContinue,
  onBack,
}: {
  selected: ProjectTemplate | null
  customName: string
  onPick: (value: ProjectTemplate) => void
  onCustomNameChange: (value: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const activeTemplate = templates.find((item) => item.value === selected)
  const ready = Boolean(
    selected && (selected !== "custom" || customName.trim().length > 0),
  )

  return (
    <>
      <SectionIntro eyebrow="Start with structure" title="Choose a project template">
        Pick one and Briefly will create a starter project with milestones.
      </SectionIntro>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {templates.map((template) => (
          <button
            key={template.value}
            type="button"
            onClick={() => onPick(template.value)}
            className={cn(
              "rounded-md border px-3 py-3 text-left transition-colors",
              selected === template.value
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-background/40 hover:border-foreground/40",
            )}
          >
            <span className="block text-sm font-medium">{template.label}</span>
            <span
              className={cn(
                "mt-1 block text-xs",
                selected === template.value
                  ? "text-background/70"
                  : "text-muted-foreground",
              )}
            >
              {template.description}
            </span>
          </button>
        ))}
      </div>

      {selected === "custom" ? (
        <div className="mt-5 flex flex-col gap-1.5">
          <Label htmlFor="custom-project-name">Project name</Label>
          <Input
            id="custom-project-name"
            value={customName}
            onChange={(event) => onCustomNameChange(event.target.value)}
            placeholder="Name your project"
            maxLength={48}
          />
        </div>
      ) : null}

      {activeTemplate ? (
        <MilestonePreview template={activeTemplate} customName={customName} />
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-border/70 bg-background/30 px-3 py-6 text-center text-xs text-muted-foreground">
          Pick a template or skip. You can always create projects later.
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" type="button" onClick={onBack}>
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onContinue}>
            Skip
          </Button>
          <Button type="button" size="lg" onClick={onContinue} disabled={!ready}>
            Continue
          </Button>
        </div>
      </div>
    </>
  )
}

function MilestonePreview({
  template,
  customName,
}: {
  template: OnboardingTemplate
  customName: string
}) {
  const title = useMemo(() => {
    if (template.value === "custom") return customName.trim() || "Untitled project"
    return template.title
  }, [customName, template])

  return (
    <div className="mt-5 rounded-md border border-border/70 bg-background/40 px-3 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Project
          </div>
          <div className="mt-1 truncate font-heading text-sm">{title}</div>
        </div>
        <span
          className="rounded border px-2 py-1 text-[10px] font-medium"
          style={{
            borderColor: hexToRgba(template.color, 0.25),
            color: template.color,
          }}
        >
          {template.duration}
        </span>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {template.milestones.map((milestone) => (
          <li
            key={`${milestone.text}-${milestone.week}`}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: template.color }}
            />
            <span className="min-w-0 flex-1 truncate">{milestone.text}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
              {milestone.week}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
