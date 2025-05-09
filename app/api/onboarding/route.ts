// app/api/onboarding/route.ts
import { NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"

interface OnboardingData {
  firstName: string
  lastName: string
  gender?: string
  dob?: string       // accept as ISO string
  location: string
  role: string
  industry: string
}

export async function POST(req: Request) {
  console.log("👉 Received POST /api/onboarding")
  try {
    const data = (await req.json()) as OnboardingData
    console.log("📦 Payload:", data)
    // Parse dob string into a Date, if provided
    const dobDate = data.dob ? new Date(data.dob) : undefined

    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }
const client = await clerkClient()
    // clerkClient is already an object — no `await clerkClient()`
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: true,
        basicInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          dob: dobDate,            // clerk will stringify for you
        },
        location: data.location,
        professional: {
          role: data.role,
          industry: data.industry,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello from the onboarding API" })
}
