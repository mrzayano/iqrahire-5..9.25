export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          slug: string
          title: string
          company: string 
          logo_url: string
          location: { city: string; country: string }
          work_mode: "remote" | "onsite" | "hybrid"
          job_type: string
          experience_level: string
          salary: string
          application_url: string | null
          application_method: "Easy Apply" | "External"
          description: string
          responsibilities: string[] | string
          qualifications: string[] | string
          benefits: string[] | string
          skills: string[] | string
          tags: string[] | string
          industry: string
          created_at: string
          updated_at: string
          posted_by_user_id: string
          org_id: string
          view_count: number
          apply_count: number
          is_published: boolean
        }
        Insert: {
          id?: number
          slug: string
          title: string
          company: string
          logo_url: string
          location: { city: string; country: string }
          work_mode: "remote" | "onsite" | "hybrid"
          job_type: string
          experience_level: string
          salary: string
          application_url?: string | null
          application_method: "Easy Apply" | "External"
          description: string
          responsibilities: string[] | string
          qualifications: string[] | string
          benefits: string[] | string
          skills: string[] | string
          tags: string[] | string
          industry?: string
          created_at?: string
          updated_at?: string
          posted_by_user_id: string
          org_id: string
          view_count?: number
          apply_count?: number
          is_published?: boolean
        }
        Update: {
          id?: number
          slug?: string
          title?: string
          company?: string
          logo_url?: string
          location?: { city: string; country: string }
          work_mode?: "remote" | "onsite" | "hybrid"
          job_type?: string
          experience_level?: string
          salary?: string
          application_url?: string | null
          application_method?: "Easy Apply" | "External"
          description?: string
          responsibilities?: string[] | string
          qualifications?: string[] | string
          benefits?: string[] | string
          skills?: string[] | string
          tags?: string[] | string
          industry?: string
          created_at?: string
          updated_at?: string
          posted_by_user_id?: string
          org_id?: string
          view_count?: number
          apply_count?: number
          is_published?: boolean
        }
      }
      job_applications: {
        Row: {
          id: number
          job_id: number
          user_id: string
          status: "Applied" | "Interviewed" | "Accepted" | "Rejected"
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          job_id: number
          user_id: string
          status: "Applied" | "Interviewed" | "Accepted" | "Rejected"
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          job_id?: number
          user_id?: string
          status?: "Applied" | "Interviewed" | "Accepted" | "Rejected"
          applied_at?: string
          updated_at?: string
        }
      }
      saved_jobs: {
        Row: {
          id: number
          job_id: number
          user_id: string
          saved_at: string
        }
        Insert: {
          id?: number
          job_id: number
          user_id: string
          saved_at?: string
        }
        Update: {
          id?: number
          job_id?: number
          user_id?: string
          saved_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
