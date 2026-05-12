"use client"

import { type ChangeEvent, type KeyboardEvent, useState } from "react"
import { useRouter } from "next/navigation"
import {
  bumpParticleTypingImpulse,
  pulseParticleSubmitImpulse,
} from "@/components/auth/particle-field"
import { AuthShell, useAuthTypingImpulse } from "@/components/auth/auth-shell"
import type { OnboardingPayload, ProjectTemplate, WorkType } from "@/lib/onboarding"
import { BrandStep } from "./brand-step"
import { ClientStep } from "./client-step"
import { STEPS, STEP_PARTICLE_ASSETS, templates, workOptions } from "./onboarding-data"
import { OnboardingStepper } from "./onboarding-stepper"
import { isValidEmail } from "./onboarding-utils"
import { ProjectStep } from "./project-step"
import { ReadyStep } from "./ready-step"
import { WorkTypeStep } from "./work-type-step"

export function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const particleAsset = STEP_PARTICLE_ASSETS[STEPS[step]]

  return (
    <AuthShell variant="onboarding" assetSrc={particleAsset}>
      <OnboardingForm step={step} onStepChange={setStep} />
    </AuthShell>
  )
}

function OnboardingForm({
  step,
  onStepChange,
}: {
  step: number
  onStepChange: (nextStep: number | ((current: number) => number)) => void
}) {
  const router = useRouter()
  const typingImpulse = useAuthTypingImpulse()
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
  const portalName = businessName.trim() || "Untitled"
  const selectedWork = workOptions.find((option) => option.value === workType)
  const savedClientName =
    clientName.trim() && isValidEmail(clientEmail) ? clientName.trim() : "Later"
  const savedProjectName = activeTemplate && projectName ? projectName : "Later"

  const next = () => {
    pulseParticleSubmitImpulse(typingImpulse)
    onStepChange((current) => Math.min(current + 1, STEPS.length - 1))
  }

  const back = () => onStepChange((current) => Math.max(current - 1, 0))

  async function finish() {
    const payload: OnboardingPayload = {
      workType,
      businessName: businessName || null,
      brandColor,
      logoDataUrl,
      firstClient:
        !isValidEmail(clientEmail) || !clientName.trim()
          ? null
          : {
              name: clientName,
              email: clientEmail,
              company: clientCompany || null,
            },
      firstProject:
        !activeTemplate || !projectName
          ? null
          : {
              name: projectName,
              template: activeTemplate.value,
              duration: activeTemplate.duration,
              milestones: activeTemplate.milestones,
            },
    }

    pulseParticleSubmitImpulse(typingImpulse)
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

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    bumpParticleTypingImpulse(typingImpulse, event)
  }

  return (
    <div className="w-full max-w-lg" onKeyDown={onKeyDown}>
      <OnboardingStepper step={step} />

      {step === 0 ? (
        <WorkTypeStep
          selected={workType}
          onPick={setWorkType}
          onContinue={next}
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
          onContinue={next}
          onBack={back}
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
          onContinue={next}
          onBack={back}
        />
      ) : null}

      {step === 3 ? (
        <ProjectStep
          selected={projectTemplate}
          customName={customProjectName}
          onPick={setProjectTemplate}
          onCustomNameChange={setCustomProjectName}
          onContinue={next}
          onBack={back}
        />
      ) : null}

      {step === 4 ? (
        <ReadyStep
          workspace={portalName}
          workType={selectedWork?.label ?? "Not set"}
          client={savedClientName}
          project={savedProjectName}
          saving={saving}
          error={error}
          onBack={back}
          onFinish={finish}
        />
      ) : null}
    </div>
  )
}
