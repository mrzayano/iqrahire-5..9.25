import React, { useEffect } from 'react'
import { UseFormReturn, useWatch, useFormContext } from 'react-hook-form'
import {
  FormControl, FormField, FormItem, FormLabel, FormMessage
} from '../ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../ui/select'

import { INDUSTRIES, ROLES, ROLE_INDUSTRY_MAP } from '@/constants/onboarding.constants'
import { OnboardingFormValues } from '@/schema/onboarding.schema'

interface ProfessionalStepProps {
  control: UseFormReturn<OnboardingFormValues>['control']
}

const ProfessionalStep = ({ control }: ProfessionalStepProps) => {
  const selectedRole = useWatch({ control, name: 'role' })
  const { setValue } = useFormContext<OnboardingFormValues>()

  const filteredIndustries = ROLE_INDUSTRY_MAP[selectedRole] || INDUSTRIES

  // Reset industry when role changes
  useEffect(() => {
    setValue("industry", "")
  }, [selectedRole, setValue])

  return (
    <>
      {/* Role Field */}
      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Role</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Industry Field */}
      <FormField
        control={control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {filteredIndustries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default ProfessionalStep
