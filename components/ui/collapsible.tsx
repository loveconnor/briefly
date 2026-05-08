"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui-components/react/collapsible"

import { cn } from "@/lib/utils"

interface CollapsibleProps extends CollapsiblePrimitive.Root.Props {
  asChild?: boolean
}

function Collapsible({
  asChild = false,
  children,
  render,
  ...props
}: CollapsibleProps) {
  const resolvedRender = asChild
    ? (render ?? (children as React.ReactElement))
    : render

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      render={resolvedRender}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Root>
  )
}

interface CollapsibleTriggerProps extends CollapsiblePrimitive.Trigger.Props {
  asChild?: boolean
}

function CollapsibleTrigger({
  asChild = false,
  children,
  render,
  className,
  ...props
}: CollapsibleTriggerProps) {
  const resolvedRender = asChild
    ? (render ?? (children as React.ReactElement))
    : render

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn("cursor-pointer", className)}
      render={resolvedRender}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsiblePanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    />
  )
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  CollapsiblePanel as CollapsibleContent,
}
