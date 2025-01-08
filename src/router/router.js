import { createMemoryHistory, createRouter } from "vue-router";
import App from "../App.vue";
import Contract from "../components/Contract.vue";
import Contractor from "../components/Contractor.vue";
import Info from "../pages/Info.vue";
import Report from "../pages/Report.vue";
const routes = [
    {
        path: "/",
        component: Info,
    },
    {
        path: "/contract",
        component: Contract,
    },
    {
        path: "/contractor",
        component: Contractor,
    },
    {
        path: "/report",
        component: Report,
    }
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
