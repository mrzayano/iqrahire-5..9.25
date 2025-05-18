"use server"

import { supabase } from "@/utils/supabase/client"
import { auth } from "@clerk/nextjs/server"

export async function GetAppliedJobByUser() {
  try {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthorized")

    const { data, error } = await supabase
      .from("applied_jobs_view")
      .select("*")
      .eq("user_id", userId)

    if (error) {
      console.error("Supabase error:", error)
      throw new Error("Failed to fetch applied jobs")
    }

    return data
  } catch (err) {
    console.error("Unexpected error:", err)
    return []
  }
}
