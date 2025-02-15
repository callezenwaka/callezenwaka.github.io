// import packages and dependencies
import { isAuthenticated } from '../libs/auth';
import { Router } from 'express';
import { BlogController } from '../controllers/index';
// import express from "express";
const blogRouter = Router();
const blogController = new BlogController();

blogRouter.get('/', blogController.getBlogs);

blogRouter.get('/:id', isAuthenticated, blogController.getBlog);

blogRouter.get('/search', isAuthenticated, blogController.getSearchBlogs);

blogRouter.post('/feedback', blogController.createFeedback);

blogRouter.post('/', isAuthenticated, blogController.createBlog);

blogRouter.put('/:id', isAuthenticated, blogController.updateBlog);

blogRouter.delete('/:id', isAuthenticated, blogController.deleteBlog);
 
// export default blogRouter;
export { blogRouter };