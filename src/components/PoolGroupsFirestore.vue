<template>
  <div id="mainComponent">
    <div id="searchBox">
      <img v-bind:src="search" />
      <input
        type="text"
        id="poolName"
        v-model="poolName"
        v-on:keyup.enter="fetchItems"
      />
    </div>

    <div id="name">
      <div id="float01">
        <img v-bind:src="imgURL" />
      </div>
      <div id="float02">
        {{ poolName }}
        <br />
        <div id="text">Pool</div>
      </div>
    </div>

    <div id="result">
      <div id="searchBar">
        List of Pools Groups
        <br />
      </div>
      <p v-if="hasNoGroup">No Pool Groups Created Yet</p>
      <!-- <ul v-if="!hasNoGroup">
                <li v-for="grp in groups" :key="grp.index">
                    1
                    <div id='float1'>
                        {{grp.groupName}}
                    </div>
                    <div id='float2'>
                        {{grp.description}}
                    </div>
                    <div id='float3'>
                        <p id="notFull" v-if="!grp.isFull" v-on:click="join(grp.id)">Dive In</p>
                        <p id="full" v-if="grp.isFull">Pool Is Full</p>
                    </div>
                </li>
            </ul> -->
      <ul>
        <li v-for="grp in groups" :key="grp.index">
          {{ grp[0] }}
        </li>
      </ul>
      <div v-bind:text="groups"></div>
      <div id="float4">
        <button v-on:click="create">+</button>
      </div>
      <div id="float5">
        <p>Create New Pool Group</p>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data: function () {
    return {
      hasNoGroup: false,
      poolName: "Disney Plus",
      search: "https://static.thenounproject.com/png/101791-200.png",
      imgURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF64AHSDlHzKv40EOHnfqiGy2ZtS3ec18Vrw&usqp=CAU",
      groups: [],
      serviceID: "",
    };
  },
  methods: {
    fetchItems: function () {
      //using this.poolName directly without retrieving the document_id
      database
        .firestore()
        .collection("services")
        .where("serviceName", "==", this.poolName)
        .get()
        .then((d) => {
          this.serviceID = d.docs[0].id;
          this.imgURL = d.docs[0].data().logo;
        });
      this.groups = []; //restore the groups variable to empty
      database
        .firestore()
        .collection("pools")
        .where("serviceId", "==", this.serviceID)
        .get()
        .then((querySnapShot) => {
          if (querySnapShot.empty) {
            this.hasNoGroup = true;
          }
          querySnapShot.forEach((doc) => {
            let name = doc.data().poolName;
            let desc =
              "There are " + doc.data().remaining + " position(s) left";
            let full = doc.data().remaining == 0;
            let items = {};
            items["id"] = doc.id;
            items["groupName"] = name;
            items["description"] = desc;
            items["isFull"] = full;
            if (!full) {
              this.groups.push(items);
            }
          });
        });
    },

    fetchData: function () {
      //database.firestore().collection("services").doc(this.$route.params.document_id).get()
      database
        .firestore()
        .collection("services")
        .doc(this.$route.params.document_id)
        .get()
        .then((doc) => {
          //get the poolName
          this.poolName = doc.data().serviceName;
          this.imgURL = doc.data().logo;
          this.serviceID = this.$route.params.document_id;
          //alert(this.poolName)
          //alert(this.imgURL)
        });
      //alert(this.poolName)
      //alert(this.imgURL)
      //let tempGroups = [];
      database
        .firestore()
        .collection("pools")
        .where("serviceId", "==", this.$route.params.document_id)
        .get()
        .then((querySnapShot) => {
          if (querySnapShot.empty) {
            this.hasNoGroup = true;
          }
          //alert(this.hasNoGroup)
          querySnapShot.forEach((doc) => {
            let name = doc.data().poolName;
            //alert(name)
            let desc =
              "There are " + doc.data().remaining + " position(s) left";
            //alert(desc)
            let full = doc.data().remaining == 0;
            //alert(full)
            let items = {};
            items["id"] = doc.id;
            //alert(items.id)
            items["groupName"] = name;
            items["description"] = desc;
            items["isFull"] = full;
            //console.log(items)
            //items are set up properly
            if (!full) {
              //this.groups.push(items)
              this.groups.push([doc.id, name, desc, full]);
              //tempGroups.push(items)
            }
            //console.log(tempGroups)
            /*if (!full) {
                        this.groups.push({groupName: name, description: desc, isFull: full})
                    }*/

            //[__ob__: Observer], what is this??

            //this.groups.push({groupName: name, description: desc, isFull: full})
            /*var arrayLength = this.groups.length;
                    for (var i = 0; i < arrayLength; i++) {
                        alert(this.groups[i].groupName);
                        alert(this.groups[i].description);
                        alert(this.groups[i].isFull);
                    }*/
          });
        })
        .then(() => {
          var parsedobj = JSON.parse(JSON.stringify(this.groups));
          console.log(parsedobj);
        });
      /*var arrayLength = this.groups.length;
            for (var i = 0; i < arrayLength; i++) {
                alert(this.groups[i].groupName);
                alert(this.groups[i].description);
                alert(this.groups[i].isFull);
            }*/
    },

    join: function (document_id) {
      //the only thing to do is to reduce the vacancy of the pool?
      //update the poolgroups? but poolgroups only have 1 userID, is it the id of the owner?
      let items = database
        .firestore()
        .collection("pools")
        .doc(document_id)
        .get()
        .data();
      items.remaining = items.remaining - 1;
      database.firestore().collection("pools").doc(document_id).update(items);
      let userpool = {}
      //startDate
      //let dateCreated = items.dateCreated
      //userpool["startDate"] = dateCreated
      //userpool["endDate"] = dateCreated
      //userpool["nextPaymentDue"] = new Date(dateCreated.toDate().setMonth(dateCreated.toDate().getMonth()+1))

      userpool["startDate"] = database.firestore.FieldValue.serverTimestamp();
      userpool["endDate"] = database.firestore.FieldValue.serverTimestamp();
      userpool["nextPaymentDue"] = new Date(userpool.startDate.toDate().setMonth(userpool.startDate.toDate().getMonth()+1));
      let poolID = database.firestore().collection("pools").doc(document_id).get().id;
      userpool["poolID"] = poolID;
      const uid = this.$store.getters.user.data.uid;
      userpool["userID"] = uid;
      database.firestore().collection("poolgroups").add(userpool).then(alert(
        "Congratulations! You've successfully joined this group!\n Your pool name is " + items.poolName + 
        "\nThere are " + items.remaining + "positions left in the group.")
      );
    },

    create: function () {
      let doc_id = this.$route.params.document_id
      alert("In PoolGroupsFirestore\n" + doc_id)
      this.$router.push({name: 'CreateSubscription', params: { document_id: doc_id } })
    },
  },
  beforeCreate() {
    console.log("a");
  },
  created() {
    console.log("before");
    this.fetchData();
    console.log("b");
  },
  beforeMount() {
    console.log("c");
  },
  mounted() {
    console.log("d");
  },
};
</script>

<style scoped>
button {
  font-size: 30px;
}

#mainComponent {
  width: 60%;
  font-family: Monaco, sans-serif;
}

ul {
  border-start-end-radius: 1rem;
  border-end-end-radius: 1rem;
  padding-left: 20px;
}

li {
  display: inline-block;
  text-align: center;
  margin: 1rem;
  margin-top: 0;
}

#float1 img {
  height: 5em;
  width: 5em;
  display: block;
  border-radius: 50%;
}

#searchBar {
  padding-left: 30px;
  padding-top: 200px;
  text-align: left;
}

#searchBox img {
  height: 1.2em;
  width: 1.2em;
}

#searchBox input {
  width: 350px;
  height: 20px;
  border-start-end-radius: 1rem;
  border-end-end-radius: 1rem;
  border-end-start-radius: 1rem;
  border-start-start-radius: 1rem;
}

#name {
  padding-left: 80px;
}

#float01 {
  display: block;
  border-radius: 50%;
  height: 3em;
  width: 3em;
  float: left;
}

#float02 {
  padding-top: 65px;
  font-size: 30px;
  float: right;
}

#text {
  color: #69bbe9;
}

#float1 {
  width: 5%;
  float: left;
}

#float2 {
  padding-top: 15px;
  width: 600px;
}

#float3 {
  text-align: left;
  float: right;
  color: white;
  width: 100px;
  text-align: center;
}

#float4 {
  float: left;
  padding-left: 62px;
  padding-top: 5px;
}

#float5 {
  padding-top: 0.1px;
  background: #69bbe9;
  padding-left: 80px;
  width: 400px;
  height: 50px;
  border-start-end-radius: 1rem;
  border-end-end-radius: 1rem;
  color: white;
  text-align: center;
}

#notFull {
  background-color: #69bbe9;
}

#full {
  background-color: #db5858;
}

#result {
  padding-left: 50px;
}
</style>