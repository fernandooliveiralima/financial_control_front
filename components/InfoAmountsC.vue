<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const {  } = storeToRefs(transactionStoreInstance);
</script>


<template>
    <div class="flex items-center justify-center">

        <div class="border border-black w-[50%] flex items-center justify-between mt-4">

            <div class="default-font-size total">Total: {{ transactionStoreInstance.formatAmounts( transactionStoreInstance.totalTransactions() ) }}</div>
            <div class="default-font-size income">Incomes: {{ transactionStoreInstance.formatAmounts( Number(transactionStoreInstance.incomes()) ) }}</div>
            <div class="default-font-size expenses">Expenses: {{ transactionStoreInstance.formatAmounts( Number(transactionStoreInstance.expenses()) ) }}</div>

        </div>

    </div>
</template>


<style scoped>
.default-font-size{
    font-size: 1.5rem;
}

.total{
    color: cornflowerblue;
}
.income{
    color: green;
}
.expenses{
    color: crimson;
}
</style>