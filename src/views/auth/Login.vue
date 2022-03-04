<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login Form</h3>
    <div v-if="error" class="error">{{ error }}</div>
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
export default {
  setup() {
    const { error, login } = useLogin();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async() => {
      const res = await login(email.value, password.value);
      if(!error.value) {
        console.log("user logged in")
      }
    };
    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
