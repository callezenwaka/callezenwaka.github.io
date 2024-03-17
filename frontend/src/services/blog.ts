'use strict'

import { request } from '@/config';
import { Blog, BlogsRequest, BlogsResponse } from "@/types";

type token = string | undefined;

export default {
	// async addBlogImage(idToken: token, params) {
	// 	return await request(`blog/image`, 'post', idToken, params);
	// },
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

// export default {
// 	async getBlogs (idToken: Token): Promise<Response> {
// 		const res = await axios({
// 			method: 'get',
// 			url: `${API_DEV_URL}interests/fetchAll`,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`,
// 			},
// 			json: true,
// 		});
// 		return res;
// 	},
// 	async getBlog(idToken, lesson_id) {
// 		const res = await axios({
// 			method: 'get',
// 			url: `${API_PROD_URL}interests/fetchOne/${lesson_id}`,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`,
// 			},
// 			json: true,
// 		});
// 		return res;
// 	},
// 	async addBlogImage(idToken, params) {
// 		const res = await axios({
// 			method: 'post',
// 			url: `${API_DEV_URL}interests/image/addOne`,
// 			data: params,
// 			headers: { 
// 				'content-type': 'application/json',
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`, 
// 			},
// 			json: true,
// 		});
// 		return res;
// 	},
// 	async addBlog(idToken, params) {
// 		const res = await axios({
// 			method: 'post',
// 			url: `${API_DEV_URL}interests/addOne`,
// 			data: params,
// 			headers: { 
// 				'content-type': 'application/json', 
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`, 
// 			},
// 			json: true,
// 		});
// 		return res;
// 	},
// 	async updateBlog(idToken, params) {
// 		const res = await axios({
// 			method: 'put',
// 			url: `${API_DEV_URL}interests/updateOne/${params.id}`,
// 			data: params,
// 			headers: { 
// 				'content-type': 'application/json', 
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`, 
// 			},
// 			json: true,
// 		});
// 		return res;
// 	},
// 	async deleteBlog(idToken, lesson_id) {
//         const res = await axios({ 
//             method: 'delete',
// 			url: `${API_PROD_URL}interests/deleteOne/${lesson_id}`,
//             // data: params,
//             headers: {
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json',
// 				'Authorization': `Bearer ${idToken}`,
// 			},
// 			json: true,
//         })
//         return res;
// 	},
// }