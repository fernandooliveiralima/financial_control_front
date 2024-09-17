<script setup lang="ts">
/* Pinia Imports */
    import { storeToRefs } from 'pinia';
    import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';
/* Pinia Imports */

/* External Libraries */
    import { Chart } from 'chart.js/auto';
/* External Libraries */

/* Variables Pinia */
    const transactionStoreInstance = useTransactionStore();
/* Variables Pinia */

/* Variables Transactions */
    const transactionsStoreinstance = useTransactionStore();
    const { filteredList, total } = storeToRefs(transactionsStoreinstance);
    const incomes = ref(transactionStoreInstance.incomes());
    const expenses = ref(transactionStoreInstance.expenses());
/* Variables Transactions */

/* Variables ChartJs */
    const myChart = ref<HTMLCanvasElement | null>(null);
    let lineChart: Chart<"line", number[], string> | null = null;
/* Variables ChartJs */

/* Function Create Line Chart */
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
/* Function Create Line Chart */

/* Function Update Doughnut Chart */
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
/* Function Update Doughnut Chart */

/* watch() */
    watch([filteredList, total, incomes, expenses], () => {
        updateLineChart();
    });
/* watch() */

/* onMounted() */
    onMounted(() => {
        createLineChart();
        updateLineChart();
    });
/* onMounted() */
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
