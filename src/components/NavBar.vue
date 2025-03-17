<template>
  <v-app-bar
    absolute
    style="background: rgba(33,103,105,2);"
  >
    <v-app-bar-title>
      <router-link
          to="/Info"
          style="color: navajowhite;text-decoration: none;"
      >
        <h2 class="pa-2 ml-0">Accounting System</h2>
      </router-link>
    </v-app-bar-title>

    <router-link
        to="/contract"
        style="color: navajowhite"
    >
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-file-document-edit-outline
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link
        to="/contractor"
        style="color: navajowhite"
    >
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-earth
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link
        to="/report"
        style="color: navajowhite"
    >
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-microsoft-excel
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link
        to="/admin"
        style="color: navajowhite"
    >
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-information-box-outline
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <v-speed-dial
        class="mr-8"
        location="bottom center"
        transition="fade-transition"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-app-bar-nav-icon
            v-bind="activatorProps"
            color="#f3e5c3"
            icon="mdi-account-outline"
        />
      </template>
      <router-link
          to="/"
          style="color: navajowhite;text-decoration: none;"
      >
        <v-btn
            class="pa-2"
            size="medium"
            variant="outlined"
            base-color="navajowhite"
            style="background:teal"
        >
          SIGN OUT
        </v-btn>
      </router-link>
    </v-speed-dial>
  </v-app-bar>
</template>