import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userIds } = await req.json()

    if (!Array.isArray(userIds)) {
      return NextResponse.json({ error: "userIds must be an array" }, { status: 400 })
    }

    const users = await Promise.all(
      userIds.map(async (id: string) => {
        const client = await clerkClient()
        try {
          const user = await client.users.getUser(id)
          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.imageUrl,
            location: user.publicMetadata?.location || null,
          }
        } catch {
          return null
        }
      })
    )

    return NextResponse.json({ users })
  } catch (err) {
    console.error("Failed to fetch Clerk users", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
