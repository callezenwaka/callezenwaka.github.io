import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import firebase from '@/firebase';
import { useAuthStore } from '@/stores';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const firebaseAuth = getAuth(firebase);
import './style.css';
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
// export const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
// if (!isDarkMode) {
//   console.log('dark')
//   localStorage.setItem('isDarkMode', 'true');
// } else {
//   console.log('light')
//   localStorage.removeItem("isDarkMode");
// }

export const toggleTheme = () => {
  const darkThemeLinkEl = document.querySelector('#theme-style');
  const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  darkThemeLinkEl!.setAttribute('href', `${ isDarkMode ? 'dark.css' : 'light.css' }`);
  console.log('main isDarkMode: ', isDarkMode)
  // localStorage.setItem('isDarkMode', isDarkMode ? 'true' : 'false');

};

// .component('QuillEditor', QuillEditor)
// toggleTheme();

createApp(App).use(createPinia()).use(router).mount('#app')

const authStore = useAuthStore();
onAuthStateChanged(firebaseAuth, async(user) => {
  if (user && user.emailVerified) {
    const { token } = await user.getIdTokenResult();
    console.log('user: ', user);
    console.log('token: ', token);
    await authStore.setIsAuthenticated(true);
    await authStore.setCurrentUser(user);
    await authStore.setIdToken(token);
  }
});