<template>
  <div class="login">
    <navbar></navbar>
    <img id="poolLogo" alt="pool logo" src="../assets/pool-logo-name.png" />
    <h4>Manage your subs, POOL your resources</h4>
    <div id="loginBox">
      <p id="divider" style="">
        <span id="textDivider"><i>Get started here</i></span>
      </p>
      <google-login></google-login>
    </div>

    <p>Pool © 2021</p>
  </div>
</template>

<script>
import GoogleLogin from "./GoogleLogin";
import navbar from "./NavBar";

export default {
  data() {
    return {};
  },
  components: {
    GoogleLogin,
    navbar,
  },
  methods: {},
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
#poolLogo {
  margin-top: 40px;
  width: 28%;
}
.login {
  text-align: center;
}
.loginFields {
  margin: 0 auto;
  width: 80%;
  height: 28px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
  display: block;
  padding: 5px;
  border: 3px solid #ebe6e2;
  transition: all 0.3s ease-out;
}
#loginBox {
  /* Size and position */
  width: 340px;
  margin: 30px auto 30px;
  padding: 15px 5px 30px 5px;
  position: relative;

  /* Styles */
  background: #69bbe9;
  border-radius: 4px;
  color: #7e7975;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0.4);
}

p {
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}

#footer {
  padding-top: 20px;
  margin-top: 20px;
  width: 100vw;
  color: white;
  background-color: #292354;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#divider {
  display: flex;
  flex-direction: row;
  width: 220px;
  margin: 5px auto 0 auto;
}
#divider::before,
#divider::after {
  content: "";
  flex: 1 1;
  border-bottom: 2px solid white;
  margin: auto;
}
#textDivider {
  color: #fff;
  padding: 5px;
  font-size: 1.3em;
  margin: 5px;
}
</style>