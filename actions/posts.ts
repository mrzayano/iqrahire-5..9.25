"use server"
// src/actions/posts.ts
import { supabase } from "@/utils/supabase/server"

export async function createPost({
  content,
  user_id,
  imageFile,
}: {
  content: string
  user_id: string
  imageFile?: File
}) {
  let imageUrl: string | null = null

  if (imageFile) {
    const fileName = `${Date.now()}-${imageFile.name}`
    const { data: storageData, error: storageError } = await supabase.storage
      .from("post-images")
      .upload(fileName, imageFile)

    if (storageError) throw storageError

    const { data: publicUrlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(storageData.path)

    imageUrl = publicUrlData.publicUrl
  }

  const { data, error } = await supabase.from("posts").insert({
    content,
    user_id,
    image_url: imageUrl,
  }).select("*")

  if (error) throw error

  return data
}
