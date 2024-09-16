// transactionStore.ts
import { defineStore } from 'pinia';
import {computed, ref, watch } from 'vue';
import dayjs from 'dayjs';

import type { transactionType } from '@/types/transactions/transactionModel';

import { filterListByTime } from '@/composables/dateFilterComp';

export const useTransactionStore = defineStore('transactionStore', () => {
    const total = ref(0);
    const dayjsInstance = ref(dayjs());
    
    let filteredList = ref< Array<transactionType> >([]);

    const transaction_field_name = ref('');
    const transaction_field_date = ref(dayjsInstance.value.format('YYYY-MM-DD'));
    const transaction_field_category = ref('');
    const transaction_field_amount = ref<number | undefined>(undefined);
    const transaction_field_type = ref('income');

    let containerAllTransactions = ref< Array<transactionType> >([
        {id: 12, transaction_name: 'conta', transaction_date:'2023-04-16', transaction_category: 'General', transaction_amount: -235, transaction_type: 'expense'},
        {id: 13, transaction_name: 'refeição', transaction_date:'2023-02-10', transaction_category: 'fixed', transaction_amount: -150, transaction_type: 'expense'},
        {id: 14, transaction_name: 'salario', transaction_date:'2024-04-16', transaction_category: 'fixed', transaction_amount: 1700, transaction_type: 'income'},
        {id: 15, transaction_name: 'freela', transaction_date:'2024-06-22', transaction_category: 'General', transaction_amount: 560, transaction_type: 'income'}
    ]);

    const addTransactions = (transaction: transactionType)=>{
        containerAllTransactions.value.unshift(transaction);
        updateFilteredList();
    };

    const totalTransactions = ()=>{
        const totalValues = containerAllTransactions.value.length > 0 ? 
            containerAllTransactions.value
            .map((item) => item.transaction_amount)
            .reduce((acc, amount)=> Number(acc) + Number(amount), 0) : 0;
        
        return total.value = Number(totalValues);
    };

    const incomes = computed(()=>{
        return containerAllTransactions.value
        .filter((amount) => Number(amount.transaction_amount) > 0)
        .map((incomeAmount) => incomeAmount.transaction_amount)
        .reduce((acc, income) => Number(acc) + Number(income) ,0)
    });

    const expenses = computed(()=>{
        return containerAllTransactions.value
        .filter((amount) => Number(amount.transaction_amount) < 0)
        .map((expenseAmount) => expenseAmount.transaction_amount)
        .reduce((acc, expense) => Number(acc) + Number(expense) ,0)
    });

    const removeTransaction = (id: number) => {
       const transactionIdItem = containerAllTransactions.value
        .findIndex(item => item.id === id);

        if(transactionIdItem !== -1){
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
        filteredList.value = filterListByTime(transaction_field_date.value, containerAllTransactions.value);
    };

    watch([containerAllTransactions, transaction_field_date], updateFilteredList);

    const transactionColor = (transaction: transactionType) => {
        return Number(transaction.transaction_amount) > 0 ? 'income' : 'expense';
    };
    
    return {
        transaction_field_name,
        transaction_field_date,
        transaction_field_category,
        transaction_field_amount,
        transaction_field_type,
        
        total,
        filteredList,
        containerAllTransactions,
        incomes,
        expenses,

        addTransactions,
        totalTransactions,
        removeTransaction,
        formatAmounts,
        filterListByTime,
        transactionColor
    };
    
});
