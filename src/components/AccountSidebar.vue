<template>
  <div class="card">
    <img v-bind:src = "user.profilePhoto" id="profilePic">
    <h1>{{user.name}}</h1>
    <div class='userDetailDiv'>
      <img src = "../assets/email.png" class = "icon"/>
      <a class="userDetailText" >{{user.email}}</a>
    </div>
    <div class='userDetailDiv'>
      <img src = "../assets/phone.png" class = "icon"/>
      <a class="userDetailText" >{{user.phone}}</a>
    </div>
    <h3>Monthly Spendings</h3>
    <p id = "monthlyspendings" >${{spending}}</p>
    <p><button @click="toProfile">Edit Profile</button></p>
    <p><button>View Statistics</button></p>
  </div>
</template>

<script>
import database from '../firebase';
export default {
  data: function () {
    return {
      spending: 0,
      user: {},
    }
  },
  methods: {
    fetchData: function () {
      const uid = this.$store.getters.user.data.uid;
      const user_ref = database.firestore().collection('users');
      const poolgroups_ref = database.firestore().collection('poolgroups');
      const pools_ref = database.firestore().collection('pools');
      const services_ref = database.firestore().collection('services');
      // Gets user
      user_ref.doc(uid).get().then(doc => {
        this.user = doc.data();
      })

      // Gets pools of user
      poolgroups_ref.where("userID","==",uid).get().then((querySnapShot) => {
        // For callback
        let count = 0;
        const querySize = querySnapShot.size;

        querySnapShot.forEach((doc)=> {
            // Gets the pool using poolID
            const poolID = doc.data().poolID;
            pools_ref.doc(poolID).get().then((doc) => {
                const pool = doc.data();    
                pool['poolID'] = poolID;
                // Gets the service that is provided in the pool
                services_ref.doc(pool.serviceId).get().then((doc) => {
                    // For callback
                    count = count + 1;

                    if (pool.remaining == 0) {
                        this.spending = this.spending + (doc.data()['fee'] / pool['maxSize']);
                    }

                    if (count == querySize) {
                      this.callback();
                    }
                    
                })
            })
        });
      })
    },
    callback: function() {
      this.spending = this.spending.toFixed(2);
    },
    toProfile: function() {
      this.$router.push('/user-profile');
    }
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: auto;
  text-align: center;
  padding:0.5em;
}

#profilePic {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.userDetailDiv {
  text-align: start;
  margin: auto;
  width: 80%;
  margin-bottom: 1em;
}

.icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
}

.userDetailText {
  color: grey;
  font-size: 1em;
}

#monthlyspendings {
    padding: 10px; 
    background-color: #c4c3d0;
    margin: auto;
    border-radius: 1em;
    display: inline-block;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>