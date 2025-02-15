// stores/blogs.ts
import { defineStore, storeToRefs } from 'pinia'
import { Blog, BlogsRequest } from "@/types";
import { blogClient } from "@/services";
import { useAuthStore } from '@/stores';
// const { idToken } = storeToRefs(useAuthStore());

// interface State {
//   blogs: Blog[]
//   blog: Blog | null
// }

const _blogs: Blog[] = [
	{
		id: 'datafest2020',
		title: 'Datafest Africa 2020',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
	{
		id: 'datafest2021',
		title: 'Datafest Africa 2021',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
	{
		id: 'datafest2022',
		title: 'Datafest Africa 2022',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
	{
		id: 'datafest2023',
		title: 'Datafest Africa 2023',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
	{
		id: 'datafest202',
		title: 'Datafest Africa 2024',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
	{
		id: 'datafest2025',
		title: 'Datafest Africa 2025',
    summary: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
    avatar: 'datafestSponsor',
    status: true,
    tags: ['Politics', 'Economy', 'Social'],
    link: 'https://www.datafestafrica.com/',
    created_at: 1700438400000,
    updated_at: 1700438400000,
	},
];

export const useBlogStore = defineStore('blog', {
  state: () => ({
    _blogs,
    blogs: [] as Blog[], // an array of blog objects
    blog: null as Blog | null,
    tags: ['Politics', 'Economy', 'Social', 'Art', 'Technology'],
    lastVisibleTimestamp: undefined as number | undefined,
  }),
  getters: {
    getAllBlogs: state => state.blogs,
    getOneBlog: state => state.blog,
    getOneBlogById: state => (id: string) => state.blogs.find(blog => blog.id === id),
    getTags: state => state.tags,
    getLastVisibleTimestamp: state => state.lastVisibleTimestamp,
  },
  actions: {
    async getBlogs(query: BlogsRequest) {
      const { idToken } = storeToRefs(useAuthStore());
      try {
        // TODO: Check vuex store for data
			  if (!query.isRequest && this.blogs && !!this.blogs.length) return this.blogs;
        // TODO: api call
        // a method to fetch blogs from an API and update the state
        const data = await blogClient.getBlogs(idToken.value, query);
        if (typeof data !== 'object') return;
        else {
          this.lastVisibleTimestamp = data?.lastVisibleTimestamp?? undefined;
          this.blogs.push(...data.blogs);
          return data.blogs;
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getBlog(payload: string) {
      const { idToken } = storeToRefs(useAuthStore());
      try {
        // TODO: Check vuex store for data
        if (payload === this.blog?.id) return this.blog;
        // TODO: Use getter to filter state variable
        const blog = this.getOneBlogById(payload);
        if (blog) return this.blog = blog;
        // Use getter to filter state variable
        // const blog: Blog = this.oneBlogById(payload);
        // if (blog) { 
        //   // this.$patch({ blog });
        //   this.$patch((state) => state.blog = blog);
        //   return blog;
        // }
        // Update state with patch method
        // else {
        //   this.$patch({ blog });
        //   return blog;
        // }
        // TODO: api call
        // a method to fetch blog from an API and update the state
        const data = await blogClient.getBlog(idToken.value, payload);
        console.log('data: ', data);
        if (typeof data !== 'object') return;
        else return this.blog = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addBlog(blog: Blog) {
      const { idToken } = storeToRefs(useAuthStore());
      try {
        // TODO: api call
        // a method to add a blog to the state
        const data = await blogClient.addBlog(idToken.value, blog);
        console.log('data: ', data);
        if (typeof data !== 'object') return;
        else return this.blogs.push(blog);
        // return this.blogs.push(blog);
      } catch (error) {
        console.log(error);
      }
    },
    async updateBlog(blog: Blog) { // Corrected method name
      const { idToken } = storeToRefs(useAuthStore());
      try {
        // TODO: api call
        // a method to edit a blog from the state
        const data = await blogClient.updateBlog(idToken.value, blog);
        console.log('data: ', data);
        if (typeof data !== 'object') return;

        const index = this.blogs.findIndex((b) => b.id === blog.id);
        if (index !== -1) {
          this.$patch((state) => state.blogs[index] = blog);
          // this.$patch({
          //   blogs: { [index]: blog, },
          // });
          // let reviews = this.reviews.map((item) =>
          //   item.id === review.id ? { ...item, ...updatedReview } : item
          // );
        }
        return this.blogs[index];
      } catch (error) {
        console.log(error);        
      }
    },
    // updateProduct(product, newName, newPrice) {
    //   // find the index of the product in the state array
    //   const index = this.products.findIndex(p => p.id === product.id)
    //   if (index !== -1) {
    //     // use $patch to update the product object
    //     this.$patch({
    //       products: {
    //         [index]: {
    //           name: newName,
    //           price: newPrice
    //         }
    //       }
    //     })
    //   }
    // },
    async deleteBlog(blog: Blog) {
      const { idToken } = storeToRefs(useAuthStore());
      try {
        // TODO: api call
        // a method to remove a blog from the state
        const data = await blogClient.deleteBlog(idToken.value, blog);

        if (typeof data !== 'string') return;

        const index = this.blogs.findIndex(u => u.id === blog.id)
        if (index !== -1) return this.blogs.splice(index, 1);

        return;
      } catch (error) {
        console.log(error);
      }
    }
  }
})