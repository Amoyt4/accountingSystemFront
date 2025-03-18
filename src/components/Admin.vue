<template>
  <nav-bar class="mx-5 rounded-b-xl" />
  <v-container
      class="d-flex flex-column pa-1 w-100"
      style="color: navajowhite"
  >
    <div>
      <h2>My Contracts</h2>
      <pre>{{ allContracts }}</pre>
      <h2>Sub Contracts</h2>
      <pre>{{ allSubContracts }}</pre>
      <h2>Contract Stages</h2>
      <pre>{{ allContractStages }}</pre>
      <h2>Counterparties</h2>
      <pre>{{ allCounterparties }}</pre>
    </div>
  </v-container>
</template>

<script setup>
import { useRoomStore } from '@/roomStore/piniaRoomStore.js'
import NavBar from "@/components/NavBar.vue";

const store = useRoomStore();
let allContracts = store.$state.contracts;
let allSubContracts = store.$state.subContracts;
let allContractStages = store.$state.contractStages;
let allCounterparties = store.$state.counterparties;
</script>