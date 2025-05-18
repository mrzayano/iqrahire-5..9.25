"use server"

import { supabase } from "@/utils/supabase/client"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function apply_jobs(job_id: number) {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if (!userId || !user) {
            throw new Error("Unauthorized")
        }

        const email = user.emailAddresses[0]?.emailAddress || null
        const cover_letter = "Simulated cover letter"
        const resume_url = "https://example.com/resume.pdf" // Simulate or fetch from upload

        if (!email) {
            throw new Error("User email is missing")
        }



        // Insert application
        const { error: insertError } = await supabase.from("job_applications").insert({
            job_id,
            user_id: userId,
            email,
            cover_letter,
            resume_url
        })

        if (insertError) {
            if (insertError?.code === "23505") {
                return { success: false, message: "You have already applied to this job." }
            }
            console.error("Insert error:", insertError)
            throw new Error("Failed to apply")
        }

        return { success: true }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error("Application error:", errorMessage)
        return { success: false, message: errorMessage }
    }
}
