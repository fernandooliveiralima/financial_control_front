import { defineStore, storeToRefs } from 'pinia';
import { useTokenStore } from '@/stores/authStore/tokenStore';

export const useAuthStore = defineStore('authStore', () => {
    const tokenStoreInstance = useTokenStore();
    const { userToken } = storeToRefs(tokenStoreInstance);

    const userRegister = async (formDataRegister: any) => {
        try {
            const response: any = await $fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                body: { ...formDataRegister }
            });
            tokenStoreInstance.setToken(response.token);
            console.log('response', response);
        } catch (error: any) {
            console.log('error', error.data);
        }
    };

    const userLogin = async (formDataLogin: any) => {
        try {
            const response: any = await $fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                body: { ...formDataLogin }
            });
            tokenStoreInstance.setToken(response.token);
            console.log('Token ->', response.token);
        } catch (error) {
            console.error('error', error);
        }
    };

    const userLogout = async () => {
        try {
            const response = await $fetch('http://127.0.0.1:8000/api/logout', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userToken.value}`,
                    'Accept': 'application/json'
                }
            });
            tokenStoreInstance.clearToken();
            //navigateTo('/auth/login');
            console.log('response Logout', response)
        } catch (error) {
            console.error('error', error);
        }
    };

    return { userRegister, userLogin, userLogout }
});
