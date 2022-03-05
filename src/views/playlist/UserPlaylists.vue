<template>
  <div class="user-playlists">
    <div class="error" v-if="error">{{ error }}</div>
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { error, documents: playlists } = getCollection("playlists", [
      "userid",
      "==",
      user.value.uid,
    ]);
    return { error, playlists };
  },
};
</script>

<style></style>
