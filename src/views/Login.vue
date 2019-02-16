<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Connection</button>
    <p>You don't have an account ? You can <router-link to="/register">create one</router-link></p>
    <hr>
    <h3>Social Login</h3>
    <button @click="googleLogin">Google</button>
    <button @click="facebookLogin">Facebook</button>
    <button @click="twitterLogin">Twitter</button>
    <button @click="githubLogin">GitHub</button>
    <aplayer/>
  </div>
</template>

<script>
import firebase from 'firebase';
import aplayer from '@/components/Player.vue';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    aplayer
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => { // eslint-disable-line
          this.$router.replace('home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      );
    },
    googleLogin: function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => { // eslint-disable-line
        this.$router.replace('home');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    },
    facebookLogin: function() {
      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => { // eslint-disable-line
        this.$router.replace('home');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    },
    twitterLogin: function() {
      const provider = new firebase.auth.TwitterAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => { // eslint-disable-line
        this.$router.replace('home');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    },
    githubLogin: function() {
      const provider = new firebase.auth.GithubAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => { // eslint-disable-line
        this.$router.replace('home');
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>