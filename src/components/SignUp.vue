<template>
  <div class="sign-up">
    <img id="poolLogo" alt="pool logo" src="../assets/pool-logo-name.png" />
    <h4>Manage your subs, POOL your resources</h4>
    <div id="loginBox">
      <p id="divider">
        <span id="textDivider"><i>Supported by Google</i></span>
      </p>
      <google-login></google-login>
      <br />
    </div>

    <span id="footerText"
      >Already have an account?
      <router-link to="/login">Sign In here</router-link></span
    >
  </div>
</template>

 <script>
import firebase from "firebase";
import GoogleLogin from "./GoogleLogin.vue";

export default {
  components: { GoogleLogin },
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user);

            this.$router.replace("home");
          },
          (err) => {
            alert("Oops. " + err.message);
          }
        );
    },
  },
};
</script>

 <style scoped>
#poolLogo {
  max-width: 28%;
}
.sign-up {
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
  padding: 1px 5px 8px 5px;
  position: relative;

  /* Styles */
  background: #69bbe9;
  border-radius: 4px;
  color: #7e7975;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0.4);
}
input {
  width: 20%;
  padding: 15px;
}

#footerText {
  display: block;
  margin-top: 20px;
  font-size: 14px;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
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
  padding: 15px 58px 15px 58px;
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