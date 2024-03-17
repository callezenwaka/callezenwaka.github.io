'use strict';

import { Response, NextFunction } from 'express';
import { getAuth } from "firebase-admin/auth";
import { BLOG_ROLE_ADMIN } from './constants';

/**
 * [START GET AUTH TOKEN]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * Define auth helper function.
 */
const getAuthToken = (req: any, res: Response, next: NextFunction) => {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		req.authToken = req.headers.authorization.split(' ')[1];
	} else {
		req.authToken = null;
	}
	next();
};
// [END GET AUTH TOKEN]

/**
 * [START CHECK AUTHENTICATED]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 * Define authenticated middleware.
 */
export const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
	getAuthToken(req, res, async () => {
		try {
			// TODO: verify token
			const { authToken } = req;
			// const userInfo = await getAuth().verifyIdToken(authToken);
			// req.user = userInfo;
			return next();
		} catch (error) {
			return res.status(401).json('Unauthenticated access!');
		}
	});
}
// [END CHECK AUTHENTICATED]

/**
 * [START CHECK DEVELOPER ROLE]
 * @param {object} req Express request context.
 * @param {object} res Express response context.
 * @param {object} next Express next context.
 */
export const isDeveloper = async(req: any, res: Response, next: NextFunction) => {
	getAuthToken(req, res, async () => {
		try {
			// TODO: verify token
			const userInfo = await getAuth().verifyIdToken(req.authToken);

			// TODO: check user role
			if(!userInfo.roles.includes(BLOG_ROLE_ADMIN)) return res.status(403).json('Forbidden access!!');

			req.user = userInfo;
			return next();
		}
		catch (error) {
			return res.status(401).json('Unauthorized access!');
		}
	});
}
// [END CHECK DEVELOPER ROLE]