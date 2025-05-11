"use server";
import { supabase } from "@/utils/supabase/client";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function fetchPosts() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  // console.log("user", user?.id);

  // Rest of your code remains the same
  const { data: posts, error: postsError } = await supabase
    .from("posts_with_likes")
    .select("*")
    .order('created_at', { ascending: false });
  // Fetch likes
  const { data: likes, error: likesError } = await supabase
    .from("likes")
    .select("post_id, user_id");

  if (postsError) throw postsError;
  if (likesError) throw likesError;

  return Promise.all(posts.map(async (post) => {
    const hasLiked = likes?.some(
      (like) => like.post_id === post.id && like.user_id === userId
    );

    let author = {
      id: post.user_id,
      name: "Unknown",
      avatar: "",
      location: "",
    };

    try {
      const clerk = await clerkClient();
      const user = await clerk.users.getUser(post.user_id);

      if (user) {
        author = {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`.trim() || "Unknown",
          avatar: user.imageUrl || "",
          location: typeof user.publicMetadata?.location === "string" ? user.publicMetadata.location : "",
        };
      }
    } catch (error) {
      if ((error as { status?: number }).status === 404) {
        console.warn(`User not found for ID: ${post.user_id}`);
      } else {
        console.error(`Error fetching user for ID: ${post.user_id}`, error);
      }
      // Proceeding with default 'Unknown' author details
    }

    return {
      ...post,
      author,
      hasLiked: !!hasLiked,
    };
  }));


}