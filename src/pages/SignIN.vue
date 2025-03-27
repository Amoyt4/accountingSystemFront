<template>
  <v-card
      class="w-25 mt-12 flex-column"
      elevation="20"
      style="background: rgba(33,103,105,2)"
  >
    <v-card-title class="ma-2 pa-2 d-flex flex-row justify-space-between">
      <div
          class="d-flex justify-center align-center"
          style="color: navajowhite; font-size:x-large"
      >
        SIGN IN 
      </div>
      <router-link
          to="/registration"
          style="color: navajowhite"
      >
        <v-btn
            class="ma-2 pa-2"
            text="log in"
            variant="outlined"
        />
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-text-field
          v-model="username"
          class="pa-2 ma-2"
          hide-details
          variant="outlined"
          style="color: navajowhite;"
          label="login"
      />
      <v-text-field
          v-model="password"
          class="pa-2 ma-2"
          hide-details
          variant="outlined"
          style="color: navajowhite;"
          label="password"
          type="password"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
          class="pa-2 ma-3 mt-0"
          text="sign in"
          style="color: navajowhite"
          variant="outlined"
          @click="signInPost"
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

async function signInPost() {
  try {
    const response = await axios.post(`${store.$state.API_BASE_URL}/authenticate`, {
      username: username.value,
      password: password.value,
    });
    store.$state.token = response.data
    console.log(store.$state.token)
    router.replace("/Info");
  } catch (error) {
    alert("Sign in failed. Please check your credentials and try again.");
  }
}
</script>