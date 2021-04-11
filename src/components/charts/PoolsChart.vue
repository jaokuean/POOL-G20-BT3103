<template>
    <div style="text-align:center">
        <h2>Breakdown of total pool subscriptions</h2>
        <pools-chart></pools-chart>
    </div>
</template>

<script>
import PoolsChart from './PoolsChart.js'
export default {
    components: {
        PoolsChart
    }
};
</script>