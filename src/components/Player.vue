<template>
    <aplayer ref="aplayer" :audio="songs" fixed :mini="true"/>
</template>

<script>
import Vue from 'vue';
import { db } from '@/main.js';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  productionTip: false,
});

export default {
  name: 'player',
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

<style>
.aplayer .aplayer-list li {
    text-align: left;
}
</style>
