<template>
  <div id="container">
    <navbar />

    <div id="loginBox">
      <button v-on:click="goBack">
        <span>Go Back</span>
      </button>
      <div id="serviceContent" v-for="serv in service" :key="serv">
        <img alt="photoURL" v-bind:src="serv.logo" id="logoImg" />
        <br />
        <span id="servHead">{{ serv.name }}</span> <br />
        <span id="servType">{{ serv.category }}</span> <br />
      </div>
      <h1>Create Pool Group</h1>
      <div id="errorMsg" v-if="errors.length">
        Please correct the following error(s):
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <input
        class="inputFields"
        v-model="maxSize"
        type="number"
        placeholder="Set Maximum number of people in group"
      />
      <br />
      <input
        class="inputFields"
        v-model="poolName"
        placeholder="Name of the group"
      />
      <br />
      <input
        class="inputFields"
        v-model="sharedUserName"
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

export default {
  components: {
    navbar,
  },
  data() {
    return {
      errors: [],
      service: [],
      servName: this.$route.params.sname,
      datapacket: {},
      dateCreated: database.firestore.FieldValue.serverTimestamp(),
      maxSize: "",
      poolName: "",
      remaining: "",
      serviceName: this.$route.params.document_id,
      sharedPassword: "",
      sharedUserName: "",
    };
  },
  methods: {
    goBack: function () {
      this.$router.push({
        name: "PoolGroups",
        params: { sname: this.servName },
      });
    },
    createGroup: function () {
      if (this.checkForm()) {
        const services_ref = database.firestore().collection("services");

        let items = {};
        services_ref
          .where("serviceName", "==", this.servName)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              items["serviceId"] = doc.id;
              items["dateCreated"] = this.dateCreated;
              items["maxSize"] = Number(this.maxSize);
              items["poolName"] = this.poolName;
              items["remaining"] = this.maxSize - 1;
              //items["serviceId"] = this.serviceId;
              //serviceId seems not properly set up using props
              items["sharedPassword"] = this.sharedPassword;
              items["sharedUserName"] = this.sharedUserName;
              this.datapacket = items;
              database.firestore().collection("pools").add(this.datapacket);

              let userpool = {};
              userpool[
                "startDate"
              ] = database.firestore.FieldValue.serverTimestamp();
              var currentDate = new Date();
              userpool[
                "endDate"
              ] = database.firestore.FieldValue.serverTimestamp();
              userpool["nextPaymentDue"] = new Date(
                currentDate.setMonth(currentDate.getMonth() + 1)
              );
              console.log(userpool.nextPaymentDue);
              userpool["poolID"] = items.serviceId;
              const uid = this.$store.getters.user.data.uid;
              userpool["userID"] = uid;
              console.log(userpool);
              database
                .firestore()
                .collection("poolgroups")
                .add(userpool)
                .then(
                  alert(
                    "You've successfully created a group!\n The pool's name is: " +
                      this.datapacket.poolName +
                      ".\n Wait for others to join the pool!"
                  )
                );
            });
          });

        this.$router.push("pool-groups");
      } else {
        return;
      }
    },
    checkForm: function () {
      this.errors = [];
      if (
        !this.maxSize ||
        !this.poolName ||
        !this.sharedPassword ||
        !this.sharedUserName
      ) {
        this.errors.push("Please fill in all details.");
        return false;
      }
      if (
        this.maxSize &&
        this.poolName &&
        this.sharedPassword &&
        this.sharedUserName
      ) {
        return true;
      }
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
    joinGroup: function () {},
  },
  created() {
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