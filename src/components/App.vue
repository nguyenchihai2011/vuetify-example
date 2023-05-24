<template>
  <v-app>
    <router-view name="navbar-app" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
