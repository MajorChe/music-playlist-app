<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Home' }"><img src="@/assets/logo.png" /></router-link>
      <h1><router-link :to="{ name: 'Home' }">PlayList-App</router-link></h1>
      <div class="links">
        <div v-if="user" class="right-nav">
          <div class="right-nav-links">
            <router-link class="btn" :to="{ name: 'UserPlaylists' }"
              >My Playlists</router-link
            >
            <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
              >Create Playlist</router-link
            >
          </div>
          <div class="right-nav-buttons">
            <span>Hi, {{ user.displayName }}</span>
            <button @click="handleLogout">Logout</button>
          </div>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();
    const handleLogout = async () => {
      await logout();
      console.log("user Logged out");
      router.push({ name: "Login" });
    };
    return { handleLogout, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 30px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
.right-nav {
  display: flex;
  align-items: center;
}
.right-nav-buttons button {
  margin-top: 0px;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
@media only screen and (max-width: 600px) {
  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .right-nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  nav .links {
    margin-left: 0px;
  }
  .right-nav-links {
    display: flex;
    flex-direction: row;
  }
}
</style>
