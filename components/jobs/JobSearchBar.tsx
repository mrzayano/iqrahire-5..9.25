"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ListFilter } from "lucide-react"

interface JobSearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onFilterClick: () => void
}

export const JobSearchBar = ({ searchQuery, setSearchQuery, onFilterClick }: JobSearchBarProps) => {
  return (
    <div className="relative flex">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search jobs by title, company, or skills..."
          className="pl-10 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Mobile filter button */}
      <Button variant="outline" className="ml-2 lg:hidden" onClick={onFilterClick}>
        <ListFilter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  )
}
