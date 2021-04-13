<template>
  <div class="container">
    <img id="poolLogo" alt="pool logo" src="../assets/pool-logo-name.png" />
    <h4>Manage your subs, POOL your resources</h4>
    <div id="content">
      <p>You have successfully logout.</p>

      <button @click.prevent="returnHome">
        <span>Return back to home</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    returnHome() {
      this.$router.push("explore");
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
#poolLogo {
  width: 28%;
}
.container {
  margin-top: 40px;
  text-align: center;
}
#content {
  /* Size and position */
  width: 340px;
  margin: 30px auto 30px;
  padding: 38px 5px 30px 5px;
  position: relative;

  /* Styles */
  background: #69bbe9;
  border-radius: 4px;
  color: #7e7975;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2), 0 1px 5px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0.4);
}

p {
  font-size: 13px;
  color: white;
  font-weight: bold;
  margin: 0 0 30px 0;
}

button {
  border-radius: 3px;
  background-color: azure;
  border: none;
  color: black;
  text-align: center;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 0 auto;
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