<template>
<div>
  <BreadCrumb></BreadCrumb>
  <div class="blogs">
    <section class="">
      <ul class="blog--items">
        <li class="blog--item" v-for="blog in blogs" :key="blog.id" ref="blogRefs">
          <h1 class="blog--title">{{ blog.title }}</h1>
          <img class="blog--avatar" :src="blog.avatar" :alt="blog.title" type="image/*" :title="blog.title">
          <div class="blog--summary">
            <p>{{ blog.summary }} | <router-link :to="{ name: 'Blog', params: { id: blog.id } }">Read more &ctdot;</router-link></p>
            <!-- <span v-html="blog.content"></span> -->
            <!-- {{ blog.content }}  -->
            <!-- v-html="blog.content" -->
            <!-- <button type="submit" class="blog--button">More Details . . .</button> -->
          </div>
          <p class="blog--tags">Tags: {{ blog.tags }}</p>
          <!-- <a :href="blog.link" target="_blank">{{ blog.link }}</a> -->
        </li>
      </ul>
    </section>
    <section class="pagination">
      <button type="button" class="pagination--button" :disabled="!firstVisibleTimestamp" @click="handleGetBlogs(false)" > &#10094; Previous</button>
      <button type="button" class="pagination--button" :disabled="!lastVisibleTimestamp" @click="handleGetBlogs(true)">Next &#10095;</button>
    </section>
  </div>
</div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
// import Pagination from "@/components/partials/Pagination.vue";
import { computed, onMounted, onUnmounted, /* reactive, */ ref } from 'vue';
import { useBlogStore } from "@/stores";
import { storeToRefs } from "pinia";
const blogStore = useBlogStore();
const { blogs, lastVisibleTimestamp, firstVisibleTimestamp } = storeToRefs(useBlogStore());

const page = ref(true);
const limit = ref(5);
const direction = computed(() => page.value? 'desc' : 'asc');
const lastVisible = computed(() => page.value? lastVisibleTimestamp.value: firstVisibleTimestamp.value);
const blogRefs = ref<(HTMLElement | null)[]>([]);
const currentTheme = ref(localStorage.getItem('theme'))

const isDarkTheme = computed(() => {
  // const currentTheme = localStorage.getItem('theme');
  // return currentTheme === 'dark'
  return currentTheme.value === 'dark';
})

// New function to apply transforms based on scroll and index
const updateTransforms = () => {
  currentTheme.value = localStorage.getItem('theme');
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
        blogRef.style.boxShadow = isDarkTheme.value? '0 0 80px rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3) 0px 0px 80px';
      } else {
        blogRef.style.boxShadow = 'none';
      }
    }
  });
};


async function handleGetBlogs(dir: boolean) {
  try {
    // 
    page.value = dir?? !dir; 
    console.log('page: ', page.value);
    await blogStore.getBlogs({
      limit: limit.value, 
      lastVisible: lastVisible.value, 
      direction: direction.value,
      isRequest: true, 
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Handle errors gracefully
  }
};

onMounted(async() => {
  await blogStore.getBlogs({
    limit: limit.value, 
    lastVisible: lastVisibleTimestamp.value, 
    direction: direction.value
  });
  window.addEventListener('scroll', updateTransforms);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateTransforms);
});

</script>

<style scoped lang="css">
.blogs {
  /* max-width: 960px; */
  height: 375vh;
  height: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
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
  color: var(--text-color-primary);
  /* box-shadow: 0 0 80px rgba(255, 255, 255, 0.3); */
}
.blog--summary {
	text-align: justify;
	/* margin: 1.5rem 0rem; */
}
.blog--button {
	background-color: var(button-background-color-primary);
	color: var(--text-color-primary);
	border: none;
	border: 0.1rem solid var(--text-color-primary);
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

/* .pagination--button {
  width: 100px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
} */

.pagination--button {
	background-color: var(--button-background-color-primary);
	color: var(--button-text-color-primary);
	border: none;
	border: 0.1rem solid var(--button-text-color-primary);
	border-radius: 0.5rem;
	text-align: center;
  padding: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
	width: 100px;
	cursor: pointer;
	transition: all 1s ease-out;
}

.pagination--button:hover {
	filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}

.pagination--button:disabled {
	cursor: not-allowed;
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