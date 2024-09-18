<!-- dashboard.vue -->
<script setup>
import { storeToRefs } from 'pinia';

import { useTokenStore } from '../stores/authStore/tokenStore';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const {containerAllTransactions,formAddTransactions} = storeToRefs(transactionStoreInstance);

const tokenStoreInstance = useTokenStore();

definePageMeta({
  middleware: ["auth"]
});

onMounted( async () => {
  tokenStoreInstance.loadTokenFromStorage();

  transactionStoreInstance.$patch({
        filteredList: transactionStoreInstance.filterListByTime(formAddTransactions.value.transaction_date, containerAllTransactions.value),
    });

    await transactionStoreInstance.loadAllTransactions();
});
</script>

<template>
  <div>
    <InfoAmountsC></InfoAmountsC>
    <FormTransactionsC></FormTransactionsC>
    <DoughnutChartC></DoughnutChartC>
    <LineChartC></LineChartC>
  </div>
</template>
