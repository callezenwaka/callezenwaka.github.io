<template>
  <div class="app">
    <HeaderView></HeaderView>
    <router-view></router-view>
    <FooterView></FooterView>
  </div>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import HeaderView from '@/components/partials/HeaderView.vue';
import FooterView from '@/components/partials/FooterView.vue';
// import BaseApp from "@/components/base-app/BaseApp.vue";
// import callezenwaka from '@/assets/callezenwaka.jpg'

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
