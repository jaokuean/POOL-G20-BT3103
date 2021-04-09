<template>
    <div id='mainComponent'>
        <div id="header">
            <img v-bind:src = "pool.logo" id = "servicePic" >
            <h1> {{pool.serviceName}} (${{pool.fee}}/mo)</h1>
        </div>
        <div id='members'>
            <ul>
                <li v-for="member in members" :key="member.name">
                    <img v-bind:src="member.profilePhoto"/>
                    <p> {{member.name}} </p>
                </li>
            </ul>
        </div>
        <div id='accountDetails'>
            <p> Username: </p>
            <p v-show="this.show"> {{pool.sharedUserName}} </p>
            <p> Password:  </p>
            <p v-show="this.show"> {{pool.sharedPassword}} </p>
            <button id="show-dets" v-on:click="show = !show">Show Details </button>
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
        }
    },
    props:['pool'],
    methods: {
        fetchData: function() {
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