// types/feed.post.ts
export interface Post {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
  hasBookmarked: boolean;
  user: {
    fullName: string;
    title: string;
    imageUrl?: string;
  };
  timeAgo: string;
}
