<!-- <script setup>
import {useTokenStore} from '@/stores/authStore/tokenStore';
import { storeToRefs } from 'pinia';

const tokenStoreInstance = useTokenStore();
const { loggedIn, userToken } = storeToRefs(tokenStoreInstance);

onMounted(()=>{
    tokenStoreInstance.loadTokenFromStorage();
    console.log('loadTokenFromStorage() ->', tokenStoreInstance.loadTokenFromStorage());
});
</script>

<template>
    <div>
        Home View
    </div>
</template>

<style scoped>

</style> -->

<script setup>
import { onMounted } from 'vue';
import { useTokenStore } from '@/stores/authStore/tokenStore';
import { storeToRefs } from 'pinia';

const tokenStoreInstance = useTokenStore();
const { loggedIn, userToken } = storeToRefs(tokenStoreInstance);

onMounted(() => {
    tokenStoreInstance.loadTokenFromStorage();
    // Log do estado atual após a carga
    console.log('loadTokenFromStorage()', tokenStoreInstance.loadTokenFromStorage())
    console.log('User Token:', userToken.value);
    console.log('Logged In:', loggedIn.value);
});
</script>

<template>
    <div>
        Home View
    </div>
</template>

<style scoped>
</style>
