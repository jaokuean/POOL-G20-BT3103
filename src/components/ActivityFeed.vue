<template>
    <div id = 'feedContainer'>
        <div id = 'titleContainer'>
            <a id = 'title'>
                ACTIVITY FEED
            </a>
            <a class="dot"><strong>{{feeds.length}}</strong></a>
        </div>
        <ul>
            <li v-for="feed in feeds" :key="feed.index">
                <span id='li-container'>
                    <div style="width:20%;">
                        <img v-bind:src='feed.imgURL'/>
                    </div>
                    <div style="width:80%;">
                        {{feed.description}}
                    </div>
                </span>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            feeds:[
                {imgURL:'https://yt3.ggpht.com/ytc/AAUvwni_LdnpDi-SOIhjp4Kxo2l_yVBoYsfdDCpUM5VDzg=s900-c-k-c0x00ffffff-no-rj',description:"Short Message"},
                {imgURL:'https://www.scdn.co/i/_global/twitter_card-default.jpg',description:"This is just some dummy message that is long. dfkadjflkasdjfkjf fdksaflasjdf saldkfjsalkfjdsfj kjlkj fdsafkfjds kdsaflksajflkasjdflkdsa fldsjf ldf dsalkfj lksajflkdjf lkdjflk sakdfj"},
                {imgURL:'https://yt3.ggpht.com/ytc/AAUvwni_LdnpDi-SOIhjp4Kxo2l_yVBoYsfdDCpUM5VDzg=s900-c-k-c0x00ffffff-no-rj',description:"Short Message"},
                {imgURL:'https://www.scdn.co/i/_global/twitter_card-default.jpg',description:"This is just some dummy message that is long. dfkadjflkasdjfkjf fdksaflasjdf saldkfjsalkfjdsfj kjlkj fdsafkfjds kdsaflksajflkasjdflkdsa fldsjf ldf dsalkfj lksajflkdjf lkdjflk sakdfj"},
                {imgURL:'https://yt3.ggpht.com/ytc/AAUvwni_LdnpDi-SOIhjp4Kxo2l_yVBoYsfdDCpUM5VDzg=s900-c-k-c0x00ffffff-no-rj',description:"Short Message"},
                {imgURL:'https://www.scdn.co/i/_global/twitter_card-default.jpg',description:"This is just some dummy message that is long. dfkadjflkasdjfkjf fdksaflasjdf saldkfjsalkfjdsfj kjlkj fdsafkfjds kdsaflksajflkasjdflkdsa fldsjf ldf dsalkfj lksajflkdjf lkdjflk sakdfj"},
            ]
        }
    },
    methods: {
        fetchFeeds: function() {
            return true;
        }
    },
    created() {
        this.fetchFeeds();
    }
}
</script>

<style scoped>
#feedContainer {
    width: 18%;
    height: 100vh;
}
#titleContainer {
    background: #69BBE9;
    height: 2.2vw;
    width: 20%;
    display: table-cell;
    vertical-align: middle;
    border-radius: 0.3vw;
    box-shadow: 1.5px 1.5px #adadad;
}
#title {
    color: #fff;
    font-size: 1vw;
    font-family: Monaco, sans-serif;
    margin-left: 2vw;
}
.dot {
    color: #fff;
    font-size: 1vw;
    margin-inline-start: 6vw;
    height: 1.2vw;
    width: 1.2vw;
    background-color: #B4261F;
    border-radius: 50%;
    text-align: center;
    display: inline-block;
}
ul {
    padding:0;
    margin-top: 3px;
}
li {
    border-radius: 0.3vw;
    box-shadow: 0 2px 4px 0 rgba(117, 117, 117, 0.2), 0 3px 10px 0 rgba(117, 117, 117, 0.19);
    background: #fff;
    margin-bottom: 0.15em;
    
}
#li-container {
    font-size: 0.7em;
    padding: 1em;
    display: flex;
}
img {
    border-radius: 50%;
    height: 3vw;
    width: 3vw;
    margin-right:2em;
}
</style>