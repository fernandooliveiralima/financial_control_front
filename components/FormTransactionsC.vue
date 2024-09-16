<script setup lang="ts">
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const {
    containerAllTransactions,
    filteredList,
    transaction_field_name,
    transaction_field_date,
    transaction_field_category,
    transaction_field_amount,
    transaction_field_type,
} = storeToRefs(transactionStoreInstance);

const dayjsInstance = ref(dayjs());
let countId = ref(0);

const saveTransaction = () => {
    if (!transaction_field_name.value && !transaction_field_amount.value) {
        alert('Preencha os campos');
        return;
    } else if (transaction_field_type.value === 'expense' && transaction_field_amount.value) {
        transaction_field_amount.value *= -1;
    }

    const transaction = {
        id: countId.value++,
        transaction_name: transaction_field_name.value,
        transaction_date: transaction_field_date.value,
        transaction_category: transaction_field_category.value,
        transaction_amount: transaction_field_amount.value,
        transaction_type: transaction_field_type.value
    };

    transactionStoreInstance.addTransactions(transaction);

    // Limpar o formulário
    transaction_field_name.value = '';
    transaction_field_amount.value = undefined;
    transaction_field_type.value = 'income';
};
</script>


<template>
    <div>

        <div class="container-form">
            <form @submit.prevent="saveTransaction" class="form-elements">
                <div class="header-form">
                    <h3>Transactions</h3>
                    <div class="section-transaction-type">
                        <section class="income-section">
                            <label for="income">Income</label>
                            <input type="radio" name="income" id="" value="income" v-model="transaction_field_type" />
                        </section>

                        <section class="expense-section">
                            <label for="expense">Expense</label>
                            <input type="radio" name="expense" id="" value="expense" v-model="transaction_field_type" />
                        </section>
                    </div>
                </div>


                <div class="inputs-elements base-column">
                    <div class="description-section">
                        <label for="description">Description</label>
                        <input type="text" v-model="transaction_field_name" placeholder="Add Your Transaction" />
                    </div>

                    <div class="amount-section base-column">
                        <label for="description">Amount</label>
                        <input min="0" step="0.01" type="number" v-model.number="transaction_field_amount"
                            placeholder="0,00" />
                    </div>

                </div>
                <div class="btn">
                    <button @click="" type="submit">Add Transaction</button>
                </div>
            </form>

        </div>

    </div>
</template>

<style scoped></style>