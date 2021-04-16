<template>
    <div class = "main-wrapper">
        <div class = "sidebar-container">
            <div id = "sidebar-header">
                <img v-bind:src = "pool.logo" id = "servicePic" >
                <h1> {{pool.serviceName}} </h1>
                <p> Monthly Cost</p>
                <p id = "costbox" >${{pool.fee}}</p>
            </div>
            <p id="buttonBox">
                <button @click="toProfile"><span>To pool</span></button>
            </p>
            <div id = "members-container">
                <p><strong> Members </strong></p>
                <p id='loadingText' v-show="loading"><i>Loading please wait...</i></p>
                <ul v-show="!loading">
                    <li v-for="member in members" v-bind:key="member.name">
                        <img v-bind:src = "member.profilePhoto">
                        <p> {{member.name}} </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            members:[],
            loading: true,
        }
    }, 
    props: ['pool'],
    created() {
        this.fetchMembers();
        console.log(this.pool);
    },
    watch: {
        pool: function() {
            this.members = [];
            this.loading = true;
            this.fetchMembers();
        }
    },
    methods: {
        fetchMembers: function() {
            const poolgroups_ref = database.firestore().collection('poolgroups');
            const users_ref = database.firestore().collection('users');
            // Getting members using poolGroups
            poolgroups_ref.where("poolID","==",this.pool.poolID).get().then((querySnapShot) => {
                const size = querySnapShot.size;
                let count = 0;
                querySnapShot.forEach((doc) => {
                    users_ref.doc(doc.data().userID).get().then((doc) => {
                        if (doc.exists) {
                            this.members.push(doc.data());
                        }
                        
                        // For loading callback
                        count = count + 1;
                        if (count == size) {
                            this.stopLoad();
                        }
                    })
                })
            })
        },
        stopLoad: function() {
            this.loading = false;
        },
        toProfile: function() {
            this.$emit('toProfile', this.pool);
        }
    }
}


</script>

<style scoped>

.main-wrapper {
    height: 100%;
    position: relative;
    background-color: #FFFFFF;
    right: 0;
    width: 100%;
    align-items: center;
}

#servicePic {
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    width: 50%;
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

#loadingText {
    padding-bottom: 1em;
    color: white;
}

ul{
    flex-wrap: wrap;
    list-style-type: none;
    padding-left: 0;
    justify-content: center;
    overflow-y: scroll;
}

li{
    text-align: center;
    padding: 10px;
    margin: 10px;
    align-items: center;
}

li > img {
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0;
    width: 5em;
    height: 5em;
}

li > p {
    color: white;
}

#sidebar-header {
    text-align: center;
}

#members-container {
    background-color: #69BBE9;
    border-radius: 1em;
    text-align: center;
    justify-content: center;
    margin: 1em;
}

#members-container p:first-child {
    padding-top: 0.5em;
    color: white;
    font-size: 1.5em;
    width: 100%;
}

#costbox {
    padding: 10px; 
    background-color: #c4c3d0;
    margin: auto;
    border-radius: 1em;
    display: inline-block;
}

::-webkit-scrollbar {
    width:0;
    background: transparent;
}

#buttonBox {
    text-align: center;
}

button {
  border-radius: 3px;
  background-color: #69bbe9;
  border: none;
  color: black;
  text-align: center;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: auto;
  text-transform: uppercase;
  height: 45px;
  width: 80%;
  line-height: 2px;
  box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: azure;
  font-weight: bold;
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
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>