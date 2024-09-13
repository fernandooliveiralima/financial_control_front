<!-- dashboard.vue -->
<script setup>
import { useTokenStore } from '../stores/authStore/tokenStore';
import FormC from '../components/FormC.vue'; // Certifique-se de importar o componente

const tokenStoreInstance = useTokenStore();

definePageMeta({
  middleware: ["auth"]
});

onMounted(() => {
  tokenStoreInstance.loadTokenFromStorage();
});
</script>

<template>
  <div>
    <FormTransactionsC></FormTransactionsC>
  </div>
</template>
