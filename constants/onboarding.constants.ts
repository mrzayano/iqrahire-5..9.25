export const INDUSTRIES = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Retail",
    "Manufacturing",
    "Non-profit",
    "Government",
    "Legal",
    "Media & Entertainment",
    "Travel & Hospitality",
    "Construction",
    "Agriculture",
    "Energy",
    "Transportation",
  ]
  
  export const ROLES = [
    "Student",
    "Graduate",
    "Entry Level Professional",
    "Mid-Level Professional",
    "Senior Professional",
    "Manager",
    "Director",
    "Executive",
    "Freelancer",
    "Entrepreneur",
    "Consultant",
    "Unemployed",
    "Other",
  ]

  export const ROLE_INDUSTRY_MAP: Record<string, string[]> = {
  Student: ["Education", "Technology"],
  Graduate: ["Technology", "Finance", "Education"],
  "Entry Level Professional": ["Technology", "Finance", "Healthcare"],
  "Mid-Level Professional": ["Technology", "Healthcare", "Retail"],
  "Senior Professional": ["Healthcare", "Finance", "Manufacturing"],
  Manager: ["Retail", "Construction", "Legal"],
  Director: ["Finance", "Government", "Legal"],
  Executive: ["Energy", "Transportation", "Government"],
  Freelancer: ["Media & Entertainment", "Technology", "Consultant"],
  Entrepreneur: ["Technology", "Retail", "Media & Entertainment"],
  Consultant: ["Finance", "Legal", "Education"],
  Unemployed: INDUSTRIES,
  Other: INDUSTRIES,
}

  