<template>
    <div class="uk-margin-medium">
        <h1>Random anime</h1>
        <div class="random-slideshow uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider="ratio: 1:1; clsActivated: uk-transition-active; center: true">
            <ul class="uk-slider-items uk-grid uk-height-medium">
                <li class="uk-width-3-4" v-for="(anime, idx) in anime" :key="idx">
                    <div class="uk-panel">
                        <img v-lazy="anime.bannerImage" :alt="anime.title.romaji">
                        <div class="uk-overlay uk-overlay-primary uk-position-top uk-text-center uk-transition-slide-top">
                            <h3 class="uk-margin-remove"><router-link :to="{ name: 'anime', params: { animeid: anime.id }}">{{anime.title.romaji}}</router-link></h3>
                            <p class="uk-margin-remove" v-html="anime.description"></p>
                        </div>
                    </div>
                </li>
            </ul>
            <a class="uk-position-center-left uk-position-large" uk-slidenav-previous uk-slider-item="previous"></a>
            <a class="uk-position-center-right uk-position-large" uk-slidenav-next uk-slider-item="next"></a>
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
    query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
        Page (page: $page, perPage: $perPage) {
            media (sort: $sort, type: ANIME, format: TV) {
                id
                title {
                    romaji
              	    english
                }
                bannerImage
                description
    		}
        }
    }`;
    var variables = {
        page: Math.floor(Math.random()*50),
        perPage: 5,
        sort: "POPULARITY_DESC",
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
        console.log(error); // eslint-disable-line
    });
}
}
</script>

<style lang="scss">
.random-slideshow {
    .uk-panel {
        background-color: black;
        h3 {
            color: black !important;
        }
        img {
            width: 100%;
        }
    }

    polyline {
        fill: white;
        stroke: black !important;
    }
}
</style>