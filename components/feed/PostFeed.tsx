"use client";

import { useEffect, useState, useTransition } from "react";
import { likePost, unlikePost } from "@/app/actions/like_actions";
import { fetchPosts } from "@/app/actions/fetch_posts";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, MapPin, MessageSquare, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

// Types
interface Author {
  name: string;
  location: string;
  avatar: string;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  image_url?: string;
  like_count: number;
  hasLiked: boolean;
  created_at: string;
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAndSetPosts = async () => {
      setIsLoading(true);
      const fetchedPosts: Post[] = await fetchPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    fetchAndSetPosts();
  }, []);


  const toggleLike = (post: Post) => {
    startTransition(() => {
      const updatedPosts = posts.map((p) =>
        p.id === post.id
          ? {
            ...p,
            hasLiked: !p.hasLiked,
            like_count: p.hasLiked ? p.like_count - 1 : p.like_count + 1,
          }
          : p
      );
      setPosts(updatedPosts);

      if (post.hasLiked) {
        unlikePost(post.id);
      } else {
        likePost(post.id);
      }
    });
  };

  const handleBookmark = () => {
    // Placeholder function
    console.log("Bookmark clicked");
  };

  return (
    <>
      {isLoading ? (
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
        posts.map((post) => (
          <Card
            className="bg-card border rounded-lg overflow-hidden p-5 animate-fade-in"
            key={post.id}
          >
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
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                    </span>
                    <span>0 comments</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post)}
                      disabled={isPending}
                      className={post.hasLiked ? "text-primary" : ""}
                    >
                      <Heart
                        className="h-4 w-4 mr-2"
                        fill={post.hasLiked ? "currentColor" : "none"}
                      />{" "}
                      Like
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
          </Card>
        ))
      )}
    </>

  );
}
