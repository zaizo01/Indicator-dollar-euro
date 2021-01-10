<template>
  <v-app>
    <v-main>
      <router-view>
        <v-progress-circular
          indeterminate
          color="primary"
          v-model="loading.states"
        ></v-progress-circular>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['loading'])
  },
};
</script>
