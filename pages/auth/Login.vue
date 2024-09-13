<script setup lang="ts">

import { storeToRefs } from 'pinia';

import {useAuthStore} from '../../stores/authStore/authStore';
import { useTokenStore } from '@/stores/authStore/tokenStore';


definePageMeta({
  middleware: ["guest"]
  // or middleware: 'auth'
})

const authStoreInstance = useAuthStore();

const tokenStoreInstance = useTokenStore();
const { loggedIn, userToken } = storeToRefs(tokenStoreInstance);



const appErrors = ref([]);

const userFormLogin = reactive({
    email: '',
    password: ''
});

const userSubmit = async () => {
    try {
        await authStoreInstance.userLogin(userFormLogin);
    } catch (error: any) {
        appErrors.value = error.data.errors;
    }
};


</script>

<template>
    <div class="login-component">
        <MainC class="main">
            <FormC class="form-component">
                <form @submit.prevent="userSubmit()">
                    <h1>User Login</h1>
                    <section class="user-email column-position">
                        <label for="user-email">Your Email</label>
                        <input type="email" name="user-email" placeholder="YourEmail@email.com"
                            v-model="userFormLogin.email" />
                    </section>
                    <section class="user-password column-position">
                        <label for="user-password">Your Password</label>
                        <input type="password" name="user-password" placeholder="Your Password"
                            v-model="userFormLogin.password" />
                    </section>
                    <button type="submit">User Login</button>
                    
                    <div>Logged: {{ loggedIn }} Token: {{ userToken }}</div>
                </form>
            </FormC>
        </MainC>
    </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .login-component {
        @apply h-[93.2vh] w-full;
    }

    .form-component {
        @apply h-full w-full flex flex-col items-center justify-center;
    }

    .main {
        @apply h-full w-full flex flex-col items-center justify-center;
    }

    .main h1 {
        @apply text-3xl;
    }

    form {
        @apply sm:w-[95%] lg:w-[95%] bg-slate-300 shadow-lg h-[50%] w-[30%] flex flex-col justify-between p-5 rounded;
    }

    form button {
        @apply w-[30%] text-lg font-semibold;
    }

    .user-email {
        @apply mt-5;
    }

    .user-email label {
        @apply text-lg;
    }

    .user-email input {
        @apply border border-slate-400 rounded p-1 outline-none;
    }

    .user-password {
        @apply mt-5;
    }

    .user-password label {
        @apply text-lg;
    }

    .user-password input {
        @apply border border-slate-400 rounded p-1 outline-none;
    }

    .column-position {
        @apply flex flex-col;
    }

    button {
        @apply mt-5 bg-blue-500 text-white rounded py-1;
    }
}
</style>