<template>
    <div class="latest">
        <h1>Latest songs</h1>
        <div class="latest-slideshow uk-position-relative uk-visible-toggle uk-light" uk-slideshow="ratio: 1:1; min-height: 300; max-height: 300;">
            <ul class="uk-slideshow-items">
                <li v-for="(songs, idx) in songs.slice(0, 5)" :key="idx">
                    <img :src="songs.cover" alt="" uk-cover>
                    <div class="uk-position-center uk-panel"><h1 class="slidetext"><router-link :to="{ name: 'play', params: { songid: songs.identifier }}">{{ songs.artist }} - {{ songs.name }}</router-link></h1></div>
                </li>
            </ul>
        <a class="uk-position-center-left uk-position-large" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-large" uk-slidenav-next uk-slideshow-item="next"></a>
        </div>
    </div>
</template>

<script>
import { db } from '@/main.js';

export default {
  name: 'latest',
  data () {
    return {
      songs: []
    }
  },
  firestore () {
    return {
      songs: db.collection('songs').orderBy('createdAt', 'desc')
    }
  }
}
</script>

<style lang="scss">
.latest-slideshow {
    .slidetext a {
        font-size: 60px; 
        font-weight: 500; 
        -webkit-text-stroke: 1px black;
        text-stroke: 1px black;
        text-decoration: none;
    }

    polyline {
        stroke: black !important;
        fill: white;
    }
}
</style>