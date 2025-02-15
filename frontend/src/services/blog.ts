'use strict'

import { request } from '@/config';
import { Blog, BlogsRequest, BlogsResponse } from "@/types";

type token = string | undefined;

export default {
	async addBlog(idToken: token, params: Blog): Promise<Blog> {
		return await request(`blog`, 'post', idToken, params);
	},
	async getBlogs(idToken: token, query: BlogsRequest): Promise<BlogsResponse>  {
		return await request(`blog`, 'get', idToken, undefined, query);
	},
	async getBlog(idToken: token, paramsId: string): Promise<Blog> {
		return await request(`blog/${paramsId}`, 'get', idToken);
	},
	async updateBlog(idToken: token, params: Blog): Promise<Blog> {
		return await request(`blog/${params.id}`, 'put', idToken, params);
	},
	async deleteBlog(idToken: token, params: Blog): Promise<string> {
		return await request(`blog/${params.id}`, 'delete', idToken);
	},
}