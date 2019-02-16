<template>
  <div class="register">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="register">Register</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
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
    }
  }
}
</script>

<style scoped>
  .register {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>