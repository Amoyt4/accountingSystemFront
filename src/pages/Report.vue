<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-row">
    <v-card class="w-50 ma-2 pa-2">
      <v-card-title class="d-flex justify-center align-center">
        conclusion of all contracts for the specified planning period
      </v-card-title>
      <v-card-subtitle><h3>Choose the period</h3></v-card-subtitle>
      <v-card-text class="d-flex flex-row pa-2 ma-2 ">
        <v-text-field class="ma-2 pa-2 " variant="outlined" hide-details label="FROM"/>
        <v-text-field class="ma-2 pa-2 " variant="outlined" hide-details label="TO"/>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn class="w-75 pa-2 ma-2 " size="xl" variant="outlined" text="SENT" />
      </v-card-actions>
    </v-card>
    <v-card class="w-50 ma-2 pa-2">
      <v-card-title>
        Choose the contract
      </v-card-title>
      <v-card-subtitle>
        and i show you all stages
      </v-card-subtitle>
      <v-card-text class="d-flex justify-center align-center">
        <v-combobox hide-details :items="contractsNames" v-model="valueOfContract" variant="outlined" class="ma-2 pa-2" label="Choose the contract"/>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn variant="outlined" class="ma-2 pa-2  w-75" text="SENT" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import {ref} from "vue";
import NavBar from "../components/NavBar.vue";

let contractsNames = ['хуй']
let valueOfContract = ref();
</script>