"use client"

import React, { useEffect, useState } from "react"
import { fetchPosts } from "@/actions/fetch_posts"
import { likePost, unlikePost } from "@/actions/likes"
import { PostCard } from "./PostCard"
import { Skeleton } from "../ui/skeleton"

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
  author: Author | null
}

interface PostWithLikes extends Post {
  likes: number
  hasLiked: boolean
}

const PostFeed = () => {
  const [posts, setPosts] = useState<PostWithLikes[]>([])
  const [loading, setLoading] = useState(true)
  const [likeInProgress, setLikeInProgress] = useState<string | null>(null)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const postData = await fetchPosts()
console.log("Fetched posts:", postData);

    setPosts(postData)


    

      setLoading(false)
    }

    loadPosts()
  }, [])

  const handleLikeToggle = async (postId: string, hasLiked: boolean) => {
    if (likeInProgress === postId) return // prevent double actions
    setLikeInProgress(postId)

    const updatedPosts = [...posts]
    const index = updatedPosts.findIndex((p) => p.id === postId)
    if (index === -1) {
      setLikeInProgress(null)
      return
    }

    try {
      if (hasLiked) {
        await unlikePost(postId)
        updatedPosts[index].hasLiked = false
        updatedPosts[index].likes = Math.max(0, updatedPosts[index].likes - 1) // never below 0
      } else {
        await likePost(postId)
        updatedPosts[index].hasLiked = true
        updatedPosts[index].likes += 1
      }
      setPosts(updatedPosts)
    } catch (error) {
      console.error("Failed to toggle like:", error)
    } finally {
      setLikeInProgress(null)
    }
  }




  return (
    <>
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-5 space-y-4 animate-pulse">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-52 w-full rounded-md" />
          </div>
        ))
      ) : (
        <div className="space-y-6">
          {posts.map(
            (post) =>
              post.author && (
                <PostCard
                  key={post.id}
                  post={post}
                  onLikeToggle={() => handleLikeToggle(post.id, post.hasLiked)}
                  likeDisabled={likeInProgress === post.id}
                />
              )
          )}
        </div>
      )}
    </>

  )
}

export default PostFeed
