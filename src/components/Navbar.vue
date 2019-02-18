<template>
    <div>
        <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
            <li class="uk-active"><a href="#">Anison</a></li>
            <li><router-link to="/home">Home</router-link></li>
            </ul>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
            <li><a href="https://github.com/Deterio/Anison-Vue">GitHub</a></li>
            <li><a href="https://discordapp.com/invite/jRNhEQy">Discord</a></li>
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
