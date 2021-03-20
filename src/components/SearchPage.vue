<template>
    <div id='mainComponent'>
        <div id='searchBox'>
            <img v-bind:src="search"/> <input type="text" id="poolName" v-model="poolName">
            <h3></h3>
        </div>

        <div id ='searchBar'>
            <strong>Search Results for</strong>
            <br>
            <strong id="name">{{poolName}}</strong>
        </div>

        <div id = "result">
            <ul>
                <li v-for="pool in searchResults" :key="pool.index">
                    <div id='float1'>
                        <img v-bind:src="pool.imgURL"/>
                    </div>
                    <div id='float2'>
                        {{pool.description}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
//how to move the search icon a bit downwards, padding-top does not work, can put icon inside input??
export default {
    data: function() {
        return {
            poolName:'Disney',
            search:'https://static.thenounproject.com/png/101791-200.png',
            searchResults: [
                {imgURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF64AHSDlHzKv40EOHnfqiGy2ZtS3ec18Vrw&usqp=CAU',description:'Here are some description of the search result that matches the keyword the most'},
                {imgURL:'https://www.pngfind.com/pngs/m/217-2177799_png-black-and-white-download-free-disneys-icons.png',description:'Here are some description of the search result that matches the keyword in the second place'},
                {imgURL:'data:image/png;base64,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',description:'Here are some description of the search result that matches the keyword in the third place'},
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
    width: 800px;
    font-size:30px;
    padding-left: 50px;
}

#name {
    color:white
}

#float1 {
    width:20%;
    float:left;
}

#float2 {
    padding-top:15px;
}
</style>