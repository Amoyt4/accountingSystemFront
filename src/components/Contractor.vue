<template>
  <NavBar class="mr-5 ml-5 rounded-b-xl" />
  <v-container class="d-flex flex-column pa-1 w-100">
    <v-container
        class="w-75 d-flex flex-column justify-space-around pa-2 mt-3 rounded-t-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <h2
          class="d-flex align-center justify-center pa-2"
          style="color: navajowhite"
      >COUNTERPARTIES
      </h2>
    </v-container>
    <v-container
        class="w-75 d-flex flex-column justify-space-around rounded-b-lg"
        style="background-color: rgba(33,103,105,2)"
    >
      <h3 style="color: navajowhite">FILTER BY: </h3>
      <div class=" d-flex flex-row justify-space-around align-center">
        <v-text-field
            style="color: navajowhite"
            hide-details
            variant="outlined"
            class="pa-1 ma-1"
            v-model="counterPartyNameFilter"
            label="Name"
        />
        <v-text-field
            style="color: navajowhite"
            hide-details
            variant="outlined"
            class="pa-1 ma-1"
            v-model="counterPartyAddressFilter"
            label="Address"
        />
        <v-text-field
            style="color: navajowhite"
            hide-details
            variant="outlined"
            class="pa-1 ma-1"
            v-model="counterPartyInnFilter"
            label="INN"
        />
      </div>
    </v-container>
    <v-container
        v-if="onClickShowEdit"
        class="w-75 d-flex flex-column justify-space-around"
    >
      <v-card style="color: navajowhite; background-color: rgba(33,103,105,2); border:1px solid navajowhite">
        <v-card-title
            class="pa-2 ma-1 d-flex justify-center align-center"
        >EDIT
        </v-card-title>
        <v-card-text class="d-flex flex-row align-center justify-space-between">
          <v-text-field
              variant="outlined"
              label="NAME"
              class="ma-2 pa-2"
              hide-details
              v-model="NameEdit"
          />
          <v-text-field
              variant="outlined"
              label="ADDRESS"
              class="ma-2 pa-2"
              hide-details
              v-model="AddressEdit"
          />
          <v-text-field
              variant="outlined"
              label="INN"
              class="ma-2 pa-2"
              hide-details
              v-model="InnEdit"
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
              @click="onClickShowEdit = false"
              class="pa-2 ma-2"
              variant="outlined"
              text="CANCEL"
              elevation="7"
          />
          <v-btn

              @click="onClickConfirmEdit"
              class="pa-2 ma-2"
              variant="outlined"
              text="CONFIRM"
              elevation="7"
          />
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container class="w-75 d-flex flex-column justify-space-around">
      <v-dialog v-model="onClickShowDialog" class="w-75">
        <v-card style="color: navajowhite; background-color: rgba(33,103,105,2);border: 1px solid navajowhite">
          <v-card-title class="d-flex justify-center align-center">ADD NEW COUNTERPARTY</v-card-title>
          <v-card-text class="d-flex flex-row align-center">
            <v-text-field
                class="pa-2 ma-2"
                hide-details
                label="NAME"
                variant="outlined"
                v-model="addCounterpartyName"
            />
            <v-text-field
                class="pa-2 ma-2"
                hide-details
                label="ADDRESS"
                variant="outlined"
                v-model="addCounterpartyAddress"
            />
            <v-text-field
                class="pa-2 ma-2"
                hide-details
                label="INN"
                variant="outlined"
                v-model="addVCounterpartyInn"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
                @click="onClickShowDialog = false"
                class="ma-2 pa-2"
                text="CLOSE"
                variant="outlined"
                elevation="7"
            />
            <v-btn
                @click="onClickAddCounterparty"
                class="ma-2 pa-2"
                text="CREATE"
                variant="outlined"
                elevation="7"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="d-flex align-center ">
        <div
            style="color: navajowhite"
            class="w-25 d-flex justify-start align-center pa-2"
        >NAME
        </div>
        <div
            style="color: navajowhite"
            class="w-25 d-flex justify-center align-center"
        >ADDRESS
        </div>
        <div
            style="color: navajowhite"
            class="w-25 d-flex justify-center align-center"
        >INN
        </div>
        <div
            style="color: navajowhite"
            class="w-25 d-flex flex-row justify-end align-center"
        >
          <v-btn
              class="pa-2 ma-2"
              @click="onClickShowDialog = true"
              text="ADD"
              variant="outlined"
          />
        </div>
      </div>
      <div
          v-for="counterparty in filteredCounterparties"
          :key="counterparty.id"
          class="d-flex flex-row mt-1 rounded"
          style="color: navajowhite; background:rgba(33,103,105,2)"
      >
        <div style="color: navajowhite" class="w-25 d-flex justify-start align-center pa-2">{{counterparty.name}}</div>
        <div style="color: navajowhite" class="w-25 d-flex justify-center align-center">{{counterparty.address}}</div>
        <div style="color: navajowhite" class="w-25 d-flex justify-center align-center">{{counterparty.inn}}</div>
        <div style="color: navajowhite" class="w-25 d-flex flex-row justify-end align-center">
          <v-btn
              @click="onClickEditCounterparty(counterparty)"
              class="pa-2 ma-2"
              text="EDIT"
              variant="outlined"
              elevation="7"
          />
          <WarnBtn
              :id="counterparty.id"
              :onDelete="onClickDeleteCounterparty"
              class="pa-2 ma-2"
              text="DELETE"
              variant="outlined"
              elevation="7"
          />
        </div>
      </div>
    </v-container>
  </v-container>
</template>
<script setup>
import {useRoomStore} from "../roomStore/piniaRoomStore.js";
import {computed, ref} from "vue";
import NavBar from "./NavBar.vue";
import WarnBtn from "./WarnBtn.vue";

let store = useRoomStore()
let onClickShowDialog = ref(false)
let onClickShowEdit = ref(false)
let currendEditID = ref(-1 )

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
