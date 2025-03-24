import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

export const vuetify = createVuetify({
    components,
    directives,
    defaults: {
        VTextField: {
            variant: 'outlined',
            hideDetails: true,
        },
    },
    theme: {
        defaultTheme: "light",
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
});
