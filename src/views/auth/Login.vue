<template>
  <form @submit.prevent="handleLogin">
    <h3>LOGIN</h3>
    <div v-if="error" class="error">{{ error }}</div>
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading..</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const { error, login, isPending } = useLogin();
    const email = ref("");
    const password = ref("");
    const handleLogin = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
        console.log("user logged in");
      }
    };
    return { email, password, handleLogin, error, isPending };
  },
};
</script>

<style></style>
