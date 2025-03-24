<template>
  <v-card
      class="pa-2"
      style="border: solid 2px orangered"
  >
    <v-card-title class="d-flex justify-space-between">
      {{selectedContractForSubContract.name}}
      <v-btn
          class="pa-2"
          variant="outlined"
          text="ADD"
          @click="onClickShowAddSubContract"
      />
    </v-card-title>
    <v-dialog
        v-model="ShowAddSubContract"
        width="1000px"
    >
      <v-card
          class="pa-2"
          style="background: rgb(0,255,115); background: linear-gradient(90deg, rgba(0,255,115,1) 0%, rgba(10,77,175,1) 48%, rgba(218,0,255,1) 100%);"
      >
        <v-card-title>ADD subContract</v-card-title>
        <v-card-text>
          <div class="d-flex ">
            <v-text-field
                v-model="addName"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="Name"
            />
            <v-text-field
                v-model="addContractType"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="Type"
            />
            <v-text-field
                v-model="addAmount"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="Amount"
            />
          </div>
          <div class="d-flex">
            <v-text-field
                v-model="addPlannedStartDate"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="PlannedStart"
            />
            <v-text-field
                v-model="addPlannedEndDate"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="PlannedEnd"
            />
            <v-text-field
                v-model="addActualStartDate"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="ActualStart"
            />
            <v-text-field
                v-model="addActualEndDate"
                class="pa-2 ma-2"
                hide-details
                variant="outlined"
                label="ActualEnd"
            />
          </div>
          <v-combobox
              v-model="comboboxValue"
              class="pa-2 ma-2"
              clearable
              label="Choose which counterparties"
              variant="outlined"
              :items="counterpartiesNames"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
              variant="outlined"
              text="CANCEL"
              @click="ShowAddSubContract = false"
          />
          <v-btn
              variant="outlined"
              text="CONFIRM"
              @click="createSubContract"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
        v-if="ShowEditSubContract"
        class="ma-2 pa-2"
    >
      <v-card-title>EDIT</v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-text-field
              v-model="editName"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="Name"
          />
          <v-text-field
              v-model="editContractType"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="ContractType"
          />
          <v-text-field
              v-model="editAmount"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="Amount"
          />
        </div>
        <div class="d-flex">
          <v-text-field
              v-model="editPlannedStartDate"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="Planned Start"
          />
          <v-text-field
              v-model="editPlannedEndDate"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="Planned End"
          />
          <v-text-field
              v-model="editActualStartDate"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="ActualStart"
          />
          <v-text-field
              v-model="editActualEndDate"
              class="pa-2 ma-2"
              hide-details
              variant="outlined"
              label="ActualEnd"
          />
        </div>
        <v-combobox
            v-model="changeCounterparty"
            class="pa-2 ma-2"
            variant="outlined"
            label="Counterparty"
            :items="counterpartiesNames"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
            variant="outlined"
            text="CLOSE"
            @click="ShowEditSubContract = false"
        />
        <v-btn
            variant="outlined"
            text="CONFIRM"
            @click="ConfirmEditSubContract"
        />
      </v-card-actions>
    </v-card>
    <v-card-text class="d-flex">
      <v-card
          v-for="subContract in filteredSubContract"
          :key="subContract.id"
          class="d-flex flex-column mr-3 pa-1"
      >
        <v-card-title>{{subContract.name}}</v-card-title>
        <v-card-subtitle>{{subContract.contractType}}</v-card-subtitle>
        <v-card-text class="d-flex flex-column ma-1 pa-2">
          <div>Amount: {{subContract.amount}}</div>
          Planned date:
          <div class="d-flex">
            <div>{{subContract.plannedStartDate  }} - {{subContract.plannedEndDate}}</div>
          </div>
          Actual date:
          <div class="d-flex">
            <div>{{subContract.actualStartDate}} - {{subContract.actualEndDate}}</div>
          </div>
          <div>counterpartyId: {{subContract.counterpartyId}}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              variant="outlined"
              text="EDIT"
              @click="onClickShowEditSubContract(subContract)"
          />
          <WarnBtn
              variant="outlined"
              text="DELETE"
              :id="subContract.id"
              @onDelete="deleteSubContract"
          />
        </v-card-actions>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn
          text="CLOSE"
          variant="outlined"
          @click="changeShowStage"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {computed, ref} from "vue";
import { useRoomStore } from "@/roomStore/piniaRoomStore.js";
import WarnBtn from "@/components/WarnBtn.vue";

const store = useRoomStore();

const { selectedContractForSubContract } = defineProps({
  selectedContractForSubContract: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['value-from-sub-contract']);

let editingSubContractId = ref(-1)
let ShowAddSubContract = ref(false)
let comboboxValue = ref()
let addName = ref()
let addContractType = ref()
let addAmount = ref()
let addPlannedStartDate = ref()
let addPlannedEndDate = ref()
let addActualStartDate = ref()
let addActualEndDate = ref()

let editName = ref()
let editContractType = ref()
let editAmount = ref()
let editPlannedStartDate = ref()
let editPlannedEndDate = ref()
let editActualStartDate = ref()
let editActualEndDate = ref()
let changeCounterparty = ref()
let arrayOfSubContract = ref([])

let ShowEditSubContract = ref(false)

const counterpartiesNames = store.$state.counterparties.map(counterparty => counterparty.name);

let contractId = selectedContractForSubContract.id
arrayOfSubContract.value = selectedContractForSubContract.subContracts

const filteredSubContract = computed(() => {
  if (!Array.isArray(arrayOfSubContract.value)) {
    return [];
  }
  return store.$state.subContracts.filter((subContract) =>
      arrayOfSubContract.value.includes(subContract.id)
  );
});

const onClickShowAddSubContract = () =>{
  ShowAddSubContract.value = ShowAddSubContract.value === false
}

function createSubContract() {
  if (!selectedContractForSubContract) {
    return;
  }

let num = findIdByName(comboboxValue.value);
  store.$state.subContracts.push({
    id: store.getCurrentSubContractsId,
    name: addName.value,
    contractType: addContractType.value,
    amount: addAmount.value,
    plannedStartDate: addPlannedStartDate.value,
    plannedEndDate: addPlannedEndDate.value,
    actualStartDate: addActualStartDate.value,
    actualEndDate: addActualEndDate.value,
    counterpartyId: num,
  });
  let index = store.$state.contracts.findIndex(item => item.id === contractId);
  if (index !== -1) {
    store.$state.contracts[index].subContracts.push(store.$state.currentSubContractsId);
  }
  addName.value = '';
  addContractType.value = '';
  addPlannedStartDate.value = '';
  addPlannedEndDate.value = '';
  addActualStartDate.value = '';
  addActualEndDate.value = '';
  addAmount.value = '';
  comboboxValue.value = '';
  ShowAddSubContract.value = false;
}

const findNameById = (id) => {
  const counterparty = store.$state.counterparties.find(item => item.id === id);
  return counterparty ? counterparty.name : null;
};

const findIdByName = (name) => {
  const counterparty = store.$state.counterparties.find(item => item.name === name);
  return counterparty ? counterparty.id : null;
};

const onClickShowEditSubContract = (subContract) => {
  ShowEditSubContract.value = ShowEditSubContract.value === false
  editingSubContractId.value  = subContract.id
  editName.value = subContract.name
  editContractType.value = subContract.contractType
  editAmount.value = subContract.amount
  editPlannedStartDate.value = subContract.plannedStartDate
  editPlannedEndDate.value = subContract.plannedEndDate
  editActualStartDate.value = subContract.actualStartDate
  editActualEndDate.value = subContract.actualEndDate
  changeCounterparty.value = findNameById(subContract.id)
}

const ConfirmEditSubContract = () => {
  const subContractToUpdate = store.$state.subContracts.find(stage => stage.id === editingSubContractId.value);

  if (subContractToUpdate) {
    subContractToUpdate.name = editName.value;
    subContractToUpdate.amount = editAmount.value;
    subContractToUpdate.contractType = editContractType.value;
    subContractToUpdate.plannedStartDate = editPlannedStartDate.value;
    subContractToUpdate.plannedEndDate = editPlannedEndDate.value;
    subContractToUpdate.actualStartDate = editActualStartDate.value;
    subContractToUpdate.actualEndDate = editActualEndDate.value;
    subContractToUpdate.counterpartyId = findIdByName(changeCounterparty.value);
    editingSubContractId.value = null;
    ShowEditSubContract.value = false;
    editName.value = '';
    editAmount.value = '';
    editContractType.value = '';
    editPlannedStartDate.value = '';
    editPlannedEndDate.value = '';
    editActualStartDate.value = '';
    editActualEndDate.value = '';
  }
}

const deleteSubContract = (id) =>{
  const index = store.$state.subContracts.findIndex(item => item.id === id);
  if(index !== -1){
    store.$state.subContracts.splice(index,1);
  }
}

const changeShowStage = () => emit('value-from-sub-contract', false);

</script>
