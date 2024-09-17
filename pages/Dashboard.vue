<!-- dashboard.vue -->
<script setup>
import { storeToRefs } from 'pinia'

import { useTokenStore } from '../stores/authStore/tokenStore';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const {
    containerAllTransactions,
    filteredList,
    formAddTransactions

} = storeToRefs(transactionStoreInstance);

const tokenStoreInstance = useTokenStore();

definePageMeta({
  middleware: ["auth"]
});

onMounted(() => {
  tokenStoreInstance.loadTokenFromStorage();

  transactionStoreInstance.$patch({
        filteredList: transactionStoreInstance.filterListByTime(formAddTransactions.value.transaction_date, containerAllTransactions.value),
    });
});
</script>

<template>
  <div>
    <FormTransactionsC></FormTransactionsC>
    <DoughnutChartC></DoughnutChartC>
    <LineChartC></LineChartC>
  </div>
</template>
