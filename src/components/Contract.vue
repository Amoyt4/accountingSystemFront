<template>
  <nav-bar class="mx-5 rounded-b-xl"/>
  <v-container class="d-flex flex-column pa-1 w-100">
    <v-container
        class="d-flex justify-center justify-space-between align-center pa-2 mt-3 rounded-t-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <h2 style="color: navajowhite">CONTRACTS</h2>
      <v-btn
          text="LOAD DATA"
          style="color: navajowhite"
          variant="outlined"
          @click="store.loadAllData"
      />
    </v-container>
    <v-container
        class="ma-0 pa-1 d-flex flex-column rounded-b-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <div class="d-flex">
        <h4 class="ma-2" style="color: navajowhite">FILTER BY</h4>
      </div>
      <div class="d-flex flex-row">
        <v-text-field
            v-model="filterName"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Title"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterType"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Type"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterPlanedStart"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Planed Start"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterPlanesEnd"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Planed End"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterFaktStart"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Actual Start"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterFaktEnd"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Actual End"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterAmountFrom"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Amount From"
            style="color: navajowhite"
        />
        <v-text-field
            v-model="filterAmountTo"
            class="ma-2"
            hide-details
            variant="outlined"
            label="Amount To"
            style="color: navajowhite"
        />
      </div>
    </v-container>
    <v-container class="w-100 pa-2 ma-2 mt-1">
      <div class="ma-2 mt-0 pa-2 d-flex flex-row justify-end align-center">
        <v-btn
            class="pa-2"
            variant="outlined"
            text="Add"
            style="color: navajowhite; background-color: rgba(33,103,105,2);"
            @click="showAddPage = true"
        />
        <v-dialog
            v-model="showAddPage"
            width="1000px"
        >
          <v-card
              class="pa-2"
              style="background: rgba(33,103,105,2);"
          >
            <v-card-title style="color: navajowhite">ADD NEW CONTRACT</v-card-title>
            <v-card-item>
              <v-text-field
                  v-model="addTitle"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="Title"
              />
              <v-text-field
                  v-model="addType"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="Type"
              />
              <v-text-field
                  v-model="addPlanedStart"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="PlanedStart"
              />
              <v-text-field
                  v-model="addPlanedEnd"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="PlanedEnd"
              />
              <v-text-field
                  v-model="addFactStart"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="FactStart"
              />
              <v-text-field
                  v-model="addFactEnd"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="FactEnd"
              />
              <v-text-field
                  v-model="addAmount"
                  class="ma-1 pa-2"
                  variant="outlined"
                  hide-details
                  style="color: navajowhite"
                  label="Amount"
              />
            </v-card-item>
            <v-card-actions class="ma-2">
              <v-btn
                  variant="outlined"
                  style="color: navajowhite"
                  text="ADD"
                  @click="onClickCreateContract"
              />
              <v-btn
                  variant="outlined"
                  style="color: navajowhite"
                  text="Cancel"
                  @click="showAddPage = false"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-card
          v-if="showEdit"
          class="ma-2 pa-2"
      >
        <v-card-title>EDIT CONTRACT</v-card-title>
        <v-card-text>
          <div class="d-flex flex-row">
            <v-text-field
                v-model="editedContractTitle"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Title"
            />
            <v-text-field
                v-model="editedContractType"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Type"
            />
            <v-text-field
                v-model="editedContractAmount"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Amount" />
          </div>
          <div class="d-flex flex-row">
            <v-text-field
                v-model="editedContractPlannedStartDate"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Planed Start"
            />
            <v-text-field
                v-model="editedContractPlannedEndDate"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Planed End"
            />
            <v-text-field
                v-model="editedContractActualStartDate"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Actual Start"
            />
            <v-text-field
                v-model="editedContractActualEndDate"
                class="pa-2 ma-1"
                hide-details
                variant="outlined"
                label="Actual End"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              variant="outlined"
              text="CLOSE"
              @click="showEdit = false"
          />
          <v-btn
              variant="outlined"
              text="CONFIRM"
              @click="confirmEditContract"
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
          v-for="contract in filteredContracts"
          :key="contract.id"
          class="w-100 ma-1 d-flex flex-row justify-space-between"
          style="background-color: rgba(33,103,105,2)"
      >
        <div
            v-text="contract.name"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.contractType"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.plannedStartDate"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.plannedEndDate"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.actualStartDate"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.actualEndDate"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            v-text="contract.amount"
            class="pa-2 ma-2"
            style="color: navajowhite"
        />
        <div
            class="d-flex flex-row align-center justify-space-between"
            style="color: navajowhite"
        >
          <v-btn
              class="ma-1 pa-2"
              text="Stages"
              variant="outlined"
              elevation="7"
              style="background-color:rgba(33,103,105,2); color: navajowhite;"
              @click="onClickShowStages(contract.id)"
          />
          <v-btn
              class="ma-1 pa-2"
              text="ContrAgents"
              variant="outlined"
              elevation="7"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              @click="onClickShowContrpatry(contract.id)"
          />
          <v-btn
              class="ma-1 pa-2"
              text="EDIT"
              variant="outlined"
              elevation="7"
              style="background-color:rgba(33,103,105,2); color: navajowhite"
              @click="onClickShowEditContract(contract.id)"
          />
          <WarnBtn
              :id="contract.id"
              :onDelete="onClickDeleteContract"
              class="ma-1 pa-2"
              text="DELETE"
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
import { useRoomStore } from "@/roomStore/piniaRoomStore.js";
import Stages from "@/components/Stages.vue";
import SubContract from "@/components/SubContract.vue";
import NavBar from "@/components/NavBar.vue";
import WarnBtn from "@/components/WarnBtn.vue";

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

const onClickShowStages = (id) => {
  if(!showStage.value){
    selectedContractForStages.value = store.$state.contracts.find((contract) => contract.id === id);
  }
  showStage.value = !showStage.value
}

function onClickShowContrpatry(id) {
  if (!showSubContract.value) {
    selectedContractForSubContract.value = store.$state.contracts.find((contract) => contract.id === id);
  } else {
    showSubContract.value = !showSubContract.value;
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
    const nameMatch = contract.name.toLowerCase().includes(filterName.value);
    const typeMatch = contract.contractType.toLowerCase().includes(filterType.value);
    const planedStartMatch = contract.plannedStartDate.toLowerCase().includes(filterPlanedStart.value);
    const planedEndMatch = contract.plannedEndDate.toLowerCase().includes(filterPlanesEnd.value);
    const actualStartMatch = contract.actualStartDate.toLowerCase().includes(filterFaktStart.value);
    const actualEndMatch = contract.actualEndDate.toLowerCase().includes(filterFaktEnd.value);
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

const handleValue = (value) =>  showStage.value = value;

const handleValueSubContract = (value) => showSubContract.value = value;
</script>