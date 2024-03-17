<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <section class="blog--create" v-if="isAuthenticated">
      <h1 class="blog--title">Create Blog</h1>
      <form @submit.prevent="handleCreate">
        <div class="form--item">
          <label for="title" class="form--label">Title:</label>
          <input type="text" class="form--input" name="title" id="title" v-model="blog.title" placeholder="New blog title"
            aria-required="true" aria-invalid="false" required>
        </div>
        <div class="form--item">
          <label for="summary" class="form--label">Summary:</label>
          <textarea 
            type="text" 
            class="form--input" 
            name="summary" 
            id="summary" 
            v-model="blog.summary"
            placeholder="New blog summary" 
            @change="handleAdjustFocus($event)" 
            @keyup="handleAdjustFocus($event)"
            @focus="handleAdjustFocus($event)" 
            @blur="handleAdjustBlur($event)" 
            aria-required="true" 
            aria-invalid="false"
            autocomplete="summary" 
            required
          >
          </textarea>
        </div>
        <div class="form--item">
          <label for="content" class="form--label">Content:</label>
          <div style="margin-top: 0.4rem;">
            <QuillEditor class="form--editor" v-model:content="blog.content" content-type="html" toolbar="full" theme="snow" />
          </div>
        </div>
        <div class="form--item multiple">
          <div class="form--item">
            <label for="status" class="form--label required">Status: </label>
            <!-- <br> -->
            <select class="form--input" v-model="blog.status" name="status" id="status" required>
              <option disabled value="">--</option>
              <!-- As per discussion here: https://stackoverflow.com/a/45265037 -->
              <option :value='false'>False</option>
              <option :value='true'>True</option>
            </select>
          </div>
          <div class="form--item">
            <label for="tags" class="form--label required">Tags:</label>
            <div class="multiselect">
              <div class="selectBox" @click="handleExpandOptions">
                <select class="form--input" required>
                  <option>Select an option ({{ blog.tags?.length }})</option>
                </select>
                <div class="overSelect"></div>
              </div>
              <div class="tags" id="tags" ref="tagRef" @mouseleave="handleExpandOptions">
                <label :for="tag" v-for="(tag, i) in tags" :key="i">
                  <input type="checkbox" :value="tag" :id="tag" v-model="blog.tags" />
                  <span>{{ tag }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form--item">
          <button type="submit" class="form--button">Submit</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
import { handleAdjustFocus, handleAdjustBlur } from "@/utils";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import { Blog } from "@/types";
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useAuthStore, useBlogStore } from "@/stores";

const { isAuthenticated } = storeToRefs(useAuthStore());
const { tags } = storeToRefs(useBlogStore());
const router = useRouter();
const blogStore = useBlogStore()

const tagRef = ref<(HTMLElement)>();
const expanded = ref(false);

const blog: Blog = reactive({
  id: uuidv4(),
  title: '',
  summary: '',
  content: '<p>Enter blog content.</p>',
  avatar: 'avatar',
  status: true,
  tags: [],
  link: 'https://www.link.com/',
  created_at: Date.now(),
  updated_at: Date.now(),
})

const handleExpandOptions = () => {
  // var roles = rolesRef.value;
  if (!expanded.value) {
    tagRef!.value!.style.display = "block";
    expanded.value = !expanded.value;
  } else {
    tagRef!.value!.style.display = "none";
    expanded.value = !expanded.value;
  }
};

const handleCreate = async () => {
  console.log('blog: ', blog);
  await blogStore.addBlog({ ...blog });
  await router.push({ name: 'Blog', params: { id: blog.id } });
  // flash message here!
};

</script>

<style scoped lang="css">
/*  */
.blog--create {
  /* max-width: 960px; */
  height: 375vh;
  height: 100%;
  margin: 0 auto;
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.form--item {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  margin: 0px 0px 1.5rem;
  padding: 0px;
}

.form--item.multiple {
  /* display: flex; */
  flex-direction: row;
  column-gap: 10px;
}

.form--label {
  color: var(--text-color-primary);
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem;
}

.form--input {
	color: var(--text-color-primary);
  height: 3rem;
  width: 100%;
  font-size: inherit;
  line-height: 3rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  padding-left: 10px;
  margin-top: 5px;
}

.form--editor {
  background-color: inherit;
}

.form--buttons {
  width: 100%;
  margin-top: 16px;
  font-size: 1.2rem !important;
  line-height: 3rem;
  border-radius: 5px;
  /* border: 2px solid transparent; */
  /* background-color: transparent; */
  outline: none;
  cursor: not-allowed;
  padding-left: 10px;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}

.form--button {
  background-color: var(--button-background-color-primary);
  color: var(--button-text-color-primary);
  border: none;
  border: 0.1rem solid var(--text-color-primary);
  border-radius: 0.5rem;
  text-align: center;
  font-size: inherit;
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 1s ease-out;
}

.form--button.danger {
  background-color: var(--background-color-danger);
}

.form--button:hover {
  filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}

/* multi select */
.multiselect {
  width: 100%;
}

.selectBox {
  position: relative;
}

.selectBox select {
  width: 100%;
  font-weight: bold;
}

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.tags {
  display: none;
  border: 1px #dadada solid;
}

.tags label {
  display: block;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
}

.tags label:hover {
  background-color: #1e90ff;
}

.tags input {
  margin-right: 0.5rem;
}

@media only screen and (min-width: 964px) {
  .blog--create {
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