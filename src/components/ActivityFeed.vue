<template>
    <div id = 'feedContainer'>
        <div id = 'titleContainer'>
            <a id = 'title'>
                <strong>ACTIVITY FEED</strong>
            </a>
            <a id="feedNumber"><strong>{{feeds.length}}</strong></a>
        </div>
        <ul>
            <li v-for="(feed,index) in feeds" :key="index" @click="popup(index)">
                <span id='li-container'>
                    <div style="width:20%;">
                        <img v-bind:src='feed.imgURL'/>
                    </div>
                    <div style="width:80%;">
                        {{feed.shortDescription}}
                    </div>
                </span>
            </li>
        </ul>

        <!--Modal box additions-->
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2 v-text="popupTitle"/>
                </div>
                <div class="modal-body">
                    <p v-text="popupContent"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
    data: function() {
        return {
            feeds:[],
            popupTitle:"Title",
            popupContent:"Some content",
        }
    },
    methods: {
        fetchFeeds: function() {
            //Getting feeds
            const uid = this.$store.getters.user.data.uid;
            console.log(uid)
            database.firestore().collection('activities').get().then( (querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    const feedData = doc.data();
                    if (feedData.user == uid) {
                        let feedObject = {};
                        feedObject['title'] = feedData.title;
                        feedObject['description'] = feedData.content;
                        // Getting image of the service involved
                        database.firestore().collection('services').doc(feedData.pool).get().then((docSnapShot) => {
                            if (docSnapShot.exists) {
                                feedObject['imgURL'] = docSnapShot.data().logo
                            } else {
                                console.log("Service for this activity does not exist");
                            }
                        })

                        // Create short message
                        if (feedObject.description.length > 76) {
                            feedObject.shortDescription = feedObject.description.slice(0,76) + '...';
                        } else {
                            feedObject.shortDescription = feedObject.description;
                        }
                        this.feeds.push(feedObject);
                    }
                })
            })
        },
        popup: function(index) {
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            const feed = this.feeds[index];

            //Set title and content
            this.popupTitle = feed.title;
            this.popupContent = feed.description;

            // Display popup box
            modal.style.display = "block";

            // Closes box if 'x' in the box is clicked
            span.onclick = function() {
                modal.style.display = "none";
            }

            // Closes box if clicked anywhere outside it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    },
    created() {
        this.fetchFeeds();
    }
}
</script>

<style scoped>
#feedContainer {
    height: 100vh;
}
#titleContainer {
    background: #69BBE9;
    height: 2.2vw;
    border-radius: 0.3vw;
    box-shadow: 1.5px 1.5px #adadad;
    display: flex;
    align-items: center;
}
#title {
    color: #fff;
    font-size: 1vw;
    font-family: Monaco, sans-serif;
    margin-left: 1em;
}
#feedNumber {
    color: #fff;
    font-size: 1vw;
    margin-inline-start: 6vw;
    height: 1.6vw;
    width: 1.6vw;
    background-color: #B4261F;
    border-radius: 50%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
ul {
    padding:0;
    margin-top: 3px;
    max-height: 100vh;   
    overflow-y: scroll;  
    overflow-x : hidden;
}
li {
    border-radius: 0.3vw;
    box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
    background: #fff;
    margin-bottom: 0.15em;
    cursor: pointer;
}
#li-container {
    font-size: 0.9em;
    padding: 1em;
    display: flex;
}
img {
    border-radius: 50%;
    height: 3vw;
    width: 3vw;
    margin-right:2em;
}

/* New Additions */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 10%; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.modal-body {padding: 2px 16px;}

</style>