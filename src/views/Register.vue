<template>
  <div class="register">
    <h3>Register</h3>
    <form>
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="E-mail" v-model="email">
        </div>
        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="Password" v-model="password">
        </div>
        <div class="uk-margin">
          <button @click="register" class="uk-button uk-button-primary">Register</button>
        </div>
      </fieldset>
    </form>
    <p>or go back to <router-link to="/login">login</router-link>.</p>
    <a @click="facebookLogin" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-facebook fa-3x"></i></a>
    <a @click="githubLogin" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-github fa-3x"></i></a>
    <a @click="googleLogin" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-google fa-3x"></i></a>
    <a @click="twitterLogin" class="uk-icon-button"><i class="fab fa-twitter fa-3x"></i></a>
    <aplayer/>
  </div>
</template>

<script>
import firebase from 'firebase';
import aplayer from '@/components/Player.vue';

export default {
  name: 'register',
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
    register: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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
  .register {
    margin-top: 40px;
  }
  input,
  button {
    width: 25%;
  }
  p {
    margin-top: 5px;
    font-size: 12px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>