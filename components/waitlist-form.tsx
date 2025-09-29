"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setStatus("idle")
    setMessage(null)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Something went wrong")
      setStatus("success")
      setMessage("You're in! We'll notify you as soon as we're ready.")
      setEmail("")
    } catch (err: any) {
      setStatus("error")
      setMessage(err?.message || "Please try again.")
    } finally {
      setPending(false)
    }
  }

  if (status === "success") {
    return (
      <div className="glass-strong rounded-xl p-4 md:p-5 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="opacity-95">{message || "You're in! We'll notify you soon."}</p>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs opacity-95">
          534+ joined in waitlist
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 text-white placeholder:text-white/75 border-white/25 backdrop-blur-md ring-1 ring-white/15 focus-visible:ring-white/35"
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="shrink-0 bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md"
      >
        {pending ? "Joining..." : "Join Waitlist"}
      </Button>

      <div aria-live="polite" className="sr-only">
        {status === "success" ? "Joined waitlist successfully" : status === "error" ? "There was an error" : ""}
      </div>

      {message && (
        <p
          className={`text-sm ${status === "error" ? "opacity-95" : "opacity-85"} mt-1 sm:mt-0 sm:ml-1`}
          role={status === "error" ? "alert" : undefined}
        >
          {message}
        </p>
      )}
    </form>
  )
}
