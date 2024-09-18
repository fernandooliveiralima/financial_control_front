/* Vue Imports */
    import { reactive, ref } from 'vue';
/* Vue Imports */

/* Pinia Imports */
    import { defineStore } from 'pinia';
/* Pinia Imports */

/* External Libraries */
    import dayjs from 'dayjs';
/* External Libraries */

/* Http Client Imports */
    import { useTokenStore } from '@/stores/authStore/tokenStore';
/* Http Client Imports */

/* App Imports */
    import type { transactionType } from '@/types/transactions/transactionModel';
    import type { TransactionResponse } from '@/types/asyncDataTypes/transactionDataModel';
    import { filterListByTime } from '@/composables/dateFilterComp';
/* App Imports */

export const useTransactionStore = defineStore('transactionStore', () => {
    /* Variables dayjs() Library */
        const dayjsInstance = ref(dayjs());
    /* Variables dayjs() Library */

    /* Variables Transactions */
        const total = ref(0);

        let filteredList = ref< Array<transactionType> >([]);

        const formAddTransactions = reactive<transactionType>({
            id: 0,
            transaction_name: '',
            transaction_date: dayjsInstance.value.format('YYYY-MM-DD'),
            transaction_category: 'General',
            transaction_amount: undefined,
            transaction_type: 'income',
        });

        let containerAllTransactions = ref< Array<transactionType> >([]);
    /* Variables Transactions */

    /* Variables Http */
        //const config = useRuntimeConfig();
        const tokenStoreInstance = useTokenStore();
        const { userToken } = storeToRefs(tokenStoreInstance);
    /* Variables Http */

    /* Actions Crud Transactions */

        // Add Transactions
        const addTransactions = async (transaction: transactionType) => {

            try {
                const response: TransactionResponse = await $fetch(`http://localhost:8000/api/transactions`, {
                    method: 'POST',
                    body: transaction,
                    headers: {
                        'Authorization': `Bearer ${userToken.value}`,  
                        'Accept': 'application/json'
                    }
                });

                // Insira a transação no estado local
                containerAllTransactions.value.unshift(response); // Atualiza a lista
                updateFilteredList(); // Se houver uma função para filtrar as transações

                console.log('Async Data', response);
            } catch (error) {
                console.log(error);
            }
            
        };

        //loadAllTransactions
        const loadAllTransactions = async () => {
            try {
                const response: Array<transactionType> = await $fetch(`http://localhost:8000/api/transactions`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken.value}`,  
                        'Accept': 'application/json'
                    }
                });

                containerAllTransactions.value = response;
                updateFilteredList();
            } catch (error) {
                console.log(error);
            }
        }

        /* Update Transactions */
            //Update Transactions
            const currentTransaction = ref<transactionType | null>(null); // Para armazenar a transação sendo editada
        
            const editTransaction = (transaction: transactionType) => {
                currentTransaction.value = { ...transaction }; // Copiar a transação selecionada para edição
            };
        
            // Update Transactions
            // Update Transactions
            const updateTransaction = async () => {
                if (currentTransaction.value) {
                    // Validação de acordo com o tipo de transação
                    if (
                        (currentTransaction.value.transaction_type === 'income' 
                            && Number(currentTransaction.value.transaction_amount) < 0) ||
                            
                        (currentTransaction.value.transaction_type === 'expense' 
                            && Number(currentTransaction.value.transaction_amount) > 0)
                    ) {
                        console.error('O valor da transação não condiz com o tipo.');
                        return; // Impede a continuação da submissão se a validação falhar
                    }

                    try {
                        const response: TransactionResponse = await $fetch(`http://localhost:8000/api/transactions/${currentTransaction.value.id}`, {
                            method: 'PUT',
                            body: currentTransaction.value,
                            headers: {
                                'Authorization': `Bearer ${userToken.value}`,
                                'Accept': 'application/json'
                            }
                        });

                        // Atualiza a lista local após sucesso
                        const index = containerAllTransactions.value.findIndex(item => item.id === currentTransaction.value!.id);
                        if (index !== -1) {
                            containerAllTransactions.value[index] = { ...currentTransaction.value };
                            updateFilteredList(); // Atualizar a lista filtrada
                            currentTransaction.value = null; // Limpar após edição
                        }

                        console.log('Transaction updated successfully:', response);
                    } catch (error) {
                        console.error('Error updating transaction:', error);
                    }
                }
            };

        /* Update Transactions */
        


    /* Remove Transactions */
        const removeTransaction = async (id: number) => {
            try {
                await $fetch(`http://localhost:8000/api/transactions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${userToken.value}`,
                        'Accept': 'application/json'
                    }
                });

                // Remove a transação local após sucesso
                containerAllTransactions.value = containerAllTransactions.value
                    .filter((item) => item.id !== id);

                filteredList.value = filteredList.value
                    .filter((item) => item.id !== id);

                updateFilteredList(); // Atualiza a lista filtrada
                console.log('Transaction removed successfully.');
            } catch (error) {
                console.error('Error removing transaction:', error);
            }
        };
    /* Remove Transactions */

        

    /* Actions Crud Transactions */

    /* Actions Total, Incomes Expenses */

        // Total
        const totalTransactions = () => {
            const totalValues = filteredList.value.length > 0 
                ? filteredList.value
                    .map((item) => item.transaction_amount)
                    .reduce((acc, amount) => Number(acc) + Number(amount), 0)
                : 0;

            return total.value = Number(totalValues);
        };

        // Incomes
        const incomes = ()=>{
            return filteredList.value
                .filter((amount) => Number(amount.transaction_amount) > 0)
                .map((incomeAmount) => incomeAmount.transaction_amount)
                .reduce((acc, income) => Number(acc) + Number(income), 0);
        }

        // Expenses
        const expenses = ()=>{
            return filteredList.value
                .filter((amount) => Number(amount.transaction_amount) < 0)
                .map((expenseAmount) => expenseAmount.transaction_amount)
                .reduce((acc, expense) => Number(acc) + Number(expense), 0);
        }
    /* Actions Total, Incomes Expenses */

    
    /* Actions to Work With Dates, Values, Colors */
        const formatDate = (date: string) => {
            return dayjs(date).locale('en-us').format('DD-MMMM-YYYY');
        }

        const formatAmounts = (amount: number) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount); 
        };

        const updateFilteredList = () => {
            return filteredList.value = filterListByTime(formAddTransactions.transaction_date, containerAllTransactions.value);
        };

        
        const transactionColor = (transaction: transactionType) => {
            return Number(transaction.transaction_amount) > 0 ? 'income' : 'expense';
        };

        const calculatePercentual = computed(() => {
            if (incomes() === 0) { return 0; } // Evita divisão por 0

            const percentual = ( Number(incomes()) - Math.abs(Number(expenses())) ) / Number(incomes()) * 100;

            // Garantir que o valor esteja entre 0 e 100
            return Math.max(0, Math.min(100, parseInt(`${percentual}`) ));
        });

        
    /* Actions to Work With Dates, Values, Colors */
    
    
    /* watch() */
        // Assista as mudanças no objeto reativo
        watch( () => formAddTransactions.transaction_date, updateFilteredList );
    /* watch() */

    return {
        total,
        filteredList,
        containerAllTransactions,
        formAddTransactions,
        currentTransaction,
        calculatePercentual,
        
        incomes,
        expenses,
        addTransactions,
        loadAllTransactions,
        totalTransactions,
        removeTransaction,
        formatAmounts,
        filterListByTime,
        updateFilteredList,
        transactionColor,
        editTransaction,
        updateTransaction,
        formatDate
    };
});
