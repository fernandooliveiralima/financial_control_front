<script setup lang="ts">
import { Chart } from 'chart.js/auto';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue';
import { useTransactionStore } from '@/stores/transactionsStore/transactionStore';

const transactionStoreInstance = useTransactionStore();
const { containerAllTransactions, incomes, expenses } = storeToRefs(transactionStoreInstance);

const myChart = ref<HTMLCanvasElement | null>(null);
let doughnutChart: Chart<"doughnut", number[], string> | null = null;

const createChart = () => {
    if (myChart.value && !doughnutChart) {
        const ctx = myChart.value.getContext('2d');
        if (!ctx) return;

        doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [{
                    data: [Number(incomes.value), Number(expenses.value)],
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

const updateDoughnuthart = () => {
    if (doughnutChart) {
        // Atualiza os dados de receita e despesa no gráfico
        doughnutChart.data.datasets[0].data = [Number(incomes.value), Number(expenses.value)];
        doughnutChart.update();
    }
};

watch([incomes, expenses], () => {
    updateDoughnuthart();
});


onMounted(() => {
    createChart();
    updateDoughnuthart();
});
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
