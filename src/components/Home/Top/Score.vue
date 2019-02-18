<template>
    <div class="uk-margin-medium" uk-slider="autoplay: true; autoplay-interval: 3500;">
        <div class="uk-position-relative uk-margin-medium-left uk-margin-medium-right">
            <div class="uk-slider-container uk-light">
                <ul class="uk-slider-items uk-grid uk-child-width-auto">
                    <li v-for="(anime, idx) in anime" :key="idx">
                        <router-link :to="{ name: 'anime', params: { animeid: anime.id }}"><img class="uk-height-medium uk-height-large@s" v-lazy="anime.coverImage.extraLarge" :alt="anime.title.romaji"></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'popularity',
  data () {
    return {
        anime: []
    }
  },
  mounted: function() {
    var query = `
    query ($perPage: Int, $sort: [MediaSort]) {
        Page (page: 1, perPage: $perPage) {
            media (sort: $sort, type: ANIME, format: TV) {
                id
                title {
                    romaji
              	    english
                }
                coverImage {
                    extraLarge
                }
    		}
        }
    }`;

    var variables = {
        perPage: 15,
        sort: "SCORE_DESC",
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
        this.anime = data.data.Page.media;
    }).catch((error) => {
        alert('Error. Check console.');
        console.log(error);
    });
}
}
</script>

<style scoped>
img {
    border-radius: 5px;
}

.animetitle {
    font-size: 40px; 
    font-weight: 500 !important; 
    -webkit-text-stroke: 1px black !important;
    text-stroke: 1px black !important;
    text-decoration: none;
}
</style>