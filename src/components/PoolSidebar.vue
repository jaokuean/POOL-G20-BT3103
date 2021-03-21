<template>
    <div class = "main-wrapper">
        <div class = "sidebar-container">
            <div id = "sidebar-header">
                <img v-bind:src = "this.imageUrl" id = "servicePic" >
                <p> {{this.serviceName}} </p>
                <p> Monthly Cost: ${{this.cost}} </p>
            </div>
            <div class = "members">
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
            imageUrl: "",
            poolId: "cFmHko3OJGX9b0p8xFdB" ,//dummy variable that needs to be a prop
            serviceName: "Straits Times",
            cost: 20,
            staticImgUrl: "https://aseanup.com/wp-content/uploads/2015/04/HkmsHBTM_400x400.jpg",
            members: [{
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
            poolData: {},
        }
    }, 

    created() {
        this.fetchPool();
    },

    methods: {
        fetchPool: function() {
            database.collection("pools").doc(this.poolId).get().then((doc) => {
                Object.assign(this.poolData, doc.data())
                database.collection("services").where("serviceId", "==",doc.data().serviceId).get().then((d)=>{
                    this.imageUrl = d.docs[0].data().logo
                    this.serviceName = d.docs[0].data().serviceName
                })
                doc.data().members.forEach(m=>{
                    database.collection('users').doc(m).get().then(dd => {
                        this.members.push(dd.data())
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
    width: 300px;
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
    width: 100%;
    height: 70%;
    align: center;
}

ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    width: calc(100% * (1/1.3));
    justify-content: center;
    border: 1px solid #222;
    margin-left: 5px;
}
li{
    flex-basis: 65px;
    text-align: center;
    padding: 10px;
    margin: 10px;
    align-items: center;
}

#sidebar-header {
    text-align: center;
}

.members {
    background-color: #69BBE9;
    display: inline-block;
    border-radius: 20%;
    text-align: center;
    justify-content: center;
}


</style>