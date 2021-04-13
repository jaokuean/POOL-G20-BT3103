
<template>
  <div>
    <navbar />
    <div id="mainContainer">
      <activity-feed id="activityFeed" v-show="activityOpen" />
      <div id="rightContainer">
        <div id="mainCol">
          <div id="topContainer">
            <span id="toggleAF" title="Toggle ActivityFeed">
              <img
                class="arrowIcon"
                alt="arrow Icon"
                src="../assets/left-arrow-angle.png"
                v-show="activityOpen"
                @click="toggle"
              />
              <img
                class="arrowIcon"
                alt="arrow Icon"
                src="../assets/right-arrow-angle.png"
                v-show="!activityOpen"
                @click="toggle"
              />
            </span>
          </div>
          <div>
            <div id="serviceContent" v-for="serv in services" :key="serv">
              <ul>
                <li>
                  <img alt="photoURL" v-bind:src="serv.logo" id="logoImg" />
                </li>
                <li>
                  <span id="servHead">{{ serv.name }}</span>
                  <span id="servType">{{ serv.category }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div id="bottomContainer">
            <br />
            <h1>List of Pool Groups</h1>
            <div id="poolContent" v-for="pool in poolGroups" :key="pool">
              <ul>
                <li>
                  <span id="poolHead">{{ pool.name }}</span>
                </li>
                <li>
                  <span id="poolQty">{{ pool.remaining }}</span>
                </li>
                <li>
                  <button @click="joinPool">
                    <span>Join Pool</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ActivityFeed from "./ActivityFeed.vue";
import navbar from "./NavBar";
import database from "../firebase";

export default {
  components: { ActivityFeed, navbar },

  data() {
    return {
      activityOpen: true,
      servName: this.$route.params.sname,
      sid: null,
      poolGroups: [],
      services: [],
    };
  },
  methods: {
    joinPool: function () {},
    fetchData: function () {
      const services_ref = database.firestore().collection("services");
      var poolRef = database.firestore().collection("pools");
      services_ref
        .where("serviceName", "==", this.servName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.sid = doc.id;
            this.services.push({
              id: doc.id,
              name: doc.data().serviceName,
              score: doc.data().score,
              logo: doc.data().logo,
              category: doc.data().category,
            });
            //console.log("FIND THIS: " + this.sid);
            //console.log(doc.id, " => ", doc.data());
            //.where("remaining", ">", 0)
            poolRef
              .where("serviceId", "==", this.sid)
              .get()
              .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                  console.log(
                    doc.data().serviceId,
                    " => ",
                    doc.data().remaining
                  );
                  this.poolGroups.push({
                    id: doc.id,
                    remaining: doc.data().remaining,
                    sid: doc.data().serviceId,
                    name: doc.data().poolName,
                  });
                  //console.log(this.pools);
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    toggle: function () {
      console.log(this.servName);
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
  },
  created() {
    if (this.$route.params.sname == null) this.servName = "The Economist";
    this.fetchData();
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

#mainContainer {
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-top: 10px;
}
#topContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
#bottomContainer {
  margin-top: 200px;
  height: 100%;
  background-color: #69bbe9;
  border-top-right-radius: 10px;
}
#bottomContainer h1 {
  background-color: white;
  filter: drop-shadow(5px 5px 5px #222);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 10px 10px 10px 50px;
  width: 350px;
}

#mainCol {
  margin-top: 10px;
}

#rightContainer {
  display: grid;
  grid-template-columns: 10fr 3fr;
  margin-top: 10px;
}

#serviceContent ul {
  display: flex;
  float: left;
}

#serviceContent ul li {
  position: relative;
  display: block;
}

#serviceContent ul li span {
  display: block;
  color: black;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  margin: 0px 20px 20px 50px;
}
#serviceContent ul li #servHead {
  font-weight: bold;
  font-size: 3em;
}
#serviceContent ul li #servType {
  color: #69bbe9;
  font-size: 1.5em;
}

#logoImg {
  height: 9.5em;
  width: 9.5em;
  display: block;
  border-radius: 25px;
  margin-left: 20px;
  filter: drop-shadow(5px 5px 5px #222);
}

button {
  border-radius: 3px;
  background-color: #fff;
  border: none;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin-left: 15px;
  padding-left: 15px;
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

#poolContent ul {
  display: flex;
  float: left;
}

#poolContent ul li {
  position: relative;
  display: block;
  background-color: #203647;
}

#poolContent ul li span {
  display: block;
  color: black;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  margin: 20px 20px 20px 20px;
}
#poolContent ul li #poolHead {
  width: 350px;
  font-weight: bold;
  font-size: 1.3em;
}
#poolContent ul li #poolQty {
  font-size: 1.3em;
}
</style>