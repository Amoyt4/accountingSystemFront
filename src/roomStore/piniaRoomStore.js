import { defineStore } from "pinia";
import axios from "axios";

export const useRoomStore = defineStore("roomStore", {
    state: () => ({
        contracts: [],
        contractStages:[],
        counterparties:[],
        subContracts:[],
        currentContractId: 0,
        currentContractStagesId: 0,
        currentCounterpartiesId: 0,
        currentSubContractsId: 0,
        API_BASE_URL : 'http://localhost:8888',
        token : null,
        auth : false,
    }),
    getters: {
        getCurrentContractId(){
            this.currentContractId += 1;
            return this.currentContractId;
        },
        getCurrentContractStagesId(){
            this.currentContractStagesId += 1;
            return this.currentContractStagesId;
        },
        getCurrentCounterpartiesId(){
            this.currentCounterpartiesId += 1;
            return this.currentCounterpartiesId;
        },
        getCurrentSubContractsId(){
            this.currentSubContractsId += 1;
            return this.currentSubContractsId;
        },

    },
    actions: {
        loadAllData(){
            try{
                this.fetchSubContracts()
                this.fetchContractStages()
                this.fetchCounterparties()
                this.fetchContracts()
            }
            catch (e){
                console.log(e)
            }
        },

        async fetchSubContracts() {
            try {
                const response = await axios.get(`${this.API_BASE_URL}/sub-contracts`,{
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.subContracts = response.data;
                this.currentSubContractsId  = this.subContracts.length +1 ;
            } catch (error) {
                console.error('Ошибка при загрузке sub-contracts:', error);
                throw error;
            }
        },

        async fetchContractStages() {
            try {
                const response = await axios.get(`${this.API_BASE_URL}/contract-stages`,{
                    headers:{
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.contractStages = response.data;
                this.currentContractStagesId  = this.contractStages.length + 1;
            } catch (error) {
                console.error('Ошибка при загрузке contract-stages:', error);
                throw error;
            }
        },

        async fetchCounterparties() {
            try {
                const response = await axios.get(`${this.API_BASE_URL}/counterparties`,{
                    headers:{
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                this.counterparties = response.data;
                this.currentCounterpartiesId  = this.counterparties.length + 1;
            } catch (error) {
                console.error('Ошибка при загрузке counterparties:', error);
                throw error;
            }
        },

        async fetchContracts() {
            try {
                const response = await axios.get(`${this.API_BASE_URL}/my-contracts`,{
                    headers:{
                        Authorization:`Bearer ${this.token}`,
                    },
                });
                this.contracts = response.data;
                this.currentContractId  = this.contracts.length + 1;
            } catch (error) {
                console.error('Ошибка при загрузке contracts:', error);
                throw error;
            }
        },
    }
});
