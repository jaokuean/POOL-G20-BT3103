<template>
  <div id="container">
    <img
      alt="pool logo"
      src="../assets/pool-logo-name.png"
      style="width: 30%; max-height: 30vh"
    />
    <div id="inputBox">
      <h3>SET PAYMENT METHOD</h3>

      <div id="errorMsg" v-if="errors.length">
        Please correct the following error(s):
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </div>
      <input
        id="ccName"
        type="text"
        maxlength="50"
        v-model.lazy="ccName"
        placeholder="Card Holder Name"
        class="ccFields"
      />
      <br /><br />

      <input
        id="ccNumber"
        type="tel"
        pattern="\d*"
        maxlength="16"
        v-model.lazy="ccNum"
        placeholder="Credit Card Number"
        class="ccFields"
      />

      <input
        id="cvc"
        type="text"
        pattern="\d*"
        v-model.lazy="cvc"
        maxlength="3"
        placeholder="CVC"
        class="ccFields"
      />
      <br /><br />
      <br />
      <router-link to="explore">Skip this step</router-link>
      <br />
      <br />
      <button type="submit" @click="addCC()" class="submitBtn">
        <span>Submit</span>
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
      errors: [],
      isValid: false,
      ccName: null,
      ccNum: null,
      cvc: null,
    };
  },
  methods: {
    addCC: function () {
      if (this.checkForm()) {
        console.log("CCADDED ");
        this.$router.push("explore");
      } else {
        console.log("invalid password");
        return;
      }
    },
    checkForm: function () {
      this.errors = [];
      if (!this.ccName || !this.ccNum || !this.cvc) {
        this.errors.push("Please fill in all details.");
        return false;
      }
      if (this.ccName && this.ccNum && this.cvc) {
        return true;
      }
    },
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
/* "scoped" attribute limit the CSS to this component only */
#container {
  text-align: center;
}
#errorMsg {
  color: #bb4440;
  margin: 10px 25px 10px 25px;
  font-weight: bold;
  text-align: left;
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
.ccFields {
  height: 28px;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
  display: block;
  padding: 5px;
  border: 3px solid #ebe6e2;
  transition: all 0.3s ease-out;
}

#ccName {
  margin: 0 auto;
  width: 80%;
}
#ccNumber {
  width: 54%;
  float: left;
  margin: -20px 10px 10px 26px;
}
#cvc {
  width: 15%;
  float: left;
  margin: -20px 20px 10px 10px;
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
button {
  border-radius: 3px;
  background-color: azure;
  border: none;
  text-align: center;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px 5px 5px 5px;
  text-transform: uppercase;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: #69bbe9;
  font-weight: bold;
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
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>