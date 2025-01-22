<template>
  <v-card class="w-25 mt-12 flex-column">
    <v-card-title class="ma-2 pa-2 d-flex flex-row justify-space-between align-center">
      <div>
        LOG IN
      </div>
      <router-link to="/">
        <v-btn text="sign in" variant="outlined" color="black" class="ma-2 pa-2" />
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
    <v-card-actions class="d-flex justify-end align-center">
      <v-btn text="log in" variant="outlined" @click="registrationPost" />
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

async function registrationPost() {
  try {
    const response = await axios.post(`${store.$state.API_BASE_URL}/register`, {
      username: username.value,
      password: password.value,
    });

    console.log("Registration successful:", response.data);
    router.push("/");
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    alert("Registration failed. Please try again.");
  }
}
</script>