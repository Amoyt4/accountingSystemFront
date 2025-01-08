<template>
  <v-app-bar
  absolute
  style="background: rgb(0,255,115); background: linear-gradient(90deg, rgba(0,255,115,1) 0%, rgba(10,77,175,1) 48%, rgba(218,0,255,1) 100%);"
  >
    <v-app-bar-title>
      <router-link style="color: black;text-decoration: none;" to="/" ><h2 class="pa-2 ml-0">Accounting System</h2></router-link>
    </v-app-bar-title>
    <router-link style="color: black" to="/contract"><v-app-bar-nav-icon><v-icon size="large">mdi-file-document-edit-outline</v-icon></v-app-bar-nav-icon></router-link>
    <router-link style="color: black" to="/contractor"><v-app-bar-nav-icon><v-icon size="large">mdi-earth</v-icon></v-app-bar-nav-icon></router-link>
    <router-link style="color: black" to="/report"><v-app-bar-nav-icon><v-icon size="large">mdi-microsoft-excel</v-icon></v-app-bar-nav-icon></router-link>
    <router-link style="color: black" to="/contract"><v-app-bar-nav-icon class="mr-7"><v-icon size="large">mdi-information-box-outline</v-icon></v-app-bar-nav-icon></router-link>
  </v-app-bar>
</template>
<script setup>
</script>