<template>
  <div class="login">
    <img id="poolLogo" alt="pool logo" src="../assets/pool-logo-name.png" />
    <h4>Manage your subs, POOL your resources</h4>
    <div id="loginBox">
      <input
        class="loginFields"
        type="text"
        v-model="email"
        placeholder="Email"
      /><br />
      <input
        class="loginFields"
        type="password"
        v-model="password"
        placeholder="Password"
      /><br />
      <input type="checkbox" id="checkbox" @click="remember_me" />
      <span id="rememberMe">Remember Me</span><br />
      <button @click="login"><span>Login</span></button>
      <p id="divider" style="">
        <span id="textDivider">or sign in with</span>
      </p>
      <google-login></google-login>
    </div>

    <p>
      You don't have an account ? You can
      <router-link to="/sign-up">Sign Up now</router-link>
    </p>
  </div>
</template>

<script>
import GoogleLogin from "./GoogleLogin";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    remember_me: function () {
      console.log("Remember me");
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
#poolLogo {
  width: 28%;
}
.login {
  margin-top: 40px;
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
  padding: 38px 5px 30px 5px;
  position: relative;

  /* Styles */
  background: #69bbe9;
  border-radius: 4px;
  color: #7e7975;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0.4);
}

p {
  margin-top: 40px;
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
#rememberMe {
  color: white;
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

button {
  border-radius: 3px;
  background-color: white;
  border: none;
  text-align: center;
  padding: 15px 60px 15px 60px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 15px 0px 5px 0px;
  text-transform: uppercase;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: black;
}

button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 25px;
  font-weight: bold;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>