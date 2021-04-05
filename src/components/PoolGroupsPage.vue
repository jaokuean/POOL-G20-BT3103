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
                <PoolGroupsFirestore id = "poolgroups"></PoolGroupsFirestore>
            </div>
        </div>
    </div>
</template>

<script>
import activityFeed from './ActivityFeed.vue'
import PoolGroupsFirestore from './PoolGroupsFirestore.vue'
import navbar from "./NavBar";

export default {
    components: {activityFeed, navbar, PoolGroupsFirestore},

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