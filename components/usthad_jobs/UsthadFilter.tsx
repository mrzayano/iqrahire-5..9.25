"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Clock, Building, Filter, ChevronDown } from "lucide-react"

const filterData = {
  countries: ["Saudi Arabia", "Egypt", "Pakistan", "Indonesia", "Malaysia"],
  cities: ["Riyadh", "Cairo", "Karachi", "Jakarta", "Kuala Lumpur"],
  experience: ["Entry Level", "1-3 years", "3-5 years", "5+ years", "10+ years"],
  subjects: [
    "Tajweed",
    "Hifz",
    "Fiqh",
    "Hadith",
    "Arabic",
    "Arabic Grammar",
    "Seerah",
    "Children Education",
    "Islamic Ethics",
  ],
  institutions: [
    "Darul Uloom Deoband",
    "Al-Azhar University",
    "Islamic University of Madinah",
    "International Islamic University",
    "Zaytuna College",
    "Umm Al-Qura University",
    "Nadwatul Ulama",
    "Madinah Institute",
    "Al-Azhar Madrasa",
    "Darul Uloom Institute",
    "Markaz Al-Furqan",
    "Islamic Center of Malaysia",
  ],
  masjids: [
    "Masjid Al-Haram",
    "Masjid An-Nabawi",
    "Masjid Al-Aqsa",
    "Jama Masjid Delhi",
    "Faisal Mosque",
    "Sultan Ahmed Mosque",
    "Sheikh Zayed Grand Mosque",
    "Badshahi Mosque",
  ],
}

type FilterKeys = "location" | "experience" | "subject" | "institutions" | "masjids"

interface FilterSectionProps {
  title: string
  icon: React.ElementType
  items: string[]
  expanded: boolean
  toggle: () => void
  searchable?: boolean
  prefix: FilterKeys
  selected: string[]
  onChange: (value: string) => void
}

const FilterSection = ({
  title,
  icon: Icon,
  items,
  expanded,
  toggle,
  searchable = false,
  prefix,
  selected,
  onChange,
}: FilterSectionProps) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={toggle}
      className="flex items-center justify-between w-full py-4 px-1 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-900">{title}</span>
      </div>
      <ChevronDown
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      />
    </button>

    {expanded && (
      <div className="pb-4 px-1">
        {searchable && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              className="pl-9 h-9 text-sm border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        )}
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item} className="flex items-center space-x-3">
              <Checkbox
                id={`${prefix}-${item}`}
                checked={selected.includes(item)}
                onCheckedChange={() => onChange(item)}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <label
                htmlFor={`${prefix}-${item}`}
                className="text-sm text-gray-700 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

interface UsthadFilterProps {
  selectedFilters: Record<FilterKeys, string[]>
  onFilterChange: (category: FilterKeys, value: string) => void
}

const UsthadFilter = ({ selectedFilters, onFilterChange }: UsthadFilterProps) => {
  const [expanded, setExpanded] = useState({
    location: true,
    experience: false,
    subject: false,
    institutions: false,
    masjids: false,
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-fit sticky top-6">
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <Filter className="h-5 w-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <FilterSection
          title="Location"
          icon={MapPin}
          items={[...filterData.countries, ...filterData.cities]}
          expanded={expanded.location}
          toggle={() => setExpanded((prev) => ({ ...prev, location: !prev.location }))}
          searchable
          prefix="location"
          selected={selectedFilters.location}
          onChange={(value) => onFilterChange("location", value)}
        />
        <FilterSection
          title="Experience"
          icon={Clock}
          items={filterData.experience}
          expanded={expanded.experience}
          toggle={() => setExpanded((prev) => ({ ...prev, experience: !prev.experience }))}
          prefix="experience"
          selected={selectedFilters.experience}
          onChange={(value) => onFilterChange("experience", value)}
        />
        <FilterSection
          title="Subject Area"
          icon={Building}
          items={filterData.subjects}
          expanded={expanded.subject}
          toggle={() => setExpanded((prev) => ({ ...prev, subject: !prev.subject }))}
          prefix="subject"
          selected={selectedFilters.subject}
          onChange={(value) => onFilterChange("subject", value)}
        />
        <FilterSection
          title="Institutions"
          icon={Building}
          items={filterData.institutions}
          expanded={expanded.institutions}
          toggle={() => setExpanded((prev) => ({ ...prev, institutions: !prev.institutions }))}
          searchable
          prefix="institutions"
          selected={selectedFilters.institutions}
          onChange={(value) => onFilterChange("institutions", value)}
        />
        <FilterSection
          title="Masjids"
          icon={Building}
          items={filterData.masjids}
          expanded={expanded.masjids}
          toggle={() => setExpanded((prev) => ({ ...prev, masjids: !prev.masjids }))}
          searchable
          prefix="masjids"
          selected={selectedFilters.masjids}
          onChange={(value) => onFilterChange("masjids", value)}
        />
      </div>
    </div>
  )
}

export default UsthadFilter
