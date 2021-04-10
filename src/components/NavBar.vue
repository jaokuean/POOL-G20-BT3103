<template>
  <div>
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
          <router-link to="explore"
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
        <ul>
          <img alt="pool logo" src="../assets/pool-logo.png" class="logo" />
          <li>
            <router-link to="explore">Explore</router-link>
          </li>
          <li>
            <router-link to="about-us">About Us</router-link>
          </li>
          <li>
            <router-link to="contact-us">Contact Us</router-link>
          </li>

          <button @click="goLogin" id="loginBtn"><span>Login</span></button>
          <span id="line">|</span>
          <button @click="goRegister"><span>Register</span></button>
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
          this.$router.replace({
            name: "Landing",
          });
        });
    },
    goRegister() {
      this.$router.push("sign-up");
    },
    goLogin() {
      this.$router.push("login");
    },
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 61px;
  background: rgb(244, 245, 245);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
nav ul {
  display: flex;
  margin: 0;
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
  line-height: 60px;
}
nav img {
  height: 60px;
  width: 60px;
  margin: 0px 100px 0 40px;
  float: left;
}
#welcomeUser {
  position: relative;
  margin: 11px 50px 0 10px;
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
  margin: 5px;
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
  margin: 5px 0 5px 10px;
  border: 1px solid lightslategray;
}
#avatarImg:hover {
  border: 1px solid whitesmoke;
  opacity: 0.9;
}
</style>