<template>
   <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="What are you looking for?" v-model="poolName">
            <button v-on:click="fetchData" class="searchButton">
                <img class="searchImg" src='../assets/magnifying-glass.png'/>
            </button>
        </div>
    </div> 
</template>

<script>
import database from '../firebase.js'

export default {
    data: function() {
        return {
            poolName:'Netflix',
            serviceID: "",
            logo: "",
            description:""
        }
    },
    methods: {
        fetchData: function() {
            //click on button to start the search
            //why the first time nothing comes out but second time it works?
            database.firestore().collection("services").where("serviceName","==",this.poolName).get().then((d)=>{
                this.serviceID = d.docs[0].id
                this.logo = d.docs[0].data().logo
                this.description = d.docs[0].data().serviceName + ": " + d.docs[0].data().description + "\n" + "fee: $" + d.docs[0].data().fee + "\n" + "website link: " + d.docs[0].data().website
            })//.then(alert(this.description))
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style scoped>
body{
  background: #f2f2f2;
  font-family: 'Open Sans', sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

.searchImg {
    max-height: 100%;
    max-width: 100%;
    display: block;
}

.wrap{
  width: 50%;
  margin-left: 10%;
}
</style>