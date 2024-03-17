<template>
  <div class="login">
    <div class="login--wrapper">
      <form class="form--login" @submit.prevent="handleLogin">
        <div class="form--header">
					<h2 class="form--title">Login</h2>
				</div>
        <div class="form--item">
					<label class="form--label" for="email">Email: </label>
					<input 
            class="form--input" 
            type="email" 
            name="email" 
            id="email" 
            v-model="email" 
            placeholder="Enter your email" 
            aria-required="true" 
            aria-invalid="false" 
            autocomplete="email"
            required 
          />
				</div>
        <div class="form--item">
					<label class="form--label" for="password">Password: </label>
					<input 
            class="form--input" 
            type="password" 
            name="password" 
            id="password" 
            v-model="password" 
            placeholder="Enter your password" 
            aria-required="true" 
            aria-invalid="false" 
            autocomplete="password"
            required 
          />
				</div>
				<div class="form--item">
					<button class="form--button" type="submit">Login</button>
					<!-- <button class="form--button" :class="{isValid: isValid}" type="submit">Login</button> -->
				</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import { useRouter } from 'vue-router';
import { ref, } from 'vue';
import { useAuthStore } from '@/stores'

const router = useRouter();
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

// const isValid = computed(() => email !== "" && password !== "");

const handleLogin = async () => {
  try {
    // TODO: handle login
    await authStore.login(email.value, password.value);
    // await store.dispatch('setLoading', true);
    // const res = 
    // await store.dispatch('login', {...user});
    // console.log('res: ', res)
    // const idTokenResult = await user.getIdTokenResult();
    await router.push({ name: "Dashboard" });
    // await store.dispatch('setLoading', false);
    // await router.push({ name: "Activate" });
  } catch (error) {
    // display error to user
    console.log('error: ', error);
    // store.dispatch('setToast', { text: error.message, status: false });
  }
};
// Activate Dashboard
</script>

<style scoped>
/* login */
.login {
  padding: 0.75rem 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  /* margin: 0.5rem .5rem; */
}
.login--wrapper {
  /* background-color: #fff; */
	/* background-color: var(--background-color-primary); */
  border: 2px solid var(--background-color-primary);
  border-radius: 20px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

}
.form--login {
  padding: 4rem 0;
  padding: 20px;
  /* max-width: 400px; */
}
.form--header {
  padding-bottom: 1rem;
}
.form--title {
  text-align: center;
}
.form--item {
  /* display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 1.5rem;
  padding: 0px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  margin: 0px 0px 1.5rem;
  padding: 0px;
}
.form--label {
  /* color: #000;
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem; */
  color: var(--text-color-primary);
  position: relative;
  /* height: 16px; */
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  /* line-height: 16px; */
  letter-spacing: 0.02rem;
}
.form--input {
  /* width: 100%;
  font-size: inherit;
  line-height: 3rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: #ffffff !important;
  color: #000000 !important;
  outline: none;
  padding-left: 10px;
  margin-top: 5px; */
	background-color: var(--input-background-color-primary);
	color: var(--text-color-primary);
	border: solid;
	padding: 0.5rem 1rem;
	font-size: inherit;
	-webkit-border-radius: 0;
	border-radius: 0.5rem;
	-webkit-box-shadow: none;
	box-shadow: none;
	-webkit-transform: scale(1);
	transform: scale(1);
	transition: all 0.2s linear;
	width: 100%;
}
.form--button {
  /* width: 100%;
  margin-top: 16px;
  font-size: 1.2rem !important;
  line-height: 3rem;
  border-radius: 5px;
  border: 2px solid transparent;
  background-color: transparent;
  outline: none;
  cursor: not-allowed;
  padding-left: 10px;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%); */
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

.form--button:hover {
	filter: drop-shadow(0 0 1.5rem var(--drop-shadow-primary));
}

.form--button.isValid {
  cursor: pointer;
  background-color: #fc8917;
}
.form--button.isValid:hover {
  opacity: 0.5;
}

/* mini */
@media only screen and (min-width: 461px) {
  .login {
    border-radius: 20px;
    margin: 3rem auto;
    max-width: 500px;
    /* margin: 0.75rem .5rem; */
    /* background-color: #fff; */
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .login--wrapper {
    min-width: 100%;
    /* padding: 1rem; */
    text-align: center;
  }
  .form--login {
    margin: 0 auto;
    max-width: 400px;
  }
}
</style>