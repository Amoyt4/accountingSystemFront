<template>
  <v-container class="d-flex justify-center mt-10">
    <v-card class="d-flex flex-column w-75 rounded-lg" elevation="6" >
      <v-card-title class="d-flex flex-row justify-center align-center pa-2 ma-2">
        <h1>HOW TO USE THIS WEBSITE???</h1>
      </v-card-title>
      <v-card-subtitle class="d-flex flex-row justify-center align-center">
        <h1>There is the answer :</h1>
      </v-card-subtitle>
      <v-card-text class="d-flex flex-column ma-2 pa-2">
        <div class="d-flex align-center justify-center ma-2 pa-2">
          <h2>The site is created for working with contracts and counterparties, as well as working with their stages and other information related to them</h2>
        </div>
        <h3><v-icon class="ml-16 ma-1 pa-2">mdi-numeric-1-circle-outline</v-icon>Contracts: Contracts table with the ability to filter by entity fields. </h3>
        <h3><v-icon class="ml-16 ma-1 pa-2">mdi-numeric-2-circle-outline</v-icon>Counterparty organizations: Table of organizations with the ability to filter by entity fields.</h3>
        <h3><v-icon class="ml-16 ma-1 pa-2">mdi-numeric-3-circle-outline</v-icon>Reports: Section for generating and viewing reports.</h3>
        <h3><v-icon class="ml-16 ma-1 pa-2">mdi-numeric-4-circle-outline</v-icon>Administration: Section for managing system settings and users.</h3>
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-center align-center pa-2 ma-2 w-100">
        <router-link style="color: black" to="/contract">
          <v-btn variant="outlined"  text="To contracts" class="pa-2 ma-2"/>
        </router-link>
        <router-link style="color: black" to="/contractor">
          <v-btn variant="outlined"  text="To contracts with counterparties" class="pa-2 ma-2"/>
        </router-link>
        <router-link style="color: black" to="/contractor">
          <v-btn variant="outlined" text="To contracts with counterparties" class="pa-2 ma-2"/>
        </router-link>
        <router-link style="color: black" to="/report">
          <v-btn variant="outlined"  text="To report" class="pa-2 ma-2"/>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup>
</script>