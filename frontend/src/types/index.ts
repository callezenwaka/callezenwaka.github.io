import Blog from "@/types/blog";

//
export type { default as Blog } from "@/types/blog";

export interface Token {
  token: string;
}

export interface BlogsResponse {
	blogs: Blog[];
	lastVisibleTimestamp?: number | undefined;
  firstVisibleTimestamp?: number | undefined;
}

export interface BlogsRequest {
  limit: number; 
  lastVisible?: number; 
  direction: string;
  isRequest?: boolean;
}