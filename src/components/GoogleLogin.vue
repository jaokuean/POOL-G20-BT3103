<template>
  <div class="container">
    <button @click="socialLogin" class="googlebtn">
      <img alt="Google Logo" src="../assets/google-logo.png" />
      <span class="googelbtntxt">Log in with Google</span>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import database from "../firebase.js";
export default {
  data() {
    return {};
  },
  methods: {
    socialLogin: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.user);

          database
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .get()
            .then(async (doc) => {
              console.log("Exists: " + doc.exists);
              if (doc.exists) {
                console.log("user exists");
                this.$router.push({ name: "Home" });
              } else {
                console.log("user do not exist");
                this.createAccount(
                  result.user.displayName,
                  result.user.email,
                  result.user.photoURL,
                  result.user.uid
                );
                this.$router.push({ name: "SetPassword" });
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        })
        .catch((err) => {
          alert("error " + err.message);
        });
    },
    createAccount: function (name, email, photoUrl, uid) {
      console.log("Enter create ACCOUNT ");
      console.log("name: " + name);
      console.log("email: " + email);
      console.log("photoUrl: " + photoUrl);
      console.log("uid: " + uid);
      database
        .firestore()
        .collection("users")
        .doc(uid)
        .set({
          defaulyPaymentMethod: "",
          email: email,
          name: name,
          phone: "",
          pools: [],
          profilePhoto: photoUrl,
          pw: "",
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    async checkUser(uid) {
      var exist;
      await database
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then(async (doc) => {
          console.log("Exists?" + doc.exists);
          if (doc.exists) {
            exist = true;
          } else {
            exist = false;
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
      return exist;
    },
  },
};
</script>

<style scoped>
#googelbtntxt {
  display: table-cell;
  vertical-align: middle;
  margin: auto;
}
button img {
  width: 20px;
  height: 20px;
  position: relative;
  margin: 0 10px 0 0;
}
button {
  border-radius: 3px;
  background-color: white;
  border: none;
  text-align: center;
  padding: 0px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 15px 0px 5px 0px;
  width: 68%;
  height: 40px;
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
  padding-right: 15px;
  font-weight: bold;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>