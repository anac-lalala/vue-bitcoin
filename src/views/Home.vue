<template>
  <div>
    <grid-loader :loading="isLoading" :color="'#68d391'"> </grid-loader>
    <px-assets-table v-if="!isLoading" :assets="assets"></px-assets-table>
  </div>
</template>

<script>
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";
import GridLoader from "vue-spinner/src/GridLoader.vue";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
    GridLoader,
  },

  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  },
};
</script>
