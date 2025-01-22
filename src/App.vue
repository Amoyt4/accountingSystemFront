<template class="app">
  <v-responsive>
    <v-app>
      <v-main class="d-flex justify-center align-start">
        <router-view/>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import {useRoomStore} from "./roomStore/piniaRoomStore.js";
import NavBar from "./components/NavBar.vue";
import {onMounted} from "vue";
import Registration from "./pages/Registration.vue";

const store = useRoomStore();
// onMounted(() => {
//   store.useOnlyOnes()
// });
</script>
