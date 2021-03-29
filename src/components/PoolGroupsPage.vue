<template>
    <div>
        <nav>
            <navbar id = "navbar"></navbar>
        </nav>
        <div id = "container">
            <div id = "left">
                <activityFeed id = "activityFeed">
                </activityFeed>
            </div>
            <div id = "right">
                <br>
                <PoolGroupsDummy id = "poolgroups"></PoolGroupsDummy>
            </div>
        </div>
    </div>
</template>

<script>
//cannot edit the height of navbar???
import activityFeed from './ActivityFeed.vue'
import PoolGroupsDummy from './PoolGroupsDummy.vue'
import navbar from "./NavBar";

export default {
    components: {activityFeed, navbar, PoolGroupsDummy},

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

#poolgroups {
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