<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="playlist">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" :alt="playlist.title" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by: {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>
    <!-- song details -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        <p>No songs in the list</p>
      </div>
      <div v-else>
        <div v-for="song in playlist.songs" :key="song.id" class="single-song">
          <div class="details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <button v-if="ownership" @click="handleDeleteSong(song.id)">
            delete
          </button>
        </div>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import AddSong from "@/components/AddSong.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import getUser from "@/composables/getUser";
export default {
  props: ["id"],
  components: { AddSong },
  setup(props) {
    const { deleteImage } = useStorage();
    const { user } = getUser();
    const router = useRouter();
    const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
    const { error, document: playlist } = getDocument("playlists", props.id);

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userid
      );
    });

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push({ name: "Home" });
    };

    const handleDeleteSong = async (id) => {
      const updatedSongs = playlist.value.songs.filter((song) => {
        return song.id != id;
      });
      await updateDoc({
        songs: updatedSongs,
      });
    };
    return { error, playlist, ownership, handleDelete, handleDeleteSong };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
