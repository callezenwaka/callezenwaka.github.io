<template>
  <section class="perspective">
    <h1>Perspective</h1>
    <div class="container">
      <div v-for="div in list" :key="div" ref="divs">
        <p>
          My online notebook, including links to many of my recent and current projects, can be found
          <a href="#">here</a>. This is more up-to-date and complete than this webpage (which
          will eventually be deprecated).
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, } from 'vue';

// const components = Array.from({ length: 6 }, () => ref<HTMLElement | null>(null));
// const commentCardRef = ref<HTMLElement[] | undefined>([]);
const list = reactive([1, 2, 3, 4, 5, 6]);
const divs = ref<(HTMLElement | null)[]>([]);

onMounted(() => {
  window.addEventListener('scroll', updateTransforms);
});

// const handleScroll = () => {
//   divs.value.forEach((div) => {
//     if (div) {
//       console.log('div: ', div);
//     }
//   });
// };

// New function to apply transforms based on scroll and index
const updateTransforms = () => {
  const scrollY = window.scrollY;
  divs.value.forEach((div, index) => {
    if (div) {
      console.log('div: ', div);
      console.log('factor: ', divs.value.length-index);
      // const factor = 0.5 - ((index*(divs.value.length-index)) * 10);
      const factor = ((index*(divs.value.length-index)) / 10);
      console.log('transform: ', scrollY * factor);
      div.style.transform = `translateY(${scrollY * ((divs.value.length - index) / 10)}px)`;
      // div.style.transform = `translateY(${scrollY * factor}px)`;
    }
  });
};

// Call updateTransforms on scroll
// window.addEventListener('scroll', updateTransforms);

// onMounted(() => {
//   window.addEventListener('scroll', handleScroll);
// });

// function handleScroll() {
//   const scrollY = window.scrollY;

//   components.forEach((componentRef, index) => {
//     if (componentRef.value) {
//       const factor = 0.5 - (index / 10);
//       componentRef.value.style.transform = `translateY(${scrollY * factor}px)`;
//     }
//   });
// }
</script>

<style scoped lang="css">
.perspective {
  /* position: relative; */
  height: 200vh;
  padding: 0.5rem 0.5rem;
}

.container {
  perspective: 1200px; /* Optional for 3D effect */
  position: relative; /* Contain positioned elements */
  /*height: 100%; /* Ensure enough scrolling space */
  /* overflow-y: scroll; /* Enable scrolling */
}

.container > * {
  /* position: absolute; */
  /* position: sticky; */
  z-index: 0;
  /* height: 100vh; */
  height: 200px;
  width: 100%;
  top: 0;
  left: 0;
  padding: 20px;
  margin-bottom: 2rem;
  transform: translateY(0); /* Initial position */
  transition: transform 0.3s ease-in-out; /* Smoother transitions */
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

@media only screen and (min-width: 964px) {
	.perspective {
  height: 175vh;
  padding: 1rem 1rem;
		max-width: 960px;
		margin: 0 auto;
		padding-left: 1rem;
  padding-right: 1rem;
	}

	.summary {
		margin: 1.5rem 0rem;
	}

	.avatar {
		width: 20%;
		height: auto;
	}

}
</style>
