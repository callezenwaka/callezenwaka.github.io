import { Request, Response, NextFunction } from "express";
import { Blog, BlogsResponse } from '../models';
// import { fetchBlogs } from "../libs/utils";
import { BLOG_ROLE_ADMIN, } from "../libs/constants";
import { Firestore, Timestamp } from '@google-cloud/firestore';
const firestore = new Firestore();

export default class BlogController {

	constructor() { } // Assuming no constructor arguments

	async createFeedback(req: any, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: get and validate blog details
			// const { roles } = req.user;
			// const { id, ...rest } = req.body;
			console.log('body: ', req.body.yes_no_question);
			// console.log('body: ', JSON.parse(req.body));

			// if (!id || !rest.title || !rest.title) return res.status(400).json('Bad parameters!');

			// TODO: check role
			// if(!roles.some((role: number) => [BLOG_ROLE_ADMIN].includes(role)))
			//   return res.status(400).json('Bad role parameters!');

			// TODO: add a new blog to DB
			// await firestore.collection('blog').doc(id).set({ ...rest });

			// TODO: create a new blog    
			return res.status(200).json({ message: 'Success' });
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END POST BLOG]

	/**
	 * [START GET SEARCH BLOGS]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Retrieve search items
	 */
	async getSearchBlogs(req: Request, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: Fix query params and pagination (priority medium)
			const blogs: Blog[] = [];
			// let total =  0;
			// Todo: query multiple blogs
			const { limit, page, pageSize, pageIndex = 0 } = req.query;
			// const { limit, page, pageSize, pageIndex = 0, title, created_at } = JSON.parse(req.query.filters);

			const data = await firestore.collection('blog')
				.where('status', '==', true)
				.orderBy('created_at')
				// .limit(limit)
				.get();

			if (data.empty) {
				return res.status(200).json(blogs);
			}
			// TODO: list and assign blog
			data.forEach(doc => {
				let blog = {
					id: doc.id,
					title: doc.data().title,
					summary: doc.data().summary,
					content: doc.data().content,
					avatar: doc.data().avatar,
					tags: doc.data().tags,
					status: doc.data().status,
					link: doc.data().link,
					created_at: doc.data().created_at,
					updated_at: doc.data().updated_at,
				};
				blogs.push(blog);
			});

			return res.status(200).json(blogs);
		} catch (error) {
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END GET SEARCH BLOGS]

	/**
	 * [START GET BLOGS]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Retrieve items
	 */
	async getBlogs(req: Request, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: Destructure query and declare variables
			const { limit = '10', page = 1, lastVisible = null, direction = 'desc', } = req.query;
			const parsedLimit = parseInt(limit as string, 10);
			const parsedPage = parseInt(page as string, 1);
			const parsedLastVisible = lastVisible ? Number(lastVisible) : null;

			// TODO: Initialize variables
			let blogs: Blog[] = [];
			let lastVisibleTimestamp = null;

			// TODO: Confirm that the lastVisible is boolean and return
			if (parsedPage > 1 && parsedLastVisible === null) {
				return res.status(400).json({ message: "Invalid query parameter for 'lastVisible'" });
			}

			// TODO: Build query and 
			let query = firestore.collection('blog')
				.where('status', '==', true)
				.orderBy('created_at', direction as 'desc')
				.limit(parsedLimit);

			// TODO: Use the last document snapshot as the cursor and is a number
			if (parsedLastVisible !== null) {
				query = query.startAfter(parsedLastVisible);
			}

			// TODO: Store a reference to the docs array
			const data = await query.get();

			// Check if no data is found
			if (data.empty) {
				return res.status(200).json({ blogs, lastVisibleTimestamp, });
			}

			// TODO: Assign the last data created_at to lastVisibleTimestamp variable
			// Assign last document timestamp for pagination
			lastVisibleTimestamp = data.docs[data.docs.length - 1]?.data()?.created_at || null;

			// TODO: Map data to blogs variable
			blogs = data.docs.map((doc) => ({
				id: doc.id,
				title: doc.data().title,
				summary: doc.data().summary,
				content: doc.data().content,
				avatar: doc.data().avatar,
				tags: doc.data().tags,
				status: doc.data().status,
				link: doc.data().link,
				created_at: doc.data().created_at,
				updated_at: doc.data().updated_at,
			}));

			// TODO: Return response to client
			return res.status(200).json({ blogs, lastVisibleTimestamp });
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END GET BLOGS]

	/**
	 * [START GET BLOG]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Retrieve item
	 */
	async getBlog(req: Request, res: Response, next: NextFunction): Promise<object> {
		try {
			// Todo: get blog id from query param
			const { id } = req.params;
			if (!id) return res.status(400).json('Bad parameter!');

			// Todo: get blog with id
			const data = await firestore.collection('blog').doc(id).get();
			if (!data.exists) {
				return res.status(200).json({});
			}
			let blog: Blog = {
				id: data.id,
				title: data.data()?.title,
				summary: data.data()?.summary,
				content: data.data()?.content,
				avatar: data.data()?.avatar,
				tags: data.data()?.tags,
				status: data.data()?.status,
				link: data.data()?.link,
				created_at: data.data()?.created_at,
				updated_at: data.data()?.updated_at,
			};

			return res.status(200).json(blog);
		} catch (error) {
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END GET BLOG]

	/**
	 * [START POST BLOG]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Add item
	 */
	async createBlog(req: any, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: get and validate blog details
			// const { roles } = req.user;
			const { id, ...rest } = req.body;

			if (!id || !rest.title || !rest.title) return res.status(400).json('Bad parameters!');

			// TODO: check role
			// if(!roles.some((role: number) => [BLOG_ROLE_ADMIN].includes(role)))
			//   return res.status(400).json('Bad role parameters!');

			// TODO: add a new blog to DB
			await firestore.collection('blog').doc(id).set({ ...rest });

			// TODO: create a new blog    
			return res.status(200).json({ id, ...rest });
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END POST BLOG]

	/**
	 * [START UPDATE BLOG IMAGE]
	 * Create a request. If an image is uploaded, add public URL from cloud storage to firestore
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object}
	 * Upload document
	 */
	async updateBlogImage(req: any, res: Response, next: NextFunction): Promise<any> {
		try {
			// TODO: Add file
			if (!req.file) return res.status(400).json("Please choose file to upload!");

			// TODO: handle uploaded document 

			// TODO: send url back to client
			// req.photoURL = '';
			// return res.status(200).json(photoURL);
			next();
		} catch (error) {
			return res.status(500).json('Internal Server Error!');
		}
	};
	// [END UPDATE BLOG IMAGE]

	/**
	 * [START UPDATE BLOG]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Update item
	 */
	async updateBlog(req: any, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: get and validate blog details
			// const { roles } = req.user;

			const { id, ...rest } = req.body;
			if (!id || !rest.title || !rest.summary || !rest.content || !rest.tags)
				return res.status(400).json('Bad parameters!');

			// TODO: check role or do this in an utils function?
			// if(!roles.some((role: number) => [BLOG_ROLE_ADMIN].includes(role)))
			//   return res.status(400).json('Bad role parameters!');

			// TODO: update blog profile to the DB
			await firestore.collection('blog').doc(id).update({ id, ...rest });

			// return res.status(200).json('Success');    
			return res.status(200).json({ id, ...rest });
		} catch (error) {
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END UPDATE BLOG]

	/**
	 * [START DELETE BLOG]
	 * @param {object} req Express request context.
	 * @param {object} res Express response context.
	 * @param {object} next Express next context.
	 * @return {object} json blog
	 * Remove item
	 */
	async deleteBlog(req: any, res: Response, next: NextFunction): Promise<object> {
		try {
			// TODO: create a provider and update a document
			const { id } = req.params;
			const { roles } = req.user;
			if (!id || !roles) return res.status(400).json('Bad parameter!');

			// TODO: check role or do this in an utils function?
			if (!roles.some((role: number) => [BLOG_ROLE_ADMIN].includes(role)))
				return res.status(400).json('Bad role parameters!');

			// TODO: validate delete blog
			await firestore.collection('blog').doc(id).delete();

			return res.status(200).json('Success');
		} catch (error) {
			return res.status(500).json('Internal Server Error!');
		}
	}
	// [END DELETE BLOG]

}

// export default {
//   getSearchBlogs,
//   getBlogs,
//   getBlog,
// 	createBlog,
//   updateBlog,
//   updateBlogImage,
//   deleteBlog
// }