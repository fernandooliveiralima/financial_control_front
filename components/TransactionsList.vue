<script setup lang="ts">
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
import { storeToRefs } from 'pinia';

import dayjs from 'dayjs';

const dayjsInstance = dayjs();

const transactionStoreInstance = useTransactionStore();
const { filteredList, formAddTransactions } = storeToRefs(transactionStoreInstance);

onMounted(() => {
    transactionStoreInstance.updateFilteredList(); // Garante a atualização inicial
});
</script>

<template>
    <div>
        <div class="date-section base-column">
            <label for="description">Date</label>
            <input type="date" v-model="formAddTransactions.transaction_date" />
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
                        <td>{{ iterator.id }}</td>
                        <td>{{ iterator.transaction_name }}</td>
                        <td>{{ transactionStoreInstance.formatDate(iterator.transaction_date) }}</td>
                        <td>{{ iterator.transaction_category }}</td>

                        <td :class="transactionStoreInstance.transactionColor(iterator)">
                            <strong>
                                {{ transactionStoreInstance.formatAmounts(Number(iterator.transaction_amount)) }}
                            </strong>
                        </td>

                        <td :class="transactionStoreInstance.transactionColor(iterator)">
                            <strong>
                                {{ iterator.transaction_type }}
                            </strong>
                        </td>
                        <td>
                            <div class="btn-actions">
                                <button 
                                    class="remove-btn"
                                    @click="transactionStoreInstance.removeTransaction(iterator.id)">
                                    Remover
                                </button>

                                <button 
                                    class="edit-btn"
                                    @click="transactionStoreInstance.editTransaction(iterator)"> <!-- Iniciar Edição -->
                                    Editar
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Formulário para Edição -->
        <div v-if="transactionStoreInstance.currentTransaction">
            <h3>Edit Transaction</h3>
            <div>
                <label for="name">Name</label>
                <input type="text" v-model="transactionStoreInstance.currentTransaction.transaction_name" />
            </div>
            <div>
                <label for="date">Date</label>
                <input type="date" v-model="transactionStoreInstance.currentTransaction.transaction_date" />
            </div>
            <div>
                <label for="category">Category</label>
                <input type="text" v-model="transactionStoreInstance.currentTransaction.transaction_category" />
            </div>
            <div>
                <label for="amount">Amount</label>
                <input type="number" v-model="transactionStoreInstance.currentTransaction.transaction_amount" />
            </div>
            <div>
                <label for="type">Type</label>
                <select v-model="transactionStoreInstance.currentTransaction.transaction_type">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <button @click="transactionStoreInstance.updateTransaction">Save Changes</button>
        </div>
    </div>
</template>


<style scoped>
.income {
    color: green;
}

.expense {
    color: crimson;
}

.table-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-actions{
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.remove-btn{
    color: crimson;
}
.edit-btn{
    color: cornflowerblue;
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