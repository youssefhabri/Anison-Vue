<template>
  <div class="login">
    <h3>Login</h3>
    <div>
      <fieldset class="uk-fieldset">
        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="E-mail" v-model="email">
        </div>
        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="Password" v-model="password">
        </div>
        <div class="uk-margin">
          <button @click="login" class="uk-button uk-button-primary">Login</button>
        </div>
      </fieldset>
    </div>
    <p>You don't have an account ? You can create one <router-link to="/register">here</router-link></p>
    <a @click="socialLogin('facebook')" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-facebook fa-3x"></i></a>
    <a @click="socialLogin('github')" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-github fa-3x"></i></a>
    <a @click="socialLogin('google')" class="uk-icon-button uk-margin-medium-right"><i class="fab fa-google fa-3x"></i></a>
    <a @click="socialLogin('twitter')" class="uk-icon-button"><i class="fab fa-twitter fa-3x"></i></a>
    <playlist/>
  </div>
</template>

<script>
import firebase from 'firebase';
import playlist from '@/components/Player.vue';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    playlist
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
    socialLogin: function(site) {
      let provider = null;
      if (site == "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      } else if (site == "github") {
        provider = new firebase.auth.GithubAuthProvider();
      } else if (site == "google") {
        provider = new firebase.auth.GoogleAuthProvider();
      } else if (site == "twitter") {
        provider = new firebase.auth.TwitterAuthProvider();
      } else {
        alert('Error.');
      }

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