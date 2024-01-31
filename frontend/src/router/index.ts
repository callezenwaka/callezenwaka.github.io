// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import { storeToRefs } from 'pinia';
// import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
// import { /* useAuthStore, */ useBlogStore } from '@/stores';
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

// Vue.use(VueRouter)
// PerspectiveView


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/DashboardView.vue')
  },
  // {
  //   path: '/perspective',
  //   name: 'Perspective',
  //   component: () => import(/* webpackChunkName: "perspective" */ '../views/PerspectiveView.vue')
  // },
  {
    path: '/blog',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "blogs" */ '@/views/Blogs.vue'),
    children: [
    //   {
    //     path: '/blog/create',
    //     name: 'Edit',
    //     component: () => import(/* webpackChunkName: "blog-create" */ '@/components/core/blog/Create.vue'),
    //     props: true
    //   }
    // {
    //   path: '/blog/:id',
    //   name: 'Blog',
    //   component: () => import(/* webpackChunkName: "blog" */ '@/components/core/blog/Blog.vue'),
    //   props: true,
    // },
    //   {
    //     path: '/edit/:id',
    //     name: 'Edit',
    //     component: () => import(/* webpackChunkName: "blog-edit" */ '@/components/core/blog/Edit.vue'),
    //     props: true
    //   }
    ]
  },
  {
    path: '/blog/create',
    name: 'BlogCreate',
    component: () => import(/* webpackChunkName: "blog-create" */ '@/components/core/blog/Create.vue')
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '@/components/core/blog/Blog.vue'),
    props: true,
  },
  // {
  //   path: '/blog/edit/:id',
  //   name: 'BlogEdit',
  //   component: () => import(/* webpackChunkName: "blog-edit" */ '@/components/core/blog/Edit.vue'),
  //   props: true,
  // },
  // {
  //   path: '/blog/:id',
  //   name: 'Blog',
  //   component: () => import(/* webpackChunkName: "blog-read" */ '@/components/core/blog/Blog.vue'),
    // meta: { requiresAuth: true },
		// props: true,
  //   // props: {
  //   //   id: String, // Specify parameter type
  //   // },
	// 	beforeEnter: async (to: any, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  //     const blogStore = useBlogStore();
	// 		try {
	// 			const blog = await blogStore.getBlog(to.params.id)
	// 			if (!blog) next('/blog');
	// 			else {
	// 				to.params.blog = blog;
	// 				next();
	// 			}
	// 		} catch (error) {
	// 			next({ name: 'NotFound' });
	// 		}
	// 	},
  // },
  {
    path: '/research',
    name: 'Research',
    component: () => import(/* webpackChunkName: "research" */ '../views/ResearchView.vue')
  },
  {
    path: '/presentation',
    name: 'Presentation',
    component: () => import(/* webpackChunkName: "presentation" */ '../views/PresentationView.vue')
  },
  { 
    path: '/:pathMatch(.*)', 
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  // base: process.env.BASE_URL,
  routes
})

export default router