"use client"

import { UseFormReturn } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"

import {  OnboardingFormValues } from "@/schema/onboarding.schema"
import { INDUSTRIES, ROLES } from "@/constants/onboarding.constants"

interface OnboardingStepContentProps {
  step: number
  form: UseFormReturn<OnboardingFormValues>
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function OnboardingStepContent({ step, form }: OnboardingStepContentProps) {
  const { control } = form

  switch (step) {
    case 1:
      return (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
  <div className="flex gap-4">
    {["firstName", "lastName"].map((name) => (
      <FormField
        key={name}
        control={control}
        name={name as keyof OnboardingFormValues}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>{name === "firstName" ? "First Name" : "Last Name"}</FormLabel>
            <FormControl>
              <Input
                placeholder={name === "firstName" ? "John" : "Doe"}
                {...field}
                name={String(field.name)}
                value={
                  typeof field.value === "string" || !field.value
                    ? field.value
                    : field.value.toISOString()
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
  </div>

  {/* Gender Field */}
  <FormField
    control={control}
    name="gender"
    render={({ field }) => (
      <FormItem className="mt-4 space-y-2">
        <FormLabel>Gender (Optional)</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="flex space-x-4"
          >
            {["male", "female", "other"].map((g) => (
              <div key={g} className="flex items-center space-x-2">
                <RadioGroupItem value={g} id={g} />
                <FormLabel htmlFor={g} className="capitalize cursor-pointer font-normal">
                  {g}
                </FormLabel>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Date of Birth Field */}
  <FormField
    control={control}
    name="dob"
    render={({ field }) => (
      <FormItem className="mt-4 space-y-2">
        <FormLabel>Date of Birth</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
                aria-label="Select date of birth"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : "Select date"}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              captionLayout="dropdown"
              fromYear={1960}
              toYear={2030}
              defaultMonth={field.value || undefined}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
</motion.div>

      )

    case 2:
      return (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InfoBox
            title="Your location helps us:"
            items={[
              "Show you relevant job opportunities",
              "Connect you with nearby professionals",
              "Provide location-specific content",
            ]}
          />
        </motion.div>
      )

    case 3:
      return (
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          {(["role", "industry"] as (keyof OnboardingFormValues)[]).map((fieldName) => {
            const opts = fieldName === "role" ? ROLES : INDUSTRIES
            const label = fieldName === "role" ? "Current Role" : "Industry"

            return (
              <FormField
                key={fieldName as string}
                control={control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={typeof field.value === "string" ? field.value : field.value?.toISOString() || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {opts.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}

          <InfoBox
            title="This information helps us personalize your experience with:"
            items={[
              "Relevant job recommendations",
              "Industry-specific content and connections",
              "Professional development opportunities",
            ]}
          />
        </motion.div>
      )

    default:
      return null
  }
}

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg mt-4">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
        {items.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
