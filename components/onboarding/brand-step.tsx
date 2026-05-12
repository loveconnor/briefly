import type { ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { brandColors } from "./onboarding-data"
import { getInitials, slugify } from "./onboarding-utils"
import { SectionIntro } from "./section-intro"

export function BrandStep({
  businessName,
  brandColor,
  logoDataUrl,
  portalName,
  onBusinessNameChange,
  onBrandColorChange,
  onLogoChange,
  onContinue,
  onBack,
}: {
  businessName: string
  brandColor: string
  logoDataUrl: string | null
  portalName: string
  onBusinessNameChange: (value: string) => void
  onBrandColorChange: (value: string) => void
  onLogoChange: (event: ChangeEvent<HTMLInputElement>) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <>
      <SectionIntro eyebrow="Name your workspace" title="What are we calling it?">
        Add the basics now. You can change branding later in settings.
      </SectionIntro>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          onContinue()
        }}
        className="mt-8 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="business-name">Workspace name</Label>
          <Input
            id="business-name"
            value={businessName}
            onChange={(event) => onBusinessNameChange(event.target.value)}
            placeholder="Acme Studio"
            autoComplete="organization"
            maxLength={32}
            size="lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Brand color</Label>
          <div className="flex flex-wrap items-center gap-2">
            {brandColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Use ${color}`}
                onClick={() => onBrandColorChange(color)}
                className={cn(
                  "size-7 rounded-full border transition-transform hover:scale-105",
                  brandColor === color ? "border-foreground" : "border-transparent",
                )}
                style={{ backgroundColor: color }}
              />
            ))}
            <Label
              className="relative size-7 overflow-hidden rounded-full border border-border"
              style={{ backgroundColor: brandColor }}
            >
              <input
                type="color"
                value={brandColor}
                onChange={(event) => onBrandColorChange(event.target.value)}
                className="absolute -inset-1 size-10 cursor-pointer opacity-0"
              />
            </Label>
          </div>
        </div>

        <Label className="flex flex-col gap-2">
          <span>Logo</span>
          <span className="flex min-h-16 cursor-pointer items-center justify-center rounded-md border border-dashed border-border/70 bg-background/30 px-3 py-4 text-center text-xs text-muted-foreground transition-colors hover:border-foreground/40">
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                alt="Logo preview"
                className="max-h-12 max-w-36 rounded object-contain"
              />
            ) : (
              "Click to upload your logo"
            )}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onLogoChange}
            className="sr-only"
          />
        </Label>

        <div className="rounded-md border border-border/70 bg-background/40 px-3 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Preview
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-md text-xs font-medium text-white"
              style={{ backgroundColor: brandColor }}
            >
              {logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoDataUrl} alt="" className="size-full rounded-md object-cover" />
              ) : (
                getInitials(portalName)
              )}
            </span>
            <div className="min-w-0">
              <div className="truncate font-heading text-sm">{portalName}</div>
              <div className="truncate text-xs text-muted-foreground">
                yourportal.app/{slugify(portalName)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button variant="ghost" type="button" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" size="lg">
            Continue
          </Button>
        </div>
      </form>
    </>
  )
}
