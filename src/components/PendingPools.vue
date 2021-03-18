<template>
    <div id='mainComponent'>
        <div id='pendingPoolsContainer'>
            <h2>Pending Pools</h2>
            <ul>
                <li v-for="pendingPool in pendingPools" :key="pendingPool.index">
                    <img v-bind:src="pendingPool.imgURL"/>
                    {{pendingPool.members}}
                </li>
            </ul>
        </div>
        <div id ='myPoolsContainer'>
            <h2>My Pools</h2>
            <ul>
                <li v-for="pool in myPools" :key="pool.index">
                    <img v-bind:src="pool.imgURL"/>
                    <p id='poolDescription'>{{pool.description}}</p>
                </li>
            </ul>
            <div id='addSubContainer'>
                <a id='addIcon'>+</a>
                Add a subscription
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data: function() {
        return {
            pendingPools: [
                {imgURL:'https://www.scdn.co/i/_global/twitter_card-default.jpg',members:'3/4'},
                {imgURL:'https://images-na.ssl-images-amazon.com/images/I/41Y-MUPJU7L.png',members:'4/5'},
                {imgURL:'https://yt3.ggpht.com/ytc/AAUvwni_LdnpDi-SOIhjp4Kxo2l_yVBoYsfdDCpUM5VDzg=s900-c-k-c0x00ffffff-no-rj',members:'5/6'},
            ],
            myPools: [
                {imgURL:'https://www.scdn.co/i/_global/twitter_card-default.jpg',description:'This is some description about this service'},
                {imgURL:'https://images-na.ssl-images-amazon.com/images/I/41Y-MUPJU7L.png',description:'This is some description about this service'},
                {imgURL:'https://yt3.ggpht.com/ytc/AAUvwni_LdnpDi-SOIhjp4Kxo2l_yVBoYsfdDCpUM5VDzg=s900-c-k-c0x00ffffff-no-rj',description:'This is some description about this service'},
            ]
        }
    },
    methods: {
        fetchData: function() {
            return false;
        }
    },
    created() {
        this.fetchData;
    }
}
</script>

<style scoped>
#mainComponent {
    width: 60%;
    font-family: Monaco, sans-serif;
}

#pendingPoolsContainer {
    background: #69BBE9;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color: white;
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

#poolDescription {
    width: 6em;
    margin-top: 5px;
    text-align: start;
}
#addSubContainer {
    display: table-cell;
    vertical-align: middle;
}
#addIcon {
    background: #69BBE9;
    color: white;
    font-size: 2em;
    width: 2em; 
    height: 2em;
    border-radius: 50%;
    display: inline-flex; /* or inline-flex */
    align-items: center; 
    justify-content: center;
    margin-left: 4rem;
}
</style>