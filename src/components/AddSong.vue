<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <div class="add-song-header">
        <h4>Add a new song</h4>
        <span class="material-icons" @click="showForm = false"> close </span>
      </div>
      <input type="text" placeholder="Song title" v-model="title" required />
      <input type="text" placeholder="Artist" v-model="artist" required />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "@/composables/useDocument";
export default {
  props: ["playlist"],
  setup(props) {
    const { updateDoc } = useDocument("playlists", props.playlist.id);
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 100000000),
      };
      showForm.value = false;
      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });
      title.value = "";
      artist.value = "";
    };
    return { title, artist, showForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
.add-song-header {
  display: flex;
  justify-content: space-between;
}
.add-song-header span {
  cursor: pointer;
}
form {
  max-width: 100%;
  text-align: left;
}
button {
  margin-right: 10px;
}
@media only screen and (max-width: 600px) {
  .add-song {
    margin-top: 0px;
  }
}
</style>
