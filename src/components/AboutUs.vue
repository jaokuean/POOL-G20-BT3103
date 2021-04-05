<template>
  <div class="container">
    <navbar></navbar>
    <p id="header">About Us</p>
    <div id="content">
    <p id="starter">
      Thank you for being with us! Here's a short introduction about what we can provide you with!
    </p>
    <br>
    <p id="para1">
      We provide a web platform that serves as a dashboard to help individuals manage their subscriptions and monthly payments: Pool. Users will pay Pool, and Pool will pay their services. This way, users can keep track of outflows on a consolidated portal.
    </p>
    <br>
    <p id="para2">
      Also, Pool will provide a matching service for users who want to find others who are interested in sharing a group subscription. 
    </p>
    </div>
  </div>
</template>
<script>
import navbar from "./NavBar";
export default {
  components: {
    navbar,
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
  background-color:#b0dffa;
  height: 500px;
}
</style>