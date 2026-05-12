"use client";

import type { ReactNode, RefObject } from "react";
import { createContext, useContext, useRef } from "react";
import { LogoIcon } from "@/components/dashboard/logo";
import { ParticleField } from "@/components/auth/particle-field";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

type ImpulseRef = RefObject<number>;
const TypingImpulseContext = createContext<ImpulseRef | null>(null);

export function useAuthTypingImpulse(): ImpulseRef {
  const ctx = useContext(TypingImpulseContext);
  if (!ctx) throw new Error("useAuthTypingImpulse outside <AuthShell>");
  return ctx;
}

type Variant = "welcome" | "request-access" | "onboarding";

const FIGURES: Record<Variant, string> = {
  welcome: "/assets/welcome.png",
  "request-access": "/assets/welcome.png",
  onboarding: "/assets/clusters.png",
};

export function AuthShell({
  children,
  variant = "welcome",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  const typingImpulseRef = useRef(0);
  const src = FIGURES[variant];
  return (
    <TypingImpulseContext.Provider value={typingImpulseRef}>
      <AuthSplitLayout
        rightClassName="lg:w-[620px]"
        left={
          <>
            <ParticleField
              src={src}
              sampleStep={3}
              threshold={34}
              dotSize={1}
              renderScale={1}
              align="center"
              typingImpulseRef={typingImpulseRef}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 600px at 50% 50%, transparent 45%, color-mix(in srgb, var(--background) 88%, transparent) 92%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-12">
              <div className="pointer-events-auto flex h-8 items-center gap-2 text-sm">
                <LogoIcon className="size-4 shrink-0" />
                <span className="font-medium">Briefly</span>
              </div>
            </div>
          </>
        }
        right={children}
      />
    </TypingImpulseContext.Provider>
  );
}
