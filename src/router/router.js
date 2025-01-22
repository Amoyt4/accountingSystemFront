import { createWebHistory, createRouter } from "vue-router";
import Contract from "../components/Contract.vue";
import Contractor from "../components/Contractor.vue";
import Info from "../pages/Info.vue";
import Report from "../pages/Report.vue";
import Admin from "../components/Admin.vue";
import Registration from "../pages/Registration.vue"; // Импорт компонента
import SignIN from "../pages/SignIN.vue";

const routes = [
    {
        path: "/registration",
        component: Registration,
    },
    {
        path: "/Info",
        component: Info,
    },
    {
        path: "/",
        component: SignIN,
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
    },
    {
        path: "/admin",
        component: Admin,
    },
];

export const router = createRouter({
    history: createWebHistory(), // Используем createWebHistory для SPA
    routes,
});