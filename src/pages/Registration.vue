<template>
  <v-card
      class="w-25 mt-12 flex-column"
      elevation="20"
      style="background: rgba(33,103,105,2)"
  >
    <v-card-title class="ma-2 pa-2 d-flex flex-row justify-space-between align-center">
      <div
          class="d-flex justify-center align-center"
          style="color: navajowhite; font-size:x-large"
      >
        LOG IN
      </div>
      <router-link
          to="/"
          style="color: navajowhite"
      >
        <v-btn
            class="ma-2 pa-2"
            text="sign in"
            variant="outlined"
            color="navajowhite"
        />
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-text-field
          v-model="username"
          class="pa-2 ma-2"
          hide-details
          variant="outlined"
          style="color: navajowhite"
          label="login"
      />
      <v-text-field
          v-model="password"
          class="pa-2 ma-2"
          hide-details
          variant="outlined"
          style="color: navajowhite"
          label="password"
          type="password"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end align-center">
      <v-btn
          class="ma-4 pa-2 mt-0"
          text="log in"
          variant="outlined"
          style="color: navajowhite"
          @click="registrationPost"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useRoomStore } from "@/roomStore/piniaRoomStore.js";

const store = useRoomStore();
const router = useRouter();

let username = ref<string>("");
let password = ref<string>("");

async function registrationPost() {
  try {
    const response = await axios.post(`${store.$state.API_BASE_URL}/register`, {
      username: username.value,
      password: password.value,
    });

    console.log("Registration successful:", response.data);
    router.replace("/");
  } catch (error) {
    alert("Registration failed. Please try again.");
  }
}
</script>