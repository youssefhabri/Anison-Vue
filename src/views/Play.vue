<template>
  <div class="play">
    <h1>{{ song[0].artist }} - {{ song[0].name }}</h1>
    <h4 style="margin-top: 0px;"><a :href="'https://anilist.co/anime/' + song[0].anime.id">{{ song[0].anime.title }}</a></h4>
    <center>
    <vue-plyr style="max-width: 50%;" class="uk-margin">
      <div data-plyr-provider="youtube" :data-plyr-embed-id="song[0].youtubeid"></div>
    </vue-plyr>
    <aplayer style="max-width:50%;" ref="aplayer" :audio="song" />
    <button class="uk-button uk-button-primary uk-margin" @click="showCard" v-if="cardShown == false">Show anime info</button>
    <button class="uk-button uk-button-primary uk-margin" @click="showCard" v-if="cardShown == true">Hide anime info</button>
    <div style="bottom: 0; width: 100%;" v-if="cardShown == true" class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s" uk-grid>
        <div class="uk-card-media-left uk-cover-container">
            <img :src="anime.bannerImage" alt="" uk-cover>
            <canvas width="600" height="400"></canvas>
        </div>
        <div>
            <div class="uk-card-body">
                <h3 class="uk-card-title" v-html="anime.title.romaji"></h3>
                <p v-html="anime.description"></p>
                <div class="progress">
                    <progress v-if="anime.averageScore > 75" class="uk-progress uk-text-left uk-progress-success" :value="anime.averageScore" max="100"></progress>
                    <progress v-else-if="anime.averageScore < 65" class="uk-progress uk-text-left uk-progress-danger" :value="anime.averageScore" max="100"></progress>
                    <progress v-else class="uk-progress uk-text-left uk-progress-warning" :value="anime.averageScore" max="100"></progress>
                </div>
            </div>
        </div>
    </div>
    </center>
    <playlist/>
  </div>
</template>

<script>
import Vue from 'vue';
import { db } from '@/main.js';
import APlayer from '@moefe/vue-aplayer';
import playlist from '@/components/Player.vue';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

Vue.use(APlayer, {
  productionTip: false,
});

Vue.use(VuePlyr);

export default {
  name: 'play',
  components: {
    playlist
  },
  data () {
    return {
      song: [],
      anime: [],
      cardShown: false,
      hasPulled: false
    }
  },
  firestore () {
    return {
      song: db.collection('songs').where("identifier", "==", this.$route.query.id)
    }
  },
  methods: {
    getInfo: function() {
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
                bannerImage
            }
        }
        `;

        var variables = {
            id: this.song[0].anime.id
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
        }).catch((error) => {
            alert('Error. Check console.');
            console.log(error);
        });
    },
    showCard: function() {
        if (!this.hasPulled) {
            this.getInfo();
            this.hasPulled = true;
        }
        this.cardShown = !this.cardShown;
    }
  }
}
</script>

<style lang="scss" scoped>
.uk-progress {
  &::-webkit-progress-bar { background-color: grey; };
  &::-moz-progress-bar { background-color: grey; };
}

.uk-progress-success { 
  &::-webkit-progress-value { background-color: #5cb85c; };
  &::-ms-fill { background-color: #5cb85c; };
}

.uk-progress-warning { 
  &::-webkit-progress-value { background-color: #f0ad4e; };
  &::-ms-fill { background-color: #f0ad4e; };
}

.uk-progress-danger { 
  &::-webkit-progress-value { background-color: #d9534f; };
  &::-ms-fill { background-color: #d9534f; };
}
</style>
