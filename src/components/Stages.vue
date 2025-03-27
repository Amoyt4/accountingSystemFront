<template>
  <v-card
      style="border: solid 1px black"
      class="mb-2"
  >
    <div class="d-flex justify-space-between">
      <v-card-title>
        {{selectedContractForStages.name}}
      </v-card-title>
      <v-btn
          class="ma-2 pa-2 mr-3"
          variant="outlined"
          @click="onClickShowAddStage"
      >
        ADD
      </v-btn>
    </div>
    <v-dialog
        v-model="ShowAddStage"
        width="1000px"
    >
      <v-card style="background: rgb(0,255,115); background: linear-gradient(90deg, rgba(0,255,115,1) 0%, rgba(10,77,175,1) 48%, rgba(218,0,255,1) 100%);">
        <v-card-title>EDIT</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-text-field
                v-model="addName"
                class="w-50 pa-2"
                variant="outlined"
                hide-details
                label="Name"
            />
            <v-text-field
                v-model="addAmount"
                class="w-50 pa-2"
                variant="outlined"
                hide-details
                label="Amount"
            />
          </div>
          <div class="d-flex">
            <v-text-field
                v-model="addPlannedStartDate"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="plannedStartDate"
            />
            <v-text-field
                v-model="addPlannedEndDate"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="plannedEndDate"
            />
            <v-text-field
                v-model="addActualStartDate"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="actualStartDate"
            />
            <v-text-field
                v-model="addActualEndDate"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="actualEndDate"
            />
          </div>
          <div class="d-flex">
            <v-text-field
                v-model="addMaterialCostsPlan"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="materialCostsPlan"
            />
            <v-text-field
                v-model="addMaterialCostsActual"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="materialCostsActual"
            />
            <v-text-field
                v-model="addSalaryCostsPlan"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="salaryCostsPlan"
            />
            <v-text-field
                v-model="addSalaryCostsActual"
                class="w-25 pa-2"
                variant="outlined"
                hide-details
                label="salaryCostsActual"
            />
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
              variant="outlined"
              @click="ConfirmCreatingStage"
          >
            CONFIRM
          </v-btn>
          <v-btn
              variant="outlined"
              @click="ShowAddStage = false"
          >
            CANCEL
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
        v-if="ShowEditStage"
        class="ma-2 pa-2"
        style="border: solid 3px blue"
    >
      <v-card-title>EDIT STAGE</v-card-title>
      <v-card-text>
        <div class="d-flex">
          <v-text-field
              v-model="editName"
              class="w-50 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editAmount"
              class="w-50 pa-2"
              variant="outlined"
          />
        </div>
        <div class="d-flex">
          <v-text-field
              v-model="editPlannedStartDate"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editPlannedEndDate"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editActualStartDate"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editActualEndDate"
              class="w-25 pa-2"
              variant="outlined"
          />
        </div>
        <div class="d-flex">
          <v-text-field
              v-model="editMaterialCostsPlan"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editMaterialCostsActual"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editSalaryCostsPlan"
              class="w-25 pa-2"
              variant="outlined"
          />
          <v-text-field
              v-model="editSalaryCostsActual"
              class="w-25 pa-2"
              variant="outlined"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text="CANCEL"
            variant="outlined"
            @click="ShowEditStage = false"
        />
        <v-btn
            text="CONFIRM"
            variant="outlined"
            @click="confirmEditStage"
        />
      </v-card-actions>
    </v-card>
    <v-card-text class="d-flex">
      <v-card
          v-for="stage in filteredStages"
          :key="stage.id"
          class="d-flex flex-column mr-3 pa-1"
      >
        <v-card-title>{{ stage.name }}</v-card-title>
        <v-card-text class="d-flex flex-column ma-1 pa-2">
          <div>Planned date: {{stage.plannedStartDate}} - {{stage.plannedEndDate}}</div>
          <div>Actual date: {{stage.actualStartDate}} - {{stage.actualEndDate}}</div>
          <div>Amount: {{stage.amount}}</div>
          <p>Material:</p>
          <div class="d-flex justify-space-around">
          <div class="d-flex">Plan: {{stage.materialCostsPlan}}</div>
          <div class="d-flex">Actual:{{stage.materialCostsActual}}</div>
          </div>
          <p>Salary:</p>
          <div class="d-flex justify-space-around">
            <div class="d-flex">Plan: {{stage.salaryCostsPlan}}</div>
            <div class="d-flex">Actual: {{stage.salaryCostsActual}}</div>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end align-center">
          <v-btn
              class="ma-0 pa-1"
              variant="outlined"
              @click="onClicksShowEditStage(stage)"
          >
            EDIT
          </v-btn>
          <WarnBtn
              variant="outlined"
              :id="stage.id"
              @onDelete="deleteStage"
          >
            DELETE
          </WarnBtn>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn
          variant="outlined"
          @click="changeShowStage"
      >
        CLOSE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { useRoomStore } from "@/roomStore/piniaRoomStore.js";
import WarnBtn from "@/components/WarnBtn.vue";

const store = useRoomStore();
let ShowAddStage = ref<boolean>(false)
let ShowEditStage = ref<boolean>(false)
let editingId = ref<number>(-1)

let addName = ref<string>('')
let addAmount = ref<string>('')
let addPlannedStartDate = ref<string>('')
let addPlannedEndDate = ref<string>('')
let addActualStartDate = ref<string>('')
let addActualEndDate = ref<string>('')
let addMaterialCostsPlan = ref<string>('')
let addMaterialCostsActual = ref<string>('')
let addSalaryCostsPlan = ref<string>('')
let addSalaryCostsActual = ref<string>('')

let editName = ref<string>('')
let editAmount = ref<string>('')
let editPlannedStartDate = ref<string>('')
let editPlannedEndDate = ref<string>('')
let editActualStartDate = ref<string>('')
let editActualEndDate = ref<string>('')
let editMaterialCostsPlan = ref<string>('')
let editMaterialCostsActual = ref<string>('')
let editSalaryCostsPlan = ref<string>('')
let editSalaryCostsActual = ref<string>('')

const { selectedContractForStages } = defineProps({
  selectedContractForStages: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['value-from-child']);

let contractId = selectedContractForStages.id
const arrayOfStages = selectedContractForStages.stages

const filteredStages = computed(() => {
  return store.$state.contractStages.filter((stage) =>
      arrayOfStages.includes(stage.id)
  );
});

const onClicksShowEditStage = (stage) =>{
  editingId.value = stage.id
  ShowEditStage.value = ShowEditStage.value === false
  editName.value = stage.name
  editAmount.value = stage.amount
  editPlannedStartDate.value = stage.plannedStartDate
  editPlannedEndDate.value = stage.plannedEndDate
  editActualStartDate.value = stage.actualStartDate
  editActualEndDate.value = stage.actualEndDate
  editMaterialCostsPlan.value = stage.materialCostsPlan
  editMaterialCostsActual.value = stage.materialCostsActual
  editSalaryCostsPlan.value = stage.salaryCostsPlan
  editSalaryCostsActual.value = stage.salaryCostsActual
}

const confirmEditStage = () => {
  const stageToUpdate = store.$state.contractStages.find(stage => stage.id === editingId.value);
  if (stageToUpdate) {
    stageToUpdate.name = editName.value;
    stageToUpdate.amount = editAmount.value;
    stageToUpdate.plannedStartDate = editPlannedStartDate.value;
    stageToUpdate.plannedEndDate = editPlannedEndDate.value;
    stageToUpdate.actualStartDate = editActualStartDate.value;
    stageToUpdate.actualEndDate = editActualEndDate.value;
    stageToUpdate.materialCostsPlan = editMaterialCostsPlan.value;
    stageToUpdate.materialCostsActual = editMaterialCostsActual.value;
    stageToUpdate.salaryCostsPlan = editSalaryCostsPlan.value;
    stageToUpdate.salaryCostsActual = editSalaryCostsActual.value;
    editingId.value = null;
    ShowEditStage.value = false;
    editName.value = '';
    editAmount.value = '';
    editPlannedStartDate.value = '';
    editPlannedEndDate.value = '';
    editActualStartDate.value = '';
    editActualEndDate.value = '';
    editMaterialCostsPlan.value = '';
    editMaterialCostsActual.value = '';
    editSalaryCostsPlan.value = '';
    editSalaryCostsActual.value = '';
  }
};

const deleteStage = (id) => {
  const index = store.$state.contractStages.findIndex(item => item.id === id);
  if (index !== -1) {
    store.$state.contractStages.splice(index, 1);
  }
};

const onClickShowAddStage = () => ShowAddStage.value = !ShowAddStage.value

function ConfirmCreatingStage(){
  store.$state.contractStages.push({
    id: store.getCurrentContractStagesId,
    name: addName.value,
    plannedStartDate: addPlannedStartDate.value,
    plannedEndDate: addPlannedEndDate.value,
    actualStartDate: addActualStartDate.value,
    actualEndDate: addActualEndDate.value,
    amount: addAmount.value,
    materialCostsPlan: addMaterialCostsPlan.value,
    materialCostsActual: addMaterialCostsActual.value,
    salaryCostsPlan: addSalaryCostsPlan.value,
    salaryCostsActual: addSalaryCostsActual.value,
  });
  let index = store.$state.contracts.findIndex(item => item.id === contractId);
  store.$state.contracts[index].stages.push(store.$state.currentContractStagesId)
  addName.value = '';
  addAmount.value = '';
  addPlannedStartDate.value = '';
  addPlannedEndDate.value = '';
  addActualStartDate.value = '';
  addActualEndDate.value = '';
  addMaterialCostsPlan.value = '';
  addMaterialCostsActual.value = '';
  addSalaryCostsPlan.value = '';
  addSalaryCostsActual.value = '';
  ShowAddStage.value = false;
}

const changeShowStage = () => {
  emit('value-from-child', false);
};
</script>