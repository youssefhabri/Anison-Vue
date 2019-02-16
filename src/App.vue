
<template>
  <div id="app">
    <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar="mode: click">
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active"><a href="#">Anison</a></li>
          <li><router-link to="/home">Home</router-link></li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-if="user == null"><router-link to="/login">Login</router-link></li>
          <li v-if="user == null"><router-link to="/register">Register</router-link></li>
          <li v-if="user !== null"><a @click="logout">Log out</a></li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      user: firebase.auth().currentUser
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>
:root {
  background-color: whitesmoke;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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