<template>
    <div>
        <nav>
            <navbar id = "navbar"></navbar>
        </nav>
        <div id = "container">
            <div id = "right">
                <br>
                <SearchPage id = "searchpage"></SearchPage>
            </div>
        </div>
    </div>
</template>

<script>
import SearchPage from './SearchPage.vue'
import navbar from "./NavBar";

export default {
    components: {navbar, SearchPage},

    data() {
    }
}
</script>

<style scoped>
#navbar {
    float:inline-start;
}

#activityFeed {
    width: 250px;
}

#searchpage {
    width: 550px;
}

#container {
    position: fixed;
    padding: 0;
    margin: 0;
}

#left {
    float: left;
}

#right {
    float: right;
}
</style>