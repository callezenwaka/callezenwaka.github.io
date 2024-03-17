<template>
  <section class="breadcrumb">
    <div class="breadcrumb--items">
      <div v-if="breadcrumbs.length" class="breadcrumb--item">
      <span v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link :to="crumb.path" style="text-transform: capitalize;">{{ handleShortener(crumb.text.toString()) }}</router-link>
        <span v-if="index < breadcrumbs.length - 1">&nbsp; &#824; &nbsp;</span>
      </span>
    </div>
    <div v-if="isAuthenticated" class="logout">
      <router-link class="link--item" :to="{ name: 'BlogCreate' }"><span>&#9998;</span></router-link>
      <span>&#10162;</span>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { handleShortener } from "@/utils";
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const route = useRoute();
const { isAuthenticated } = storeToRefs(useAuthStore())

const breadcrumbs = computed(() => {
  const path = route.path;
  const segments = path.split('/');
  const trail = [];

  // Always include Home as the first crumb
  trail.push({
    path: '/',
    text: route.meta.breadcrumb || 'Home', // Use meta data or fallback text
  });

  // Add remaining crumbs for non-home routes
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    trail.push({
      path: segments.slice(0, i + 1).join('/'),
      text: segment.replace(/-/g, ' '),
    });
  }

  return trail;
});

</script>

<style scoped lang="css">
.breadcrumb {
  /* display: flex; */
  /* background-color: var(--background-color-tertiary); */
  /* background-color: var(--background-color-secondary); */
  border-bottom: solid var(--background-color-primary);
  color: var(--text-color-primary);
  /* justify-content: space-around; */
}
.breadcrumb--items {
  display: flex;
  justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  max-width: 960px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: start;
}

.breadcrumb--item {
  /* max-width: 960px; */
  /* margin: 0 auto; */
  /* padding-left: 1rem; */
  /* padding-right: 1rem; */
  text-align: start;
}

.logout {
  display: flex;
  column-gap: 10px;
  font-size: inherit;
  background-color: var(--background-color-secondary);
  background-color: transparent;
  color: var(--text-color-primary);
}
</style>