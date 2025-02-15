// import { Timestamp } from '@google-cloud/firestore';
import { Blog } from './blog';

export type { default as Blog } from "./blog";

export interface ErrorType {
  message: string;
  status: number;
}

export interface BlogsResponse {
	blogs: Blog[];
	lastVisibleTimestamp?: number;
}