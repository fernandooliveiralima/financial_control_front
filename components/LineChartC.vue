<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
import { storeToRefs } from 'pinia';

const transactionsStore = useTransactionStore();
const { filteredList, total, incomes, expenses } = storeToRefs(transactionsStore);

const myChart = ref<HTMLCanvasElement | null>(null);
let lineChart: Chart<"line", number[], string> | null = null;

const createLineChart = () => {
    if (myChart.value) {
        const ctx = myChart.value;
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Inicialmente vazio
                datasets: [{
                    label: 'Behavior Transactions',
                    data: [],
                    fill: false,
                    backgroundColor: [],
                    tension: 0.1,
                    borderColor: []
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

const updateLineChart = () => {
    if (lineChart && filteredList.value) {
        let allTransactions = [...filteredList.value];
        allTransactions.sort((a, b) => Number(new Date(a.transaction_date)) - Number(new Date(b.transaction_date)));

        let totalAmount = 0;
        let datesTransactions: Array<string> = [];
        let amountsTransactions: Array<number> = [];
        let borderColorGraph: Array<string> = [];

        allTransactions.forEach(transaction => {
            datesTransactions.push(transaction.transaction_date);
            totalAmount += Number(transaction.transaction_amount);
            amountsTransactions.push(totalAmount);

            // Define a cor da linha com base no tipo de transação
            if (transaction.transaction_type === 'income') {
                borderColorGraph.push('green');
            } else if (transaction.transaction_type === 'expense') {
                borderColorGraph.push('red');
            }
        });

        lineChart.data.labels = datesTransactions;
        lineChart.data.datasets[0].data = amountsTransactions;
        lineChart.data.datasets[0].borderColor = borderColorGraph;

        lineChart.update();
    }
}

watch([filteredList, total, incomes, expenses], () => {
    updateLineChart();
});

onMounted(() => {
    createLineChart();
    updateLineChart();
});
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
