<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

onMounted( async ()=>{
  await transactionStoreInstance.loadAllTransactions();
});
</script>

<template>
    <div>
      Transactions View
      <TransactionsList/>
    </div>
</template>

<style scoped>

</style>