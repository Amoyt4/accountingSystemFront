import { defineStore } from "pinia";
import axios from "axios";

export const useRoomStore = defineStore("roomStore", {
    state: () => ({
        // contracts: [{"id":1,"name":"Contract 1","contractType":"Type A","plannedStartDate":"2023-01-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-01-01","actualEndDate":"2023-12-31","amount":100000,"stages":[1,2],"subContracts":[1]},{"id":2,"name":"Contract 2","contractType":"Type B","plannedStartDate":"2023-02-01","plannedEndDate":"2023-11-30","actualStartDate":"2023-02-01","actualEndDate":"2023-11-30","amount":200000,"stages":[3,4],"subContracts":[2]},{"id":3,"name":"Contract 3","contractType":"Type C","plannedStartDate":"2023-03-01","plannedEndDate":"2023-10-31","actualStartDate":"2023-03-01","actualEndDate":"2023-10-31","amount":300000,"stages":[5,6],"subContracts":[3]},{"id":4,"name":"Contract 4","contractType":"Type D","plannedStartDate":"2023-04-01","plannedEndDate":"2023-09-30","actualStartDate":"2023-04-01","actualEndDate":"2023-09-30","amount":400000,"stages":[7,8],"subContracts":[4]},{"id":5,"name":"Contract 5","contractType":"Type E","plannedStartDate":"2023-05-01","plannedEndDate":"2023-08-31","actualStartDate":"2023-05-01","actualEndDate":"2023-08-31","amount":500000,"stages":[9,10],"subContracts":[5]},{"id":6,"name":"Contract 6","contractType":"Type F","plannedStartDate":"2023-06-01","plannedEndDate":"2023-07-31","actualStartDate":"2023-06-01","actualEndDate":"2023-07-31","amount":600000,"stages":[],"subContracts":[6]},{"id":7,"name":"Contract 7","contractType":"Type G","plannedStartDate":"2023-07-01","plannedEndDate":"2023-06-30","actualStartDate":"2023-07-01","actualEndDate":"2023-06-30","amount":700000,"stages":[],"subContracts":[7]},{"id":8,"name":"Contract 8","contractType":"Type H","plannedStartDate":"2023-08-01","plannedEndDate":"2023-05-31","actualStartDate":"2023-08-01","actualEndDate":"2023-05-31","amount":800000,"stages":[],"subContracts":[8]},{"id":9,"name":"Contract 9","contractType":"Type I","plannedStartDate":"2023-09-01","plannedEndDate":"2023-04-30","actualStartDate":"2023-09-01","actualEndDate":"2023-04-30","amount":900000,"stages":[],"subContracts":[9]},{"id":10,"name":"Contract 10","contractType":"Type J","plannedStartDate":"2023-10-01","plannedEndDate":"2023-03-31","actualStartDate":"2023-10-01","actualEndDate":"2023-03-31","amount":1000000,"stages":[],"subContracts":[10]}],
        // contractStages: [{"id":1,"name":"Stage 1","plannedStartDate":"2023-01-01","plannedEndDate":"2023-06-30","actualStartDate":"2023-01-01","actualEndDate":"2023-06-30","amount":50000,"materialCostsPlan":20000,"materialCostsActual":15000,"salaryCostsPlan":30000,"salaryCostsActual":25000},{"id":2,"name":"Stage 2","plannedStartDate":"2023-07-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-07-01","actualEndDate":"2023-12-31","amount":50000,"materialCostsPlan":25000,"materialCostsActual":20000,"salaryCostsPlan":25000,"salaryCostsActual":20000},{"id":3,"name":"Stage 3","plannedStartDate":"2023-02-01","plannedEndDate":"2023-05-31","actualStartDate":"2023-02-01","actualEndDate":"2023-05-31","amount":70000,"materialCostsPlan":30000,"materialCostsActual":25000,"salaryCostsPlan":40000,"salaryCostsActual":35000},{"id":4,"name":"Stage 4","plannedStartDate":"2023-06-01","plannedEndDate":"2023-08-31","actualStartDate":"2023-06-01","actualEndDate":"2023-08-31","amount":80000,"materialCostsPlan":35000,"materialCostsActual":30000,"salaryCostsPlan":45000,"salaryCostsActual":40000},{"id":5,"name":"Stage 5","plannedStartDate":"2023-03-01","plannedEndDate":"2023-07-31","actualStartDate":"2023-03-01","actualEndDate":"2023-07-31","amount":90000,"materialCostsPlan":40000,"materialCostsActual":35000,"salaryCostsPlan":50000,"salaryCostsActual":45000},{"id":6,"name":"Stage 6","plannedStartDate":"2023-08-01","plannedEndDate":"2023-11-30","actualStartDate":"2023-08-01","actualEndDate":"2023-11-30","amount":100000,"materialCostsPlan":45000,"materialCostsActual":40000,"salaryCostsPlan":55000,"salaryCostsActual":50000},{"id":7,"name":"Stage 7","plannedStartDate":"2023-04-01","plannedEndDate":"2023-09-30","actualStartDate":"2023-04-01","actualEndDate":"2023-09-30","amount":110000,"materialCostsPlan":50000,"materialCostsActual":45000,"salaryCostsPlan":60000,"salaryCostsActual":55000},{"id":8,"name":"Stage 8","plannedStartDate":"2023-10-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-10-01","actualEndDate":"2023-12-31","amount":120000,"materialCostsPlan":55000,"materialCostsActual":50000,"salaryCostsPlan":65000,"salaryCostsActual":60000},{"id":9,"name":"Stage 9","plannedStartDate":"2023-05-01","plannedEndDate":"2023-10-31","actualStartDate":"2023-05-01","actualEndDate":"2023-10-31","amount":130000,"materialCostsPlan":60000,"materialCostsActual":55000,"salaryCostsPlan":70000,"salaryCostsActual":65000},{"id":10,"name":"Stage 10","plannedStartDate":"2023-11-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-11-01","actualEndDate":"2023-12-31","amount":140000,"materialCostsPlan":65000,"materialCostsActual":60000,"salaryCostsPlan":75000,"salaryCostsActual":70000}],
        // counterparties: [{"id":1,"name":"Counterparty 1","address":"Address 1","inn":"1234567890"},{"id":2,"name":"Counterparty 2","address":"Address 2","inn":"0987654321"},{"id":3,"name":"Counterparty 3","address":"Address 3","inn":"1122334455"},{"id":4,"name":"Counterparty 4","address":"Address 4","inn":"2233445566"},{"id":5,"name":"Counterparty 5","address":"Address 5","inn":"3344556677"},{"id":6,"name":"Counterparty 6","address":"Address 6","inn":"4455667788"},{"id":7,"name":"Counterparty 7","address":"Address 7","inn":"5566778899"},{"id":8,"name":"Counterparty 8","address":"Address 8","inn":"6677889900"},{"id":9,"name":"Counterparty 9","address":"Address 9","inn":"7788990011"},{"id":10,"name":"Counterparty 10","address":"Address 10","inn":"8899001122"}],
        // subContracts: [{"id":1,"name":"Sub Contract 1","contractType":"Type A","amount":30000,"plannedStartDate":"2023-03-01","plannedEndDate":"2023-09-30","actualStartDate":"2023-03-01","actualEndDate":"2023-09-30","counterpartyId":1},{"id":2,"name":"Sub Contract 2","contractType":"Type B","amount":40000,"plannedStartDate":"2023-04-01","plannedEndDate":"2023-10-31","actualStartDate":"2023-04-01","actualEndDate":"2023-10-31","counterpartyId":2},{"id":3,"name":"Sub Contract 3","contractType":"Type C","amount":50000,"plannedStartDate":"2023-05-01","plannedEndDate":"2023-11-30","actualStartDate":"2023-05-01","actualEndDate":"2023-11-30","counterpartyId":3},{"id":4,"name":"Sub Contract 4","contractType":"Type D","amount":60000,"plannedStartDate":"2023-06-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-06-01","actualEndDate":"2023-12-31","counterpartyId":4},{"id":5,"name":"Sub Contract 5","contractType":"Type E","amount":70000,"plannedStartDate":"2023-07-01","plannedEndDate":"2023-08-31","actualStartDate":"2023-07-01","actualEndDate":"2023-08-31","counterpartyId":5},{"id":6,"name":"Sub Contract 6","contractType":"Type F","amount":80000,"plannedStartDate":"2023-08-01","plannedEndDate":"2023-09-30","actualStartDate":"2023-08-01","actualEndDate":"2023-09-30","counterpartyId":6},{"id":7,"name":"Sub Contract 7","contractType":"Type G","amount":90000,"plannedStartDate":"2023-09-01","plannedEndDate":"2023-10-31","actualStartDate":"2023-09-01","actualEndDate":"2023-10-31","counterpartyId":7},{"id":8,"name":"Sub Contract 8","contractType":"Type H","amount":100000,"plannedStartDate":"2023-10-01","plannedEndDate":"2023-11-30","actualStartDate":"2023-10-01","actualEndDate":"2023-11-30","counterpartyId":8},{"id":9,"name":"Sub Contract 9","contractType":"Type I","amount":110000,"plannedStartDate":"2023-11-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-11-01","actualEndDate":"2023-12-31","counterpartyId":9},{"id":10,"name":"Sub Contract 10","contractType":"Type J","amount":120000,"plannedStartDate":"2023-12-01","plannedEndDate":"2023-12-31","actualStartDate":"2023-12-01","actualEndDate":"2023-12-31","counterpartyId":10}],
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
