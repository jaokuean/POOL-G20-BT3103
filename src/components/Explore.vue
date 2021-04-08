<template>
  <div class="container">
    <navbar></navbar>
    <template v-if="user.loggedIn">
      <div id="content">
        <p id="starter">login home</p>
      </div>
    </template>
    <template v-else>
      <div id="content">
        <p id="starter">not logged in home</p>
      </div>
    </template>

    <p id="header">Explore Page</p>
    <p>rest of da shyt</p>
  </div>
</template>
<script>
import navbar from "./NavBar";
import { mapGetters } from "vuex";
export default {
  components: {
    navbar,
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
};
</script>
<style scoped>
#header {
  text-align: center;
  font-size: 35px;
}

#starter {
  font-size: 25px;
  width: 70%;
  text-align: center;
  padding-left: 180px;
  padding-top: 30px;
}

#para1 {
  font-size: 25px;
  width: 70%;
  text-align: center;
  padding-left: 180px;
}

#para2 {
  font-size: 25px;
  width: 70%;
  text-align: center;
  padding-left: 180px;
}

#content {
  background-color: #b0dffa;
  height: 500px;
}
</style>