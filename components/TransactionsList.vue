<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const {
    containerAllTransactions,
    filteredList,
    transaction_field_date,
    transaction_field_amount

} = storeToRefs(transactionStoreInstance);



watch([containerAllTransactions, filteredList], () => {
    //console.log('monitorando transaction_field_date pelo watch do componente', transaction_field_date.value);
    /* console.log(filteredList.value);
    console.log('monitorando amount pelo watch do componente', Number(transaction_field_amount.value)); */
    //console.log('filteredList watch compononent', filteredList.value)
});

onMounted(() => {
    transactionStoreInstance.$patch({
        filteredList: transactionStoreInstance.filterListByTime(transaction_field_date.value, containerAllTransactions.value),
    });
    //console.log(filteredList.value);
    //console.log('monitorando transactionColor pelo onMounted do componente');
});
</script>

<template>
    <div>
        <div class="date-section base-column">
            <label for="description">Date</label>
            <input type="date" v-model="transaction_field_date" />
        </div>

        <div class="table-container">
            <table>
            
                <thead>
                    <tr>
                        <th scope="col">Transaction Id</th>
                        <th scope="col">Transaction Name</th>
                        <th scope="col">Transaction Date</th>
                        <th scope="col">Transaction Category</th>
                        <th scope="col">Transaction Amount</th>
                        <th scope="col">Transaction Type</th>
                        <th scope="col">Transaction Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(iterator, index) in filteredList" :key="index">
                        <!-- <td :class="Number(iterator.transaction_amount) > 0 ? 'income' : 'expense' ">{{ iterator.transaction_amount }}</td> -->
                        <td>{{ iterator.id }}</td>
                        <td>{{ iterator.transaction_name }}</td>
                        <td>{{ iterator.transaction_date }}</td>
                        <td>{{ iterator.transaction_category }}</td>
                        
                        <td :class=" transactionStoreInstance.transactionColor(iterator)">{{ iterator.transaction_amount }}</td>
                        <td :class=" transactionStoreInstance.transactionColor(iterator)">{{ iterator.transaction_type }}</td>
                        <td>
                            <button @click="transactionStoreInstance.removeTransaction(iterator.id)">Remover</button>
                        </td>
                    </tr>
                </tbody>
                <!-- <tfoot>
                    <tr>
                        <th scope="row" colspan="2">Average age</th>
                        <td>33</td>
                    </tr>
                </tfoot> -->
            </table>
        </div>
    </div>
</template>

<style scoped>

.income{
    color: green;
}
.expense{
    color: crimson;
}

.table-container{
    display: flex;
    align-items: center;
    justify-content: center;
}

caption {
    caption-side: bottom;
    padding: 10px;
    font-weight: bold;
}

thead,
tfoot {
    background-color: rgb(228 240 245);
}

th,
td {
    border: 1px solid rgb(160 160 160);
    padding: 8px 10px;
}

td:last-of-type {
    text-align: center;
}

tbody>tr:nth-of-type(even) {
    background-color: rgb(237 238 242);
}

tfoot th {
    text-align: right;
}

tfoot td {
    font-weight: bold;
}
</style>