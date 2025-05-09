"use server"
// actions/likes.ts
import { supabase } from "@/utils/supabase/client"
import { auth } from "@clerk/nextjs/server"

// LIKE a post
export const likePost = async (postId: string) => {
  const { userId } = await auth()
  if (!userId) throw new Error("User not authenticated")

  return await supabase
    .from("likes")
    .insert({ post_id: postId, user_id: userId })
}

// UNLIKE a post
export const unlikePost = async (postId: string) => {
  const { userId } = await auth()
  if (!userId) throw new Error("User not authenticated")

  return await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId)
}

// Get like COUNT and whether current user liked it
export const getPostLikes = async (postId: string) => {
  const { userId } = await auth()
  if (!userId) throw new Error("User not authenticated")

  const [{ count }, { data: like }] = await Promise.all([
    supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId),

    supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle(),
  ])

  return {
    count: count || 0,
    hasLiked: !!like,
  }
}
