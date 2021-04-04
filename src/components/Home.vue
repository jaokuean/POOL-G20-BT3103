<template>
  <div>
    <navbar/>
    <div id='mainContainer'>
      <activity-feed id='activityFeed' v-show="activityOpen"/>
      <div id='rightContainer'>
        <div id='mainCol'>
          <span title='Toggle ActivityFeed'>
            <img class="activityArrow" src="../assets/left-arrow-angle.png" v-show="activityOpen" @click="toggle"/>
            <img class="activityArrow" src="../assets/right-arrow-angle.png" v-show="!activityOpen" @click="toggle"/>
          </span>
          <searchbar/>
          <pending-pools v-if='!doubleClickedPools' @clicked='onClicked' @dbclicked='onDbClicked'/>
          <pool-profile-page v-bind:pool='pool' v-else/>
        </div>
        <div id='rightCol'>
          <account-sidebar v-if='!clickedPool'/>
          <pool-sidebar v-bind:pool="pool" v-else/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './NavBar.vue';
import ActivityFeed from './ActivityFeed.vue'
import Searchbar from './Searchbar.vue'
import AccountSidebar from './AccountSidebar.vue'
import PendingPools from './PendingPools.vue'
import PoolProfilePage from './PoolProfilePage.vue'
import PoolSidebar from './PoolSidebar.vue'

export default {
  data: function () {
    return {
      clickedPool: false,
      doubleClickedPools: false,
      activityOpen: true,
      pool:{},
    }
  },
  components: {
    navbar,
    ActivityFeed,
    Searchbar,
    AccountSidebar,
    PendingPools,
    PoolProfilePage,
    PoolSidebar
  },
  methods: {
    onClicked: function(pool) {
      this.clickedPool = true;
      this.pool = pool;
    },
    onDbClicked: function(pool) {
      this.doubleClickedPools = true;
      this.clickedPool = false;
      this.pool = pool;
    },
    toggle: function() {
      if (this.activityOpen) {
        this.activityOpen = false;
        document.getElementById("mainContainer").style.gridTemplateColumns = '1fr';
        this.arrow = 'right-arrow-angle.png';
      } else {
        this.activityOpen = true;
        document.getElementById("mainContainer").style.gridTemplateColumns = '1fr 4fr';
        this.arrow = 'left-arrow-angle.png';
      }
    }
  }
};
</script>

<style scoped>
.activityArrow {
  width: 1.5em;
  height: 1.5em;
  display: flex;
  cursor: pointer;
  margin-left: 0.5em;
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
  grid-template-columns: 3fr 1fr;
  margin-top: 10px;
}

account-sidebar {
  text-align: center;
}
</style>