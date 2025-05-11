// types/feed.post.ts

export interface Author {
  name: string;
  avatar: string;
  location: string;
}

export interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  like_count: number;
  hasLiked: boolean;
  author:Author
}


