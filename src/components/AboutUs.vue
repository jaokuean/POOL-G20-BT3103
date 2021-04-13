<template>
  <div class="container">
    <navbar></navbar>
    <div id="header">
      <img
        alt="pool logo"
        src="../assets/pool-logo-name.png"
        class="logo"
        style="width: 30%; margin-top: 60px"
      />
      <h5>Manage your subs, POOL your resources</h5>
    </div>
    <div id="blurb">
      <p>Subscriptions are everywhere today. We want to help you manage them</p>
      <p>
        Pooled subscriptions help you save time and money, allowing you to
        subscribe to more!
      </p>
      <p>
        Pool streamlines the process of finding, sharing and managing your
        subscriptions, all on one platform!
      </p>
      <p>
        Using Pool, you can manage all your payments, account details and shared
        subscription all on our site.
      </p>
    </div>
    <div id="content">
      <div class="card">
        <p class="card_head">Subscribe With Friends</p>
        <p class="card_content">
          You can create pools for yourself and your friends and family. No more
          awkwardly scrolling through group messages or late night texts to look
          for account login details
        </p>
      </div>
      <div class="card">
        <p class="card_head">Save On Subscriptions</p>
        <p class="card_content">
          The more the merrier! Split the cost with others so you don't need to
          pay as much!
        </p>
      </div>
      <div class="card">
        <p class="card_head">Track your spending</p>
        <p class="card_content">
          Never forget how much you are spending, and what you are spending on.
          No need to dig through account statements to find what you are paying
          for!
        </p>
      </div>
    </div>
    <div id="contact">
      <button onclick="location.href='mailto:bt3103.g20@gmail.com';">
        <span>Email Us</span>
      </button>
    </div>
  </div>
</template>
<script>
import navbar from "./NavBar";
export default {
  components: {
    navbar,
  },
};
</script>
<style scoped>
#header {
  text-align: center;
  font-size: 35px;
}
#logoImg {
  height: 9.5em;
  width: 9.5em;
  display: block;
  border-radius: 25px;
  margin-left: 20px;
  filter: drop-shadow(5px 5px 5px #222);
}
#content {
  height: 350px;
  justify-content: center;
  align-content: center;
  display: flex;
  color: white;
}

.card {
  width: 90%;
  margin: auto;
  text-align: center;
  padding: 0.5em;
  background: #69bbe9;
  border-radius: 20px;
  margin: 20px;
  height: 400px;
}

#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

button {
  border-radius: 3px;
  background-color: #69bbe9;
  border: none;
  color: black;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  text-transform: uppercase;
  text-align: center;
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

#contact {
  justify-content: center;
  text-align: center;
  margin: 100px auto;
}

#blurb {
  justify-content: center;
  text-align: center;
  color: white;
  background: #69bbe9;
  border-radius: 20px;
  padding: 20px;
  width: 95%;
  margin: 0 auto;
}

#blurb > p {
  font-size: 20px;
}

.card_head {
  font-size: 35px;
}

.card_content {
  font-size: 25px;
}
</style>