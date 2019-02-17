<template>
  <div class="play">
    <h1><a style="color: black;" :href="anime.siteUrl">{{ anime.title.romaji }}</a></h1>
    <div>
        <img class="uk-align-left uk-margin-medium-left" :src="anime.coverImage.extraLarge" alt="" style="max-width: 20%; border-radius: 5px;">
        <div class="uk-align-left">
            <h3 style="font-weight: bold;">Songs</h3>
            <h4 style="margin-top: 5px;" v-for="(songs, idx) in songs.slice(0, 5)" :key="idx"><router-link :to="{ name: 'play', params: { songid: songs.identifier }}">{{ songs.artist }} - {{ songs.name }}</router-link></h4>
        </div>
    </div>
    <playlist/>
  </div>
</template>

<script>
import { db } from '@/main.js';
import playlist from '@/components/Player.vue';

export default {
  name: 'play',
  props: [
    'animeid'
  ],
  components: {
    playlist
  },
  data () {
    return {
        songs: [],
        anime: []
    }
  },
  firestore () {
    return {
      songs: db.collection('songs').where("anime.id", "==", this.animeid)
    }
  },
  mounted: function() {
    var query = `
    query ($id: Int) {
        Media (id: $id, type: ANIME) {
            id
            title { romaji english }
            description
            source
            format
            startDate { year month day }
            endDate { year month day }
            season
            episodes
            duration
            meanScore
            averageScore
            genres
            tags { name }
            siteUrl
            coverImage {
                extraLarge
            }
        }
    }
    `;

    var variables = {
        id: this.animeid
    };

    var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
            body: JSON.stringify({
                query: query,
                variables: variables
        })
    };

    fetch(url, options)
    .then((response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }).then((data) => {
        this.anime = data.data.Media;
        console.log(this.songs);
    }).catch((error) => {
        alert('Error. Check console.');
        console.log(error);
    });
}
}
</script>