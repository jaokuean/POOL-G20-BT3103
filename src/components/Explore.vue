<template>
  <div class="container">
    <navbar></navbar>
    <div id="header">
      <img
        alt="pool logo"
        src="../assets/pool-logo-name.png"
        class="logo"
        style="width: 30%; margin-top: 60px"
      />
      <h5>Manage your subs, POOL your resources</h5>
      <explore-by-category v-bind:servCatList="services"></explore-by-category>
    </div>

    <div class="content" v-if="showTopSubs">
      <div class="sectionHeader">
        <h1 class="sectionh1">Trending Services</h1>
      </div>
      <p v-show="loading">
        <i
          ><br />
          <br />
          <div class="loader"></div>
        </i>
      </p>
      <div
        id="topSubList"
        v-for="serv in sortByScore(services).slice(0, 5)"
        :key="serv.index"
      >
        <ul>
          <li @click="goToPool($event)">
            <img alt="photoURL" v-bind:src="serv.logo" id="logoImg" />
            <span>
              <p class="serviceNames">{{ serv.name }}</p>
              <p class="servicePoolsCount">{{ serv.score }} Open Pools</p>
              <span class="tooltiptext">Join Pool</span>
            </span>
          </li>
        </ul>
      </div>

      <button v-on:click="showTopSubs = !showTopSubs" class="contentFooter">
        <span> Click here to view more </span>
      </button>
    </div>

    <div class="content" v-else>
      <div class="sectionHeader">
        <h1 class="sectionh1">Trending Pools</h1>
      </div>
      <div id="chart">
        <top-subs-bar-chart></top-subs-bar-chart>
      </div>
      <button v-on:click="showTopSubs = !showTopSubs" class="contentFooterAlt">
        <span> &larr; Go back </span>
      </button>
    </div>
  </div>
</template>

<script>
import database from "../firebase";
import firebase from "firebase";
import navbar from "./NavBar";
import { mapGetters } from "vuex";
import TopSubsBarChart from "./charts/TopSubsBarChart.js";
import ExploreByCategory from "./ExploreByCategory.vue";
export default {
  components: {
    navbar,
    TopSubsBarChart,
    ExploreByCategory,
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data: function () {
    return {
      services: [],
      pools: [],
      loading: true,
      showTopSubs: true,
      showTopSearch: true,
    };
  },
  created() {
    this.fetchData();
    //this.tabulateTrends();
  },
  methods: {
    stopLoad: function () {
      this.loading = false;
    },
    goToPool: function (event) {
      if (this.user.loggedIn) {
        //this.$router.push("pool-groups");
        this.selectedName = event.target.innerHTML;

        this.$router.push({
          name: "PoolGroups",
          params: { sname: this.selectedName },
        });
      } else {
        this.$router.push("login");
      }
    },
    fetchData: function () {
      this.fetchServices();
      //this.fetchPools();
    },
    fetchPools: async function () {
      const poolRef = await database.firestore().collection("pools");
      poolRef.get().then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          this.pools.push({
            id: doc.id,
            numUsers: doc.data().maxSize - doc.data().remaining,
            sid: doc.data().serviceId,
          });
          //console.log(this.pools);
        });
      });
    },
    fetchServices: async function () {
      const serviceRef = await database
        .firestore()
        .collection("services")
        .orderBy("score", "desc");

      serviceRef.get().then((querySnapShot) => {
        const size = querySnapShot.size;
        let count = 0;
        querySnapShot.forEach(async (doc) => {
          this.services.push({
            id: doc.id,
            name: doc.data().serviceName,
            score: doc.data().score,
            logo: doc.data().logo,
            category: doc.data().category,
          });
          count = count + 1;
          if (count == size) {
            this.stopLoad();
          }
        });
      });
    },

    tabulateTrends: async function () {
      const pools_ref = database.firestore().collection("pools");
      const services_ref = database.firestore().collection("services");

      services_ref.get().then((querySnapShot) => {
        querySnapShot.forEach(function (doc) {
          doc.ref
            .update({
              score: 0,
            })
            .then(() => {
              console.log("Document successfully updated!");
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        });
      });

      pools_ref.get().then((poolSnap) => {
        poolSnap.forEach(async (pool) => {
          if (pool.exists) {
            const poolObj = pool.data();
            var toAdd = pool.data().maxSize - pool.data().remaining;
            //console.log(toAdd);
            services_ref
              .doc(poolObj.serviceId)
              .update({
                score: firebase.firestore.FieldValue.increment(toAdd),
              })
              .then(() => {
                console.log("Document successfully updated!");
              })
              .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          }
        });
      });
    },
    sortByScore: function (arr) {
      // Set slice() to avoid to generate an infinite loop!
      return arr.slice().sort(function (a, b) {
        return b.score - a.score;
      });
    },
  },
};
</script>
<style scoped>
#header {
  text-align: center;
  font-size: 35px;
}

.content {
  position: relative;
  margin-top: 60px;
  background-color: #69bbe9;
  height: 680px;
}
.container > div:nth-child(even) {
  background: #fff;
}
.contentImg {
  margin: 5px 20px 5px 5px;
  height: 50px;
  width: 50px;
}
#logoImg {
  height: 9.5em;
  width: 9.5em;
  display: block;
  border-radius: 25px;
  margin-left: 20px;
  filter: drop-shadow(5px 5px 5px #222);
}
#topSubList {
  width: 100%;
  margin: 50px auto 10px auto;
  border: 4px solid #69bbe9;
}
#topSubListalt {
  margin: 50px 10px 10px 10px;
  border: 4px solid #fff;
}
.sectionHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.serviceNames {
  font-weight: bold;
  margin: 0;
}
.servicePoolsCount {
  margin: 0;
  font-size: 0.8em;
}
.sectionh1 {
  text-align: left;
  margin: 20px 20px 20px 60px;
  color: white;
  font-size: 5em;
}
.sectionh1alt {
  text-align: left;
  margin: 20px 20px 20px 60px;
  color: #69bbe9;
  font-size: 5em;
}
ul {
  position: relative;
  z-index: 0;
  display: block;
  float: left;
  margin: 125px 0 0 5px;
}

ul li {
  position: relative;
  display: block;
  width: 152px;
  margin-right: 10px;
}

ul li span {
  display: block;
  color: black;
  min-width: 120px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 35px;
  background-color: white;
  border-radius: 5px;
  padding: 34px 43px 20px 30px;
  margin: -20px 0px 0px 0px;
}
ul li span:hover {
  color: white;
  cursor: pointer;
  font-weight: bold;
  background-color: #203647;
}

ul li .altSpan {
  display: block;
  color: black;
  min-width: 120px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 35px;
  background-color: #69bbe9;
  border-radius: 5px;
  padding: 34px 43px 20px 30px;
  margin: -20px 0px 0px 0px;
}
.tooltiptext {
  visibility: hidden;
  background-color: rgba(29, 106, 154, 0.72);
  color: #fff;
  margin-left: 5px;
  text-align: center;
  border-radius: 5px;
  padding: 0;
  position: absolute;
  top: 0;
  z-index: 1;
}
ul li span:hover .tooltiptext {
  visibility: visible;
}
.contentFooter {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #203647;
  color: white;
  text-align: center;
  line-height: 40px;
  border: none;
  transition: 0.5s;
  font-weight: bold;
  cursor: pointer;
}
.contentFooterAlt {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #69bbe9;
  color: white;
  text-align: center;
  line-height: 40px;
  border: none;
  transition: 0.5s;
  font-weight: bold;
  cursor: pointer;
}
.contentFooter:hover {
  line-height: 65px;
}
.contentFooterAlt:hover {
  line-height: 65px;
}
#chart {
  margin: 0px;
  padding: 180px 80px 80px 50px;
  background-color: #203647;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  margin: 200px auto 0px auto;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
p i {
  font: size 1.5em;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>