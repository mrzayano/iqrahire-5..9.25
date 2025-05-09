"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useSession, useUser } from "@clerk/nextjs"

import { onboardingSchema, OnboardingFormValues } from "@/schema/onboarding.schema"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Form } from "@/components/ui/form"
import { OnboardingStepContent } from "./OnboardingStepContent"

const STEP_LABELS = ["Basic Info", "Location", "Professional"]

export default function OnboardingForm() {
  const router = useRouter()
  const { session } = useSession()
  const { user } = useUser()

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: undefined,
      location: "",
      role: "",
      industry: "",
    },
  })

  const stepFields: Record<number, (keyof OnboardingFormValues)[]> = useMemo(() => ({
    1: ["firstName", "lastName", "gender", "dob"],
    2: ["location"],
    3: ["role", "industry"],
  }), [])

  const handleNextStep = async () => {
    const isValid = await form.trigger(stepFields[step])
    if (isValid) setStep(prev => prev + 1)
  }

  const handlePreviousStep = () => {
    if (step > 1) setStep(prev => prev - 1)
  }

  const onSubmit: SubmitHandler<OnboardingFormValues> = async (data) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to complete onboarding")

      await session?.reload()
      await user?.reload()

      router.replace("/feed")
    } catch {
      toast("Something went wrong", {
        description: "Failed to complete your profile. Please try again.",
        style: { backgroundColor: "red", color: "white" },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md w-full bg-background p-8 rounded-xl shadow-lg border border-border/40">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
        <p className="text-muted-foreground mt-1">
          Tell us more about yourself to get started
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1
            const isActive = step === stepNum
            const isComplete = step > stepNum

            return (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors",
                    isComplete
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/20 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {isComplete ? <CheckCircle2 className="h-5 w-5" /> : stepNum}
                </div>
                <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / STEP_LABELS.length) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <OnboardingStepContent step={step} form={form} />

          <div className="flex justify-between pt-2">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePreviousStep} className="min-w-[100px]">
                Back
              </Button>
            ) : <div />}

            {step < STEP_LABELS.length ? (
              <Button type="button" onClick={handleNextStep} className="min-w-[100px]">
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </span>
                ) : "Complete Profile"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="mt-8">
        <Separator />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          We value your privacy. Your information will be used in accordance with our{" "}
          <Link href="/privacy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  )
}
