<template>
  <v-app-bar
  absolute
  style="background: rgba(33,103,105,2);"
  >
    <v-app-bar-title>
      <router-link style="color: navajowhite;text-decoration: none;" to="/Info">
        <h2 class="pa-2 ml-0">Accounting System</h2>
      </router-link>
    </v-app-bar-title>

    <router-link style="color: navajowhite" to="/contract">
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-file-document-edit-outline
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link style="color: navajowhite" to="/contractor">
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-earth
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link style="color: navajowhite" to="/report">
      <v-app-bar-nav-icon>
        <v-icon size="large">
          mdi-microsoft-excel
        </v-icon>
      </v-app-bar-nav-icon>
    </router-link>
    <router-link style="color: navajowhite" to="/admin">
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
          style="
          color: navajowhite;text-decoration: none;"
          to="/">
        <v-btn
            size="medium"
            class="pa-2"
            variant="outlined"
            base-color="navajowhite"
            style="background:teal">
          SIGN OUT
        </v-btn>
      </router-link>
    </v-speed-dial>
  </v-app-bar>
</template>