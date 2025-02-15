<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <div class="blogs">
      <section class="">
        <!-- <ul class="blog--items">
        <li class="blog--item" v-for="blog in paginatedBlogs" :key="blog.id" ref="blogRefs">
          <h1 class="blog--title">{{ blog.title }}</h1>
          <img class="blog--avatar" :src="blog.avatar" :alt="blog.title" type="image/*" :title="blog.title">
          <div class="blog--summary">
            <p>{{ blog.summary }} | <router-link :to="{ name: 'Blog', params: { id: blog.id } }">Read more &ctdot;</router-link></p>
          </div>
          <p class="blog--tags">Tags: {{ blog.tags }}</p>
        </li>
      </ul> -->
        <ul class="blog--items">
          <li class="blog--item" v-for="blog in paginatedBlogs" :key="blog.id">
            <h1 class="blog--title">{{ blog.title }}</h1>
            <img class="blog--avatar" :src="blog.avatar" :alt="blog.title" type="image/*" :title="blog.title">
            <div class="blog--summary">
              <p>{{ blog.summary }} | <router-link :to="{ name: 'Blog', params: { id: blog.id } }">Read more &ctdot;</router-link></p>
            </div>
            <p class="blog--tags">Tags: {{ blog.tags }}</p>
          </li>
        </ul>
      </section>
      <section class="pagination">
        <button type="button" class="pagination--button" :disabled="isBackward" @click="handleBackward">
          &#10094; Previous</button>
        <!-- <p>Page {{ page }} of {{ Math.ceil(blogs.length / limit) }}</p> -->
        <button type="button" class="pagination--button" :disabled="isForward" @click="handleForward">Next
          &#10095;</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
// import Pagination from "@/components/partials/Pagination.vue";
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Blog } from "@/types";
import { useBlogStore } from "@/stores";
import { storeToRefs } from "pinia";
const blogStore = useBlogStore();
const { blogs, lastVisibleTimestamp } = storeToRefs(useBlogStore());

const blogRefs = ref<(HTMLElement | null)[]>([]);
const currentTheme = ref(localStorage.getItem('theme'))

const page = ref(1);
const limit = ref(5);
const isNext = ref(true);
const direction = ref('desc');
const pageStack = ref<Record<number, Blog[]>>({});
const isBackward = computed(() => page.value === 1);
const isForward = computed(() => !isNext.value && !pageStack.value[page.value + 1]);
const lastVisible = computed(() => lastVisibleTimestamp.value);

// Computed to get the current page's blogs
const paginatedBlogs = computed(() => {
  const start = (page.value - 1) * limit.value;
  const end = start + limit.value;
  return blogs.value.slice(start, end);
});

const isDarkTheme = computed(() => {
  // const currentTheme = localStorage.getItem('theme');
  // return currentTheme === 'dark'
  return currentTheme.value === 'dark';
});

// New function to apply transforms based on scroll and index
const updateTransforms = () => {
  currentTheme.value = localStorage.getItem('theme');
  const scrollY = window.scrollY;
  blogRefs.value.forEach((blogRef, index) => {
    if (blogRef) {
      const factor = ((blogRefs.value.length - index) / 10);
      blogRef.style.transform = `translateY(${scrollY * factor}px)`;
      if (scrollY > 200) {
        blogRef.style.boxShadow = isDarkTheme.value ? '0 0 80px rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3) 0px 0px 80px';
      } else {
        blogRef.style.boxShadow = 'none';
      }
    }
  });
};

onMounted(async () => {
  window.addEventListener('scroll', updateTransforms);
  const initialBlogs = await blogStore.getBlogs({
    limit: limit.value,
    page: page.value,
    lastVisible: lastVisible.value,
    direction: direction.value,
    isRequest: true,
  });
  isNext.value = initialBlogs?.length === limit.value;
});


// Function to handle next/previous page
const handleGetBlogs = async (pageNumber: number) => {
  const newBlogs = await blogStore.getBlogs({
    limit: limit.value,
    page: pageNumber,
    lastVisible: lastVisible.value,
    direction: direction.value,
    isRequest: true,
  });

  // Update isNext based on the number of users returned
  isNext.value = newBlogs?.length === limit.value;

  // If no users are returned, do not increment the page
  if ((!newBlogs || newBlogs.length === 0)) return false; // Indicate that no users were found

  // Cache the fetched users for the current page
  pageStack.value[pageNumber] = newBlogs;

  return true; // Indicate that users were found
};

// Function to handle moving to the previous page
const handleBackward = () => {
  const previousPage = page.value - 1;

  if (previousPage >= 1) {
    page.value = previousPage; // Load from cache
  }
};

// Function to handle moving to the next page
const handleForward = async () => {
  const nextPage = page.value + 1;

  if (pageStack.value[nextPage]) {
    page.value = nextPage; // Load from cache
  } else if (isNext.value) {
    const blogsFetched = await handleGetBlogs(nextPage);
    if (blogsFetched) page.value = nextPage; // Only increment if users were fetched
  }
};

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
  /* display: flex;
  flex-direction: column;
  row-gap: 150px;
  list-style-type: none;
  position: relative;
  height: 100%;
  margin-bottom: 20rem; */
  height: 100%;
  list-style-type: none;
  /* Optional for 3D effect */
  perspective: 1200px; 
  /* new */
  /* min-height: 400px; */
  /* margin-top: 200px; */
  /* width: 80%; */
  position: relative;
  background-attachment: scroll;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
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
  transform: translateY(0);
  /* Initial position */
  transition: transform 0.3s ease-in-out;
  /* Smoother transitions */
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
  /* box-shadow: 0 0 80px rgba(255, 255, 255, 0.3); */

  /* new */
  position: relative;
  background-attachment: scroll;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: #f00; */
  /* min-height: 400px; */
  /* margin-top: 200px; */
  /* width: 80%; */
  margin-left: auto;
  margin-right: auto;
  position: sticky;
  background-color: var(--background-color-primary);
  top: 50px;
  margin-top: 50px;
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