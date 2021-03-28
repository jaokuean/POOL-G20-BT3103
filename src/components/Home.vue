<template>
  <div>
    <navbar/>
    <div id='mainContainer'>
      <activity-feed/>
      <div id='middleCol'>
        <searchbar/>
        <pending-pools v-if='!doubleClickedPools' @clicked='onClicked' @dbclicked='onDbClicked'/>
        <pool-profile-page v-else/>
      </div>
      <account-sidebar v-if='!clickedPool'/>
      <pool-sidebar v-else/>
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
    onClicked: function() {
      this.clickedPool = true;
    },
    onDbClicked: function() {
      this.doubleClickedPools = true;
      this.clickedPool = false;
    }
  }
};
</script>

<style scoped>

#mainContainer {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  margin-top: 10px;
}

#middleCol {
  margin-top: 10px;
}

account-sidebar {
  text-align: center;
}
</style>