<template>
    <div style="text-align:center">
        <h2>Your monthly spendings breakdown</h2>
        <spendings-chart @noPools='noPools' v-show="havePools"></spendings-chart>
        <!-- <div id='noPools' v-show="!havePools">You have no subscriptions</div> -->
    </div>
</template>

<script>
import SpendingsChart from './SpendingsChart.js'
export default {
    data: function() {
        return {
            havePools: true,
        }
    },
    components: {
        SpendingsChart
    },
    methods: {
        noPools: function() {
            this.havePools = false;
        }
    }
};
</script>

<style scoped>
#noPools {
    min-height: 100%;
}
</style>