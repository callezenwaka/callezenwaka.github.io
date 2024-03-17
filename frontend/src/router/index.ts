// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import { storeToRefs } from 'pinia';
// import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
// import { /* useAuthStore, */ useBlogStore } from '@/stores';
import firebase from '@/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseAuth = getAuth(firebase);
import { NavigationGuardNext, RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import { useBlogStore, useAuthStore } from '@/stores';

// Vue.use(VueRouter)
// PerspectiveView


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import(/* webpackChunkName: "research" */ '../views/ResearchView.vue')
  },
  {
    path: '/event',
    name: 'Event',
    component: () => import(/* webpackChunkName: "presentation" */ '../views/EventView.vue')
  },
  {
    path: '/blog',
    name: 'Blogs',
    component: () => import(/* webpackChunkName: "blogs" */ '@/views/Blogs.vue'),
  },
  {
    path: '/blog/create',
    name: 'BlogCreate',
    component: () => import(/* webpackChunkName: "blog-create" */ '@/components/core/blog/Create.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "blog" */ '@/components/core/blog/Blog.vue'),
    props: true,
    beforeEnter: async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const blogStore = useBlogStore(); // Initialize your store
    
      try {
        const blog = await blogStore.getBlog(to.params.id.toString()); // Fetch blog data
        if (!blog) {
          // Blog not found, redirect to '/blog' or another appropriate route
          next('/blog');
        } else {
          // Set the blog data in the route params
          next();
        }
      } catch (error) {
        // Handle errors (e.g., API request failed)
        next({ name: 'NotFound' });
      }
    },
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
  //   meta: { requiresAuth: true },
	// 	props: true,
  //   // props: {
  //   //   id: String, // Specify parameter type
  //   // },
	// 	beforeEnter: async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
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
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
	onAuthStateChanged(firebaseAuth, async(user) => {
    if (user && user.emailVerified) {
			const { token } = await user.getIdTokenResult();
			await authStore.setIsAuthenticated(true);
			await authStore.setCurrentUser(user);
			await authStore.setIdToken(token);
		}
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      // return '/login'
      // TODO: Add message
			return next({
				name: "Login",
				query: { redirect: to.fullPath }
			});
    }
    else return next();
  });
});

export default router