<template>
  <v-btn
      class="pa-2 mr-2"
      elevation="7"
      variant="outlined"
      @click="openDialog = true"
  >
    DELETE
  </v-btn>
  <v-dialog
      v-model="openDialog"
      width="600px"
  >
    <v-card style="color: navajowhite; background-color: rgba(33,103,105,2); border: 2px dashed red">
      <v-card-title class=" flex-row justify-center align-center pa-2 ma-2 ">ARE YOU SURE THAT YOU WANT TO DELETE?</v-card-title>
      <v-card-actions>
        <v-btn
            variant="outlined"
            @click="handleDelete"
        >
          YEP
        </v-btn>
        <v-btn
            variant="outlined"
            @click="openDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";

let openDialog = ref(false)

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  }
});

function handleDelete(){
  props.onDelete(props.id);
  openDialog.value = false;
}
</script>
