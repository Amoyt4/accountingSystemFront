<template>
  <nav-bar class="mx-5 rounded-b-xl" />
  <v-container class="d-flex flex-row">
    <v-card
        class="w-50 ma-2 pa-2"
        style="background-color: rgba(33,103,105,2);border: 2px solid navajowhite"
    >
      <v-card-title
          class="d-flex justify-center align-center"
          style="color: navajowhite"
      >
        Conclusion of all contracts for the specified planning period
      </v-card-title>
      <v-card-subtitle>
        <h3 style="color: navajowhite">Choose the period</h3>
      </v-card-subtitle>
      <v-card-text
          class="d-flex flex-row pa-2 ma-2"
          style="color: navajowhite"
      >
        <v-text-field
            v-model="dateFromValue"
            class="ma-2 pa-2"
            variant="outlined"
            type="date"
            placeholder="2023-12-31"
            hide-details
            label="FROM"
        />
        <v-text-field
            v-model="dateToValue"
            class="ma-2 pa-2"
            variant="outlined"
            type="date"
            placeholder="2023-12-31"
            hide-details
            label="TO"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
            class="w-75 pa-2 ma-2"
            size="xl"
            variant="outlined"
            text="SENT"
            style="color: navajowhite"
            @click="sendPeriodData"
        />
      </v-card-actions>
    </v-card>
    <v-card
        class="w-50 ma-2 pa-2"
        style="background-color: rgba(33,103,105,2); border: 2px solid navajowhite"
    >
      <v-card-title style="color: navajowhite">Choose the contract</v-card-title>
      <v-card-subtitle style="color: navajowhite">and I show you all stages</v-card-subtitle>
      <v-card-text class="d-flex justify-center align-center">
        <v-combobox
            v-model="valueOfContract"
            class="ma-2 pa-2"
            style="color: navajowhite"
            hide-details
            variant="outlined"
            label="Choose the contract"
            :items="contractsNames"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
            class="ma-2 pa-2 w-75"
            variant="outlined"
            text="SENT"
            style="color: navajowhite"
            @click="sendContractData"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { useRoomStore } from '@/roomStore/piniaRoomStore';

const store = useRoomStore();

const contractsNames = store.$state.contracts.map((item) => item.name);

const valueOfContract = ref('');
const dateFromValue = ref('');
const dateToValue = ref('');
const errorMessage = ref('');

const sendContractData = async () => {
  try {
    if (!valueOfContract.value) {
      errorMessage.value = 'Please choose a contract.';
      return;
    }

    const response = await axios.post(
        'http://localhost:8888/contract-excel',
        { contractName: valueOfContract.value },
        {
          headers: {
            Authorization: `Bearer ${store.$state.token}`,
          },
          responseType: 'blob'
        }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contract_stages.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while sending contract data:', error);
    errorMessage.value = 'An error occurred while downloading the file.';
  }
};

const sendPeriodData = async () => {
  try {
    if (!dateFromValue.value || !dateToValue.value) {
      errorMessage.value = 'Please select both FROM and TO dates.';
      return;
    }

    const response = await axios.post(
        'http://localhost:8888/data-excel',
        {
          date1: dateFromValue.value,
          date2: dateToValue.value
        },
        {
          headers: {
            Authorization: `Bearer ${store.$state.token}`,
          },
          responseType: 'blob'
        }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contracts.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    dateFromValue.value = '';
    dateToValue.value = '';
  } catch (error) {
    errorMessage.value = 'An error occurred while downloading the file.';
  }
};
</script>