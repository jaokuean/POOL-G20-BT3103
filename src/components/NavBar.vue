<template>
  <div id="container">
    <template v-if="user.loggedIn">
      <nav>
        <img alt="pool logo" src="../assets/pool-logo.png" class="logo" />
        <ul>
          <li>
            <router-link to="home">Dashboard</router-link>
          </li>
          <li>
            <router-link to="about-us">About Us</router-link>
          </li>
          <li>
            <router-link to="explore">Explore</router-link>
          </li>
          <router-link to="user-profile"
            ><img
              id="avatarImg"
              alt="photoURL"
              v-bind:src="user.data.photoUrl"
              class="logo"
          /></router-link>
          <span id="welcomeUser">
            Welcome,<br />
            {{ user.data.displayName }}
          </span>

          <button @click.prevent="signOut"><span>Logout</span></button>
        </ul>
      </nav>
    </template>
    <template v-else>
      <nav>
        <img alt="pool logo" src="../assets/pool-logo.png" class="logo" />
        <ul>
          <li>
            <router-link to="explore">Explore</router-link>
          </li>
          <li>
            <router-link to="about-us">About Us</router-link>
          </li>
          <li>
            <router-link to="contact-us">Contact Us</router-link>
          </li>
          <button @click="goLogin" id="loginBtn">
            <span>Get Started</span>
          </button>
        </ul>
      </nav>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("logout");
        })
        .catch((error) => {
          console.log("Logout error: " + error);
        });
    },
    goLogin() {
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
#container {
  padding: 0;
  margin: 0;
  width: 100%;
}
nav {
  width: 100%;
  height: 75px;
  background: rgb(244, 245, 245);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  -webkit-animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  animation: 0.95s ease-in-out 0s normal none 1 running fadeInDown;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
}
nav ul {
  display: flex;
  margin: 4px 0 0 100px;
  float: left;
}
nav ul li {
  list-style: none;
  margin: auto 0;
}
nav ul li:hover {
  background-color: #69bbe9;
  border-radius: 2px;
}
nav ul li a:hover {
  color: azure;
  font-weight: bold;
}
nav ul li a {
  display: block;
  color: black;
  padding-left: 20px;
  padding-right: 20px;
  width: 105px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 65px;
  margin: 5px 0 0 0;
}
.logo {
  height: 75px;
  width: 75px;
  float: left;
  margin-left: 20px;
}
#welcomeUser {
  position: relative;
  margin: 18px 5px 0 15px;
}
button {
  border-radius: 3px;
  background-color: #69bbe9;
  border: none;
  color: black;
  text-align: center;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px 5px 5px 45px;
  text-transform: uppercase;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: azure;
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
#line {
  position: relative;
  margin: 11px 5px 0 5px;
  font-size: 1.8em;
}
#avatarImg {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0;
  margin: 10px 0 5px 5px;
  border: 1px solid lightslategray;
}
#avatarImg:hover {
  border: 1px solid whitesmoke;
  opacity: 0.9;
}
</style>