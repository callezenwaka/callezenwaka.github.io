import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue';

// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'


// export const addDarkTheme = () => {
//   const darkThemeLinkEl = document.createElement('link');
//   darkThemeLinkEl.setAttribute('rel', 'stylesheet');
//   darkThemeLinkEl.setAttribute('href', './dark.css');
//   darkThemeLinkEl.setAttribute('id', 'dark-theme-style');
//   const docHead = document.querySelector('head');
//   docHead?.append(darkThemeLinkEl);
// };

// const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
// localStorage.setItem('isDarkMode', isDarkMode ? 'true' : 'false');

export const toggleTheme = () => {
  const darkThemeLinkEl = document.querySelector('#theme-style');
  const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  darkThemeLinkEl!.setAttribute('href', `${ isDarkMode ? './dark.css' : './light.css' }`);
  console.log('isDarkMode: ', isDarkMode)
  // localStorage.setItem('isDarkMode', isDarkMode ? 'true' : 'false');

  // if (!isDarkMode) {
  //   // addDarkTheme();
  //   console.log('dark')
  //   // localStorage.setItem("theme", 'dark');
  //   localStorage.setItem('isDarkMode', 'true');
  //   // darkThemeLinkEl!.setAttribute('href', './dark.css');
  //   // darkThemeLinkEl!.setAttribute('href', `${ isDarkTheme.value ? './dark.css' : './light.css' }`);
  // } else {
  //   // darkThemeLinkEl?.remove();
  //   console.log('light')
  //   localStorage.removeItem("isDarkMode");
  //   // darkThemeLinkEl!.setAttribute('href', './light.css');
  // }
  // isDark.value = !isDark.value;
};

// .component('QuillEditor', QuillEditor)
toggleTheme();

createApp(App).use(createPinia()).use(router).mount('#app')
