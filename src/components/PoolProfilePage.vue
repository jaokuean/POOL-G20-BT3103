<template>
    <div>
        <nav>
            <activityFeed id = "activityFeed">
            </activityFeed>
        </nav>
        <nav>
            <poolSidebar id="poolSidebar">
            </poolSidebar>
        </nav>
        <div class="search-bar">
            <form class="form-inline">
                <input type="text" name="search" class="form-control" placeholder="Search"/>
            </form>
        </div>
        <div id="header">
            <img v-bind:src = "this.logo" id = "servicePic" >
            <h1> {{this.serviceName}} (${{cost}}/mo)</h1>
        </div>
        <div id = "members">
            <p> Members </p>
            <ul>
                <li v-for="member in memberData" v-bind:key="member.name">
                    <img v-bind:src = "member.profilePhoto">
                    <p> {{member.name}} </p>
                </li>
            </ul>
        </div>
        <div id = "account-dets">
            <p> Username: </p>
            <p v-show="this.show"> {{this.username}} </p>
            <p> Password:  </p>
            <p v-show="this.show"> {{this.password}} </p>
            <button id="show-dets" v-on:click="show = !show">Show Details </button>
        </div>
        <div class = "feed" v-for="f in feed" v-bind:key="f.title" >
            <h1> {{f.title}} </h1>
            <p> {{f.content}} </p>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'
import poolSidebar from './PoolSidebar.vue'
import activityFeed from './ActivityFeed.vue'

export default {
    components: {poolSidebar, activityFeed},

    data() {
        return {
            poolId:  "cFmHko3OJGX9b0p8xFdB" ,//dummy variable that needs to be a prop
            memberData:  [{
                name: "John Tin",
                profilePhoto: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/01/17/twitter-egg.jpg?width=982&height=726",
            },
            {
                name: "John Ton",
                profilePhoto: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/01/17/twitter-egg.jpg?width=982&height=726",
            },
            {
                name: "John Tun",
                profilePhoto: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/04/01/17/twitter-egg.jpg?width=982&height=726",
            },
            ], //dummy data
            username: "",
            password: "",
            feed: [{title: "payment", content:"You have paid this amount"},
            {title: "payment2", content:"You have paid this amount"},
            {title: "payment3", content:"You have paid this amount"}],
            logo: "",
            serviceName:"",
            show: false,
            cost:20,
        }
    },

    methods : {
        fetchData: function() {
            database.collection('pools').doc(this.poolId).get().then(doc=>{
                this.username = doc.data().sharedUserName
                this.password = doc.data().sharedPassword
                doc.data().members.forEach(m => {
                    database.collection('users').doc(m).get().then(d =>{
                        this.memberData.push(d.data())
                    })
                })
                database.collection("services").where("serviceId", "==",doc.data().serviceId).get().then((d)=>{
                    this.logo = d.docs[0].data().logo
                    this.serviceName = d.docs[0].data().serviceName
                })
            })
        }, 
    },

    created() {
        this.fetchData()
    },
}
</script>

<style scoped>

#activityFeed{
    float:left;
    width: 250px;
}

#poolSidebar{
    float:right;
    width: 250px;
}

img {
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    margin: 0;
    width: 100%;
    height: 70%;
    align: center;
}

#members{
    background-color: #69BBE9;
    border-radius: 25px;
    margin-left: 300px;
    margin-right: 300px;
    padding-left: 30px;
}

#account-dets{
    background-color: #69BBE9;
    border-radius: 25px;
    margin-left: 300px;
    margin-right: 300px;
    padding-left: 30px;
    display: flex;
    padding:5px;
}

#account-dets > p {
    margin: 5px;
}

ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    width: calc(100% * (1/1.5));
    justify-content: left;
}
li{
    flex-basis: 65px;
    text-align: center;
    padding: 10px;
    margin: 10px;
}


#header{
    text-align: center;
    display: flex;
    padding-left: 50px;
    padding-top: 5px;
}

#servicePic {
    border-radius: 50%;
    width: 50px;
    height: 50px;
}


.feed {
    margin-left: 300px;
    margin-right: 300px;
    border: 1px solid #222;
    margin-top: 10px;
}

</style>