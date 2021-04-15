<template>
  <div>
    <div class="container">
      <div class="filters">
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'ALL' }"
          v-on:click="setFilter('ALL')"
          >ALL</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'Video Streaming' }"
          v-on:click="setFilter('Video Streaming')"
          >Video Streaming</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'News' }"
          v-on:click="setFilter('News')"
          >News</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'Food' }"
          v-on:click="setFilter('Food')"
          >Food</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'Music' }"
          v-on:click="setFilter('Music')"
          >Music</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'VPN' }"
          v-on:click="setFilter('VPN')"
          >VPN</span
        >
        <span
          class="filter"
          v-bind:class="{ active: currentFilter === 'Reading' }"
          v-on:click="setFilter('Reading')"
          >Readings</span
        >
      </div>
    </div>
    <p v-show="loading">
      <i
        ><br />
        <br />
        <div class="loader"></div>
        <br />
        Pools are loading...</i
      >
    </p>
    <transition-group class="projects" name="services">
      <div
        class="project"
        v-for="service in filterData()"
        v-bind:key="service.name"
      >
        <div>
          <div class="image-wrapper" @click="goToPool($event)">
            <img class="logoimage" alt="Logo" v-bind:src="service.logo" />
            <div class="gradient-overlay"></div>
            <div class="circle">
              <span class="service-title">{{ service.name }}</span>
              <span class="overlayText">{{ service.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import database from "../firebase";
//import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      currentFilter: "ALL",
      services: [],
      loading: true,
      selectedName: "Netflix",
    };
  },

  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  created() {
    this.fetchServices();
  },
  methods: {
    stopLoad: function () {
      this.loading = false;
    },
    goToPool: function (event) {
      if (this.user.loggedIn) {
        //this.$router.push("pool-groups");
        this.selectedName = event.target.innerHTML;
        localStorage.sname = this.selectedName;
        this.$router.push({
          name: "PoolGroups",
          params: { sname: this.selectedName },
        });
      } else {
        this.$router.push("login");
      }
    },
    setFilter: function (filter) {
      this.currentFilter = filter;
    },
    filterData: function () {
      if (this.currentFilter === "ALL") {
        return this.services;
      }
      var items = this.services;
      var result = {};
      Object.keys(items).forEach((key) => {
        const item = items[key];
        if (item.category === this.currentFilter) {
          result[key] = item;
        }
      });
      return result;
    },
    fetchServices: async function () {
      const serviceRef = await database
        .firestore()
        .collection("services")
        .orderBy("serviceName");
      //const pools_ref = database.firestore().collection("pools");

      serviceRef.get().then((querySnapShot) => {
        const size = querySnapShot.size;
        let count = 0;
        querySnapShot.forEach(async (doc) => {
          this.services.push({
            id: doc.id,
            name: doc.data().serviceName,
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
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 30pt;
  font-weight: normal;
  margin: 0 10px 0 10px;
}

.service-title {
  font-size: 12pt;
  padding: 10px;
}

.filter {
  font-family: arial;
  padding: 6px 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  margin: 0 10px 0 10px;
}

.filter.active {
  box-shadow: 0px 6px 3px 0px #00000026;
}

.filter:hover {
  background: #69bbe9;
  color: azure;
}

.projects {
  margin-bottom: 50px;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.projects-enter {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.projects-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.projects-leave-active {
  position: absolute;
  z-index: -1;
}

.circle {
  text-align: center;
  position: absolute;
  bottom: -40px;
  left: 0px;
  width: 160px;
  height: 40px;
  border-radius: 5px;
  /*  border:1px solid black; */
  display: flex;
  box-shadow: 0px 6px 3px 0px #494d3257;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  /*  box-shadow:0px -3px 3px #484848a6; */
}

.project {
  transition: all 0.21s ease-in-out;
  margin: 25px 25px 65px 25px;
  box-shadow: 0px 2px 8px lightgrey;
  border-radius: 35px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image-wrapper {
  position: relative;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;

  opacity: 0.09;
  background: linear-gradient(
      to bottom,
      rgba(0, 210, 247, 0.65) 0%,
      rgba(0, 210, 247, 0.64) 1%,
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top,
      rgba(247, 0, 156, 0.65) 0%,
      rgba(247, 0, 156, 0.64) 1%,
      rgba(0, 0, 0, 0) 100%
    );
  border-radius: 35px;
}

.logoimage {
  width: 100%;
  height: 160px;
  margin-top: 10px;
  border-radius: 35px;
}

.overlayText {
  cursor: pointer;
  position: absolute;
  width: 160px;
  height: 105px;
  bottom: 48px;
  border-radius: 35px;
  background: rgba(29, 106, 154, 0.72);
  color: azure;
  visibility: hidden;
  opacity: 0;
  font-size: 0.7em;
  transition: opacity 0.2s, visibility 0.2s;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  padding: 55px 0 0 0;
}
.image-wrapper:hover .overlayText {
  visibility: visible;
  opacity: 1;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
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