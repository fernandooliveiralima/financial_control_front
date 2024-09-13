import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('tokenStore', () => {
    const userToken = ref<any>(null);
    const loggedIn = ref(false);

    // Função para carregar dados do localStorage
    /* const loadTokenFromStorage = () => {
        if (import.meta.client) {
            const storedToken = localStorage.getItem('userToken');
            console.log("Token armazenado no localStorage:", storedToken);
            console.log('tokenStore: estado de loggedIn ->', loggedIn.value);
            
            if (storedToken) {
                userToken.value = storedToken;
                loggedIn.value = true;
            } else {
                userToken.value = null;
                loggedIn.value = false;
            }
            return storedToken;   
        }
            
    }; */
    const loadTokenFromStorage = () => {
        if (import.meta.client) {
            const storedToken = localStorage.getItem('userToken');
            const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
            if (storedToken) {
                userToken.value = storedToken;
                loggedIn.value = storedLoggedIn; // Carrega o estado de loggedIn
            } else {
                userToken.value = null;
                loggedIn.value = false;
            }
        }
    };

    // Chama a função imediatamente ao carregar a store
    loadTokenFromStorage();

    // Ação para definir o token
    /* const setToken = (token: string) => {
        userToken.value = token;
        loggedIn.value = true;
        localStorage.setItem('userToken', token);
        
    }; */
    const setToken = (token: string) => {
        userToken.value = token;
        loggedIn.value = true;
        localStorage.setItem('userToken', token);
        localStorage.setItem('loggedIn', 'true'); // Armazena o estado de loggedIn
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
    /* const clearToken = () => {
        userToken.value = null;
        loggedIn.value = false;
        if (import.meta.client) { //!import.meta.env.SSR
            return localStorage.removeItem('userToken');
        }
    }; */
    const clearToken = () => {
        userToken.value = null;
        loggedIn.value = false;
        if (import.meta.client) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('loggedIn'); // Remove o estado de loggedIn
        }
    };

    return { userToken, loggedIn, setToken, clearToken, loadTokenFromStorage };
});
