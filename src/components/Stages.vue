<template>
  <v-card>
    <v-card-title>
      {{ selectedContractForStages.name }}
    </v-card-title>
    <v-card-text>
      <v-card v-for="stage in selectedContractForStages.stages" :key="stage.id">
        <v-card-title>
          {{ stage.name }}
        </v-card-title>
        <v-card-text>
          <!-- Дополнительные данные этапа -->
        </v-card-text>
        <v-card-actions>
          <!-- Действия для этапа -->
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
const { selectedContractForStages } = defineProps({
  selectedContractForStages: {
    type: Object,
    required: true
  }
});
</script>