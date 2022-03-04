<template>
  <form @submit.prevent="handleCreate">
    <input type="text" v-model="title" placeholder="Title" required>
    <textarea v-model="description" required placeholder="Enter Playlist description..."></textarea>
    <label>Upload playlist image</label>
    <input type="file" accept="image/*" @change="handleFile">
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useStoage from '@/composables/useStorage';
export default {
  setup() {
    const { url, filePath, uploadImage } = useStoage();
    const title = ref('');
    const description = ref('');
    const file = ref(null)
    const handleCreate = async() => {
      if (file.value) {
        await uploadImage(file.value);
        console.log("image uploaded",url.value)
      }
    }
    const handleFile = (e) => {
      const uploadedFile = e.target.files[0]
      if(uploadedFile) {
        file.value = uploadedFile
      } else {
        file.value = null
      }
    }
    return { title, description, handleCreate, handleFile }
  }
}
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