<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-row">
    <v-card class="w-50 ma-2 pa-2" style="background-color: rgba(33,103,105,2);border: 2px solid navajowhite">
      <v-card-title class="d-flex justify-center align-center" style="color: navajowhite">
        Conclusion of all contracts for the specified planning period
      </v-card-title>
      <v-card-subtitle><h3 style="color: navajowhite">Choose the period</h3></v-card-subtitle>
      <v-card-text class="d-flex flex-row pa-2 ma-2" style="color: navajowhite">
        <v-text-field
            class="ma-2 pa-2"
            variant="outlined"
            type="date"
            placeholder="2023-12-31"
            hide-details
            label="FROM"
            v-model="dateFromValue"
        />
        <v-text-field
            class="ma-2 pa-2"
            variant="outlined"
            type="date"
            placeholder="2023-12-31"
            hide-details
            label="TO"
            v-model="dateToValue"
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

    <v-card class="w-50 ma-2 pa-2" style="background-color: rgba(33,103,105,2); border: 2px solid navajowhite">
      <v-card-title style="color: navajowhite">Choose the contract</v-card-title>
      <v-card-subtitle style="color: navajowhite">and I show you all stages</v-card-subtitle>
      <v-card-text class="d-flex justify-center align-center">
        <v-combobox
            style="color: navajowhite"
            hide-details
            :items="contractsNames"
            v-model="valueOfContract"
            variant="outlined"
            class="ma-2 pa-2"
            label="Choose the contract"
        />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
            variant="outlined"
            class="ma-2 pa-2 w-75"
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
import NavBar from '../components/NavBar.vue';
import { useRoomStore } from '../roomStore/piniaRoomStore';

// Инициализация Pinia store
const store = useRoomStore();

// Данные из store
const contractsNames = store.$state.contracts.map((item) => item.name);

// Реактивные переменные
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

    // Отправка POST-запроса на сервер
    const response = await axios.post(
        'http://localhost:8888/contract-excel',
        { contractName: valueOfContract.value },
        {
          headers: {
            Authorization: `Bearer ${store.$state.token}`,
          },
          responseType: 'blob' // Указываем, что ожидаем бинарные данные (файл)
        }
    );

    // Создание ссылки для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contract_stages.xlsx'); // Имя файла
    document.body.appendChild(link);
    link.click();

    // Очистка временных объектов
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error while sending contract data:', error);
    errorMessage.value = 'An error occurred while downloading the file.';
  }
};

const sendPeriodData = async () => {
  try {
    // Проверка ввода
    if (!dateFromValue.value || !dateToValue.value) {
      errorMessage.value = 'Please select both FROM and TO dates.';
      return;
    }

    // Отправка POST-запроса на сервер
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
          responseType: 'blob' // Указываем, что ожидаем бинарные данные (файл)
        }
    );

    // Создание ссылки для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contracts.xlsx'); // Имя файла
    document.body.appendChild(link);
    link.click();

    // Очистка временных объектов
    link.remove();
    window.URL.revokeObjectURL(url);

    // Сброс дат
    dateFromValue.value = '';
    dateToValue.value = '';
  } catch (error) {
    console.error('Error while sending period data:', error);
    errorMessage.value = 'An error occurred while downloading the file.';
  }
};
</script>