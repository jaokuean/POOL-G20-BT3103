<template>
  <div>
    <nav-bar />
    <button v-on:click="goBack">
      <span>Go Back</span>
    </button>
    <h1 id="title">Pool statistics</h1>
    <div id="mainContainer">
      <div style="padding: 0.5em">
        <div class="card">
          <pools-chart></pools-chart>
          <h3 class="loading">loading...</h3>
        </div>
      </div>

      <div style="padding: 0.5em">
        <div class="card">
          <spendings-chart></spendings-chart>
          <h3 class="loading">loading...</h3>
        </div>
      </div>
    </div>
    <div class="card">
      <pricing-chart></pricing-chart>
      <h3 class="loading">loading...</h3>
    </div>
  </div>
</template>

<script>
import PoolsChart from "./charts/PoolsChart.vue";
import SpendingsChart from "./charts/SpendingsChart.vue";
import PricingChart from "./charts/PricingChartComponent.vue";
import NavBar from "./NavBar.vue";

export default {
  components: {
    PoolsChart,
    SpendingsChart,
    PricingChart,
    NavBar,
  },
  methods: {
    goBack: function () {
      this.$router.push({
        name: "Home",
      });
    },
  },
  created() {
    console.log("mounting");
    setTimeout(function () {
      let loading = document.getElementsByClassName("loading");
      loading[0].style.display = "none";
      loading[1].style.display = "none";
      loading[2].style.display = "none";
    }, 1300);
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 1em;
  padding: 0.5em;
  border-radius: 1em;
}

#backgroundScreen {
  background: #69bbe9;
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
button {
  border-radius: 3px;
  background-color: rgb(244, 245, 245);
  border: none;
  text-align: center;
  padding: 0px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 15px 0px 5px 0px;
  width: 10%;
  filter: drop-shadow(2px 2px 2px #222);
  height: 40px;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: black;
}

button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 15px;
  font-weight: bold;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>