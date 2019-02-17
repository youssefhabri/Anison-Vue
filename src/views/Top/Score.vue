<template>
  <div class="score">
    <div>
        <h3 style="font-weight: bold;">Top Anime by Score</h3>
        <ul class="uk-list uk-list-large uk-list-striped">
            <li v-for="(anime, idx) in anime" :key="idx" style="margin-top: 5px;"><router-link :to="{ name: 'anime', params: { animeid: anime.id }}">{{ anime.title.romaji }}</router-link></li>
        </ul>
    </div>
    <playlist/>
  </div>
</template>

<script>
import playlist from '@/components/Player.vue';

export default {
  name: 'score',
  components: {
    playlist
  },
  data () {
    return {
        anime: []
    }
  },
  mounted: function() {
    var query = `
    query {
        Page (page: 1, perPage: 100) {
            media (sort: SCORE_DESC, type: ANIME) {
                id
                title {
                    romaji
              	    english
                }
    		}
        }
    }`;

    var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
            body: JSON.stringify({
                query: query
        })
    };

    fetch(url, options)
    .then((response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }).then((data) => {
        this.anime = data.data.Page.media;
    }).catch((error) => {
        alert('Error. Check console.');
        console.log(error);
    });
}
}
</script>