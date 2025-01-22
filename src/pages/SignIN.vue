<template>
  <v-card class="w-25 mt-12 flex-column">
    <v-card-title class="ma-2 pa-2 d-flex flex-row justify-space-between">
      <div class="d-flex justify-center align-center">
        SIGN IN
      </div>
      <router-link to="/registration">
        <v-btn text="log in" variant="outlined" color="black" class="ma-2 pa-2"/>
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-text-field
          hide-details
          variant="outlined"
          label="login"
          class="pa-2 ma-2"
          v-model="username"
      />
      <v-text-field
          hide-details
          variant="outlined"
          label="password"
          class="pa-2 ma-2"
          v-model="password"
          type="password"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn text="sign in" @click="signInPost"  color="teal" variant="outlined" class="pa-2"/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoomStore } from "../roomStore/piniaRoomStore.js";
import axios from "axios";

const store = useRoomStore();
const router = useRouter();

let username = ref("");
let password = ref("");

async function signInPost() {
  try {
    const response = await axios.post(`${store.$state.API_BASE_URL}/authenticate`, {
      username: username.value,
      password: password.value,
    });
    store.$state.token = response.data
    console.log(store.$state.token)
    router.push("/Info");
  } catch (error) {
    console.error("Sign in failed:", error.response?.data || error.message);
    alert("Sign in failed. Please check your credentials and try again.");
  }
}
</script>