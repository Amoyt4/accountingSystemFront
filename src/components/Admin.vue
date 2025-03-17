<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-column pa-1 w-100" style="color: navajowhite">
    <div>
      <h2>My Contracts</h2>
      <pre>{{ store.$state.contracts }}</pre>
      <h2>Sub Contracts</h2>
      <pre>{{ store.$state.subContracts }}</pre>
      <h2>Contract Stages</h2>
      <pre>{{ store.$state.contractStages }}</pre>
      <h2>Counterparties</h2>
      <pre>{{ store.$state.counterparties }}</pre>
    </div>
  </v-container>
</template>

<script setup>
import { useRoomStore } from '/src/roomStore/piniaRoomStore.js';
import NavBar from "./NavBar.vue";
const store = useRoomStore();
</script>