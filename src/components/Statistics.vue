<template>
    <div>
        <h1 id='title'>Pool statistics</h1>
        <div id="mainContainer">
            <div style="padding:0.5em">
                <div class="card">
                    <pools-chart ></pools-chart>
                    <h3 class='loading'>loading...</h3>
                </div>
            </div>

            <div style="padding:0.5em">
                <div class="card">
                    <spendings-chart></spendings-chart>
                    <h3 class='loading'>loading...</h3>
                </div>
            </div>
        </div>
        <div class="card">
            <pricing-chart></pricing-chart>
            <h3 class='loading'>loading...</h3>
        </div>
        
    </div>
    
</template>

<script>
import PoolsChart from './charts/PoolsChart.vue'
import SpendingsChart from './charts/SpendingsChart.vue'
import PricingChart from './charts/PricingChartComponent.vue'

export default {
    components:{
        PoolsChart,
        SpendingsChart,
        PricingChart
    },
    created() {
        console.log("mounting")
        setTimeout(function(){ 
            let loading = document.getElementsByClassName("loading");
            loading[0].style.display = 'none'
            loading[1].style.display = 'none'
            loading[2].style.display = 'none'
         }, 1300);
    }
}
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 1em;
    padding:0.5em;
    border-radius: 1em;
}

#backgroundScreen {
    background: #69BBE9;
}

#title {
    text-align: center;
}

#mainContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

pricing-chart {
    display: inline-block;
    margin: auto;
}

</style>