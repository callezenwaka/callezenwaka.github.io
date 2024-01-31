<template>
  <header class="header">
    <nav id="nav">
      <ul class="menu">
        <!-- <del style="text-decoration-style: double;">Text with double strike through</del> -->
        <!-- <li class="list--item main_logo"><a class="link--item" href="#">Quiz Center</a></li> -->
        <!-- <li class="list--item"><router-link class="link--item logo" :to="{ name: 'Home' }">
            <span class="">&euro;</span></router-link>
          </li> -->
        <li class="list--item"><router-link class="link--item" :to="{ name: 'Home' }" exact
            active-class="active">Home</router-link></li>
        <li class="list--item"><router-link class="link--item" :to="{ name: 'Dashboard' }" exact
            active-class="active">Research</router-link></li>
        <li class="list--item"><router-link class="link--item" :to="{ name: 'Presentation' }" exact
            active-class="active">Presentation</router-link></li>
        <li class="list--item"><router-link class="link--item" :to="{ name: 'Blogs' }" exact
            active-class="active">Blog</router-link></li>
      </ul>
    </nav>
    <button type="button" @click="handleTheme" class="theme--button" role="switch" title="Switch to light theme" aria-label="light/dark" data-bs-placement="bottom"
      data-bs-toggle="tooltip" data-bs-original-title="light/dark">
      <span v-if="isDarkMode" class="theme-switch nav-link" data-mode="dark"><h1>Hello</h1>
        <svg class="svg-inline--fa fa-moon theme--switch" aria-hidden="true" focusable="false" data-prefix="fas"
          data-icon="moon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
          <path fill="currentColor" class="theme--svg"
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z">
          </path>
        </svg><!-- <i class="fa-solid fa-moon fa-lg"></i> Font Awesome fontawesome.com -->
      </span>
      <span v-else class="theme-switch nav-link" data-mode="light"><h1>Hi</h1>
        <svg class="svg-inline--fa fa-sun theme--switch" aria-hidden="true" focusable="false" data-prefix="fas"
          data-icon="sun" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
          <path fill="currentColor" class="theme--svg"
            d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z">
          </path>
        </svg><!-- <i class="fa-solid fa-sun fa-lg"></i> Font Awesome fontawesome.com -->
      </span>
      <!-- <span class="theme-switch nav-link" data-mode="auto"><svg class="svg-inline--fa fa-circle-half-stroke fa-lg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-half-stroke" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg><i class="fa-solid fa-circle-half-stroke fa-lg"></i> Font Awesome fontawesome.com</span> -->
    </button>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { computed } from 'vue';
// import { toggleTheme } from '../../main';

const isDarkMode = ref(false);

// const isDarkTheme = computed(() => localStorage.getItem("theme") === "dark");
console.log('setup isDarkMode: ', isDarkMode.value);

// const toggleTheme = () => {
//   const newTheme = isDarkTheme.value ? "light" : "dark";
//   localStorage.setItem("theme", newTheme);
// };

// const primaryColor = computed(() => (isDarkTheme.value ? "--dark-primary-color" : "--primary-color"));

// const addDarkTheme = () => {
//   const darkThemeLinkEl = document.createElement('link');
//   darkThemeLinkEl.setAttribute('rel', 'stylesheet');
//   darkThemeLinkEl.setAttribute('href', `${ isDarkTheme.value ? './dark.css' : './light.css' }`);
//   darkThemeLinkEl.setAttribute('id', 'theme-style');
//   const docHead = document.querySelector('head');
//   docHead?.append(darkThemeLinkEl);
// };

const handleTheme = () => {
  // toggleTheme();
  const darkThemeLinkEl = document.querySelector('#theme-style');
  isDarkMode.value = localStorage.getItem('isDarkMode') === 'true';
  console.log('handleTheme isDarkMode: ', isDarkMode.value);
  darkThemeLinkEl!.setAttribute('href', `${!isDarkMode.value ? './dark.css' : './light.css'}`);
  localStorage.setItem('isDarkMode', !isDarkMode.value ? 'true' : 'false');
};

</script>

<style scoped lang="css">
header {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  display: flex;
  text-align: center;
}

/* nav {
  background-color: #834147;
  max-width: 960px;
  margin: 0 auto;
} */

/* .logo {
  transform: rotate(180deg);

} */

nav {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  /* transition: all 500ms linear; */
}

/* nav.active {
  transition: all 500ms linear;
} */

.list--item {
  display: inline-block;
  padding: 0;
  margin: 0;
}

.link--item {
  /* font-size: 0.7rem; */
  font-weight: 700;
  display: block;
  padding: 1.5rem 0.5rem;
  margin: 0;
  color: var(--text-primary-color);
  -webkit-transition: all 1s ease-out;
  transition: all 1s ease-out;
}

.link--item:hover {
  /* color: #000000; */
  /* opacity: 0.5; */
  background-color: #f5efdf;
  background-color: var(--background-color-tertiary);
  color: var(--text-primary-color);
  transition: all 0.6s ease-in;
}

.theme--button {
  /* border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s; */
  background-color: transparent;
  width: 15%;
  border: none;
  cursor: pointer;
}

.theme--switch {
  width: 1.5rem;
  /* font-size: 0.08rem; */
  /* box-shadow: 0 0 80px rgba(255, 255, 255, 0.3); */
}


@media only screen and (min-width: 540px) {
  .list--item {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .link--item {
    /* font-size: 1.5rem; */
    font-weight: 700;
    display: block;
    padding: 3rem 1.5rem;
    margin: 0;
    color: var(--text-primary-color);
    -webkit-transition: all 1s ease-out;
    transition: all 1s ease-out;
  }

  .link--item:hover {
    /* opacity: 0.5; */
    color: #000000;
    background-color: #f5efdf;
    background-color: var(--background-color-tertiary);
    color: var(--text-primary-color);
    transition: all 0.6s ease-in;
  }
}

@media only screen and (min-width: 964px) {
  /* .list--item:before {
    margin-right: 8px;
    margin-left: 8px;
    width: 1px;
    height: 24px;
    background-color: var(--background-color-primary);
    content: "";
} */
  .link--item {
    font-size: 2rem;
    font-weight: 700;
    display: block;
    padding: 3rem 1.5rem;
    margin: 0;
    color: var(--text-primary-color);
    -webkit-transition: all 1s ease-out;
    transition: all 1s ease-out;
  }
}

</style>