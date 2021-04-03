<template>
  <div id="app"><SearchPoolPage></SearchPoolPage></div>
</template>
<script>
import SearchPoolPage from './components/SearchPoolPage.vue'

export default {
    components: {SearchPoolPage},
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

