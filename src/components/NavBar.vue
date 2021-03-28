<template>
  <div>
    <template v-if="user.loggedIn">
      <nav>
        <img alt="pool logo" src="../assets/pool-logo.png" class="logo" />
        <ul>
          <li>
            <router-link to="home">Home</router-link>
          </li>
          <li>
            <router-link to="about-us">About Us</router-link>
          </li>
          <li>
            <router-link to="contact-us">Contact Us</router-link>
          </li>
          <span style="margin: 10px 50px 0 50px">
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
            <router-link to="home">Home</router-link>
          </li>
          <li>
            <router-link to="about-us">About Us</router-link>
          </li>
          <li>
            <router-link to="contact-us">Contact Us</router-link>
          </li>
          <li id="loginBtn">
            <router-link to="login">Login</router-link>
          </li>
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
  },
};
</script>

<style scoped>
nav {
  width: 100%;
  height: 70px;
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
  height: 70px;
}
nav ul li {
  list-style: none;
  margin: auto 0;
}
nav ul li:hover {
  background-color: #69bbe9;
}
nav ul li a {
  display: block;
  color: black;
  padding-left: 25px;
  padding-right: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 75px;
}
.logo {
  max-width: 60%;
  max-height: 8vh;
  margin-left: 50px;
  margin-right: 50px;
  float: left;
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
  font-weight: bold;
  text-transform: uppercase;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
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