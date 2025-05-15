"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Slider } from "@/components/ui/slider"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Calendar, Tag, Filter, User, Search, Building, FileText } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { motion } from "framer-motion"
import type { JobsFilterSidebarProps } from "@/types/job"

export const JobsFilterSidebar = ({
  countries,
  cities,
  selectedCountries,
  selectedCities,
  remoteOnly,
  datePosted,
  jobType,
  experienceLevel,
 
  skills,
  selectedSkills,
  industries,
  selectedIndustries,
  applicationTypes,
  selectedApplicationTypes,
  onCountryChange,
  onCityChange,
  onRemoteChange,
  onDatePostedChange,
  onJobTypeChange,
  onExperienceLevelChange,
  onSkillChange,
  onIndustryChange,
  onApplicationTypeChange,
  onResetFilters,
  onApplyFilters,
}: JobsFilterSidebarProps) => {
  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"]
  const experienceLevels = ["Entry-Level", "Mid-Level", "Senior", "Executive"]
  const dateOptions = ["Last 24 Hours", "Last 3 Days", "Last 7 Days", "Last 30 Days"]
 
  // Search functionality for location filters
  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [skillSearch, setSkillSearch] = useState("")
  const [industrySearch, setIndustrySearch] = useState("")

  // Filtered countries and cities based on search
  const filteredCountries = countries.filter((country) => country.toLowerCase().includes(countrySearch.toLowerCase()))
  const filteredCities = cities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))
  const filteredIndustries = industries.filter((industry) =>
    industry.toLowerCase().includes(industrySearch.toLowerCase()),
  )

  return (
    <Card className="w-full shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Jobs
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <ScrollArea className="h-[calc(100vh-280px)] pr-4">
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["location", "jobType"]} className="w-full">
              {/* Location Filter */}
              <AccordionItem value="location" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Location</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Checkbox
                        id="remote"
                        checked={remoteOnly}
                        onCheckedChange={(checked) => onRemoteChange(checked === true)}
                      />
                      <Label htmlFor="remote" className="cursor-pointer">
                        Remote Only
                      </Label>
                    </motion.div>

                    <div className="pt-2">
                      <Label className="text-sm font-medium mb-1 block">Countries</Label>
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="pl-8 py-1 h-8 text-sm"
                        />
                      </div>
                      <div className="pt-1 space-y-2 max-h-32 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <motion.div
                              key={country}
                              className="flex items-center space-x-2"
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                            >
                              <Checkbox
                                id={`country-${country}`}
                                checked={selectedCountries.includes(country)}
                                onCheckedChange={() => onCountryChange(country)}
                              />
                              <Label htmlFor={`country-${country}`} className="cursor-pointer">
                                {country}
                              </Label>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground py-1">No countries found</div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Label className="text-sm font-medium mb-1 block">Cities</Label>
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search cities..."
                          value={citySearch}
                          onChange={(e) => setCitySearch(e.target.value)}
                          className="pl-8 py-1 h-8 text-sm"
                        />
                      </div>
                      <div className="pt-1 space-y-2 max-h-32 overflow-y-auto">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((city) => (
                            <motion.div
                              key={city}
                              className="flex items-center space-x-2"
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                            >
                              <Checkbox
                                id={`city-${city}`}
                                checked={selectedCities.includes(city)}
                                onCheckedChange={() => onCityChange(city)}
                              />
                              <Label htmlFor={`city-${city}`} className="cursor-pointer">
                                {city}
                              </Label>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground py-1">No cities found</div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Job Type Filter */}
              <AccordionItem value="jobType" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Job Type</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <motion.div
                        key={type}
                        className="flex items-center space-x-2"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <Checkbox
                          id={`type-${type}`}
                          checked={jobType.includes(type)}
                          onCheckedChange={() => onJobTypeChange(type)}
                        />
                        <Label htmlFor={`type-${type}`} className="cursor-pointer">
                          {type}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Experience Level Filter */}
              <AccordionItem value="experienceLevel" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Experience Level</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <motion.div
                        key={level}
                        className="flex items-center space-x-2"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <Checkbox
                          id={`level-${level}`}
                          checked={experienceLevel.includes(level)}
                          onCheckedChange={() => onExperienceLevelChange(level)}
                        />
                        <Label htmlFor={`level-${level}`} className="cursor-pointer">
                          {level}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Date Posted Filter */}
              <AccordionItem value="datePosted" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Date Posted</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <RadioGroup value={datePosted} onValueChange={onDatePostedChange} className="space-y-1">
                    {dateOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`date-${option}`} />
                        <Label htmlFor={`date-${option}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>

              {/* Salary Range Filter */}
              {/* <AccordionItem value="salary" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Salary Range</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Badge variant="outline" className="bg-primary/5">
                          ${salaryRange[0]}k
                        </Badge>
                        <Badge variant="outline" className="bg-primary/5">
                          ${salaryRange[1]}k
                        </Badge>
                      </div>
                      <Slider
                        defaultValue={[30, 150]}
                        min={minSalary}
                        max={maxSalary}
                        step={5}
                        value={salaryRange}
                        onValueChange={(range) => onSalaryRangeChange(range as [number, number])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem> */}

              {/* Skills Required Filter */}
              <AccordionItem value="skills" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Skills Required</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground mb-2">Select skills relevant to your job search</div>
                    <div className="relative mb-2">
                      <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search skills..."
                        value={skillSearch}
                        onChange={(e) => setSkillSearch(e.target.value)}
                        className="pl-8 py-1 h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill) => (
                          <motion.div
                            key={skill}
                            className="flex items-center space-x-2"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          >
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={() => onSkillChange(skill)}
                            />
                            <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                              {skill}
                            </Label>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground py-1">No skills found</div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Industry Filter */}
              <AccordionItem value="industry" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Industry</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground mb-2">Select industries of interest</div>
                    <div className="relative mb-2">
                      <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search industries..."
                        value={industrySearch}
                        onChange={(e) => setIndustrySearch(e.target.value)}
                        className="pl-8 py-1 h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filteredIndustries.length > 0 ? (
                        filteredIndustries.map((industry) => (
                          <motion.div
                            key={industry}
                            className="flex items-center space-x-2"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          >
                            <Checkbox
                              id={`industry-${industry}`}
                              checked={selectedIndustries.includes(industry)}
                              onCheckedChange={() => onIndustryChange(industry)}
                            />
                            <Label htmlFor={`industry-${industry}`} className="cursor-pointer">
                              {industry}
                            </Label>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground py-1">No industries found</div>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Application Type Filter */}
              <AccordionItem value="applicationType" className="border-b">
                <AccordionTrigger className="py-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Application Type</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {applicationTypes.map((type) => (
                      <motion.div
                        key={type}
                        className="flex items-center space-x-2"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                        whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <Checkbox
                          id={`app-type-${type}`}
                          checked={selectedApplicationTypes.includes(type)}
                          onCheckedChange={() => onApplicationTypeChange(type)}
                        />
                        <Label htmlFor={`app-type-${type}`} className="cursor-pointer">
                          {type}
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button className="w-full" onClick={onApplyFilters} variant="default">
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={onResetFilters}>
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  )
}
