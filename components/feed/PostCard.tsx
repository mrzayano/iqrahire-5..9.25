  "use client"

  import { formatDistanceToNow } from "date-fns"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { Separator } from "@/components/ui/separator"
  import { Bookmark, Heart, MessageSquare, Share2, MapPin } from "lucide-react"
  import Image from "next/image"

  interface Author {
    id: string
    name: string
    avatar: string
    location?: string
  }

  interface Post {
    id: string
    content: string
    created_at: string
    user_id: string
    image_url?: string
    link?: string
    likes: number
    hasLiked: boolean
    author: Author | null
  }

  interface PostCardProps {
    post: Post
    onLikeToggle: () => void
    likeDisabled?: boolean
  }


  export function PostCard({ post, onLikeToggle, likeDisabled }: PostCardProps) {
    const handleBookmark = () => {
      console.log("Bookmark clicked for post:", post.id)
    }

   console.log("ds",post.hasLiked);


    return (
     
    )
  }
