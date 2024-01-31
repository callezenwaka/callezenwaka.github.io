<template>
  <BreadCrumb></BreadCrumb>
  <!-- <section class="sub--heading">
    <BreadCrumb></BreadCrumb>
    <AuthView></AuthView>
  </section> -->
  <div class="dashboard">
    <!-- <aside class="sidebar">
      This is aside.
    </aside>
    <main class="main">
      This is main.
    </main> -->
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/components/partials/BreadCrumb.vue";
// import AuthView from "@/components/partials/AuthView.vue";


</script>

<style scoped lang="css">
.dashboard {
  /* display: flex; */
  /* max-width: 960px; */
  margin: 0 auto;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.sub--heading {
  display: flex;
  background-color: var(--button-primary-color);
  color: var(--text-primary-color);
  justify-content: space-around;
}
aside {
	background-color: var(--button-primary-color);
	color: var(--text-primary-color);
  width: 10%;
  height: 100vh;
}
main {
  width: 90%;
}

@media only screen and (min-width: 964px) {
	.dashboard {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
}
</style>