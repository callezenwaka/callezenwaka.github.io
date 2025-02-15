'use strict';

import Multer from 'multer';
import { getAuth } from "firebase-admin/auth";
import { Response, NextFunction } from 'express';
import { Firestore, Timestamp } from '@google-cloud/firestore';
import { BlogsResponse } from "../models";

// Initialize Firestore
const firestore = new Firestore();

// interface BlogsResponse {
// 	blogs: Blog[];
// 	lastVisibleTimestamp?: Timestamp;
// }

/**
 * [START FETCH BLOGS]
 * @param page 
 * @param limit 
 * @param lastVisible 
 * @returns 
 * Retrieve blogs
 */
export const fetchBlogs = async (limit: number = 5, lastVisible?: Timestamp): Promise<BlogsResponse> => {
	
	let q = firestore.collection('blog').orderBy('created_at', 'desc').where('status', '==', true);

	if (lastVisible) q = q.startAfter(lastVisible);

	const querySnapshot = await q.limit(limit).get();
	
	// TODO: 
	const blogs = querySnapshot.docs.map((doc) => ({
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

	// TODO: Return last doc lastVisibleTimestamp
	const lastVisibleTimestamp = querySnapshot.docs[querySnapshot.docs.length - 1]?.get('created_at');

	return { blogs, lastVisibleTimestamp };
};

/**
 * 
 * @param req 
 * @param file 
 * @param cb 
 * @returns 
 */
const imageFilter = (file: Express.Multer.File, cb: any) => {
	// file.originalname
	if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
		return cb(new Error('Only image files are allowed!'), false);
	}
	cb(null, true);
};

// 
export const multer = Multer({
	// fileFilter: imageFilter,
	storage: Multer.memoryStorage(),
	// no larger than 5mb
	limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * [START DELAY INTERVAL]
 * @param ms 
 * @returns 
 * set delay interval
 */
export const delayInterval = async (ms: number) => {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}
// [END DELAY INTERVAL]


/**
 * [START SET CLAIM]
 * @param {string} userId Express request context.
 * @param {object} claim Express response context.
 * @return {object} 
 * define set claim middleware.
 */
export const setClaim = async (userId: string, claim: object): Promise<void> => {
	try {
		// TODO: set claim
		return await getAuth().setCustomUserClaims(userId, claim);
	} catch (error) {
		console.log('error: ', error);
	}
}
// [END SET CLAIM]

/**
 * [START UPLOAD DOCUMENT]
 * @param {object} file Express request context.
 * @param {object} next Express next context.
 * Define post secret middleware.
 */
export const uploadDocument = async (req: any, res: Response, next: NextFunction) => {
	try {
		// TODO: upload document to ipfs
		if (!req.file) return res.status(501).json('No file uploaded!');

		next();
	} catch (error) {
		return res.status(501).json('Internal error!');
	}
};
// [END UPLOAD DOCUMENT]

/**
 * [START LIST USERS]
 * @param {*} pageSize
 * @param {*} nextPageToken
 * Start listing users from the beginning, 1000 at a time.
 */
export const listAllUsers = async (pageSize: number, nextPageToken: string, next: NextFunction) => {
	try {
		// TODO: List batch of users, 1000 at a time.
		// https://firebase.google.com/docs/auth/admin/manage-users?authuser=0#list_all_users
		// https://stackoverflow.com/a/48889822
		// let accounts = {
		// 	users: [] = [],
		// 	result: string[] = [],
		// 	pageToken: '',
		// };
		const lists = await getAuth().listUsers(pageSize, nextPageToken);
		// lists.users.forEach((user: any) => {
		//   // TODO: map users
		//   console.log('user', user.toJSON().uid);
		// 	let item: Account = {
		// 		id: user.toJSON().uid,
		// 		email: user.toJSON().email,
		// 		emailVerified: user.toJSON().emailVerified,
		// 		phoneNumber: user.toJSON().phoneNumber,
		// 		displayName: user.toJSON().displayName,
		// 		photoURL: user.toJSON().photoURL,
		// 		disabled: user.toJSON().disabled,
		// 	}

		//   // accounts.users.push(item);
		// 	return {
		// 		uid: user.toJSON().uid,
		// 		email: user.toJSON().email,
		// 		emailVerified: user.toJSON().emailVerified,
		// 		phoneNumber: user.toJSON().phoneNumber,
		// 		displayName: user.toJSON().displayName,
		// 		photoURL: user.toJSON().photoURL,
		// 		disabled: user.toJSON().disabled,
		// 	}
		// });
		// console.log('lists pageToken: ', lists.pageToken);
		// console.log('lists: ', lists);
		// if (lists.pageToken) {
		//   // List next batch of users.
		//   await listAllUsers(pageSize, lists.pageToken, next);
		// }

		return lists;
	} catch (error) {
		console.log('error: ', error)
		next('Internal Server Error!');
	}
};
// [END LIST USERS]