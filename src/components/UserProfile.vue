<template>
  <div>
    <navbar></navbar>
    <div class="mainContainer">
      <h1>Edit Profile</h1>

      <div id="contact">
        <div id="topContainer">
          <img v-bind:src="profilePhoto" id="profilePic" />
          <h2>{{ userName }}</h2>
          <a class="userDetailText">{{ email }}</a>
        </div>
        <div id="formsContainer">
          <form id="userInfoForm">
            <h3>User Information</h3>
            <fieldset>
              <label>Username:</label>
              <input
                placeholder="Username"
                v-model="userNameUpdated"
                type="text"
                tabindex="1"
                required
                autofocus
              />
            </fieldset>
            <fieldset>
              <label>Profile Photo:</label>
              <input
                placeholder="Photo url"
                v-model="profilePhotoUpdated"
                type="text"
                tabindex="1"
                required
                autofocus
              />
            </fieldset>
            <fieldset>
              <label>Phone number:</label>
              <input
                placeholder="Your phone number"
                v-model="phoneNumber"
                type="tel"
                tabindex="3"
                required
              />
            </fieldset>
            <fieldset>
              <button
                name="update"
                type="button"
                id="updateBtn"
                @click="updateUser"
              >
                Update User
              </button>
            </fieldset>
          </form>
          <div class="vl"></div>
          <form id="cardInfoForm">
            <h3>Card Details</h3>
            <fieldset>
              <label>Card name:</label>
              <input
                placeholder="Your card name"
                v-model="cardName"
                type="text"
                tabindex="3"
                required
              />
            </fieldset>
            <fieldset>
              <label>Card number:</label>
              <input
                placeholder="Your card number"
                v-model="cardNumber"
                type="tel"
                tabindex="3"
                required
              />
            </fieldset>
            <fieldset>
              <label>CVC:</label>
              <input
                placeholder="Your card cvc"
                v-model="cvc"
                type="tel"
                tabindex="3"
                required
              />
            </fieldset>
            <fieldset>
              <button
                name="update"
                type="button"
                id="updateBtn"
                @click="updateCard"
              >
                Update Card Details
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../firebase";
import navbar from "./NavBar";

export default {
  components: {
    navbar,
  },
  data: function () {
    return {
      userName: "",
      userNameUpdated: "",
      profilePhoto: "",
      profilePhotoUpdated: "",
      email: "",
      phoneNumber: "",
      cardName: "",
      cardNumber: "",
      cvc: "",
      creditExist: false,
      creditId: "",
      uid: this.$store.getters.user.data.uid,
    };
  },
  methods: {
    fetchData: function () {
      const userRef = database.firestore().collection("users");
      const cardRef = database.firestore().collection("creditcards");
      userRef
        .doc(this.uid)
        .get()
        .then((doc) => {
          const user = doc.data();
          this.userName = user.name;
          this.userNameUpdated = user.name;
          this.profilePhoto = user.profilePhoto;
          this.profilePhotoUpdated = user.profilePhoto;
          this.email = user.email;
          this.phoneNumber = user.phone;
        })
        .then(() => {
          cardRef
            .where("userID", "==", this.uid)
            .get()
            .then((querySnapShot) => {
              querySnapShot.forEach((doc) => {
                const card = doc.data();
                this.cardName = card.cardName;
                this.cardNumber = card.cardNumber;
                this.cvc = card.cvc;
                this.creditId = doc.id;
                this.creditExist = true;
              });
            });
        });
    },
    updateCard: function () {
      if (this.cardNumber.length != 16) {
        alert("Please input a correct credit card number (16 characters)");
        console.log(this.cardNumber);
        return;
      } else if (this.cvc.length != 3) {
        alert("Please input a correct cvc number (3 characters)");
        return;
      } else if (this.cardName.length < 1) {
        alert("Please input a card name");
        return;
      } else if (!this.checkAllNumbers(this.cardNumber)) {
        alert("Please make sure that card number contains only numbers");
        return;
      } else if (!this.checkAllNumbers(this.cvc)) {
        alert("Please make sure that cvc contains only numbers");
        return;
      }
      console.log("updatecard called");
      if (this.creditExist) {
        const creditcard_ref = database
          .firestore()
          .collection("creditcards")
          .doc(this.creditId);
        creditcard_ref
          .update({
            cardNumber: this.cardNumber,
            cardName: this.cardName,
            cvc: this.cvc,
          })
          .then(() => {
            alert("Credit card updated!");
          });
      } else {
        const creditcard_ref = database.firestore().collection("creditcards");
        creditcard_ref
          .add({
            cardNumber: this.cardNumber,
            cardName: this.cardName,
            cvc: this.cvc,
            userID: this.uid,
          })
          .then(() => {
            alert("Credit card created!");
          });
      }
    },
    updateUser: function () {
      const user_ref = database.firestore().collection("users").doc(this.uid);
      user_ref
        .update({
          name: this.userNameUpdated,
          phone: this.phoneNumber,
          profilePhoto: this.profilePhotoUpdated,
        })
        .then(() => {
          alert("User updated!");
          this.userName = this.userNameUpdated;
          this.profilePhoto = this.profilePhotoUpdated;
        });
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
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1 {
  text-align: center;
  margin-top: 1em;
}

h3 {
  text-align: center;
}

.mainContainer {
  max-width: 50%;
  margin: 1em auto;
  position: relative;
}

#topContainer {
  text-align: center;
}

#formsContainer {
  display: grid;
  grid-template-columns: 10fr 1fr 10fr;
  margin-top: 10px;
}

.vl {
  border-left: 0.1em solid black;

  margin-left: 50%;
}

#profilePic {
  width: 10em;
  height: 10em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.userDetailText {
  color: grey;
  font-size: 1em;
}

#contact {
  background: #f9f9f9;
  border-radius: 1em;
  padding: 25px;
  margin: 2em 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

#contact input[type="text"],
#contact input[type="tel"] {
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  margin: 0 0 5px;
  padding: 10px;
}

#contact input[type="text"]:hover,
#contact input[type="tel"]:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

#contact button[type="button"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43a047;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
}

#contact input:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}
</style>