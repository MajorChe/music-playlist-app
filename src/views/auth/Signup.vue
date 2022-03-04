<template>
<form @submit.prevent="handleSignup">
  <h3>SIGN UP</h3>
  <div v-if="error" class="error">{{ error }}</div>
  <input placeholder="Display Name" type="text" v-model="displayName" required/>
  <input placeholder="Email" type="email" v-model="email" required/>
  <input placeholder="Password" type="password" v-model="password" required/>
  <button v-if="!isPending">Signup</button>
  <button v-if="isPending" disabled>Loading...</button>
</form>
</template>

<script>
import useSignup from "@/composables/useSignup"
import { ref } from 'vue'
export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const displayName = ref('');
    const email = ref('');
    const password = ref('');
    const handleSignup = async() => {
      const res = await signup(email.value, password.value, displayName.value);
      if(!error.value) {
        console.log("user registered")
      }
    }
    return { displayName, email, password, error, isPending, handleSignup }
  }
}
</script>

<style>

</style>