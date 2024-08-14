import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('tokenStore', () => {
    const userToken = ref(null);
    const loggedIn = ref(false);

    // Função para carregar dados do localStorage
    const loadTokenFromStorage = () => {
        if (import.meta.client) {
            const storedToken = localStorage.getItem('userToken');
            if (storedToken) {
                userToken.value = storedToken;
                loggedIn.value = true;
            } else {
                userToken.value = null;
                loggedIn.value = false;
            }
            return storedToken;   
        }
            
    };

    // Chama a função imediatamente ao carregar a store
    loadTokenFromStorage();

    // Ação para definir o token
    const setToken = (token) => {
        userToken.value = token;
        loggedIn.value = true;
        localStorage.setItem('userToken', token);
        
    };

    // Observa mudanças no userToken e atualiza o localStorage
    watch(userToken, (newToken) => {
        if (userToken.value) {
            if (newToken) {
                localStorage.setItem('userToken', newToken);
            } else {
                localStorage.removeItem('userToken');
            }
        }
    });

    // Ação para limpar o token
    const clearToken = () => {
        userToken.value = null;
        loggedIn.value = false;
        if (import.meta.client) { //!import.meta.env.SSR
            return localStorage.removeItem('userToken');
        }
    };

    return { userToken, loggedIn, setToken, clearToken, loadTokenFromStorage };
});
