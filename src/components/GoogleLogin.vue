<template>
  <div class="container">
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