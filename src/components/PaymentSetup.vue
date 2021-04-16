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
      <button type="submit" @click="addCC()" class="submitBtn">
        <span>Submit</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import firebase from "firebase";
import database from "../firebase";

export default {
  data() {
    return {
      errors: [],
      ccName: "",
      ccNum: "",
      cvc: "",
      isValid: false,
      uid: this.$store.getters.user.data.uid,
    };
  },
  methods: {
    addCC: function () {
      this.checkForm();
      if (this.isValid) {
        const creditcard_ref = database.firestore().collection("creditcards");
        creditcard_ref
          .add({
            cardNumber: this.ccNum,
            cardName: this.ccName,
            cvc: this.cvc,
            userID: this.uid,
          })
          .then(() => {
            alert("Your account has been successfully created.");
            this.$router.push("explore");
          });
      } else {
        return;
      }
    },
    checkForm: function () {
      this.errors = [];
      if (!this.ccName || !this.ccNum || !this.cvc) {
        this.errors.push("Please fill in all required details");
        this.isValid = false;
        return;
      }
      if (this.ccNum.length != 16 || !this.checkAllNumbers(this.ccNum)) {
        this.errors.push(
          "Please input a valid credit card number (16 characters)"
        );
      }
      if (this.cvc.length != 3 || !this.checkAllNumbers(this.cvc)) {
        this.errors.push("Please input a valid cvc number (3 characters)");
      }
      if (this.errors.length == 0) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    checkAllNumbers: function (string) {
      const numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      for (var i = 0; i < string.length; i++) {
        if (numArray.indexOf(string[i]) <= -1) {
          return false;
        }
      }
      return true;
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
ul li {
  display: block;
  text-decoration: none;
  margin-left: -35px;
}
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
  color: black;
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