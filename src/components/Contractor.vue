<template>
  <nav-bar class="mx-5 rounded-b-xl"/>
  <v-container class="d-flex flex-column pa-1 w-100">
    <v-container
        class="w-75 d-flex flex-column justify-space-around pa-2 mt-3 rounded-t-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <h2
          class="d-flex align-center justify-center pa-2"
          style="color: navajowhite"
      >
        COUNTERPARTIES
      </h2>
    </v-container>
    <v-container
        class="w-75 d-flex flex-column justify-space-around rounded-b-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <h3 style="color:navajowhite">FILTER BY: </h3>
      <div class="d-flex  justify-space-around align-center">
        <v-text-field
            v-model="counterPartyNameFilter"
            class="pa-1 ma-1"
            style="color: navajowhite"
            hide-details
            variant="outlined"
            label="Name"
        />
        <v-text-field
            v-model="counterPartyAddressFilter"
            class="pa-1 ma-1"
            style="color: navajowhite"
            hide-details
            variant="outlined"
            label="Address"
        />
        <v-text-field
            v-model="counterPartyInnFilter"
            class="pa-1 ma-1"
            style="color: navajowhite"
            hide-details
            variant="outlined"
            label="INN"
        />
      </div>
    </v-container>
    <v-container
        v-if="onClickShowEdit"
        class="w-75 d-flex flex-column justify-space-around"
    >
      <v-card style="color: navajowhite; background-color: rgba(33,103,105,2); border:1px solid navajowhite">
        <v-card-title class="pa-2 ma-1 d-flex justify-center align-center">EDIT</v-card-title>
        <v-card-text class="d-flex  align-center justify-space-between">
          <v-text-field
              v-model="NameEdit"
              class="ma-2 pa-2"
              variant="outlined"
              label="NAME"
              hide-details
          />
          <v-text-field
              v-model="AddressEdit"
              class="ma-2 pa-2"
              variant="outlined"
              label="ADDRESS"
              hide-details
          />
          <v-text-field
              v-model="InnEdit"
              class="ma-2 pa-2"
              variant="outlined"
              label="INN"
              hide-details
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
              class="pa-2 ma-2"
              variant="outlined"
              text="CANCEL"
              elevation="7"
              @click="onClickShowEdit = false"
          />
          <v-btn
              class="pa-2 ma-2"
              variant="outlined"
              text="CONFIRM"
              elevation="7"
              @click="onClickConfirmEdit"
          />
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container class="w-75 d-flex flex-column justify-space-around">
      <v-dialog
          v-model="onClickShowDialog"
          class="w-75"
      >
        <v-card style="color: navajowhite; background-color: rgba(33,103,105,2);border: 1px solid navajowhite">
          <v-card-title class="d-flex justify-center align-center">ADD NEW COUNTERPARTY</v-card-title>
          <v-card-text class="d-flex  align-center">
            <v-text-field
                v-model="addCounterpartyName"
                class="pa-2 ma-2"
                hide-details
                label="NAME"
                variant="outlined"
            />
            <v-text-field
                v-model="addCounterpartyAddress"
                class="pa-2 ma-2"
                hide-details
                label="ADDRESS"
                variant="outlined"
            />
            <v-text-field
                v-model="addVCounterpartyInn"
                class="pa-2 ma-2"
                hide-details
                label="INN"
                variant="outlined"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
                class="ma-2 pa-2"
                text="CLOSE"
                variant="outlined"
                elevation="7"
                @click="onClickShowDialog = false"
            />
            <v-btn
                class="ma-2 pa-2"
                text="CREATE"
                variant="outlined"
                elevation="7"
                @click="onClickAddCounterparty"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="d-flex align-center">
        <div
            class="w-25 d-flex justify-start align-center pa-2"
            style="color: navajowhite"
        >
          NAME
        </div>
        <div
            class="w-25 d-flex justify-center align-center"
            style="color: navajowhite"
        >
          ADDRESS
        </div>
        <div
            class="w-25 d-flex justify-center align-center"
            style="color: navajowhite"
        >
          INN
        </div>
        <div
            class="w-25 d-flex  justify-end align-center"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2"
              text="ADD"
              variant="outlined"
              @click="onClickShowDialog = true"
          />
        </div>
      </div>
      <div
          v-for="counterparty in filteredCounterparties"
          :key="counterparty.id"
          class="d-flex  mt-1 rounded"
          style="color: navajowhite; background:rgba(33,103,105,2)"
      >
        <div
            class="w-25 d-flex justify-start align-center pa-2"
            style="color: navajowhite"
        >
          {{counterparty.name}}
        </div>
        <div
            class="w-25 d-flex justify-center align-center"
            style="color: navajowhite"
        >
          {{counterparty.address}}
        </div>
        <div
            class="w-25 d-flex justify-center align-center"
            style="color: navajowhite"
        >
          {{counterparty.inn}}
        </div>
        <div
            class="w-25 d-flex  justify-end align-center"
            style="color: navajowhite"
        >
          <v-btn
              class="pa-2 ma-2"
              text="EDIT"
              variant="outlined"
              elevation="7"
              @click="onClickEditCounterparty(counterparty)"
          />
          <WarnBtn
              class="pa-2 ma-2"
              text="DELETE"
              variant="outlined"
              elevation="7"
              :id="counterparty.id"
              @onDelete="onClickDeleteCounterparty"
          />
        </div>
      </div>
    </v-container>
  </v-container>
</template>
<script setup>
import {computed, ref} from "vue";
import {useRoomStore} from "@/roomStore/piniaRoomStore.js";
import NavBar from "@/components/NavBar.vue";
import WarnBtn from "@/components/WarnBtn.vue";

let store = useRoomStore()
let onClickShowDialog = ref(false)
let onClickShowEdit = ref(false)
let currendEditID = ref(-1)

let counterPartyNameFilter = ref()
let counterPartyAddressFilter = ref()
let counterPartyInnFilter = ref()

let addCounterpartyName = ref('')
let addCounterpartyAddress = ref('')
let addVCounterpartyInn = ref('')

let NameEdit = ref('')
let AddressEdit = ref('')
let InnEdit = ref('')

function onClickEditCounterparty(counterparty) {
  currendEditID.value = counterparty.id;
  NameEdit.value = counterparty.name;
  AddressEdit.value = counterparty.address;
  InnEdit.value = counterparty.inn;
  onClickShowEdit.value = true;
}

function onClickConfirmEdit() {
  const index = store.$state.counterparties.findIndex((item) => item.id === currendEditID.value);
  if (index !== -1) {
    store.$state.counterparties[index] = {
      id: currendEditID.value,
      name: NameEdit.value,
      address: AddressEdit.value,
      inn: InnEdit.value,
    };
  }
  onClickShowEdit.value = false;
}

function  onClickAddCounterparty(){
  store.$state.counterparties.push({
    id: store.getCurrentCounterpartiesId,
    name: addCounterpartyName.value,
    address: addCounterpartyAddress.value,
    inn: addVCounterpartyInn.value,
  })
  addCounterpartyName.value = '';
  addCounterpartyAddress.value = '';
  addVCounterpartyInn.value = '';
  onClickShowDialog.value = false;
}

function onClickDeleteCounterparty(id){
  const index = store.$state.counterparties.findIndex((item) => item.id === id);
  if (index !== -1){
    store.$state.counterparties.splice(index,1);
  }
}

const filteredCounterparties = computed(() => {
  return store.$state.counterparties.filter((counterparty) => {
    const nameMatch = !counterPartyNameFilter.value ||
        (counterparty.name && counterparty.name.toLowerCase().includes(counterPartyNameFilter.value.toLowerCase()));
    const addressMatch = !counterPartyAddressFilter.value ||
        (counterparty.address && counterparty.address.toLowerCase().includes(counterPartyAddressFilter.value.toLowerCase()));
    const innMatch = !counterPartyInnFilter.value ||
        (counterparty.inn && counterparty.inn.toLowerCase().includes(counterPartyInnFilter.value.toLowerCase()));
    return nameMatch && addressMatch && innMatch;
  });
});
</script>
