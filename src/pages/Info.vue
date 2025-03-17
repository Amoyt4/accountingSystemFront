<template>
  <nav-bar class="mx-5 rounded-b-xl"/>
  <v-container class="d-flex justify-center mt-10">
    <v-card
        class="d-flex flex-column w-75 rounded-lg"
        elevation="20"
        style="background: rgba(33,103,105,100);"
    >
      <v-card-title
          class="d-flex flex-row justify-center align-center pa-2 mt-5"
          style="color: navajowhite"
      >
        <h1>HOW TO USE THIS WEBSITE?</h1>
      </v-card-title>
      <v-card-text
          class="d-flex flex-column pa-2 mr-2 ml-2"
          style="color: navajowhite"
      >
        <div class="d-flex align-center justify-center ma-2 pa-2">
          <h2>The site is created for working with contracts and counterparties, as well as working with their stages and other information related to them</h2>
        </div>
        <h3>
          <v-icon class="ml-16 ma-1 pa-2">mdi-numeric-1-circle-outline</v-icon>
          Contracts: Contracts table with the ability to filter by entity fields.
        </h3>
        <h3>
          <v-icon class="ml-16 ma-1 pa-2">mdi-numeric-2-circle-outline</v-icon>
          Counterparty organizations: Table of organizations with the ability to filter by entity fields.
        </h3>
        <h3>
          <v-icon class="ml-16 ma-1 pa-2">mdi-numeric-3-circle-outline</v-icon>
          Reports: Section for generating and viewing reports.
        </h3>
        <h3>
          <v-icon class="ml-16 ma-1 pa-2">mdi-numeric-4-circle-outline</v-icon>
          Administration: Section for managing system settings and users.
        </h3>
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-center align-center pa-2 ma-2 w-100">
        <router-link
            to="/contract"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2 font-weight-bold"
              variant="outlined"
              text="To contracts"
          />
        </router-link>
        <router-link
            to="/contractor"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2 font-weight-bold"
              variant="outlined"
              text="To contracts with counterparties"
          />
        </router-link>
        <router-link
            to="/report"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2 font-weight-bold"
              variant="outlined"
              text="To report"
          />
        </router-link>
        <router-link
            to="/admin"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2 font-weight-bold"
              variant="outlined"
              text="Admin"
          />
        </router-link>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
</script>