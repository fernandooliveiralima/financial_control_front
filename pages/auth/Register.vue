<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useTokenStore} from '@/stores/authStore/tokenStore';
import {useAuthStore} from '../../stores/authStore/authStore';

definePageMeta({
  middleware: ["guest"]
  // or middleware: 'auth'
})

const tokenStoreInstance = useTokenStore();
const {userToken} = storeToRefs(tokenStoreInstance);

const authStoreInstance = useAuthStore();
const {} = storeToRefs(authStoreInstance);

const userFormRegister = reactive({
    name:'',
    email:'',
    password:'',
    password_confirmation:''
});
const tokenInstanceValue = ref(userToken);

const submitUserRegister = async ()=>{
    try {
        await authStoreInstance.userRegister(userFormRegister);
    } catch (error) {
        console.log('error', error);
    }
};
</script>

<template>
    <div class="register-component">

        <MainC class="main">
            <FormC class="form-component">

                <form @submit.prevent="submitUserRegister()">

                    <h1>User Register</h1>

                    <section class="user-name column-position">
                        <label for="user-name">Your Name</label>
                        <input type="text" name="user-name" placeholder="Your Name" v-model="userFormRegister.name"/>
                    </section>

                    <section class="user-email column-position">
                        <label for="user-email">Your Email</label>
                        <input type="email" name="user-email" placeholder="YourEmail@email.com" v-model="userFormRegister.email"/>
                    </section>

                    <section class="user-password column-position">
                        <label for="user-password">Your Password</label>
                        <input type="password" name="user-password" placeholder="Your Password" v-model="userFormRegister.password"/>
                    </section>

                    <section class="confirm-user-password column-position">
                        <label for="confirm-user-password">Confirm Your Password</label>
                        <input type="password" name="confirm-user-password" placeholder="Confirm Your Password" v-model="userFormRegister.password_confirmation"/>
                    </section>

                    <button type="submit">User Register</button>

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
    .register-component {
        @apply h-[93.2vh] w-full;
    }
    .form-component{
        @apply
        
        h-full
        w-full
        
        flex
        flex-col
        items-center
        justify-center;
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

    .confirm-user-password{
        @apply mt-5;
    }
    .confirm-user-password label{
        @apply text-lg;
    }
    .confirm-user-password input{
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