// actions/fetch_posts.ts
"use server"

import { supabase } from "@/utils/supabase/client"
import { clerkClient } from "@clerk/nextjs/server"

export async function fetchPosts() {
  // 1. Get all posts from the view
  const { data: posts, error } = await supabase
    .from("posts_with_likes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error || !posts) {
    console.error("Error fetching posts:", error)
    return []
  }

  // 2. Extract unique user IDs
  const userIds = [...new Set(posts.map((post) => post.user_id))]

  // 3. Fetch author details from Clerk
  const users = await Promise.all(
    userIds.map(async (id) => {
      const client = await clerkClient()
      try {
        const user = await client.users.getUser(id)
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.imageUrl,
          location: user.publicMetadata?.location || null,
        }
      } catch (err) {
        console.warn(`Failed to fetch user with ID ${id}:`, err)
        return null
      }
    })
  )

  // 4. Map author info to posts
  const postsWithAuthor = posts.map((post) => ({
    ...post,
    author: users.find((user) => user?.id === post.user_id) || null,
  }))

  return postsWithAuthor
}
