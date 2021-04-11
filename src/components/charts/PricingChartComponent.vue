<template>
    <div style="text-align:center">
        <h2 style="text-align:center">Prices ordered</h2>
        <pricing-chart v-bind:category="category"></pricing-chart>

        <div style="padding:1em">
            <label for="categories" style="font-size:1.5em;padding-right:0.5em">Choose a category:</label>
            <select v-model="category" style="font-size:1.5em">
                <option selected>All</option>
                <option>Video Streaming</option>
                <option>Music</option>
                <option>Food</option>
                <option>News</option>
                <option>VPN</option>
                <option>Reading</option>
            </select>
        </div>
        
    </div>
</template>

<script>
import PricingChart from './PricingChart.js'
export default {
    data: function() {
        return {
            category:'All',
        }
    },
    components: {
        PricingChart
    }
};
</script>