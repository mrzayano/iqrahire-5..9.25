"use client";

import { useEffect, useState, useTransition } from "react";
import { likePost, unlikePost } from "@/actions/like_actions";
import { fetchPosts } from "@/actions/fetch_posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, MapPin, MessageSquare, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Post } from "@/types/feed.post";



export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      setIsLoading(true);
      const fetchedPosts: Post[] = await Promise.all(await fetchPosts());
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

          <Card className="w-fulln mx-auto p-4 px-0 md:p-6 relative animate-fade-in" key={post.id}>

            {/* Save icon - top right on mobile */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className="absolute top-2 right-2 z-10"
              >
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Save</span>
              </Button>
            )}

            {/* Header */}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.author.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>{post.author.location}</span>
                    </CardDescription>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-3 pt-1">
              <p className="text-sm whitespace-pre-wrap break-words">{post.content}</p>

              {post.image_url && (
                <Image
                  src={post.image_url}
                  alt="Post image"
                  className="w-full object-cover rounded-md"
                  loading="lazy"
                  width={100}
                  height={100}
                />
              )}


            </CardContent>

            {/* Stats */}
            <CardContent className="text-sm text-muted-foreground pt-4">
              <div className="flex justify-between">
                {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                <span>0 comments</span>
              </div>
              <Separator className="my-2" />
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex justify-between gap-2 pt-2">
              {/* Desktop action buttons */}
              {!isMobile && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post)}
                    disabled={isPending}
                    className={post.hasLiked ? "text-primary" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${post.hasLiked ? "fill-current" : ""}`} />
                    <span className="text-xs">Like</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-xs">Comment</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleBookmark}>
                    <Bookmark className="h-4 w-4 mr-1" />
                    <span className="text-xs">Save</span>
                  </Button>
                </>
              )}

              {/* Mobile action buttons buttons */}
              {isMobile && (
                <div className="flex justify-between w-full">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post)}
                    disabled={isPending}
                    className={post.hasLiked ? "text-primary" : ""}
                  >
                    <Heart className={`h-5 w-5 ${post.hasLiked ? "fill-current" : ""}`} />
                    <span className="ml-1 text-xs">Like</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-5 w-5" />
                    <span className="ml-1 text-xs">Comment</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              )}
            </CardFooter>


          </Card>
        ))
      )}
    </>

  );
}
