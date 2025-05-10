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

  return (
    <div className="bg-card border rounded-lg overflow-hidden p-5 animate-fade-in">
      <div className="flex items-start space-x-4">
        <Avatar>
          {post.author ? (
            <>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
            </>
          ) : (
            <AvatarFallback>NA</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{post.author?.name || "Unknown Author"}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                <span>{post.author?.location || "Unknown"}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>

            {post.image_url && (
              <div className="mt-3 rounded-md overflow-hidden">
                <Image
                  src={post.image_url}
                  alt="Post image"
                  className="w-full object-cover"
                  width={600}
                  height={300}
                />
              </div>
            )}

            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-sm text-primary hover:underline truncate"
              >
                {post.link}
              </a>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span className={post.hasLiked ? "text-primary" : ""}>{post.likes} {post.likes === 1 ? "like" : "likes"}</span>
              <span >0 comments</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onLikeToggle}
                disabled={likeDisabled}
                className={post.hasLiked ? "text-primary " : ""}
              >
                <Heart className="h-4 w-4 mr-2" fill={post.hasLiked ? "currentColor" : "none"} /> Like
              </Button>

              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" /> Comment
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
