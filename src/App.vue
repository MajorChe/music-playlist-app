<template>
  <Navbar />
  <div class="content">
    <router-view />
  </div>
    <div class="footer"><p><b>Created by Charit</b></p></div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: { Navbar },
  setup() {},
};
</script>

<style>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  min-height: 80vh;
}
.footer {
  /* position: fixed; */
  margin-top: 20px;
  bottom: 0;
  width: 100%;
  height: 60px;
  text-align: center;
  background-color: #f3f1f1;
  color: black;
}
.footer p {
  text-align: center;
  padding-top: 20px;
}
</style>
