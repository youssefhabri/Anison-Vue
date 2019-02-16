<template>
  <div class="home">
    <h1>Latest songs</h1>
    <div class="uk-child-width-expand@s uk-grid-small uk-grid-match" uk-grid uk-sortable>
      <div class="uk-card uk-card-default uk-card-body uk-margin uk-card-hover" v-for="(songs, idx) in songs.slice(0, 4)" :key="idx">
        <div class="uk-card-media-top">
          <img :src="songs.cover" alt="">
        </div>
        <h3 class="uk-card-title">{{ songs.name }}</h3>
        <p>{{ songs.artist }}</p>
      </div>
    </div>
    <aplayer ref="aplayer" :audio="songs" fixed :mini="true"/>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Vue from 'vue';
import firebase from 'firebase';
import { db } from '@/main.js';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  productionTip: false,
});

export default {
  name: 'home',
  data () {
    return {
      songs: []
    }
  },
  firestore () {
    return {
      songs: db.collection('songs').orderBy('name')
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
.aplayer .aplayer-list li {
    text-align: left;
}
</style>