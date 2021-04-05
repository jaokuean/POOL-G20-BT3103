<template>
  <div class="container">
    <navbar></navbar>
    <p id="header">Contact Us</p>
    <br>
    <div id="content">
    <p id="starter">
      Thank you for being with us! If you have any trouble using our platform, please contact us through the following e-mail:
    </p>
    <br>
    <p id="para1">
      bt3103.g20@gmail.com
    </p>
    <br>
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
  padding-top: 50px;
}

#para1 {
  font-size: 45px;
  width: 70%;
  text-align: center;
  padding-left: 180px;
  color:white;
}

#content {
  background-color:#83d0fd;
  height: 350px;
}
</style>