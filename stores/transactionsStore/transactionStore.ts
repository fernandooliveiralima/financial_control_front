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
    const transaction_field_date = ref(dayjsInstance.value.format('YYYY-MM-DD')); //dayjs.format('YYYY-MM-DD')
    const transaction_field_category = ref('');
    const transaction_field_amount = ref<number | undefined>(undefined);
    const transaction_field_type = ref('income');

    // Definindo um objeto reativo que contém um array de transactionType
    let containerAllTransactions = ref< Array<transactionType> >([]);

    

    const addTransactions = (transaction: transactionType)=>{
        containerAllTransactions.value.unshift(transaction)
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
        .map((incomeAmount) => incomeAmount.transaction_amount)
        .reduce((acc, income) => Number(acc) + Number(income) ,0)
    });

    const removeTransaction = (id: number) => {
       const transactionIdItem = containerAllTransactions.value
        .findIndex(item => item.id === id)

        if(transactionIdItem !== -1){
            containerAllTransactions.value = containerAllTransactions.value
                .filter((item) => item.id !== id);
            
            filteredList.value = filteredList.value
                .filter((item) => item.id !== id)

        }
    }

    const formatAmounts = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
    }

    
    watch([containerAllTransactions, transaction_field_date], ()=>{
        filteredList.value = filterListByTime(transaction_field_date.value, containerAllTransactions.value);
        console.log('monitorando transaction_field_date pelo watch da Store ->', transaction_field_date.value);
    });

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
        filterListByTime
    };
});
