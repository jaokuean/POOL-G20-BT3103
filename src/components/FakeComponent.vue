<template>
    <div>
        {{users}}
        {{loops}}
        <button type = "button" v-on:click="getPoolMembers"> getPoolMembers </button>
        <button type = "button" v-on:click="fakeCreditCard"> fakeCreditCard</button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            name: "pool"+this.counter,
            numbers: [],
            counter: 0,
            loops: 0,
            pools: [],
            users: [],
            lorem:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at fringilla nisi. Suspendisse vel elementum magna, id luctus lacus. Duis pulvinar justo sit amet dolor feugiat dapibus. Duis at mi sed eros dictum mattis id at magna. Donec non gravida tellus. Donec vulputate tortor non magna sagittis pellentesque. In tristique tortor augue, ac dignissim felis faucibus viverra. Vivamus egestas a risus at blandit. Quisque ut felis rutrum, lacinia orci quis, aliquet sapien. Fusce metus ex, mattis eu vestibulum lacinia, facilisis ut lacus. Mauris rhoncus neque sit amet dignissim tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris blandit tristique vulputate. Sed ex nisi, vestibulum in nunc laoreet, imperdiet finibus dolor. Sed fringilla convallis est volutpat laoreet. Fusce commodo consequat cursus. Etiam et rhoncus odio. Suspendisse vel felis vitae tortor cursus congue. Nam ornare tortor et arcu ultricies porttitor eget pharetra elit. Vivamus facilisis ex condimentum lectus iaculis, in iaculis neque pharetra. Donec ut iaculis tortor." 

        }
    },

    methods : {
        generatePools : function() {
            for (var i = 0; i < this.loops; i++) {
                var item = {
                    maxSize: Math.floor(Math.random() * 4 + 1),
                    members: [],
                    serviceId: Math.floor(Math.random() * 6 + 1),
                    sharedPassword: Math.random().toString(16).substr(2, 8),
                    sharedUserName: Math.random().toString(16).substr(2, 8) + "@gmail.com",
                    poolName: Math.random().toString(16).substr(2, 8),
                }
                database.collection('pools').add(item)
                this.counter++
                console.log(item)
            }
        },

        updatePoolMembers : function() {   
            this.pools = []        
            database
            .firestore()
            .collection('pools')
            .get()
            .then(async querySnapshot => {
                querySnapshot.forEach(doc=>{
                    //console.log(doc.data().members)
                    doc.ref.update({
                        members : this.users.slice(0,doc.data().maxSize)
                    })
                    //console.log(doc.data().members)
                    this.pools.push(doc.data())
                })
            })
        },

        getPoolMembers: function() {
            database
            .firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.users.push(doc.id)
                })
            })
        },

        updatePools : function() {
            database
            .firestore()
            .collection('pools')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    doc.ref.update({
                        remaining : doc.data().maxSize,
                        dateCreated: database.firestore.FieldValue.serverTimestamp(),
                    }, {merge:true})
                    this.pools.push(doc.data().dateCreated)
                })
            })
        },

        updatePoolGroups:function() {
            database
            .firestore()
            .collection('pools')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    var r = Math.floor(Math.random() * (doc.data().maxSize-1) + 1) //from 1 to maxsize
                    this.loops += r
                    this.users.slice(0,r).forEach(uid =>{
                        database
                        .firestore()
                        .collection('poolgroups')
                        .add({
                            poolID: doc.id,
                            userID: uid,
                            startDate: doc.data().dateCreated,
                            endDate: doc.data().dateCreated,
                            nextPaymentDue: doc.data().dateCreated,
                        })
                    })
                    doc.ref.update({
                        remaining : doc.data().maxSize - r,
                    })
                    var name = doc.data().poolName
                    this.pools.push({name, r})
                })
            })
        },

        updatePoolGroupNextPayment: function() {
            database.firestore().collection('poolgroups').get().then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    doc.ref.update({
                        nextPaymentDue: new Date(doc.data().startDate.toDate().setMonth(doc.data().startDate.toDate().getMonth()+1)),
                    })
                    this.loops++
                })
            })

        },

        updateActivityFeed: function() {
            database.firestore().collection('poolgroups').get().then(querySnapshot => {
                querySnapshot.forEach(doc=>{
                    database.firestore().collection('activities').add({
                        user: doc.data().userID,
                        pool: doc.data().poolID,
                        dateCreated: database.firestore.FieldValue.serverTimestamp(),
                        title: "Lorem Ipsum Dolors",
                        content: this.lorem.slice(0, Math.floor(Math.random() * this.lorem.length))
                    })
                    this.loops++
                })
            })
        },

        fakeCreditCard: function() {
            const creditCardRef =  database.firestore().collection('creditcards')
            database.firestore().collection('users').get().then(querySnapShot=>{
                querySnapShot.forEach(doc=>{
                    const rand = Math.random()
                    if (rand >= 0.6) {
                         creditCardRef.add({
                            cardName : doc.data().name,
                            cardNumber: rand * Math.pow(10, 16),
                            cvc: (rand * rand * 100).toFixed(0),
                            cardExpiry: database.firestore.FieldValue.serverTimestamp(),
                            userID: doc.id,
                         })
                        this.loops++
                        this.users.push(doc.data().name)
                    }
                })
            })
        },
        
    }, 

    created() {
    }
}
</script>

<style scoped>
</style>