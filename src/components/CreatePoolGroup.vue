<template>
  <div id="container">
    <navbar />

    <div id="loginBox">
      <button v-on:click="goBack">
        <span>Go Back</span>
      </button>
      <div id="serviceContent" v-for="serv in service" :key="serv.index">
        <img alt="photoURL" v-bind:src="serv.logo" id="logoImg" />
        <br />
        <span id="servHead">{{ serv.name }}</span> <br />
      </div>
      <h1>New Pool Group</h1>
      <div id="errorMsg" v-if="errors.length">
        Please correct the following error(s):
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <v-select :options="options"></v-select>
      <input
        class="inputFields"
        v-model="maxSize"
        maxlength="1"
        type="text"
        placeholder="Set number of people in group"
      />
      <br />
      <input
        class="inputFields"
        v-model="poolName"
        maxlength="30"
        placeholder="Name of the group"
      />
      <br />
      <input
        class="inputFields"
        v-model="sharedUserName"
        maxlength="30"
        placeholder="Shared Username"
      />
      <br />
      <input
        class="inputFields"
        v-model="sharedPassword"
        placeholder="Shared password"
      />
      <button v-on:click="generateRandomPw">
        <span>Generate Password</span>
      </button>
      <br />
      <button v-on:click="createGroup"><span>Create Group</span></button>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";
import navbar from "./NavBar.vue";
import firebase from "firebase";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      uid: this.$store.getters.user.data.uid,
      sid: this.$route.params.sid,
      errors: [],
      service: [],
      servName: this.$route.params.sname,
      dateCreated: database.firestore.FieldValue.serverTimestamp(),
      maxSize: "",
      poolName: "",
      remaining: "",
      serviceName: this.$route.params.document_id,
      sharedPassword: "",
      sharedUserName: "",
      pool: {},
      userpool: {},
      isValid: false,
      options: [1, 2, 3, 4, 5, 6],
    };
  },
  methods: {
    goBack: function () {
      this.$router.push({
        name: "PoolGroups",
        params: { sname: this.servName },
      });
    },
    createGroup: async function () {
      this.checkForm();
      if (this.isValid) {
        const pools_ref = database.firestore().collection("pools");
        const services_ref = database.firestore().collection("services");

        this.pool["serviceId"] = this.sid;
        this.pool["dateCreated"] = this.dateCreated;
        this.pool["maxSize"] = Number(this.maxSize);
        this.pool["poolName"] = this.poolName;
        this.pool["remaining"] = this.maxSize - 1;
        this.pool["sharedPassword"] = this.sharedPassword;
        this.pool["sharedUserName"] = this.sharedUserName;
        console.log(this.pool);
        var docRef = await database
          .firestore()
          .collection("pools")
          .add(this.pool);
        console.log("docid: " + docRef.id);
        this.userpool["poolID"] = docRef.id;
        this.userpool[
          "startDate"
        ] = database.firestore.FieldValue.serverTimestamp();
        var currentDate = new Date();
        this.userpool[
          "endDate"
        ] = database.firestore.FieldValue.serverTimestamp();
        this.userpool["nextPaymentDue"] = new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        );
        this.userpool["userID"] = this.uid;
        console.log(this.userpool);
        database
          .firestore()
          .collection("poolgroups")
          .add(this.userpool)
          .then(alert("You've successfully created a group!"))
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        pools_ref
          .doc(docRef.id)
          .get()
          .then((poolObj) => {
            if (poolObj.exists) {
              services_ref
                .doc(poolObj.data().serviceId)
                .update({
                  score: firebase.firestore.FieldValue.increment(1),
                })
                .then(() => {
                  console.log("Score Added updated!");
                })
                .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            }
          });
        this.$router.push({
          name: "PoolGroups",
          params: { sname: this.servName },
        });
      } else {
        return;
      }
    },
    checkForm: function () {
      this.errors = [];
      if (
        !this.maxSize ||
        !this.sharedPassword ||
        !this.sharedPassword ||
        !this.poolName
      ) {
        this.errors.push("Please fill in all details");
        return;
      }
      if (!this.checkAllNumbers(this.maxSize)) {
        this.errors.push("Please enter a valid max size.");
        return;
      }
      if (!this.checkSize(this.maxSize)) {
        this.errors.push("Please enter a max size between 1 to 6)");
      }
      if (this.errors.length == 0) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    checkSize: function (num) {
      if (num > 0 && num < 7) return true;
      return false;
    },
    checkAllNumbers: function (string) {
      const numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      for (var i = 0; i < string.length; i++) {
        if (numArray.indexOf(string[i]) <= -1) {
          return false;
        }
      }
      return true;
    },
    generateRandomPw: function () {
      this.sharedPassword = Math.random().toString(16).substr(2, 8);
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
    fetchService: function () {
      const services_ref = database.firestore().collection("services");

      services_ref
        .where("serviceName", "==", this.servName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.sid = doc.id;
            this.service.push({
              id: doc.id,
              name: doc.data().serviceName,
              score: doc.data().score,
              logo: doc.data().logo,
              category: doc.data().category,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    fetchItems: function () {
      this.dateCreated = database.firestore.FieldValue.serverTimestamp();
      //this.maxSize = Math.floor(Math.random() * 4 + 1);
      //this.poolName = Math.random().toString(16).substr(2, 8);
      //this.remaining = this.maxSize - 1;
      //this.serviceId = this.$route.params.document_id;
      //alert("CreateSubscription\n" + this.serviceId)
      //serviceId seems not properly set up using props
      //alert(this.$route.params.document_id)
      //this.sharedPassword = Math.random().toString(16).substr(2, 8);
      //this.sharedUserName =
      //Math.random().toString(16).substr(2, 8) + "@gmail.com";
    },
  },

  created() {
    if (this.$route.params.sname == null) this.servName = localStorage.sname;
    if (this.$route.params.sid == null) this.servName = localStorage.sname;

    this.fetchService();
    this.fetchItems();
  },
};
</script>

<style scoped>
#container {
  text-align: center;
}
#errorMsg {
  color: #bb4440;
  margin: 10px 25px 10px 25px;
  font-weight: bold;
  text-align: left;
}
#logoImg {
  height: 9.5em;
  width: 9.5em;
  display: block;
  border-radius: 25px;
  margin: 0 auto;
  filter: drop-shadow(5px 5px 5px #222);
}
#serviceContent {
  margin-top: 10px;
}
#servHead {
  font-weight: bold;
  font-size: 1.5em;
  color: azure;
}
#servType {
  color: azure;
  font-size: 1.2em;
}
#loginBox {
  /* Size and position */
  width: 340px;
  margin: 30px auto 30px;
  padding: 15px 5px 30px 5px;
  position: relative;

  /* Styles */
  background: #69bbe9;
  border-radius: 4px;
  color: #7e7975;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0.4);
}
#loginBox h1 {
  color: azure;
}
.inputFields {
  margin: 0 auto;
  width: 80%;
  height: 28px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
  display: block;
  padding: 5px;
  border: 3px solid #ebe6e2;
  transition: all 0.3s ease-out;
}
button {
  border-radius: 3px;
  background-color: white;
  border: none;
  text-align: center;
  padding: 0px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 15px 0px 5px 0px;
  width: 68%;
  height: 40px;
  filter: drop-shadow(2px 2px 2px #222);
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