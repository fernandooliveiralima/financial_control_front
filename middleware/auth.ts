import { useTokenStore } from "@/stores/authStore/tokenStore";
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
    const tokenStore = useTokenStore();
    const { loggedIn } = storeToRefs(tokenStore);

    // Garante que o token seja carregado antes de verificar o estado de login
    tokenStore.loadTokenFromStorage();
    //console.log("Estado de loggedIn após carregar o token:", loggedIn.value);
    if (loggedIn.value === false) {
        
        return navigateTo('/auth/login');
        
    }
    //console.log("Auth: Estado de loggedIn após carregar o token:", loggedIn.value);
    
});
