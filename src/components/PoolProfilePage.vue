<template>
    <div id='mainComponent'>
        <div id="header">
            <img v-bind:src = "this.logo" id = "servicePic" >
            <h1> {{this.serviceName}} (${{cost}}/mo)</h1>
        </div>
        <div id='members'>
            <ul>
                <li v-for="member in memberData" :key="member.name">
                    <img v-bind:src="member.profilePhoto"/>
                    <p> {{member.name}} </p>
                </li>
            </ul>
        </div>
        <div id='accountDetails'>
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

export default {
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
            username: "Someuser",
            password: "Somepw",
            feed: [{title: "payment", content:"You have paid this amount"},
            {title: "payment2", content:"You have paid this amount"},
            {title: "payment3", content:"You have paid this amount"}],
            logo: "https://images-na.ssl-images-amazon.com/images/I/41Y-MUPJU7L.png",
            serviceName:"Straits Times",
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
#mainComponent {
    width: 90%;
    font-family: Monaco, sans-serif;
}

#header {
    align-items: center;
    display: flex;
    margin-left: 4em;
    margin-top: 10px;
    width: 100%;
}

#servicePic {
    border-radius: 50%;
    width: 6em;
    height: 6em;
    margin-right: 10px;
}

#members {
    background: #69BBE9;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color: white;
}

ul {
    padding: 0;
    margin-left: 3rem;
}

li {
    display: inline-block;
    text-align: center;
    margin: 1rem;
    margin-top: 1rem;
}

#members img {
    height: 4em;
    width: 4em;
    display: block;
    border-radius: 40%;
}

#accountDetails{
    background-color: #69BBE9;
    display: flex;
    padding:5px;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color: white;
}

#accountDetails > p {
    margin: 5px;
}

.feed {
    border: 3px solid #222;
    border-radius: 2em;
    margin-top: 10px;
    margin-left: 1em;
    margin-right: 1em;
    padding: 0.3em;
}

</style>