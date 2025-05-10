"use server"
import { supabase } from "@/utils/supabase/client";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function fetchPosts() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authenticated");

    const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (postsError) throw postsError;

    const { data: likes, error: likesError } = await supabase
        .from("likes")
        .select("*");

    if (likesError) throw likesError;

    const client =await clerkClient();
    return posts.map((post: any) => {
        const user = client.users.getUser(post.user_id);
        const hasLiked = likes?.some((like: any) => like.user_id === userId) || false;
        return {
            ...post,
            author: {
                id: post.user_id,
                name: `${user.firstName} ${user.lastName}` || "Unknown",
                avatar: user.imageUrl || "",
                location: user.publicMetadata?.location || "",
            },
            hasLiked,
        };
    });
       
}