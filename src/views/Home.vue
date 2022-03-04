<template>
  <div class="home">
    <div class="error" v-if="error">Could not fetch data</div>
    <div v-if="documents">
      <ListView :playlists="documents"/>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection"
import ListView from '@/components/ListView.vue';
export default {
  components: { ListView },
  setup() {
    const { documents, error } = getCollection('playlists');

    return { error, documents }
  }
}
</script>
