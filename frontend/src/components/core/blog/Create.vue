<template>
  <div>
    <BreadCrumb></BreadCrumb>
    <section class="blog--create" v-if="isAuthenticated">
      <h1 class="blog--title">Edit Blog</h1>
      <form @submit.prevent="handleCreate">
        <div class="form--item">
          <label for="title" class="form--label">Title:</label>
          <input type="text" class="form--input" name="title" id="title" v-model="blog.title" placeholder="New blog title"
            aria-required="true" aria-invalid="false" required>
        </div>
        <div class="form--item">
          <label for="content" class="form--label">Content:</label>
          <!-- <textarea type="text" class="form--input" name="content" id="content" v-model="blog.content"
            placeholder="New blog content" @change="handleAdjustFocus($event)" @keyup="handleAdjustFocus($event)"
            @focus="handleAdjustFocus($event)" @blur="handleAdjustBlur($event)" aria-required="true" aria-invalid="false"
            autocomplete="content" required>
          </textarea> -->
          <!-- <br /> -->
          <!-- <h2>HTML</h2>
          <QuillEditor v-model:content="contentHTML" contentType="html" />
          <pre v-highlightjs><code class="json">{{contentHTML}}</code></pre>
          <br /> -->
          <div style="margin-top: 0.4rem;">
            <QuillEditor class="form--editor" v-model:content="blog.content" content-type="html" toolbar="full" theme="snow" />
            <!-- <pre v-highlightjs><code class="json">{{blog.content}}</code></pre> -->
          </div>
          <!-- <CKEditor :editor="editor" v-model="editorData" :config="editorConfig"></CKEditor> -->
          <!-- <CKEditor v-model="content" :editor="editor" /> -->
          <!-- <textarea class="form--input" :name="`question_${exam.id}_${question.id}`" :id="`question_${exam.id}_${question.id}`"  -->
          <!-- v-model.trim="question.question" @change="handleAdjust($event)" @keyup="handleAdjust($event)" @focus="handleWrite($event)"></textarea> -->

          <!-- @focus="handleWrite($event)" -->
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
        <!-- <div class="form--item">
          <label for="tags" class="form--label required">Tags:</label>
          <div class="multiselect">
            <div class="selectBox" @click="handleExpandOptions">
              <select class="form--input">
                <option>Select an option ({{ tags?.length }})</option>
              </select>
              <div class="overSelect"></div>
            </div>
            <div class="tags" id="tags" ref="tagRef">
              <label :for="option" v-for="(option, i) in options" :key="i">
                <input type="checkbox" :value="option" :id="option" v-model="tags"/>
                <span>{{option}}</span>
              </label>
            </div>
          </div>
        </div> -->
        <div class="form--item">
          <button type="submit" class="blog--button">Submit</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
// import { handleAdjustFocus, handleAdjustBlur } from "@/utils";
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore, useBlogStore } from "@/stores";
import { Blog } from "@/types";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import router from "@/router";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const { isAuthenticated } = storeToRefs(useAuthStore());
const { tags } = storeToRefs(useBlogStore());

const blogStore = useBlogStore()

const tagRef = ref<(HTMLElement)>();
const expanded = ref(false);
// const content = ref('');
// const contentHTML = ref('<h1>This is html header</h1>')
// const inputValue = ref('<h1>This is header</h1><p>This is paragraph</p>')

// const editor = ref(ClassicEditor);
// const editorData = ref('');
// const editorConfig = ref( {
//   toolbar: [ 'bold', 'italic', 'link' ]
// } );

// onMounted(() => {
//   editor.value = ClassicEditor.create(document.querySelector('.ck-content') as HTMLElement);
// });

// onBeforeUnmount(() => {
//   editor.value?.destroy(); // Optional, but good practice to clean up
// });

// onMounted(() => {
//   editor.value = createEditor(); // Use createEditor() from the plugin
// });

// onBeforeUnmount(() => {
//   editor.value?.destroy();
// });

const blog: Blog = reactive({
  id: uuidv4(),
  title: '',
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
  blogStore.addBlog({ ...blog });
  router.push({ name: 'Blog', params: { id: blog.id } })
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
  color: var(--text-primary-color);
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem;
}

.form--input {
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

.form--button {
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

.blog--button {
  background-color: var(--button-primary-color);
  color: var(--text-primary-color);
  border: none;
  border: 0.1rem solid var(--text-primary-color);
  border-radius: 0.5rem;
  text-align: center;
  font-size: inherit;
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 1s ease-out;
}

.blog--button.danger {
  background-color: var(--background-color-danger);
}

.blog--button:hover {
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