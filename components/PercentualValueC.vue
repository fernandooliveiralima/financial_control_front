<script setup lang="ts">
/* Pinia Imports */
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
/* Pinia Imports */

/* Variables Pinia */
const transactionStoreInstance = useTransactionStore();
/* Variables Pinia */

/* Variables Transactions */
const { calculatePercentual } = storeToRefs(transactionStoreInstance);
/* Variables Transactions */

</script>


<template>
    <ul>
        <li>{{ calculatePercentual }}%</li>
    </ul>
</template>


<style scoped>
    
</style>