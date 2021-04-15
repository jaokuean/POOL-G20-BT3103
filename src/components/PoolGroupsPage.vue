
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
            <div id="serviceContent" v-for="serv in services" :key="serv.index">
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
          <div id="bottomContainer" v-if="!isEmpty">
            <br />
            <h1>
              List of Pool Groups
              <button class="startPoolBtn" @click="createPool">
                <span>Start a Pool</span>
              </button>
            </h1>

            <div id="poolContent" v-for="pool in poolGroups" :key="pool.index">
              <ul>
                <li>
                  <span id="poolHead">{{ pool.name }}</span>
                </li>
                <li>
                  <span id="poolQty"
                    >{{ pool.remaining }}
                    <img
                      class="subIcon"
                      alt="Sub Icon"
                      src="../assets/subs2.png"
                    />remaining
                  </span>
                </li>
                <li v-if="pool.isJoined">
                  <button class="leaveBtn" @click="leavePool">
                    <span>Joined</span>
                  </button>
                </li>
                <li v-else-if="pool.remaining != 0">
                  <button class="joinBtn" @click="joinPool(pool.id)">
                    <span>Join Pool</span>
                  </button>
                </li>

                <li v-else>
                  <button class="notifyBtn" @click="notifyMe">
                    <span>Notify Me</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div id="bottomContainer" v-else>
            <br />
            <h1>List of Pool Groups</h1>
            <p v-show="loading">
              <i
                ><br />
                <br />
                <div class="loader"></div>
              </i>
            </p>
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
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  components: { ActivityFeed, navbar },

  data() {
    return {
      activityOpen: true,
      servName: this.$route.params.sname,
      sid: null,
      poolGroups: [],
      services: [],
      loading: true,
    };
  },
  methods: {
    createPool: function () {
      localStorage.sid = this.sid;
      this.$router.push({
        name: "CreatePoolGroup",
        params: { sname: this.servName, sid: this.sid },
      });
    },
    joinPool: function (pid) {
      const pools_ref = database.firestore().collection("pools");
      const services_ref = database.firestore().collection("services");
      console.log(pid);
      pools_ref
        .doc(pid)
        .get()
        .then((poolSnap) => {
          poolSnap.forEach(async (pool) => {
            if (pool.exists) {
              services_ref
                .doc(pool.data().serviceId)
                .update({
                  score: firebase.firestore.FieldValue.increment(1),
                })
                .then(() => {
                  console.log("Document successfully updated!");
                  alert("Joined " + this.pool.id);
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            }
          });
        });
    },
    notifyMe: function () {
      alert("You will be notified when there is an open subscription.");
    },
    fetchData: function () {
      const services_ref = database.firestore().collection("services");
      var poolRef = database.firestore().collection("pools");
      const poolGroup_ref = database.firestore().collection("poolgroups");

      services_ref
        .where("serviceName", "==", this.servName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((service) => {
            this.sid = service.id;
            this.services.push({
              id: service.id,
              name: service.data().serviceName,
              score: service.data().score,
              logo: service.data().logo,
              category: service.data().category,
            });
            //console.log("FIND THIS: " + this.sid);
            //console.log(doc.id, " => ", doc.data());
            //.where("remaining", ">", 0)
            poolRef
              .where("serviceId", "==", this.sid)
              .get()
              .then((querySnapShot) => {
                const size = querySnapShot.size;
                let count = 0;
                querySnapShot.forEach((doc) => {
                  var isJoin = false;
                  poolGroup_ref
                    .where("userID", "==", this.user.data.uid)
                    .get()
                    .then((poolGroupSnapshot) => {
                      poolGroupSnapshot.forEach((poolGroup) => {
                        if (poolGroup.poolID === doc.id) isJoin = true;
                      });
                    });
                  console.log("check boolean : " + isJoin);
                  this.poolGroups.push({
                    id: doc.id,
                    remaining: doc.data().remaining,
                    sid: service.data().serviceId,
                    name: doc.data().poolName,
                    isJoined: isJoin,
                  });
                  //console.log(this.pools);
                  count = count + 1;
                  if (count == size) {
                    this.stopLoad();
                  }
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
    stopLoad: function () {
      this.loading = false;
    },
  },
  created() {
    if (this.$route.params.sname == null) this.servName = localStorage.sname;
    this.fetchData();
  },

  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
    isEmpty: function () {
      return this.poolGroups.length == 0;
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
.subIcon {
  position: absolute;
  height: 50px;
  width: 50px;
  bottom: 5px;
  left: 109px;
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
  width: 900px;
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
.joinBtn {
  background-color: #203647;
}
.notifyBtn {
  background-color: red;
}
.startPoolBtn {
  background-color: #203647;
  position: absolute;
  height: 40px;
  width: 160px;
  padding: 5px;
  margin: 0px 10px 0px 80px;
  border-radius: 25px;
}
.startPoolBtn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: white;
}
button {
  border-radius: 3px;
  border: none;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
  width: 150px;
  height: 80%;
  margin: 2% 0 0 50px;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: white;
}

button span:after {
  content: "\00bb";
  position: relative;
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
  right: 5;
}

#poolContent ul {
  display: flex;
  background-color: white;
  border-radius: 10px;
  width: 90%;
  margin: 30px 0 0 40px;
}

#poolContent ul li {
  float: left;
  width: 300px;
  position: relative;
  display: block;
  padding: 5px;
}

#poolContent ul li span {
  display: block;
  text-decoration: none;
}
#poolContent ul li #poolHead {
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  padding: 10px;
}
#poolContent ul li #poolQty {
  text-align: right;
  font-size: 1.1em;
  padding: 10px;
}
ul li #noPool {
  display: block;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1em;
  text-transform: uppercase;
  padding: 10px;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  margin: 50px auto 0px auto;
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