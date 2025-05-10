"use server";
import { supabase } from "@/utils/supabase/client";
import { currentUser } from "@clerk/nextjs/server";

export async function fetchPosts() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
  // console.log("user", user?.id);

  // Rest of your code remains the same
  const { data: posts, error: postsError } = await supabase
    .from("posts_with_likes")
    .select("*")
    .limit(10); 

  // Fetch likes
  const { data: likes, error: likesError } = await supabase
    .from("likes")
    .select("post_id, user_id");

  if (postsError) throw postsError;
  if (likesError) throw likesError;

  return posts.map((post) => {
    const hasLiked = likes?.some(
      (like) => like.post_id === post.id && like.user_id === user?.id
    );


    return {
      ...post,
      author: {
        id: post.user_id,
        name: `${user?.firstName} ${user?.lastName}` || "Unknown",
        avatar: user?.imageUrl || "",
        location: user?.publicMetadata.location || "",
      },
      hasLiked: !!hasLiked,
    };
  });
}