import { useTokenStore } from "~/stores/authStore/tokenStore";
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
    const tokenStore = useTokenStore();
    const { loggedIn } = storeToRefs(tokenStore);

    // Garante que o token seja carregado antes de verificar o estado de login
    tokenStore.loadTokenFromStorage();

    if (!loggedIn.value) {
        return navigateTo('/auth/login');
    }
});
