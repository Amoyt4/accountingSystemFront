<template class="app">
  <v-responsive>
    <v-app>
      <NavBar class="mr-5 ml-5 rounded-b-xl" />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
