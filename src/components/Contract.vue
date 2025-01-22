<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-column pa-1 w-100">
    <v-container class="d-flex justify-center justify-space-between align-center pa-0 mt-3">
      <h2>CONTRACTS</h2>
      <v-btn text="LOAD DATA" variant="outlined" @click="store.loadAllData" />
    </v-container>
    <v-container class="ma-0 pa-0 d-flex flex-column">
      <div class="d-flex">
        <h4 class="ma-2">FILTER BY</h4>
      </div>
      <div class="d-flex flex-row">
        <v-text-field v-model="filterName" variant="outlined" class="ma-2" color="green-accent-4" label="Title" />
        <v-text-field v-model="filterType" variant="outlined" class="ma-2" color="teal" label="Type" />
        <v-text-field v-model="filterPlanedStart" variant="outlined" class="ma-2" color="cyan-darken-1" label="Planed Start" />
        <v-text-field v-model="filterPlanesEnd" variant="outlined" class="ma-2" color="light-blue-darken-2" label="Planed End" />
        <v-text-field v-model="filterFaktStart" variant="outlined" class="ma-2" color="light-blue-darken-4" label="Actual Start" />
        <v-text-field v-model="filterFaktEnd" variant="outlined" class="ma-2" color="deep-purple-darken-4" label="Actual End" />
        <v-text-field v-model="filterAmountFrom" variant="outlined" class="ma-2" color="purple-darken-3" label="Amount From" />
        <v-text-field v-model="filterAmountTo" variant="outlined" class="ma-2" color="purple-accent-3" label="Amount To" />
      </div>
    </v-container>
    <v-container class="w-100 pa-2 ma-2">
      <div class="ma-2 pa-2 d-flex flex-row justify-end align-center">
        <v-btn @click="showAddPage = true" class="pa-2">Add</v-btn>
        <v-dialog v-model="showAddPage" width="1000px">
          <v-card style="background: rgb(0,255,115); background: linear-gradient(90deg, rgba(0,255,115,1) 0%, rgba(10,77,175,1) 48%, rgba(218,0,255,1) 100%);">
            <v-card-title>ADD NEW CONTRACT</v-card-title>
            <v-card-item>
              <v-text-field v-model="addTitle" label="Title" />
              <v-text-field v-model="addType" label="Type" />
              <v-text-field v-model="addPlanedStart" label="PlanedStart" />
              <v-text-field v-model="addPlanedEnd" label="PlanedEnd" />
              <v-text-field v-model="addFactStart" label="FactStart" />
              <v-text-field v-model="addFactEnd" label="FactEnd" />
              <v-text-field v-model="addAmount" label="Amount" />
            </v-card-item>
            <v-card-actions>
              <v-btn @click="onClickCreateContract">ADD</v-btn>
              <v-btn @click="showAddPage = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-card v-if="showEdit" class="ma-2 pa-2" >
        <v-card-title>EDIT CONTRACT</v-card-title>
        <v-card-text>
          <div class="d-flex flex-row">
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractTitle" variant="outlined" label="Title" />
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractType" variant="outlined" label="Type" />
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractAmount" variant="outlined" label="Amount" />
          </div>
          <div class="d-flex flex-row">
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractPlannedStartDate" variant="outlined" label="Planed Start" />
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractPlannedEndDate" variant="outlined" label="Planed End" />
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractActualStartDate" variant="outlined" label="Actual Start" />
            <v-text-field hide-details class="pa-2 ma-1" v-model="editedContractActualEndDate" variant="outlined" label="Actual End" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showEdit = false" variant="outlined" text="CLOSE"/>
          <v-btn @click="confirmEditContract" variant="outlined" text="CONFIRM" />
        </v-card-actions>
      </v-card>
      <Stages v-if="showStage" :selectedContractForStages="selectedContractForStages"  @value-from-child="handleValue"/>
      <SubContract v-if="showSubContract" :selectedContractForSubContract="selectedContractForSubContract" @value-from-sub-contract="handleValueSubContract" />
      <v-card class="w-100 ma-1 d-flex flex-row justify-space-between" v-for="contract in filteredContracts" :key="contract.id">
        <div class="pa-2 ma-2" v-text="contract.name" />
        <div class="pa-2 ma-2" v-text="contract.contractType" />
        <div class="pa-2 ma-2" v-text="contract.plannedStartDate" />
        <div class="pa-2 ma-2" v-text="contract.plannedEndDate" />
        <div class="pa-2 ma-2" v-text="contract.actualStartDate" />
        <div class="pa-2 ma-2" v-text="contract.actualEndDate" />
        <div class="pa-2 ma-2" v-text="contract.amount" />
        <div class="d-flex flex-row align-center">
          <v-btn @click="onClickShowStages(contract.id)" text="Stages" class="ma-1" />
          <v-btn @click="onClickShowContrpatry(contract.id)" text="ContrAgents" class="ma-1" />
          <v-btn @click="onClickShowEditContract(contract.id)">EDIT</v-btn>
          <v-btn @click="onClickDeleteContract(contract.id)">DELETE</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoomStore } from "../roomStore/piniaRoomStore.js";
import Stages from "./Stages.vue";
import SubContract from "./SubContract.vue";
import NavBar from "./NavBar.vue";

const store = useRoomStore();

const showStage = ref(false);
const showSubContract = ref(false);
const showAddPage = ref(false);
const showEdit = ref(false);

const filterName = ref('');
const filterType = ref('');
const filterPlanedStart = ref('');
const filterPlanesEnd = ref('');
const filterFaktStart = ref('');
const filterFaktEnd = ref('');
const filterAmountFrom = ref(null);
const filterAmountTo = ref(null);

const addTitle = ref('');
const addType = ref('');
const addPlanedStart = ref('');
const addPlanedEnd = ref('');
const addFactStart = ref('');
const addFactEnd = ref('');
const addAmount = ref('');

const selectedContractForStages = ref(null);
const selectedContractForSubContract = ref(null);
let selectedContractid = ref(null);

const editedContractTitle = ref('');
const editedContractType = ref('');
const editedContractPlannedStartDate = ref('');
const editedContractPlannedEndDate = ref('');
const editedContractActualStartDate = ref('');
const editedContractActualEndDate = ref('');
const editedContractAmount = ref('');


function onClickShowStages(id) {
  if (showStage.value) {
    showStage.value = false;
  } else {
    selectedContractForStages.value = store.$state.contracts.find((contract) => contract.id === id);
    showStage.value = true;
  }
}

function onClickShowContrpatry(id) {
  if (showSubContract.value) {
    showSubContract.value = false;
  } else {
    selectedContractForSubContract.value = store.$state.contracts.find((contract) => contract.id === id);
    showSubContract.value = true;
  }
}

function onClickShowEditContract(id) {
  showEdit.value = showEdit.value === false;
  const contract = store.$state.contracts.find((item) => item.id === id);
  selectedContractid.value = contract.id
  if (contract) {
    editedContractTitle.value = contract.name;
    editedContractType.value = contract.contractType;
    editedContractPlannedStartDate.value = contract.plannedStartDate;
    editedContractPlannedEndDate.value = contract.plannedEndDate;
    editedContractActualStartDate.value = contract.actualStartDate;
    editedContractActualEndDate.value = contract.actualEndDate;
    editedContractAmount.value = contract.amount;
  }
}


const confirmEditContract = () => {
  const contractToUpdate = store.$state.contracts.find(contract => contract.id === selectedContractid.value)
  if(contractToUpdate) {
    contractToUpdate.name = editedContractTitle.value
    contractToUpdate.contractType = editedContractType.value
    contractToUpdate.plannedStartDate = editedContractPlannedStartDate.value
    contractToUpdate.plannedEndDate = editedContractPlannedEndDate.value
    contractToUpdate.actualStartDate = editedContractActualStartDate.value
    contractToUpdate.actualEndDate = editedContractActualEndDate.value
    contractToUpdate.amount = editedContractAmount.value
    selectedContractid.value = null;
    showEdit.value = false
    editedContractTitle.value = '';
    editedContractType.value = '';
    editedContractPlannedStartDate.value = '';
    editedContractPlannedEndDate.value = '';
    editedContractActualStartDate.value = '';
    editedContractActualEndDate.value = '';
    editedContractAmount.value = '';
  }
}

function onClickDeleteContract(id) {
  const index = store.$state.contracts.findIndex((item) => item.id === id);
  if (index !== -1) {
    store.$state.contracts.splice(index, 1);
  }
}

function onClickCreateContract() {
  store.$state.contracts.push({
    id: store.getCurrentContractId,
    name: addTitle.value,
    contractType: addType.value,
    plannedStartDate: addPlanedStart.value,
    plannedEndDate: addPlanedEnd.value,
    actualStartDate: addFactStart.value,
    actualEndDate: addFactEnd.value,
    amount: addAmount.value,
    stages: [],
    subContracts: [],
  });
  addTitle.value = '';
  addType.value = '';
  addPlanedStart.value = '';
  addPlanedEnd.value = '';
  addFactStart.value = '';
  addFactEnd.value = '';
  addAmount.value = '';
  showAddPage.value = false;
}

const filteredContracts = computed(() => {
  return store.$state.contracts.filter((contract) => {
    const nameMatch = contract.name.toLowerCase().includes(filterName.value.toLowerCase());
    const typeMatch = contract.contractType.toLowerCase().includes(filterType.value.toLowerCase());
    const planedStartMatch = contract.plannedStartDate.toLowerCase().includes(filterPlanedStart.value.toLowerCase());
    const planedEndMatch = contract.plannedEndDate.toLowerCase().includes(filterPlanesEnd.value.toLowerCase());
    const actualStartMatch = contract.actualStartDate.toLowerCase().includes(filterFaktStart.value.toLowerCase());
    const actualEndMatch = contract.actualEndDate.toLowerCase().includes(filterFaktEnd.value.toLowerCase());
    const amountFrom = filterAmountFrom.value ? parseFloat(filterAmountFrom.value) : null;
    const amountTo = filterAmountTo.value ? parseFloat(filterAmountTo.value) : null;
    let amountMatch = true;
    if (amountFrom !== null && amountTo !== null) {
      amountMatch = contract.amount >= amountFrom && contract.amount <= amountTo;
    } else if (amountFrom !== null) {
      amountMatch = contract.amount >= amountFrom;
    } else if (amountTo !== null) {
      amountMatch = contract.amount <= amountTo;
    }
    return nameMatch && typeMatch && planedStartMatch && planedEndMatch && actualStartMatch && actualEndMatch && amountMatch;
  });
});

const handleValue = (value) =>{
  showStage.value = value;
}

const handleValueSubContract = (value) => {
  showSubContract.value = value
}
</script>