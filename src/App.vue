
<template>
  <div id="app">
    <navbar/>
  </div>
</template>

<script>
import navbar from '@/components/Navbar';

export default {
  components: {
    navbar
  }
}
</script>

<style lang="scss">
:root {
  background-color: whitesmoke;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>