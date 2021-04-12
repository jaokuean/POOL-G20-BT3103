<template>
  <div id="container">
    <img
      alt="pool logo"
      src="../assets/pool-logo-name.png"
      style="width: 30%; max-height: 30vh"
    />
    <div id="inputBox">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <h3>SET NEW PASSWORD</h3>
      <ul id="passwordHelp">
        Password should contain:
        <br />
        <li :class="has_minimum_lenth ? 'has_required' : ''">
          at least 8 characters
        </li>
        <br />
        <li :class="has_lowercase ? 'has_required' : ''">lowercase letter</li>
        <br />
        <li :class="has_uppercase ? 'has_required' : ''">uppercase letter</li>
        <br />
        <li :class="has_number ? 'has_required' : ''">number</li>
        <br />
        <li :class="has_special ? 'has_required' : ''">special character</li>
      </ul>

      <input
        :type="passwordType"
        class="passwordField"
        v-model="password"
        placeholder="Password"
      />

      <span id="pwdStrengthTxt">Password Strength:</span><br />
      <div id="strength" :class="'level_' + strengthLevel"></div>
      <br />
      <input
        @change="checkPassword"
        :type="passwordType"
        class="passwordField"
        v-model="password2"
        placeholder="Confirm Password"
      /><br />
      {{ this.pwMessage }}
      <br />
      <input type="checkbox" @click="togglePwdVisible()" />
      <span style="color: white">Show/Hide Password</span>
      <br />
      <button type="submit" @click="submitPw()" class="submitBtn">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import firebase from "firebase";

export default {
  data() {
    return {
      error: null,
      password: "",
      password2: "",
      passwordType: "text",
      pwMessage: "",
      isValid: false,
      has_minimum_lenth: false,
      has_number: false,
      has_lowercsae: false,
      has_uppercase: false,
      has_special: false,
    };
  },
  methods: {
    togglePwdVisible: function () {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    checkPassword: function () {
      if (this.password1 === "" || this.password2 === "") {
        this.pwMessage = "Please complete password confirmation";
        this.isValid = false;
      } else if (this.password === this.password2) {
        this.pwMessage = "Password Match";
        this.isValid = true;
        console.log("Match password");
      } else {
        this.pwMessage = "Password Does not Match";
        this.isValid = false;
      }
    },
    submitPw: function () {
      if (this.isValid) {
        console.log("USERDATA: " + this.user.data.uid);
        this.$router.push({ name: "Home" });
      } else {
        this.checkPassword();
        console.log("invalid password");
        return;
      }
    },
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
    scorePassword() {
      let score = 0;
      if (this.password === "") return score;
      let letters = {};
      for (let i = 0; i < this.password.length; i++) {
        letters[this.password[i]] = (letters[this.password[i]] || 0) + 1;
        score += 5.0 / letters[this.password[i]];
      }
      let variations = {
        digits: /\d/.test(this.password),
        lower: /[a-z]/.test(this.password),
        upper: /[A-Z]/.test(this.password),
        special: /\W/.test(this.password),
      };
      let variationsCount = 0;
      for (let check in variations) {
        variationsCount += variations[check] === true ? 1 : 0;
      }
      score += (variationsCount - 1) * 10;
      return parseInt(score);
    },
    strengthLevel() {
      let pass = this.scorePassword;
      if (pass === 0) return 0;
      if (pass < 25) return 1;
      if (pass < 50) return 2;
      if (pass < 75) return 3;
      if (pass >= 75) return 4;
      return 0;
    },
  },
  watch: {
    password() {
      this.has_minimum_lenth = this.password.length > 8;
      this.has_number = /\d/.test(this.password);
      this.has_lowercase = /[a-z]/.test(this.password);
      this.has_uppercase = /[A-Z]/.test(this.password);
      this.has_special = /\W/.test(this.password);
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
#container {
  text-align: center;
}
.login {
  margin-top: 40px;
}
#inputBox h3 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 0px 0px 5px 25px;
  border-bottom: 1px solid #ebe6e2;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  text-align: left;
}
.passwordField {
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
#inputBox {
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

.submitBtn {
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

#strength {
  margin-top: 5px;
  margin-left: 25px;
  display: block;
  height: 10px;
  border-radius: 40px;
  transition: all 0.5s linear;
}
.level_0 {
  background-color: #bb4440;
  width: 5%;
}
.level_1 {
  background-color: #bb4440;
  width: 10%;
}
.level_2 {
  background-color: #e17d30;
  width: 20%;
}
.level_3 {
  background-color: #f0b03f;
  width: 40%;
}
.level_4 {
  background-color: #a5df41;
  width: 60%;
}
.level-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 11;
}
#pwdStrengthTxt {
  color: white;
  float: left;
  margin-top: 5px;
  margin-left: 25px;
  font-size: 0.9em;
}

.has_required {
  text-decoration: line-through;
  color: #689868;
}
#passwordHelp {
  color: white;
  float: left;
  margin: 0 0 40px 0px;
}

#passwordHelp li {
  padding: 0px;
  font-size: 0.8em;
  text-align: left;
  margin: 0px 0px -20px 15px;
}
</style>