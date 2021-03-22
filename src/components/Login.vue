<template>
  <div class="login">
    <img
      alt="pool logo"
      src="../assets/pool-logo-name.png"
      style="width: 30%; max-height: 30vh"
    />
    <h3>Manage your subs, POOL your resources</h3>
    <div id="loginBox">
      <h3>LOGIN or REGISTER</h3>
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
      <span style="color: white">Remember Me</span><br />
      <button @click="login">Login</button>
      <p id="divider" style="width: 220px; margin: auto">
        <span id="textDivider">or sign in with</span>
      </p>

      <button @click="socialLogin" class="googlebtn">
        <img
          alt="Google Logo"
          src="../assets/google-logo.png"
          width="24px"
          height="24px"
        />
        <span class="googelbtntxt">Google</span>
      </button>
    </div>

    <p>
      You don't have an account ? You can
      <router-link to="/sign-up">Sign Up now</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    socialLogin: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.$router.replace("home");
        })
        .catch((err) => {
          alert("error " + err.message);
        });
    },
    remember_me: function () {
      console.log("Remember me");
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin-top: 40px;
}
#loginBox h3 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 0px 0px 5px 25px;
  border-bottom: 1px solid #ebe6e2;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  text-align: left;
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
  padding: 5px;
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

#divider {
  display: flex;
  flex-direction: row;
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
#googelbtntxt {
  display: table-cell;
  vertical-align: middle;
  margin: auto;
}
button {
  width: 50%;
  display: inline-block;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #000;
  background-color: #f4f5f5;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px #c5c5c5;
  margin: 8px 0;
}
</style>