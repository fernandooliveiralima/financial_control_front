<script setup lang="ts">
import { Chart } from 'chart.js/auto';

import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
import { filterListByTime } from '@/composables/dateFilterComp';

const transactionsStore = useTransactionStore();
const { containerAllTransactions, filteredList, total, incomes, expenses } = storeToRefs(transactionsStore);


const myChart = ref<HTMLCanvasElement | null>(null);
let lineChart: Chart<"line", number[], string> | null = null;


const createLineChart = () => {
    if (myChart.value) {
        let allTransactions = [...containerAllTransactions.value];
        allTransactions.sort((a, b) => Number(new Date(a.transaction_date)) - Number(new Date(b.transaction_date)));

        let totalAmount = ref(0);
        let datesTransactions = ref<Array<string>>([]);
        let amountsTransactions = ref<Array<number>>([]);
        let transactionTypes = ref('');
        let borderColorGraph = ref<Array<string>>([]);

        allTransactions.forEach(transaction => {
            datesTransactions.value.push(transaction.transaction_date);
            totalAmount.value += Number(transaction.transaction_amount);
            amountsTransactions.value.push(totalAmount.value);
            transactionTypes.value = transaction.transaction_type

            // Define a cor da linha com base no tipo de transação
            if (transaction.transaction_type === 'income') {
                borderColorGraph.value.push('green');
            } else if (transaction.transaction_type === 'expense') {
                borderColorGraph.value.push('red');
            }
        });

       const ctx = myChart.value;

        if (lineChart) {
            lineChart.data.labels = datesTransactions.value
            lineChart.data.datasets[0].data = amountsTransactions.value;
            lineChart.data.datasets[0].borderColor = borderColorGraph.value
            lineChart.update();
        } else {
            lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datesTransactions.value,
                    datasets: [{
                        label: 'Behavior Transactions',
                        data: amountsTransactions.value,
                        fill: false,
                        backgroundColor: borderColorGraph.value,
                        tension: 0.1,
                        borderColor: borderColorGraph.value
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            ticks: { display: false },
                            grid: { color: '#272234' }
                        },
                        x: { grid: { color: '#272234' } }
                    }
                }
            });
        }


    }

}

watch([total, incomes, expenses], () => {
    createLineChart();
    console.log('incomes ->', incomes.value);
    console.log('expenses ->', expenses.value);
})

onMounted(() => {
    createLineChart();
})


</script>

<template>
    <div>

        <section class="line-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
            </div>
        </section>

    </div>
</template>

<style scoped>
/* @tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {


    .line-chart {
        @apply h-[17rem] w-full flex items-center justify-center mt-4;
    }


    .line-chart .chart {
        @apply h-full w-[35rem] flex items-center justify-center;
    }

    .income {
        @apply text-[green];
    }

    .expense {
        @apply text-[#dc143c];
    }
} */

.line-chart {
    height: 17rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.line-chart .chart {
    height: 100%;
    width: 35rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.income {
    color: green;
}

.expense {
    color: crimson;
}
</style>