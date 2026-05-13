"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LogoIcon } from "@/components/dashboard/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  bumpParticleTypingImpulse,
  pulseParticleSubmitImpulse,
} from "@/components/auth/particle-field";
import { AuthShell, useAuthTypingImpulse } from "@/components/auth/auth-shell";

export default function Signup() {
  return (
    <AuthShell variant="welcome">
      <SignupForm />
    </AuthShell>
  );
}

function SignupForm() {
  return (
    <>
      <div className="absolute top-6 left-6 flex h-8 items-center gap-2 text-sm lg:hidden">
        <LogoIcon className="size-4 shrink-0" />
        <span className="font-medium">Briefly</span>
      </div>

      <div className="w-full max-w-lg">
        <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
          Start here
        </div>
        <h1 className="mt-2 font-heading text-3xl leading-tight">
          Create your account
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Set up your Briefly workspace.
        </p>

        <EmailPasswordSignupForm />
        <OrSeparator />
        <OAuthButtons />
        <p className="mt-6 text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}

function EmailPasswordSignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const typingImpulse = useAuthTypingImpulse();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    pulseParticleSubmitImpulse(typingImpulse);
    setPending(true);
    setError(null);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (result.error) {
      setPending(false);
      setError(result.error.message ?? "Unable to create account.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    bumpParticleTypingImpulse(typingImpulse, event);
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.currentTarget.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      className="mt-8 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          required
          disabled={pending}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={pending}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={pending}
            className="[&_input]:pr-10"
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={pending}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={pending}
            className="[&_input]:pr-10"
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
            aria-pressed={showConfirmPassword}
            disabled={pending}
            onClick={() => setShowConfirmPassword((value) => !value)}
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-destructive text-sm">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="mt-2">
        {pending ? "Creating..." : "Continue"}
      </Button>
      <p className="text-center text-muted-foreground text-xs">
        <Kbd className="font-mono">⌘↵</Kbd> to submit
      </p>
    </form>
  );
}

function OrSeparator() {
  return (
    <div className="my-6 flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
        or
      </span>
      <Separator className="flex-1" />
    </div>
  );
}

function OAuthButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="lg" type="button">
        <GoogleIcon />
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" type="button">
        <AppleIcon />
        Continue with Apple
      </Button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="currentColor"
        d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.64 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.84 0 3.07.78 3.77 1.45l2.57-2.5C16.71 3.8 14.59 2.9 12 2.9 6.97 2.9 2.9 6.97 2.9 12s4.07 9.1 9.1 9.1c5.26 0 8.74-3.69 8.74-8.89 0-.6-.06-1.05-.14-1.51Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        fill="currentColor"
        d="M16.37 1.43c.06 1.2-.39 2.37-1.17 3.2-.8.85-2.08 1.5-3.28 1.41-.09-1.19.5-2.37 1.21-3.13.8-.88 2.16-1.52 3.24-1.48ZM20.5 17.33c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.53-4.12 3.54-1.54.02-1.94-1-4.03-.99-2.1.01-2.54 1-4.08.98-1.73-.02-3.06-1.78-4.05-3.35-2.77-4.4-3.06-9.56-1.35-12.31 1.21-1.95 3.12-3.1 4.91-3.1 1.82 0 2.97.99 4.47.99 1.46 0 2.35-1 4.45-1 1.59 0 3.27.86 4.47 2.36-3.93 2.15-3.29 7.76 1.06 9.92Z"
      />
    </svg>
  );
}
