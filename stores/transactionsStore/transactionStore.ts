import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs';

import type { transactionType } from '@/types/transactions/transactionModel';
import { filterListByTime } from '@/composables/dateFilterComp';

export const useTransactionStore = defineStore('transactionStore', () => {
    const total = ref(0);
    const dayjsInstance = ref(dayjs());

    let filteredList = ref< Array<transactionType> >([]);

    const formAddTransactions = reactive<transactionType>({
        id: 0,
        transaction_name: '',
        transaction_date: dayjsInstance.value.format('YYYY-MM-DD'),
        transaction_category: '',
        transaction_amount: undefined,
        transaction_type: 'income',
    });

    let containerAllTransactions = ref< Array<transactionType> >([
        {id: 12, transaction_name: 'conta', transaction_date: '2023-04-16', transaction_category: 'General', transaction_amount: -235, transaction_type: 'expense'},
        {id: 13, transaction_name: 'refeição', transaction_date: '2023-02-10', transaction_category: 'fixed', transaction_amount: -150, transaction_type: 'expense'},
        {id: 14, transaction_name: 'salario', transaction_date: '2024-04-16', transaction_category: 'fixed', transaction_amount: 1700, transaction_type: 'income'},
        {id: 15, transaction_name: 'freela', transaction_date: '2024-06-22', transaction_category: 'General', transaction_amount: 560, transaction_type: 'income'}
    ]);

    const addTransactions = (transaction: transactionType) => {
        containerAllTransactions.value.unshift(transaction);
        updateFilteredList();
    };

    const totalTransactions = () => {
        const totalValues = containerAllTransactions.value.length > 0 
            ? containerAllTransactions.value
                .map((item) => item.transaction_amount)
                .reduce((acc, amount) => Number(acc) + Number(amount), 0)
            : 0;

        return total.value = Number(totalValues);
    };

    const incomes = computed(() => {
        return containerAllTransactions.value
            .filter((amount) => Number(amount.transaction_amount) > 0)
            .map((incomeAmount) => incomeAmount.transaction_amount)
            .reduce((acc, income) => Number(acc) + Number(income), 0);
    });

    const expenses = computed(() => {
        return containerAllTransactions.value
            .filter((amount) => Number(amount.transaction_amount) < 0)
            .map((expenseAmount) => expenseAmount.transaction_amount)
            .reduce((acc, expense) => Number(acc) + Number(expense), 0);
    });

    const removeTransaction = (id: number) => {
        const transactionIdItem = containerAllTransactions.value
            .findIndex(item => item.id === id);

        if (transactionIdItem !== -1) {
            containerAllTransactions.value = containerAllTransactions.value
                .filter((item) => item.id !== id);

            filteredList.value = filteredList.value
                .filter((item) => item.id !== id);

            updateFilteredList();
        }
    };

    const formatAmounts = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    };

    const updateFilteredList = () => {
        filteredList.value = filterListByTime(formAddTransactions.transaction_date, containerAllTransactions.value);
    };

    
    const transactionColor = (transaction: transactionType) => {
        return Number(transaction.transaction_amount) > 0 ? 'income' : 'expense';
    };
    
    const currentTransaction = ref<transactionType | null>(null); // Para armazenar a transação sendo editada
    
    const editTransaction = (transaction: transactionType) => {
        currentTransaction.value = { ...transaction }; // Copiar a transação selecionada para edição
    };
    
    const updateTransaction = () => {
        if (currentTransaction.value) {
            const index = containerAllTransactions.value.findIndex(item => item.id === currentTransaction.value!.id);
            if (index !== -1) {
                containerAllTransactions.value[index] = { ...currentTransaction.value }; // Atualizar a transação
                updateFilteredList(); // Atualizar a lista filtrada
                currentTransaction.value = null; // Limpar após edição
            }
        }
    };
    
    // Assista as mudanças no objeto reativo
    watch( () => formAddTransactions.transaction_date, updateFilteredList );
    return {
        total,
        filteredList,
        containerAllTransactions,
        incomes,
        expenses,
        formAddTransactions,
        currentTransaction,

        addTransactions,
        totalTransactions,
        removeTransaction,
        formatAmounts,
        filterListByTime,
        updateFilteredList,
        transactionColor,
        editTransaction,
        updateTransaction
    };
});
