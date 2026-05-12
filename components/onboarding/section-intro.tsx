import type { ReactNode } from "react"

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <>
      <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {eyebrow}
      </div>
      <h1 className="mt-2 font-heading text-3xl leading-tight">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </>
  )
}
