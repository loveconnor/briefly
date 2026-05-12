import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getInitials, isValidEmail } from "./onboarding-utils"
import { SectionIntro } from "./section-intro"

export function ClientStep({
  name,
  email,
  company,
  onNameChange,
  onEmailChange,
  onCompanyChange,
  onContinue,
  onBack,
}: {
  name: string
  email: string
  company: string
  onNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onCompanyChange: (value: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const ready = Boolean(name.trim() && isValidEmail(email))

  return (
    <>
      <SectionIntro eyebrow="Bring a client with you" title="Add your first client">
        Optional, but adding one now lets Briefly create the first client record.
      </SectionIntro>

      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
          if (ready) onContinue()
        }}
        className="mt-8 flex flex-col gap-4"
      >
        <ClientInput label="Name" value={name} onChange={onNameChange} />
        <ClientInput
          label="Email"
          value={email}
          onChange={onEmailChange}
          type="email"
        />
        <ClientInput label="Company" value={company} onChange={onCompanyChange} />

        <div className="rounded-md border border-border/70 bg-background/40 px-3 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Client
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground">
              {getInitials(name)}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{name || "Client name"}</div>
              <div className="truncate text-xs text-muted-foreground">
                {email || "Email address"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button variant="ghost" type="button" onClick={onBack}>
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={onContinue}>
              Skip
            </Button>
            <Button type="submit" size="lg" disabled={!ready}>
              Continue
            </Button>
          </div>
        </div>
      </form>
    </>
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
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label === "Email" ? "client@example.com" : label}
        size="lg"
      />
    </div>
  )
}
