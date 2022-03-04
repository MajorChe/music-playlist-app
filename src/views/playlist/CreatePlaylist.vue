<template>
  <form @submit.prevent="handleCreate">
    <input type="text" v-model="title" placeholder="Title" required />
    <textarea
      v-model="description"
      required
      placeholder="Enter Playlist description..."
    ></textarea>
    <label>Upload playlist image</label>
    <input type="file" accept="image/*" @change="handleFile" />
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Creating...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStoage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router"

export default {
  setup() {
    const { url, filePath, uploadImage } = useStoage();
    const { error, addDoc, isPending } = useCollection("playlists");
    const { user } = getUser();
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const handleCreate = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userid: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({name: 'PlaylistDetails', params: { id: res.id}})
          console.log("playlist added");
        }
        console.log("image uploaded", url.value);
      }
    };
    const handleFile = (e) => {
      const uploadedFile = e.target.files[0];
      if (uploadedFile) {
        file.value = uploadedFile;
      } else {
        file.value = null;
      }
    };
    return { title, description, handleCreate, handleFile, isPending };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
