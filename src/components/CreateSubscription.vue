<template>
  <div>
    <navbar />
    <div id="mainContainer">
      <activity-feed id="activityFeed" v-show="activityOpen" />
      <div id="rightContainer">
        <div id="mainCol">
          <h2>
            The following are auto-generated details of your group.
            <br />
            Feel free to change according to your convenience
          </h2>
          <p>Maximum number of people in group: {{ maxSize }}</p>
          <input
            v-model="maxSize"
            type="number"
            placeholder="Enter the details"
          />
          <p>Name of the group: {{ poolName }}</p>
          <input v-model="poolName" placeholder="Enter the details" />
          <p>Shared password of the group: {{ sharedPassword }}</p>
          <input v-model="sharedPassword" placeholder="Enter the details" />
          <p>Shared user name of the group: {{ sharedUserName }}</p>
          <input v-model="sharedUserName" placeholder="Enter the details" />
          <br /><br /><br />
          <button v-on:click="createGroup">Create Group</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";
import navbar from "./NavBar.vue";
import ActivityFeed from "./ActivityFeed.vue";

export default {
  components: {
    navbar,
    ActivityFeed,
  },
  data() {
    return {
      datapacket: {},
      dateCreated: database.firestore.FieldValue.serverTimestamp(),
      maxSize: 0,
      poolName: "",
      remaining: "",
      serviceId: this.$route.params.document_id,
      sharedPassword: "",
      sharedUserName: "",
    };
  },
  methods: {
    fetchItems: function () {
      this.dateCreated = database.firestore.FieldValue.serverTimestamp();
      this.maxSize = Math.floor(Math.random() * 4 + 1);
      this.poolName = Math.random().toString(16).substr(2, 8);
      this.remaining = this.maxSize - 1;
      this.serviceId = this.$route.params.document_id;
      //alert("CreateSubscription\n" + this.serviceId)
      //serviceId seems not properly set up using props
      //alert(this.$route.params.document_id)
      this.sharedPassword = Math.random().toString(16).substr(2, 8);
      this.sharedUserName =
        Math.random().toString(16).substr(2, 8) + "@gmail.com";
    },
    createGroup: function () {
      let items = {};
      items["dateCreated"] = this.dateCreated;
      items["maxSize"] = Number(this.maxSize);
      items["poolName"] = this.poolName;
      items["remaining"] = this.maxSize - 1;
      items["serviceId"] = "r7Pr27gQZoh5QptEhsdZ";
      //items["serviceId"] = this.serviceId;
      //serviceId seems not properly set up using props
      items["sharedPassword"] = this.sharedPassword;
      items["sharedUserName"] = this.sharedUserName;
      this.datapacket = items;
      database.firestore().collection("pools").add(this.datapacket);
      let userpool = {};
      userpool["startDate"] = database.firestore.FieldValue.serverTimestamp();
      var currentDate = new Date();
      userpool["endDate"] = database.firestore.FieldValue.serverTimestamp();
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
        ); //.then(this.$router.push('PoolGroups'));
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
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
</style>