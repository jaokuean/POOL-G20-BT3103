<template>
    <div id='mainComponent'>
        <div id='pendingPoolsContainer'>
            <h2>Pending Pools</h2>
            <p class="msg" v-show="pendingPools.length==0 && !loading"><i>You have no pending pools</i></p>
            <p class="msg" v-show="loading"><i>Loading please wait...</i></p>
            <ul>
                <li class='poolItem' v-for="pendingPool in pendingPools" :key="pendingPool.index">
                    <img v-bind:src="pendingPool.logo"/>
                    {{pendingPool.fill}}
                </li>
            </ul>
        </div>
        <div id ='myPoolsContainer'>
            <h2>My Pools</h2>
            <p class="msg" v-show="loading"><i>Loading please wait...</i></p>
            <p class="msg" v-show="myPools.length==0 && !loading"><i>You have no pools, get started by adding a subscription!</i></p>
            <ul>
                <li class='poolItem' v-for="pool in myPools" :key="pool.index" @click="oneClick(pool)">
                    <img v-bind:src="pool.logo"/>
                    <p id='poolName'>{{pool.poolName}}</p>
                </li>
            </ul>
            <div id='addSubContainer' title='Explore now!' @click="explore">
                <a id='addIcon'>+</a>
                Add a subscription
            </div>
        </div>

    </div>
</template>

<script>
import database from '../firebase';

export default {
    data: function() {
        return {
            pendingPools: [],
            myPools: [],
            delay: 700,
            clicks: 0,
            timer: null,
            loading:true,
        }
    },
    methods: {
        fetchData: function() {
            const uid = this.$store.getters.user.data.uid;
            const poolgroups_ref = database.firestore().collection('poolgroups');
            const pools_ref = database.firestore().collection('pools');
            const services_ref = database.firestore().collection('services');
            //Gets poolgroups of user
            poolgroups_ref.where("userID","==",uid).get().then((querySnapShot) => {
                const size = querySnapShot.size;
                let count = 0;
                querySnapShot.forEach((doc)=> {
                    // Gets the pool using poolID
                    const poolID = doc.data().poolID;
                    pools_ref.doc(poolID).get().then((doc) => {
                        const pool = doc.data();    
                        pool['poolID'] = poolID;
                        // Gets the service that is provided in the pool
                        services_ref.doc(pool.serviceId).get().then((doc) => {
                            const service = doc.data();
                            pool['fee'] = service.fee;
                            pool['logo'] = service.logo;
                            pool['serviceName'] = service.serviceName;
                            pool['serviceDescription'] = service.description;
                        }).then(()=> {
                            // Checks whether it is a pending pool
                            if (pool.remaining != 0) {
                                pool['fill'] = (pool.maxSize - pool.remaining).toString() + "/" + pool.maxSize.toString();
                                this.pendingPools.push(pool);
                            }
                            this.myPools.push(pool);
                            
                            // For loading callback
                            count = count + 1;
                            if (count == size) {
                                this.stopLoad();
                            }
                        })
                    })
                });
            })
        },
        oneClick: function(pool) {
            this.clicks++;
            if (this.clicks === 1) {
                this.timer = setTimeout( () => {
                    this.$emit('clicked', pool);
                    this.clicks = 0;
                }, this.delay);
            } else {
                clearTimeout(this.timer);  
                this.$emit('dbclicked', pool);
                this.clicks = 0;
            }
        },
        explore: function() {
            this.$router.push('/explore');
        },
        stopLoad: function() {
            this.loading = false;
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style scoped>
#mainComponent {
    width: 90%;
    font-family: Monaco, sans-serif;
}

#pendingPoolsContainer {
    background: #69BBE9;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color: white;
}

.msg {
    margin-left: 4rem;
    padding-bottom: 1em;
}

.poolItem {
    cursor: pointer;
}

h2 {
    margin-left: 4rem;
    padding-top: 1rem;
}

ul {
    padding: 0;
    margin-left: 3rem;
}

li {
    display: inline-block;
    text-align: center;
    margin: 1rem;
    margin-top: 0;
}

#pendingPoolsContainer img {
    height: 4em;
    width: 4em;
    display: block;
    border-radius: 10%;
}

#myPoolsContainer img {
    height: 4em;
    width: 4em;
    display: block;
    border-radius: 50%;
}

#poolName {
    margin-top: 5px;
    text-align: center;
}

#addSubContainer {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
}
#addIcon {
    background: #69BBE9;
    color: white;
    font-size: 2em;
    width: 2em; 
    height: 2em;
    border-radius: 50%;
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    margin-left: 4rem;
}
</style>