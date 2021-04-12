<template>
  <div class="container">
    <navbar></navbar>

    <div id="secDividerTop">
      <img
        alt="pool logo"
        src="../assets/pool-logo-name.png"
        class="logo"
        style="width: 100%; text-align: center"
      />
      <h3>Manage your subs, POOL your resources</h3>
    </div>
    <div id="secDividerBtn">
      <input
        type="text"
        placeholder="Search.."
        style="width: 30%; height: 34px; margin: 20px auto"
        name="search"
      />
      <button
        type="submit"
        style="width: 90px; background-color: #fff; vertical-align: middle"
      >
        <img
          alt="search logo"
          src="../assets/search.png"
          class="logo"
          style="width: 35px; height: 32px; color: white"
        />
      </button>
      <div class="landingContent">
        <div class="contentBox">
          <h3>Trending Searches</h3>
          <div id="subs-list" v-for="card in cardlist" :key="card">
            <ul>
              <li id="cardItems">{{ card.name }}</li>
            </ul>
          </div>
        </div>
        <div class="contentBox">
          <h3>Trending Subs</h3>
          <div id="subs-list" v-for="card in cardlist" :key="card">
            <ul>
              <li id="cardItems">{{ card.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "./NavBar";
export default {
  data() {
    return {
      cardlist: [
        { name: "Service 1 card" },
        { name: "Service 2 card" },
        { name: "Service 3 card" },
        { name: "Service 4 card" },
        { name: "Service 2 card" },
      ],
    };
  },
  components: {
    navbar,
  },
};
</script>

<style>
#secDividerTop {
  background-size: cover;
  background-color: #fff;
  vertical-align: bottom;
}
#secDividerBtn {
  background-size: cover;
  background-color: #69bbe9;
  border-radius: 5px;
}
div.landingContent > div:nth-of-type(odd) {
  background-color: #fff;
  color: black;
}
div.landingContent > div:nth-of-type(even) {
  background-color: #69bbe9;
  color: white;
}
.contentBox h3 {
  text-align: left;
}
.contentBox {
  padding: 25px 25px 75px 25px;
}
#subs-list ul {
  float: left;
  margin: 0;
  padding: 10px;
}
#subs-list ul li {
  display: block;
  list-style: none;
  margin: auto 50px;
}
</style>