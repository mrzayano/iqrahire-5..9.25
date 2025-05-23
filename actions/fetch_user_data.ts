"use server"
import { User } from "@/types/user.data";
import { supabase } from "@/utils/supabase/client";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser(): Promise<User> {
    const user = await currentUser();
    const { userId } = await auth();

    if (!user || !userId) {
        throw new Error("User not found");
    }

    const userRecords = await (await clerkClient()).users.getUser(userId);

    const rawMetadata = userRecords.publicMetadata as User["metadata"];

 const { data: postsData, error } = await supabase
  .from("posts_with_likes")
  .select("*")
  .eq("user_id", userId)
  .order("created_at", { ascending: false });

if (error) {
  throw new Error(error.message);
}

    const userData: User = {
        email: user.emailAddresses[0].emailAddress,
        fullName: user.fullName ?? "No Name Provided",
        avatar: user.imageUrl,
        metadata: {
            ...rawMetadata,
            skills: rawMetadata.skills ?? { technical: [], soft: [] },
        },
        posts: postsData ?? [],
    };

    return userData;
}


export async function updateUserAbout(about: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User not authenticated');
    }
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
        publicMetadata: {
            about,
        },
    });
}