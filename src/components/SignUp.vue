<template>
  <div class="sign-up">
    <img
      alt="pool logo"
      src="../assets/pool-logo.png"
      style="max-width: 18%; max-height: 60vh"
    />
    <p>Let's create a new account !</p>
    <div id="loginBox">
      <p>
        <button @click="socialLogin" class="googlebtn">
          <img
            alt="Google Logo"
            src="../assets/google-logo.png"
            width="24px"
            height="24px"
          />
          <span class="googelbtntxt">Google</span>
        </button>
      </p>
      <p id="divider" style="width: 210px; margin: auto">
        <span id="textDivider">or</span>
      </p>
      <p>
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="loginFields"
        /><br />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="loginFields"
        /><br />
        <button @click="signUp">Sign Up</button>
      </p>
    </div>

    <span id="footerText"
      >Already have an account?
      <router-link to="/login">Sign In here</router-link>.</span
    >
  </div>
</template>

 <script>
import firebase from "firebase";
export default {
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
  },
};
</script>

 <style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

#footerText {
  display: block;
  margin-top: 20px;
  font-size: 14px;
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
  padding: 5px;
  font-size: 1.3em;
  margin: 5px;
  color: white;
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
</style>