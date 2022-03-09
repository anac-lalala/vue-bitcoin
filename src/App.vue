<template>
  <px-header></px-header>
  <main class="container px-5 sm:px-20 py-20">
    <router-view />
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader";

export default {
  name: "App",
  components: {
    PxHeader,
  },
};
</script>

<style lang="scss"></style>
