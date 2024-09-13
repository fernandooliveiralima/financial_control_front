import { useTokenStore } from "@/stores/authStore/tokenStore";
import {storeToRefs} from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
    
    const tokenStore = useTokenStore();
    const {loggedIn} = storeToRefs(tokenStore);

    if (loggedIn.value) {
      return navigateTo('/Dashboard')
    }
  })
  