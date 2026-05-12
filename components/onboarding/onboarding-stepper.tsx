import { cn } from "@/lib/utils"
import { STEPS } from "./onboarding-data"

export function OnboardingStepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
      <span>
        Step {String(step + 1).padStart(2, "0")} / {STEPS.length}
      </span>
      <div className="ml-2 flex items-center gap-1.5" aria-hidden>
        {STEPS.map((name, index) => (
          <span
            key={name}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === step
                ? "w-5 bg-foreground"
                : index < step
                  ? "w-1.5 bg-foreground/70"
                  : "w-1.5 bg-foreground/20",
            )}
          />
        ))}
      </div>
    </div>
  )
}
