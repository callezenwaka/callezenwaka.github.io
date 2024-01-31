<template>
<section class="perspective">
  <h1>Perspective</h1>
  <div class="container">
    <div ref="component1"  id="component1">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 1
          </div>
    <div ref="component2" id="component2">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 2
          </div>
    <div ref="component3"  id="component3">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 3
          </div>
    <div ref="component4"  id="component4">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 4
          </div>
    <div ref="component5"  id="component5">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 5
          </div>
    <div ref="component6"  id="component6">My online notebook, including links to many of my recent and
					current projects, can be found <a href="#">here</a>. This is
					more up-to-date and complete than this webpage (which will
					eventually be deprecated). 6
          </div>
    </div>
</section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const component1 = ref<HTMLElement>();
const component2 = ref<HTMLElement>();
const component3 = ref<HTMLElement>();
const component4 = ref<HTMLElement>();
const component5 = ref<HTMLElement>();
const component6 = ref<HTMLElement>();
// References for other components

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

function handleScroll() {
  const scrollY = window.scrollY;

  if (component1.value) {
    component1.value.style.transform = `translateY(${scrollY * 0.6}px)`;
  }

  if (component2.value) {
    component2.value.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  if (component3.value) {
    component3.value.style.transform = `translateY(${scrollY * 0.4}px)`;
  }

  if (component4.value) {
    component4.value.style.transform = `translateY(${scrollY * 0.3}px)`;
  }

  if (component5.value) {
    component5.value.style.transform = `translateY(${scrollY * 0.2}px)`;
  }

  if (component6.value) {
    component6.value.style.transform = `translateY(${scrollY * 0.1}px)`;
  }

  // Update other components as needed
}
</script>

<style scoped lang="css">
.perspective {
  height: 200vh;
  padding: 0.5rem 0.5rem;
}
.container {
  perspective: 1200px; /* Optional for 3D effect */
}

#component1 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0); /* Initial position */
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

#component2 {
  position: absolute;
  top: 200px; /* Adjust for desired initial overlap */
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0);
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

#component3 {
  position: absolute;
  top: 400px; /* Adjust for desired initial overlap */
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0);
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

#component4 {
  position: absolute;
  top: 600px; /* Adjust for desired initial overlap */
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0);
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

#component5 {
  position: absolute;
  top: 800px; /* Adjust for desired initial overlap */
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0);
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

#component6 {
  position: absolute;
  top: 1000px; /* Adjust for desired initial overlap */
  left: 0;
  z-index: 0;
  height: 20vh;
  transform: translateY(0);
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  border-radius: 20px;
  box-shadow: 0 0 80px rgba(255, 255, 255, 0.3);
}

@media only screen and (min-width: 964px) {
	.perspective {
  height: 150vh;
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