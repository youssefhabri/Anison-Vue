<template>
  <div class="home">
    <latest class="uk-margin uk-margin-left-medium uk-margin-right-medium"/>
    <random class="uk-margin uk-margin-left-medium uk-margin-right-medium"/>
    <playlist/>
  </div>
</template>

<script>
import playlist from '@/components/Player';
import latest from '@/components/Home/Latest';
import random from '@/components/Home/Random';

export default {
  name: 'home',
  components: {
    playlist,
    latest,
    random
  }
}
</script>