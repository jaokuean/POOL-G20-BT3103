<template>
    <div id='mainComponent'>
        <div id='searchBox'>
            <img v-bind:src="search"/> <input type="text" id="poolName" v-model="poolName">
        </div>

        <div id ='name'>
            <div id='float01'>
                <img v-bind:src="imgURL"/>
            </div>
            <div id='float02'>
                {{poolName}}
                <br>
                <div id="text">Pool</div>
            </div>
        </div>

        <div id = "result">
            <div id ='searchBar'>
                List of Pools Groups
                <br>
            </div>
            <p v-if="hasNoGroup">No Pool Groups Created Yet</p>
            <ul v-if="!hasNoGroup">
                <li v-for="grp in groups" :key="grp.index">
                    <div id='float1'>
                        <img v-bind:src="grp.imgURL"/>
                    </div>
                    <div id='float2'>
                        {{grp.description}}
                    </div>
                    <div id='float3'>
                        <p id="notFull" v-if="!grp.isFull">Dive In</p>
                        <p id="full" v-if="grp.isFull">Pool Is Full</p>
                    </div>
                </li>
            </ul>
            <div id="float4">
                <button>+</button>
            </div>
            <div id="float5">
                <p>Create New Pool Group</p>
            </div>
        </div>
    </div>
</template>

<script>
//searchBar cannot add style? Background will cover "Name" section, cannot left align???
export default {
    data: function() {
        return {
            hasNoGroup:false,
            poolName:'Disney Plus',
            search:'https://static.thenounproject.com/png/101791-200.png',
            imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF64AHSDlHzKv40EOHnfqiGy2ZtS3ec18Vrw&usqp=CAU',
            groups: [
                {imgURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF64AHSDlHzKv40EOHnfqiGy2ZtS3ec18Vrw&usqp=CAU',description:'Here are some description of group 1',isFull:false},
                {imgURL:'https://www.pngfind.com/pngs/m/217-2177799_png-black-and-white-download-free-disneys-icons.png',description:'Here are some description of group 2',isFull:true}
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
button {
    font-size: 30px;
}

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

#float1 img {
    height: 5em;
    width: 5em;
    display: block;
    border-radius: 50%;
}

#searchBar {
    padding-left: 30px;
    padding-top: 200px;
    text-align: left;
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

#name {
    padding-left: 80px;
}

#float01 {
    display: block;
    border-radius: 50%;
    height: 3em;
    width: 3em;
    float:left;
}

#float02 {
    padding-top:65px;
    font-size:30px;
    float: right;
}

#text {
    color:#69BBE9;
}

#float1 {
    width:5%;
    float:left;
}

#float2 {
    padding-top:15px;
    width: 600px;
}

#float3 {
    text-align: left;
    float: right;
    color: white;
    width: 100px;
    text-align: center;
}

#float4 {
    float:left;
    padding-left:62px;
    padding-top:5px;
}

#float5 {
    padding-top: 0.1px;
    background:  #69BBE9;
    padding-left: 80px;
    width: 400px;
    height:50px;
    border-start-end-radius: 1rem;
    border-end-end-radius: 1rem;
    color:white;
    text-align: center;
}

#notFull {
    background-color: #69BBE9;
}

#full {
    background-color: #db5858;
}

#result {
    padding-left: 50px;
}
</style>