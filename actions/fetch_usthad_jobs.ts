"use server"

import { supabase } from "@/utils/supabase/client"

export async function getUsthadJobs() {
    const { data } = await supabase
        .from("usthad_jobs")
        .select("*")
        .order("created_at", { ascending: false });

    return data;
}