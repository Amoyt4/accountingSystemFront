<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-column pa-1 w-100">
    <div class="ma-2 pa-2">
      <h1>Данные с сервера</h1>
      <v-btn @click="console.log(store.getCurrentContractId )" variant="outlined" >currentContractId</v-btn>
      <v-btn @click="console.log(store.getCurrentContractStagesId )" variant="outlined" >currentContractStagesId </v-btn>
      <v-btn @click="console.log(store.getCurrentCounterpartiesId )" variant="outlined" >currentCounterpartiesId </v-btn>
      <v-btn @click="console.log(store.getCurrentSubContractsId )" variant="outlined" >currentSubContractsId </v-btn>
      <div>
        <h2>My Contracts</h2>
        <pre>{{ Contracts }}</pre>

        <h2>Sub Contracts</h2>
        <pre>{{ subContracts }}</pre>

        <h2>Contract Stages</h2>
        <pre>{{ contractStages }}</pre>

        <h2>Counterparties</h2>
        <pre>{{ counterparties }}</pre>
      </div>

      <v-btn variant="outlined" class="ma-2 pa-2" @click="loadMyContracts">Загрузить My Contracts</v-btn>
      <v-btn variant="outlined" class="ma-2 pa-2" @click="loadSubContracts">Загрузить Sub Contracts</v-btn>
      <v-btn variant="outlined" class="ma-2 pa-2" @click="loadContractStages">Загрузить Contract Stages</v-btn>
      <v-btn variant="outlined" class="ma-2 pa-2" @click="loadCounterparties">Загрузить Counterparties</v-btn>
    </div>
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
import { computed, onMounted } from 'vue';
import { useRoomStore } from '/src/roomStore/piniaRoomStore.js';
import NavBar from "./NavBar.vue";

// Используем хранилище
const store = useRoomStore();

// Получаем данные из хранилища
// const Contracts = computed(() => store.contracts);
// const subContracts = computed(() => store.subContracts);
// const contractStages = computed(() => store.contractStages);
// const counterparties = computed(() => store.counterparties);


// const loadMyContracts = async () => {
//   await store.fetchContracts();
// };
//
// const loadSubContracts = async () => {
//   await store.fetchSubContracts();
// };
//
// const loadContractStages = async () => {
//   await store.fetchContractStages();
// };
//
// const loadCounterparties = async () => {
//   await store.fetchCounterparties();
// };

// Загружаем все данные при монтировании компонента
// onMounted(() => {
//   loadMyContracts();
//   loadSubContracts();
//   loadContractStages();
//   loadCounterparties();
// });
</script>