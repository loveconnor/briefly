import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { WorkType } from "@/lib/onboarding"
import { workOptions } from "./onboarding-data"
import { SectionIntro } from "./section-intro"

export function WorkTypeStep({
  selected,
  onPick,
  onContinue,
}: {
  selected: WorkType | null
  onPick: (value: WorkType) => void
  onContinue: () => void
}) {
  return (
    <>
      <SectionIntro eyebrow="Shape the workspace" title="What kind of work do you do?">
        We will tailor Briefly around your workflow.
      </SectionIntro>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {workOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onPick(option.value)}
            className={cn(
              "relative rounded-md border px-3 py-3 text-left transition-colors",
              selected === option.value
                ? "border-foreground bg-foreground text-background"
                : "border-border/70 bg-background/40 hover:border-foreground/40",
              option.value === "other" && "sm:col-span-2",
            )}
          >
            <span className="block text-sm font-medium">{option.label}</span>
            <span
              className={cn(
                "mt-1 block text-xs",
                selected === option.value
                  ? "text-background/70"
                  : "text-muted-foreground",
              )}
            >
              {option.description}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onContinue}>
          Skip for now
        </Button>
        <Button type="button" size="lg" onClick={onContinue} disabled={!selected}>
          Continue
        </Button>
      </div>
    </>
  )
}
