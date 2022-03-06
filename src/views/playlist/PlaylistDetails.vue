<template>
  <div class="error" v-if="error">{{ error }}</div>
  <h1>Playlist Details</h1>
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
            <p>
              <i>{{ song.artist }}</i>
            </p>
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
  margin-top: 20px;
  display: flex;
  gap: 80px;
  flex-wrap: wrap;
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
  text-align: center;
}
.single-song {
  padding: 10px 0;
  display: flex;
  gap: 600px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .playlist-details {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  h1 {
    text-align: center;
  }
  .single-song {
    display: flex;
    gap: 150px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 100px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 60px;
  }
  .playlist-info p {
    margin-bottom: 0px;
  }
}
</style>
