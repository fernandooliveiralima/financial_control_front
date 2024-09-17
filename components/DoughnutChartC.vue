<script setup lang="ts">
/* Vue Imports */
    
/* Vue Imports */

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
    const { filteredList } = storeToRefs(transactionStoreInstance);
/* Variables Transactions */

/* Variables ChartJs */
    const myChart = ref<HTMLCanvasElement | null>(null);
    let doughnutChart: Chart<"doughnut", number[], string> | null = null;
/* Variables ChartJs */

/* Function Create Doughnut Chart */
    const createChart = () => {
        if (myChart.value && !doughnutChart) {
            const ctx = myChart.value.getContext('2d');
            if (!ctx) return;

            doughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Income', 'Expense'],
                    datasets: [{
                        data: [0, 0],  // Inicializando com valores padrão
                        borderWidth: 0,
                        hoverOffset: 5,
                        backgroundColor: ['green', 'crimson'],
                    }]
                },
                options: {
                    responsive: true,
                    cutout: 90
                }
            });
        }
    };
/* Function Create Doughnut Chart */


/* Function Update Doughnut Chart */
    const updateDoughnutChart = () => {
        if (doughnutChart) {
            let totalIncome = 0;
            let totalExpense = 0;

            filteredList.value.forEach(transaction => {
                if (Number(transaction.transaction_amount) > 0) {
                    totalIncome += Number(transaction.transaction_amount);
                } else {
                    totalExpense += Math.abs(Number(transaction.transaction_amount));
                }
            });

            doughnutChart.data.datasets[0].data = [totalIncome, totalExpense];
            doughnutChart.update();
        }
    };
/* Function Update Doughnut Chart */

/* watch() */
    watch([filteredList, transactionStoreInstance.incomes(), transactionStoreInstance.expenses()], () => {
        updateDoughnutChart();
    });
/* watch() */

/* onMounted() */
    onMounted(() => {
        createChart();
        updateDoughnutChart();
    });
/* onMounted() */
</script>

<template>
    <div>
        <section class="doughnut-chart">
            <div class="chart">
                <canvas ref="myChart"></canvas>
            </div>
        </section>
    </div>
</template>

<style scoped>
.doughnut-chart {
    height: 17rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chart {
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
