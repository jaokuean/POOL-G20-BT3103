<template>
    <div id='mainComponent'>
        <div id="header">
            <img v-bind:src = "pool.logo" id = "servicePic" >
            <div>
                <h1> {{pool.poolName}}</h1><br>
                <a>{{pool.serviceName}} (${{pool.fee}}/mo)</a>
            </div>
        </div>
        <div id='leavePoolContainer'>
            <button id='leavePoolBtn' type="button" @click="confirmLeave" title="Leave this pool">Leave Pool</button>
        </div>
        <div id='members'>
            <ul>
                <li v-for="member in members" :key="member.index">
                    <img class='memberImage' v-bind:src="member.profilePhoto"/>
                    <a> {{member.name}} </a>
                </li>
            </ul>   
        </div>
        <div id='accountDetails'>
            <p><strong> Username: </strong></p>
            <p> {{pool.sharedUserName}} </p>
            <p><strong> Password: </strong></p>
            <p v-show="show"> {{pool.sharedPassword}} </p>
            <p v-show="!show">{{blindpw}}</p>
            <button id="show-dets" v-on:click="togglePassword">{{pwBtnTxt}}</button>
        </div>
        <div id='writeMsgBtnWrapper'>
            <a id='writeMsgBtn' @click="popup">Write a message! +</a>
        </div>
        <ul id="feedsList">
            <li class="feedsListItem" v-for="feed in feeds" v-bind:key="feed.index" >
                <h3>{{feed.title}}</h3>
                <p>{{feed.content}}</p>
                <p class="feedDate">{{feed.date}}</p>
            </li>
        </ul>

        <!-- Modal form -->
        <div id="myModalForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id='msgBox'>
                    <h2>Message</h2>
                    <textarea id='inputMsg' rows="6" v-model="inputMsg"/>
                </div>
                <div id='commentBtnWrapper'>
                    <a id='commentBtn' @click="comment">Comment</a>
                </div>
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
            feeds:[],
            show: false,
            clicked:false,
            inputMsg:"",
            blindpw:'',
            pwBtnTxt: 'Show password',
        }
    },
    props:['pool'],
    watch: {
        pool: function(oldVal, newVal) {
            if (oldVal != newVal) {
                this.members = [];
                this.feeds = [];
                this.fetchData();
            }  
        }
    },
    methods: {
        fetchData: function() {
            this.blindpw = "*".repeat(this.pool.sharedPassword.length);
            const poolgroups_ref = database.firestore().collection('poolgroups');
            const users_ref = database.firestore().collection('users');
            const activities_ref = database.firestore().collection('activities');
            // Getting members using poolGroups
            poolgroups_ref.where("poolID","==",this.pool.poolID).get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    const uid = doc.data().userID;
                    users_ref.doc(uid).get().then((doc) => {
                        let member = doc.data();
                        member['userID'] = uid;
                        this.members.push(member);
                    })
                })
            }).then(() => {
                // Getting feeds
                activities_ref.where("pool","==",this.pool.poolID).onSnapshot((querySnapShot) => {
                    this.feeds = [];
                    let querySize = querySnapShot.size;
                    let count = 0;
                    querySnapShot.forEach((doc) => {
                        let feed = doc.data();
                        feed['date'] = feed.dateCreated.toDate();
                        this.feeds.push(feed);

                        // For callback
                        count = count + 1;
                        if (querySize == count) {
                            this.callback();
                        }
                    });
                })
            })
        },
        callback: function() {
            // Sort array according to date
            this.feeds = this.feeds.sort((a,b)=>b.date - a.date);
        },
        popup: function() {
            // Get the modal
            var modal = document.getElementById("myModalForm");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[1];

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        },
        comment: function() {
            const msg = this.inputMsg.trim();
            if (msg.length == 0) {
                return alert("Please write something!");
            }
            // Create feed object for message and write to database
            let feed = {};
            feed['content'] = msg;
            feed['title'] = 'Message from '+ this.$store.getters.user.data.displayName;
            feed['user'] = this.$store.getters.user.data.uid;
            feed['pool'] = this.pool.poolID;
            feed['dateCreated'] = database.firestore.Timestamp.fromDate(new Date());
            database.firestore().collection('activities').add(feed).then((docref) => {
                console.log("write successful " + docref);
            });

            // Add to current feeds so there is no lag on display
            // feed['date'] = feed.dateCreated.toDate();
            // this.feeds.push(feed);
            // this.feeds=this.feeds.sort((a,b)=>b.date - a.date);

            // Close modal
            var modal = document.getElementById("myModalForm");
            modal.style.display="none";
            this.inputMsg="";
            alert('Message written succesfully!')
        },
        togglePassword: function() {
            if (this.show) {
                this.pwBtnTxt = 'Show password';
            } else {
                this.pwBtnTxt = 'Hide password';
            }
            this.show = !this.show;
        },
        confirmLeave: function() {
            let check = confirm("Are you sure you want to leave this group?");
            if (check) {
                database.firestore().collection('pools').doc(this.pool.poolID).get().then(doc => {
                    const poolData = doc.data();
                    if (poolData.maxSize == poolData.remaining + 1) {
                        this.deletePool();
                    } else {
                        this.leavePool(poolData.remaining);
                    }
                })
            }
        },
        deletePool: function() {
            const poolgrps_ref = database.firestore().collection('poolgroups');
            const pools_ref = database.firestore().collection('pools');
            const services_ref = database.firestore().collection('services');
            services_ref.doc(this.pool.serviceId).update({
                    score: database.firestore.FieldValue.increment(-1)
            })
            poolgrps_ref.doc(this.pool.poolgrpID).delete().then(() => {
                pools_ref.doc(this.pool.poolID).delete().then(() => {
                    window.location.reload();
                    alert('Left group');
                })
            })
        },
        leavePool: function(remain) {
            const poolgrps_ref = database.firestore().collection('poolgroups');
            const pools_ref = database.firestore().collection('pools');
            const activity_ref = database.firestore().collection('activities');
            const services_ref = database.firestore().collection('services');

            //Create feed object for member leaving
            let feed = {};
            feed['content'] = this.$store.getters.user.data.displayName + ' left the pool';
            feed['title'] = "***Pool Notice***";
            feed['user'] = '';
            feed['pool'] = this.pool.poolID;
            feed['dateCreated'] = database.firestore.Timestamp.fromDate(new Date());
            
            services_ref.doc(this.pool.serviceId).update({
                    score: database.firestore.FieldValue.increment(-1)
            });
            poolgrps_ref.doc(this.pool.poolgrpID).delete().then(() => {
                pools_ref.doc(this.pool.poolID).update({
                    remaining: remain + 1
                }).then(() => {
                    activity_ref.add(feed).then(() => {
                        window.location.reload();
                        alert('Left group');
                    })
                })
            })
        }
    },
    created() {
        this.fetchData()
    },
}
</script>

<style scoped>
#mainComponent {
    width: 90%;
}

#header {
    align-items: center;
    display: flex;
    margin-left: 4em;
    margin-top: 10px;
    width: 100%;
}

#header h1 {
    display: inline;
}

#header a {
    color: #05598a;
}

#servicePic {
    border-radius: 50%;
    width: 6em;
    height: 6em;
    margin-right: 10px;
}

#leavePoolContainer {
    text-align: end;
}

#leavePoolBtn {
    font-size: 1vw;
    background: rgb(255, 73, 73);
    border-radius: 5px;
    padding: 10px;
    color: white;
    border: white;
    box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
    cursor: pointer;
}

#leavePoolBtn:hover {
    background: rgb(209, 125, 125);
}

#members {
    background: #69BBE9;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color: white;
}

#members ul {
    padding: 0;
    margin-left: 3rem;
}

#members li {
    display: inline-block;
    text-align: center;
    margin: 1rem;
    margin-top: 1rem;
}

.memberImage {
    height: 4em;
    width: 4em;
    display: block;
    border-radius: 50%;
    margin: auto;
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

#writeMsgBtnWrapper {
    text-align: right;
    padding: 1em;
}

#writeMsgBtn {
    padding:0.5em;
    background: #69BBE9;
    color: white;
    border-radius: 1em;
    box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
    cursor: pointer;
}

#feedsList {
    padding:0;
    margin-top: 3px;
    margin-left: 1em;
    max-height: 50vh;   
    overflow-y: scroll;  
    overflow-x : hidden;
}

.feedsListItem {
    border: 3px solid #222;
    border-radius: 2em;
    margin-top: 10px;
    padding: 0.3em;
}

.feedDate {
    text-align: right;
    font-size: 0.8em;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
    background-color: rgb(209, 209, 209);
}
::-webkit-scrollbar-thumb {
  background-color: rgb(114, 114, 114);
  border-radius: 20px; 
}

/* The Modal (background) */
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; 
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 1em;
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

#inputMsg {
    width: 90%;
    border-color: #222;
    border-radius: 2px;
    resize: none;
    font-size: 1em;
}

#commentBtnWrapper {
    text-align: right;
    padding-right: 10%;
    padding-top: 1em;
    padding-bottom: 1em;
}

#commentBtn {
    padding:0.5em;
    background: #69BBE9;
    color: white;
    border-radius: 1em;
    box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
    cursor: pointer;
}
</style>