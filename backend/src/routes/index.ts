// import express from 'express';
// // export { default as blogRoutes } from "@/routes/blog";
// import blogRoutes from './blog'; // Import blogRoutes
// // import * as postsRoutes from './postsRoutes'; // Import postsRoutes

// // Create a new router to combine routes
// const router = express.Router();

// // Use the use() method to mount imported routes onto the new router
// router.use('/blog', blogRoutes);
// // router.use('/posts', postsRoutes);
// // ... mount other routes as needed

// // Export the combined router
// export default router;

// export * from './blog';

import { Router } from 'express';
import { blogRouter } from './blog';

const routers = Router();
routers.use('/blog', blogRouter);

export { routers };
