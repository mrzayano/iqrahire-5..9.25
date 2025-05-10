"use server";
import { supabase } from "@/utils/supabase/client";
import { auth } from "@clerk/nextjs/server";



export async function likePost(postId: string) {
    const { userId } = await auth();

    if (!userId) return;
    

    await supabase.from("likes").insert({ post_id: postId, user_id: userId });
}

export async function unlikePost(postId: string) {
     const { userId } = await auth();
    if (!userId) return;

    await supabase.from("likes").delete().match({ post_id: postId, user_id: userId });
}
