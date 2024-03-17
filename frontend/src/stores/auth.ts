// stores/blogs.ts
import { defineStore } from 'pinia';
import router from '@/router';
import firebase from '@/firebase';
import { 
	getAuth, 
	signInWithEmailAndPassword, 
	signOut, 
	sendEmailVerification,
} from "firebase/auth";
const auth = getAuth(firebase);

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: {},
    isAuthenticated: false,
    idToken: '',
  }),
  getters: {
    getCurrentUser: state => state.currentUser,
    getIsAuthenticated: state => state.isAuthenticated,
    getToken: state => state.idToken,
  },
  actions: {
    async setCurrentUser(payload: {}) {
      try {
        // TODO: set current user
        if (typeof payload !== 'object') return;
        else return this.currentUser = payload;
      } catch (error) {
        console.log(error);
      }
    },
    async setIsAuthenticated(payload: boolean) {
      try {
        // TODO: set auth user
        if (typeof payload !== 'boolean') return;
        else return this.isAuthenticated = payload;
      } catch (error) {
        console.log(error);
      }
    },
    async setIdToken(payload: string) {
      try {
        // TODO: set id token
        if (typeof payload !== 'string') return;
        else return this.idToken = payload;
      } catch (error) {
        console.log(error);
      }
    },
    async login(email: string, password: string) {
      try {
        // TODO: Log user in with parameters
        const { user } = await signInWithEmailAndPassword(auth, email, password)
  
        if (!user) return;
        if (!user.emailVerified) {
          // https://stackoverflow.com/a/73377466
          const actionCodeSettings = { 
            url: `${window.location.origin}/login/?email=${auth!.currentUser!.email}`,
            handleCodeInApp: false,
            // dynamicLinkDomain: "auth.callisezenwaka.com",
          };
  
          await sendEmailVerification(auth!.currentUser!, actionCodeSettings);
          return;
        }

        const idToken = await user.getIdToken();
        await this.setIdToken(idToken);
        await this.setIsAuthenticated(!this.isAuthenticated);
        await this.setCurrentUser(user);
        return user;
      } catch (error) {
        return console.log(error);
      }
    },
    async logout() {
      try {
        // TODO: Sign user out
        await signOut(auth);
        await this.setIdToken('');
        await this.setIsAuthenticated(!this.isAuthenticated);
        await this.setCurrentUser({});
        await router.push('/login');
        // window.location.reload();
        setTimeout(() => window.location.reload(), 30000);
        return;
      } catch (error) {
        return console.log(error);
      }
    },
  },
})