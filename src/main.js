import {createApp} from "vue";
import App from "@/App.vue";
import {createPinia} from "pinia";
import router from "@/router/router.js";
import {vuetify} from "@/UI/UI-kit.js";

const app = createApp(App);

app.use(createPinia()).use(router).use(vuetify).mount("#app");
