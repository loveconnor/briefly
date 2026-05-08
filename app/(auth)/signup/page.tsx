"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Signup() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "")
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    setError(null)

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    })

    if (result.error) {
      setLoading(false)
      setError(result.error.message ?? "Unable to create account.")
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <section className="flex min-h-screen bg-background px-4 py-16 md:py-24">
      <div className="m-auto w-full max-w-xs">
        <div className="text-center">
          <h1 className="mt-3 text-4xl font-medium">Create Account</h1>
        </div>
        <form onSubmit={onSubmit} className="mt-12 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Full name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm">
              Confirm password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Continue"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
