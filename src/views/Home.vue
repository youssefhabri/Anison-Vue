<template>
  <div class="home">
    <h1>Latest songs</h1>
    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="ratio: 1:1; min-height: 300; max-height: 300; animation: push">
      <ul class="uk-slideshow-items">
          <li v-for="(songs, idx) in songs.slice(0, 4)" :key="idx">
            <img :src="songs.cover" alt="" uk-cover>
            <div class="uk-position-center uk-panel"><h1 class="slidetext">{{ songs.artist }} - {{ songs.name }}</h1></div>
          </li>
      </ul>
      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>
    <aplayer/>
  </div>
</template>

<script>
import { db } from '@/main.js';
import aplayer from '@/components/Player.vue';

export default {
  name: 'home',
  components: {
    aplayer
  },
  data () {
    return {
      songs: []
    }
  },
  firestore () {
    return {
      songs: db.collection('songs').orderBy('name')
    }
  }
}
</script>

<style >
.slidetext, .slidetext:lang(ja-jp) {
  font-size: 60px; 
  font-weight: 500; 
  -webkit-text-stroke: 1px black;
  text-stroke: 1px black;
}
</style>
