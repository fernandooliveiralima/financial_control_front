<script setup lang="ts">


/* Pinia Imports */
    import { storeToRefs } from 'pinia';
    import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
/* Pinia Imports */

/* Variables Pinia */
    const transactionStoreInstance = useTransactionStore();
    const { formAddTransactions } = storeToRefs(transactionStoreInstance);
/* Variables Pinia */

/* Action Save Transaction */
    const saveTransaction = () => {
        if (!formAddTransactions.value.transaction_name && !formAddTransactions.value.transaction_amount) {
            alert('Preencha os campos');
            return;
        } else if (formAddTransactions.value.transaction_type === 'expense' && formAddTransactions.value.transaction_amount) {
            formAddTransactions.value.transaction_amount *= -1;
        }

        const transaction = {
            id: formAddTransactions.value.id++,
            transaction_name: formAddTransactions.value.transaction_name,
            transaction_date: formAddTransactions.value.transaction_date,
            transaction_category: formAddTransactions.value.transaction_category,
            transaction_amount: formAddTransactions.value.transaction_amount,
            transaction_type: formAddTransactions.value.transaction_type
        };

        transactionStoreInstance.addTransactions(transaction);

        // Limpar o formulário
        formAddTransactions.value.transaction_name = '';
        formAddTransactions.value.transaction_amount = undefined;
        formAddTransactions.value.transaction_type = 'income';
    };
/* Action Save Transaction */
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
                            <input type="radio" name="income" id="" value="income" v-model="formAddTransactions.transaction_type" />
                        </section>

                        <section class="expense-section">
                            <label for="expense">Expense</label>
                            <input type="radio" name="expense" id="" value="expense" v-model="formAddTransactions.transaction_type" />
                        </section>
                    </div>
                </div>


                <div class="inputs-elements base-column">
                    <div class="description-section">
                        <label for="description">Description</label>
                        <input type="text" v-model="formAddTransactions.transaction_name" placeholder="Add Your Transaction" />
                    </div>

                    <div class="amount-section base-column">
                        <label for="description">Amount</label>
                        <input min="0" step="0.01" type="number" v-model.number="formAddTransactions.transaction_amount"
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