<template>
    <div id='mainComponent'>
        <div id='searchBox'>
            <img v-bind:src="search"/> <input type="text" id="poolName" v-model="poolName" v-on:keyup.enter="fetchData">
            <h3></h3>
        </div>

        <div id ='searchBar'>
            <strong>Search Results for</strong>
            <br>
            <strong id="name">{{poolName}}</strong>
        </div>

        <div id = "result">
            <br>
            <br>
            <div id='float1'>
                <img v-bind:src="logo" v-bind:id="serviceID" v-on:click="route($event)"/>
            </div>
            <div id='float2'>
                {{description}}
            </div>
        </div>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data: function() {
        return {
            poolName:'Netflix',
            search:'https://static.thenounproject.com/png/101791-200.png',
            serviceID: "",
            logo: "",
            description:""
        }
    },
    methods: {
        fetchData: function() {
            //only exact searches
            //press enter to begin the search
            database.firestore().collection("services").where("serviceName","==",this.poolName).get().then((d)=>{
                this.serviceID = d.docs[0].id
                this.logo = d.docs[0].data().logo
                this.description = d.docs[0].data().serviceName + ": " + d.docs[0].data().description + "\n" + "fee: $" + d.docs[0].data().fee + "\n" + "website link: " + d.docs[0].data().website
            })
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id")
            this.$router.push({ name: 'PoolGroups', params: { document_id: doc_id } })
        }
    },

    created() {
        this.fetchData()
    }
}
</script>

<style scoped>
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

#result img {
    height: 7em;
    width: 7em;
    display: block;
    border-radius: 50%;
}

#searchBox {
    padding-left: 50px;
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

#searchBar {
    background: #69BBE9;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    padding-top: 0;
    width: 500px;
    font-size:30px;
    padding-left: 50px;
    text-align: left;
}

#name {
    color:white
}

#float1 {
    padding-left:45px;
    width:20%;
    float:left;
}

#float2 {
    padding-left:200px;
    padding-top:15px;
    white-space: pre-line;
}
</style>