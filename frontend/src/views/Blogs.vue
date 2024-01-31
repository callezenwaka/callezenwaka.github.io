<template>
<div>
  <BreadCrumb></BreadCrumb>
  <section class="blogs">
    <ul class="blog--items">
      <li class="blog--item" v-for="blog in blogs" :key="blog.id" ref="blogRefs">
        <!-- <div v-if="blog.isEditing">
          <form action="" method="post">
            <div class="form--item">
              <label for="title">
                <input type="text" name="title" id="title" v-model="blog.title">
              </label>
            </div>
          </form>
        </div>
        <div v-else> -->
        <!-- <router-link :to="{ name: 'Blog', params: { id: blog.id } }"> -->

          <h1 class="blog--title">{{ blog.title }}</h1>
          <img class="blog--avatar" :src="blog.avatar" :alt="blog.title" type="image/*" :title="blog.title">
          <!-- <div class="blog--action">
            <button type="button">Edit</button>
            <button type="button">Delete</button>
          </div> -->
          <div class="blog--summary">
            <p>{{ blog.content }} <router-link :to="{ name: 'Blog', params: { id: blog.id } }">Read more &ctdot;</router-link></p>
            <!-- <button type="submit" class="blog--button">More Details . . .</button> -->
          </div>
          <p class="blog--tags">Tags: {{ blog.tags }}</p>
          <!-- <a :href="blog.link" target="_blank">{{ blog.link }}</a> -->
        <!-- </router-link> -->
        <!-- </div> -->
      </li>
    </ul>
  </section>
</div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
import { onMounted, /* reactive, */ ref } from 'vue';
import { useBlogStore } from "@/stores";
import { storeToRefs } from "pinia";
const blogStore = useBlogStore();
const { blogs } = storeToRefs(useBlogStore());

onMounted(() => {
  blogStore.getBlogs()
})

const blogRefs = ref<(HTMLElement | null)[]>([]);
// const tags = ref(['Politics', 'Economy', 'Social']);
// const blog = reactive([
// 	{
// 		id: 'datafest2020',
// 		title: 'Datafest Africa 2020',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// 	{
// 		id: 'datafest2021',
// 		title: 'Datafest Africa 2021',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// 	{
// 		id: 'datafest2022',
// 		title: 'Datafest Africa 2022',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// 	{
// 		id: 'datafest2023',
// 		title: 'Datafest Africa 2023',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// 	{
// 		id: 'datafest202',
// 		title: 'Datafest Africa 2024',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// 	{
// 		id: 'datafest2025',
// 		title: 'Datafest Africa 2025',
// 		content: 'DataFest Africa is an annual event that ultimately celebrates data science and its ever-evolving impact on the African continent. Since its inception in 2019, the conference has become a melting pot of some of the brightest minds in the region, bringing together stakeholders of diverse backgrounds including; government, civil society, academics, students and private industry experts to connect, learn, and collaborate on innovative data-driven solutions.',
//     avatar: 'datafestSponsor',
//     tags: ['Politics', 'Economy', 'Social'],
//     link: 'https://www.datafestafrica.com/',
// 	},
// ]);

onMounted(() => {
  window.addEventListener('scroll', updateTransforms);
});

// New function to apply transforms based on scroll and index
const updateTransforms = () => {
  const scrollY = window.scrollY;
  blogRefs.value.forEach((blogRef, index) => {
    if (blogRef) {
      // const factor = 0.8 - (index / 10);
      // const factor = (index / 10);
      // const factor = 0.5 - ((blogRefs.value.length - index) / 10);
      // const factor = 0.5 - ((blogRefs.value.length - index) / 10);
      const factor = ((blogRefs.value.length - index) / 10);
      // console.log('factor: ', factor);
      // console.log('scrollY * factor: ', scrollY * factor)
      blogRef.style.transform = `translateY(${scrollY * factor}px)`;
      // blogRef.style.boxShadow = '0 0 80px rgba(255, 255, 255, 0.3)';
      // console.log('scrollY: ', scrollY)
      if (scrollY > 200) {
        blogRef.style.boxShadow = '0 0 80px rgba(255, 255, 255, 0.3)';
      } else {
        blogRef.style.boxShadow = 'none';
      }
    }
  });
};

</script>

<style scoped lang="css">
.blogs {
  /* max-width: 960px; */
  height: 375vh;
  height: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.blog--items {
  display: flex;
  flex-direction: column;
  row-gap: 150px;
  list-style-type: none;
  perspective: 1200px; /* Optional for 3D effect */
  position: relative; /* Contain positioned elements */
  height: 100%;
  margin-bottom: 20rem;
}
.blog--item {
  /* z-index: 0; */
  /* top: 0; */
  /* left: 0; */
  /* height: 100vh; */
  /* height: 100%; */
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 2rem;
  transform: translateY(0); /* Initial position */
  transition: transform 0.3s ease-in-out; /* Smoother transitions */
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  /* box-shadow: 0 0 80px rgba(255, 255, 255, 0.3); */
}
.blog--summary {
	text-align: justify;
	/* margin: 1.5rem 0rem; */
}
.blog--button {
	background-color: var(--button-primary-color);
	color: var(--text-primary-color);
	border: none;
	border: 0.1rem solid var(--text-primary-color);
	border-radius: 0.5rem;
	text-align: center;
	font-size: inherit;
	/* width: 100%; */
	padding: 0.5rem 1rem;
	cursor: pointer;
	transition: all 1s ease-out;
}

.blog--button:hover {
	filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}
.blog--tags {
	text-align: left;
	/* margin: 1.5rem 0rem; */
}

@media only screen and (min-width: 964px) {
	.blogs {
  height: 275vh;
  height: 100%;
  padding: 1rem 1rem;
  max-width: 960px;
  margin: 0 auto;
  padding-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.blog--items {
  margin-bottom: 15rem;
}

}

</style>