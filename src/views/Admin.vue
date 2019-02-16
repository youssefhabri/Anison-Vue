<template>
  <div class="admin">
    <h3>Add new song</h3>
    <div @submit="addSong(name, artist, cover, url, animetitle, animeid)">
      <input class="uk-input uk-form-width-large" v-model="name" placeholder="Song Name"><br>
      <input class="uk-input uk-form-width-large" v-model="artist" placeholder="Song Artist"><br>
      <input class="uk-input uk-form-width-large" v-model="cover" placeholder="Song Cover"><br>
      <input class="uk-input uk-form-width-large" v-model="url" placeholder="Song URL"><br>
      <input class="uk-input uk-form-width-large" v-model="animetitle" placeholder="Anime Title"><br>
      <input class="uk-input uk-form-width-large" v-model="animeid" placeholder="Anime ID"><br>
      <button class="uk-button uk-button-primary uk-margin-small-top" type="submit">Add new song</button>
    </div>
    <aplayer ref="aplayer" :audio="songs" fixed :mini="true"/>
  </div>
</template>

<script>
import Vue from 'vue';
import { db } from '@/main.js';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  productionTip: false,
});

export default {
  name: 'admin',
  data () {
    return {
      songs: [],
      name: '',
      artist: '',
      cover: '',
      url: '',
      animetitle: '',
      animeid: ''
    }
  },
  firestore () {
    return {
      songs: db.collection('songs').orderBy('name')
    }
  },
  methods: {
    addSong (name, artist, cover, url, animetitle, animeid) {
      const createdAt = new Date()
      db.collection('songs').add({
        name,
        artist,
        cover,
        url,
        anime: { title: animetitle, id: animeid },
        createdAt,
        identifier: Math.random().toString(36).substr(2, 10)
      })
    }
  }
}
</script>

<style scoped>
input {
    margin-top: 10px;
}
</style>
