// actions/fetch_post.ts
"use server"

import { supabase } from "@/utils/supabase/client"

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data
}
