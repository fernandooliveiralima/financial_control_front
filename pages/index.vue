<script setup>
import {useTokenStore} from '@/stores/authStore/tokenStore';
import { storeToRefs } from 'pinia';

const tokenStoreInstance = useTokenStore();
const { loggedIn, userToken } = storeToRefs(tokenStoreInstance);

onMounted(()=>{
    tokenStoreInstance.loadTokenFromStorage();
});
</script>

<template>
    <div>
        Home View
    </div>
</template>

<style scoped>

</style>