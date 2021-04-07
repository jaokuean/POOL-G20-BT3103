<template>
    <div class = "main-wrapper">
        <div class = "sidebar-container">
            <div id = "sidebar-header">
                <img v-bind:src = "pool.logo" id = "servicePic" >
                <h1> {{pool.serviceName}} </h1>
                <p> Monthly Cost</p>
                <p id = "costbox" >${{pool.fee}}</p>
            </div>
            <div id = "members-container">
                <p><strong> Members </strong></p>
                <ul>
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
            members:[]
        }
    }, 
    props: ['pool'],
    created() {
        this.fetchMembers();
        console.log(this.pool);
    },
    methods: {
        fetchMembers: function() {
            const poolgroups_ref = database.firestore().collection('poolgroups');
            const users_ref = database.firestore().collection('users');
            // Getting members using poolGroups
            poolgroups_ref.where("poolID","==",this.pool.poolID).get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    users_ref.doc(doc.data().userID).get().then((doc) => {
                        this.members.push(doc.data());
                    })
                })
            })
        },
    }
}


</script>

<style scoped>


.main-wrapper {
    height: 100%;
    position: relative;
    overflow-y: scroll;
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

li > img {
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0;
    width: 70%;
    height: 50%;
}

ul{
    flex-wrap: wrap;
    list-style-type: none;
    width: calc(100% * (1/1.5));
    justify-content: center;
}
li{
    text-align: center;
    padding: 10px;
    margin: 10px;
    align-items: center;
}

#sidebar-header {
    text-align: center;
}

#members-container {
    background-color: #69BBE9;
    border-radius: 1em;
    text-align: center;
    justify-content: center;
    margin: auto;
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


</style>