<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-column pa-1 w-100">
    <v-container class="d-flex justify-center justify-space-between align-center pa-2 mt-3 rounded-t-lg" style="background-color: rgba(33,103,105,2)">
      <h2 style="color: navajowhite">CONTRACTS</h2>
      <v-btn text="LOAD DATA" style="color: navajowhite" variant="outlined" @click="store.loadAllData" />
    </v-container>
    <v-container
        class="ma-0 pa-1 d-flex flex-column rounded-b-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <div class="d-flex">
        <h4 class="ma-2" style="color: navajowhite">FILTER BY</h4>
      </div>
      <div class="d-flex flex-row"
      >
        <v-text-field
            v-model="filterName"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Title"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterType"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Type"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterPlanedStart"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Planed Start"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterPlanesEnd"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Planed End"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterFaktStart"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Actual Start"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterFaktEnd"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Actual End"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterAmountFrom"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Amount From"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterAmountTo"
            hide-details
            variant="outlined"
            class="ma-2"
            label="Amount To"
            style="color: navajowhite"
        />
      </div>
    </v-container>
    <v-container class="w-100 pa-2 ma-2 mt-1">
      <div class="ma-2 mt-0 pa-2 d-flex flex-row justify-end align-center">
        <v-btn
            @click="showAddPage = true"
            class="pa-2"
            variant="outlined"
            text="Add"
            style="color: navajowhite;background-color: rgba(33,103,105,2);"
        />
        <v-dialog v-model="showAddPage" width="1000px">
          <v-card class="pa-2" style="background: rgba(33,103,105,2);">
            <v-card-title style="color: navajowhite">ADD NEW CONTRACT</v-card-title>
            <v-card-item>
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="Title"
                  v-model="addTitle"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="Type"
                  v-model="addType"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="PlanedStart"
                  v-model="addPlanedStart"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="PlanedEnd"
                  v-model="addPlanedEnd"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="FactStart"
                  v-model="addFactStart"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="FactEnd"
                  v-model="addFactEnd"
              />
              <v-text-field
                  variant="outlined"
                  hide-details
                  class="ma-1 pa-2"
                  style="color: navajowhite"
                  label="Amount"
                  v-model="addAmount"
              />
            </v-card-item>
            <v-card-actions class="ma-2">
              <v-btn
                  variant="outlined"
                  style="color: navajowhite "
                  @click="onClickCreateContract"
                  text="ADD"
              />
              <v-btn
                  variant="outlined"
                  style="
                  color: navajowhite "
                  @click="showAddPage = false"
                  text="Cancel"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-card v-if="showEdit" class="ma-2 pa-2" >
        <v-card-title>EDIT CONTRACT</v-card-title>
        <v-card-text>
          <div class="d-flex flex-row">
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractTitle"
                variant="outlined"
                label="Title"
            />
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractType"
                variant="outlined"
                label="Type"
            />
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractAmount"
                variant="outlined"
                label="Amount" />
          </div>
          <div class="d-flex flex-row">

            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractPlannedStartDate"
                variant="outlined"
                label="Planed Start"
            />
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractPlannedEndDate"
                variant="outlined"
                label="Planed End"
            />
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractActualStartDate"
                variant="outlined"
                label="Actual Start"
            />
            <v-text-field
                hide-details
                class="pa-2 ma-1"
                v-model="editedContractActualEndDate"
                variant="outlined"
                label="Actual End"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="showEdit = false"
              variant="outlined"
              text="CLOSE"
          />
          <v-btn
              @click="confirmEditContract"
              variant="outlined"
              text="CONFIRM"
          />

        </v-card-actions>
      </v-card>
      <Stages
          v-if="showStage"
          :selectedContractForStages="selectedContractForStages"
          @value-from-child="handleValue"
      />
      <SubContract
          v-if="showSubContract"
          :selectedContractForSubContract="selectedContractForSubContract"
          @value-from-sub-contract="handleValueSubContract"
      />
      <v-card
          class="w-100 ma-1 d-flex flex-row justify-space-between"
          style="background-color: rgba(33,103,105,2)"
          v-for="contract in filteredContracts"
          :key="contract.id"
      >
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.name"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.contractType"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.plannedStartDate"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.plannedEndDate"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.actualStartDate"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.actualEndDate"/>
        <div style="color: navajowhite" class="pa-2 ma-2" v-text="contract.amount"/>
        <div style="
        color: navajowhite" class="d-flex flex-row align-center justify-space-between">
          <v-btn
              @click="onClickShowStages(contract.id)"
              text="Stages"
              class="ma-1 pa-2"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              variant="outlined"
              elevation="7"
          />
          <v-btn
              @click="onClickShowContrpatry(contract.id)"
              text="ContrAgents"
              class="ma-1 pa-2"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              variant="outlined"
              elevation="7"
          />
          <v-btn
              @click="onClickShowEditContract(contract.id)"
              text="EDIT"
              class="ma-1 pa-2"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              variant="outlined"
              elevation="7"
          />
          <WarnBtn
              :id="contract.id"
              :onDelete="onClickDeleteContract"
              text="DELETE"
              class="ma-1 pa-2"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              variant="outlined"
              elevation="7"
          />
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
import WarnBtn from "./WarnBtn.vue";

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