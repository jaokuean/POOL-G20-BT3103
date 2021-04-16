<template>
  <div>
    <navbar/>
    <div id='mainContainer'>
      <activity-feed id='activityFeed' v-show="activityOpen"/>
      <div id='rightContainer'>
        <div id='mainCol'>
          <div id="topContainer">
            <span id='toggleAF' title='Toggle ActivityFeed'>
              <img class="arrowIcon" src="../assets/left-arrow-angle.png" v-show="activityOpen" @click="toggle"/>
              <img class="arrowIcon" src="../assets/right-arrow-angle.png" v-show="!activityOpen" @click="toggle"/>
            </span>
            <span id='back'>
              <img title='Back to default dashboard' id="homeIcon" src="../assets/home.png" @click="home"/>
            </span>
          </div>
          <pending-pools v-show='!doubleClickedPools' @clicked='onClicked' @dbclicked='onDbClicked'/>
          <pool-profile-page v-bind:pool='pool' v-if="doubleClickedPools"/>
        </div>
        <div id='rightCol'>
          <account-sidebar v-show='!clickedPool'/>
          <pool-sidebar v-bind:pool="pool" v-if="clickedPool" @toProfile='onDbClicked'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./NavBar.vue";
import ActivityFeed from "./ActivityFeed.vue";
import AccountSidebar from "./AccountSidebar.vue";
import PendingPools from "./PendingPools.vue";
import PoolProfilePage from "./PoolProfilePage.vue";
import PoolSidebar from "./PoolSidebar.vue";

export default {
  data: function () {
    return {
      clickedPool: false,
      doubleClickedPools: false,
      activityOpen: true,
      pool: {},
    };
  },
  components: {
    navbar,
    ActivityFeed,
    AccountSidebar,
    PendingPools,
    PoolProfilePage,
    PoolSidebar,
  },
  methods: {
    onClicked: function (pool) {
      this.clickedPool = true;
      this.pool = pool;
    },
    onDbClicked: function (pool) {
      this.doubleClickedPools = true;
      this.clickedPool = false;
      this.pool = pool;
    },
    toggle: function () {
      if (this.activityOpen) {
        this.activityOpen = false;
        document.getElementById("mainContainer").style.gridTemplateColumns =
          "1fr";
        this.arrow = "right-arrow-angle.png";
      } else {
        this.activityOpen = true;
        document.getElementById("mainContainer").style.gridTemplateColumns =
          "1fr 4fr";
        this.arrow = "left-arrow-angle.png";
      }
    },
    home: function () {
      this.doubleClickedPools = false;
      this.clickedPool = false;
    },
  },
};
</script>

<style scoped>
.arrowIcon {
  width: 1.5em;
  height: 1.5em;
  display: flex;
  cursor: pointer;
  margin-left: 0.5em;
}

#toggleAF {
  display: inline-block;
}

#homeIcon {
  float: right;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
  margin-right: 20%;
}

#topContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

#mainContainer {
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-top: 10px;
}

#mainCol {
  margin-top: 10px;
}

#rightContainer {
  display: grid;
  grid-template-columns: 10fr 3fr;
  margin-top: 10px;
}

account-sidebar {
  text-align: center;
}
</style>