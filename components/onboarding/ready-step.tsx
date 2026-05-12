import { Button } from "@/components/ui/button"
import { FactCard } from "./fact-card"
import { SectionIntro } from "./section-intro"

export function ReadyStep({
  workspace,
  workType,
  client,
  project,
  saving,
  error,
  onBack,
  onFinish,
}: {
  workspace: string
  workType: string
  client: string
  project: string
  saving: boolean
  error: string | null
  onBack: () => void
  onFinish: () => void
}) {
  return (
    <>
      <SectionIntro eyebrow="You're set" title={`Welcome to ${workspace}.`}>
        Review the setup below. Briefly will save this and take you into the
        dashboard.
      </SectionIntro>

      <div className="mt-8 grid grid-cols-2 gap-2">
        <FactCard label="Workspace" value={workspace} />
        <FactCard label="Work" value={workType} />
        <FactCard label="Client" value={client} />
        <FactCard label="Project" value={project} />
      </div>

      {error ? (
        <p className="mt-5 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" type="button" onClick={onBack} disabled={saving}>
          Back
        </Button>
        <Button type="button" size="lg" onClick={onFinish} disabled={saving}>
          {saving ? "Saving..." : "Take me in"}
        </Button>
      </div>
    </>
  )
}
