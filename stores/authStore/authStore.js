import { defineStore, storeToRefs } from 'pinia';

import {useTokenStore} from '@/stores/authStore/tokenStore';


export const useAuthStore = defineStore('authStore', () => {

    const tokenStoreInstance = useTokenStore();
    const {userToken} = storeToRefs(tokenStoreInstance);

    const userRegister = async (formDataRegister)=>{
        try {
            const response = await $fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                body:{ ...formDataRegister }
            })
            tokenStoreInstance.setToken(response.token);
            console.log('response', response)
        } catch (error) {
            console.log('error', error.data);
        }
    };
    
    const userLogin = async (formDataLogin) => {
        try {
            const response = await $fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                body: { ...formDataLogin }
            });
            tokenStoreInstance.setToken(response.token);
            console.log('response ->', response);
        } catch (error) {
            console.error('error', error);
        }
    };

    const userLogout = async ()=>{
        try 
        {
            const response = await $fetch('http://127.0.0.1:8000/api/logout', {
                method: 'DELETE',
                headers:{
                    'Authorization' : `Bearer ${userToken.value}`,
                    'Accept' : 'application/json'
                }
            });
            tokenStoreInstance.clearToken();
            navigateTo('/auth/login');
            console.log(response);   
            
        } catch (error) {
            
        }
    };
  
    return { userRegister, userLogin, userLogout }
})