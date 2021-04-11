<template>
    <div style="text-align:center">
        <h2>Your monthly spendings breakdown</h2>
        <spendings-chart></spendings-chart>
    </div>
</template>

<script>
import SpendingsChart from './SpendingsChart.js'
export default {
    components: {
        SpendingsChart
    }
};
</script>