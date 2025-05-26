"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { DayPicker, type DayPickerSingleProps } from "react-day-picker"
import { ChevronLeft, ChevronRight, Calendar, AlertCircle, ChevronDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DobPickerBaseProps {
  value?: Date | null
  onChange: (date: Date | null) => void
  fromYear?: number
  toYear?: number
  placeholder?: string
  disabled?: boolean
  error?: string
  minAge?: number
  maxAge?: number
}

interface DobPickerProps extends DobPickerBaseProps {
  className?: string
}

interface DobPickerContentProps extends DobPickerBaseProps {
  onSelect?: (date: Date) => void
  className?: string
}

// Enhanced Month/Year Picker Component
function MonthYearPicker({
  currentMonth,
  currentYear,
  fromYear,
  toYear,
  onMonthChange,
  onYearChange,
}: {
  currentMonth: number
  currentYear: number
  fromYear: number
  toYear: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}) {
  const [showMonthGrid, setShowMonthGrid] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [yearSearch, setYearSearch] = useState("")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const years = Array.from({ length: toYear - fromYear + 1 }, (_, i) => toYear - i)
  const filteredYears = yearSearch ? years.filter((year) => year.toString().includes(yearSearch)) : years

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        {/* Previous Month Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (currentMonth === 0) {
              onYearChange(currentYear - 1)
              onMonthChange(11)
            } else {
              onMonthChange(currentMonth - 1)
            }
          }}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Month/Year Display */}
        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => {
                setShowMonthGrid(!showMonthGrid)
                setShowYearPicker(false)
              }}
              className="h-8 px-3 text-sm font-medium hover:bg-accent"
            >
              {monthNames[currentMonth]}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>

            {showMonthGrid && (
              <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-md border bg-popover p-3 shadow-md animate-in fade-in-0 zoom-in-95">
                <div className="grid grid-cols-3 gap-1">
                  {monthsShort.map((month, index) => (
                    <Button
                      key={month}
                      variant={currentMonth === index ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        onMonthChange(index)
                        setShowMonthGrid(false)
                      }}
                      className="h-8 text-xs"
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Year Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => {
                setShowYearPicker(!showYearPicker)
                setShowMonthGrid(false)
              }}
              className="h-8 px-3 text-sm font-medium hover:bg-accent"
            >
              {currentYear}
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>

            {showYearPicker && (
              <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
                <div className="p-3">
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search year..."
                      value={yearSearch}
                      onChange={(e) => setYearSearch(e.target.value)}
                      className="h-8 pl-7 text-xs"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-1">
                      {filteredYears.slice(0, 20).map((year) => (
                        <Button
                          key={year}
                          variant={currentYear === year ? "default" : "ghost"}
                          size="sm"
                          onClick={() => {
                            onYearChange(year)
                            setShowYearPicker(false)
                            setYearSearch("")
                          }}
                          className="h-8 text-xs justify-start"
                        >
                          {year}
                        </Button>
                      ))}
                    </div>
                    {filteredYears.length > 20 && (
                      <p className="text-xs text-muted-foreground text-center mt-2 p-1">
                        {filteredYears.length - 20} more years...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Month Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (currentMonth === 11) {
              onYearChange(currentYear + 1)
              onMonthChange(0)
            } else {
              onMonthChange(currentMonth + 1)
            }
          }}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Click outside to close dropdowns */}
      {(showMonthGrid || showYearPicker) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowMonthGrid(false)
            setShowYearPicker(false)
          }}
        />
      )}
    </div>
  )
}

// Content component for use within Popovers
export function DobPickerContent({
  value = null,
  onChange,
  onSelect,
  fromYear = 1920,
  toYear = new Date().getFullYear(),
  disabled = false,
  error,
  className,
  minAge = 0,
  maxAge = 120,
}: DobPickerContentProps) {
  const today = useMemo(() => new Date(), [])
  const maxDate = useMemo(
    () => new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()),
    [today, minAge]
  )
  const minDate = useMemo(
    () => new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate()),
    [today, maxAge]
  )

  // Calculate initial view date based on value or minAge
  const getInitialViewDate = useCallback(() => {
    if (value) {
      return { month: value.getMonth(), year: value.getFullYear() }
    }
    
    if (minAge > 0) {
      // Open at the minimum age date for better UX
      return { month: maxDate.getMonth(), year: maxDate.getFullYear() }
    }
    
    // Default to today's month/year
    return { month: today.getMonth(), year: today.getFullYear() }
  }, [value, minAge, maxDate, today])

  const initialView = getInitialViewDate()
  const [currentMonth, setCurrentMonth] = useState(initialView.month)
  const [currentYear, setCurrentYear] = useState(initialView.year)
  const [internalError, setInternalError] = useState<string>("")

  // Update view when value changes
  useEffect(() => {
    if (value) {
      setCurrentMonth(value.getMonth())
      setCurrentYear(value.getFullYear())
    }
  }, [value])

  // Validate date
  const validateDate = useCallback(
    (date: Date): string => {
      if (date > maxDate) {
        return `You must be at least ${minAge} years old`
      }
      if (date < minDate) {
        return `Age cannot exceed ${maxAge} years`
      }
      if (date > today) {
        return "Date of birth cannot be in the future"
      }
      return ""
    },
    [maxDate, minDate, today, minAge, maxAge],
  )

  // Handle date selection
  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) {
        onChange(null)
        setInternalError("")
        return
      }

      const validationError = validateDate(date)
      setInternalError(validationError)

      if (!validationError) {
        onChange(date)
        onSelect?.(date)
      }
    },
    [onChange, onSelect, validateDate],
  )

  // Quick navigation helpers
  const navigateToEighteenYearsAgo = () => {
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    if (eighteenYearsAgo >= minDate && eighteenYearsAgo <= maxDate) {
      setCurrentYear(eighteenYearsAgo.getFullYear())
      setCurrentMonth(eighteenYearsAgo.getMonth())
    }
  }

  const clearSelection = () => {
    onChange(null)
    setInternalError("")
  }

  const displayError = error || internalError

  if (disabled) {
    return <div className={cn("p-4 text-center text-muted-foreground", className)}>Date selection is disabled</div>
  }

  const dayPickerProps: DayPickerSingleProps = {
    mode: "single",
    selected: value || undefined,
    onSelect: handleDateSelect,
    disabled: (date) => validateDate(date) !== "",
    month: new Date(currentYear, currentMonth),
    onMonthChange: (month) => {
      setCurrentMonth(month.getMonth())
      setCurrentYear(month.getFullYear())
    },
    showOutsideDays: false,
    className: "p-0",
    classNames: {
      months: "flex flex-col",
      month: "space-y-4",
      caption: "hidden", // We'll use our custom header
      table: "w-full border-collapse",
      head_row: "flex mb-2",
      head_cell:
        "text-muted-foreground rounded-md w-9 font-normal text-xs text-center flex items-center justify-center h-8",
      row: "flex w-full",
      cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
      day: cn(
        "h-9 w-9 p-0 font-normal transition-all duration-200 rounded-md",
        "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:scale-100",
      ),
      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-md",
      day_today: "bg-accent text-accent-foreground font-semibold ring-1 ring-accent-foreground/20",
      day_outside: "text-muted-foreground opacity-50",
      day_disabled: "text-muted-foreground opacity-30",
      day_hidden: "invisible",
    },
    components: {
      IconLeft: () => null, // We handle navigation in our custom header
      IconRight: () => null,
    },
  }

  return (
    <div className={cn("p-4 w-80", className)}>
      {/* Error Message */}
      {displayError && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Custom Month/Year Picker */}
      <MonthYearPicker
        currentMonth={currentMonth}
        currentYear={currentYear}
        fromYear={fromYear}
        toYear={toYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
      />

      {/* Calendar Grid */}
      <div className="rounded-lg border bg-card p-3">
        <DayPicker {...dayPickerProps} />
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateToEighteenYearsAgo}
            className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
          >
            18 years ago
          </Button>

          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
            >
              Clear selection
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Standalone component with built-in popover
export function DobPicker({
  value = null,
  onChange,
  fromYear = 1920,
  toYear = new Date().getFullYear(),
  placeholder = "Select your date of birth",
  disabled = false,
  error,
  className,
  minAge = 0,
  maxAge = 120,
}: DobPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const formatDate = (date: Date | null): string => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSelect = () => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-accent/50",
          error && "border-destructive focus:ring-destructive",
          isOpen && "ring-2 ring-ring ring-offset-2",
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Select date of birth"
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar className="h-4 w-4 opacity-50" />
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 rounded-lg border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          <DobPickerContent
            value={value}
            onChange={onChange}
            onSelect={handleSelect}
            fromYear={fromYear}
            toYear={toYear}
            disabled={disabled}
            minAge={minAge}
            maxAge={maxAge}
          />
        </div>
      )}
    </div>
  )
}
