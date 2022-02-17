<template>
  <button
    class="p-1 text-green-500 border-solid rounded border border-green-500 hover:bg-green-500 hover:text-white"
    @click="buttonClick"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "PxButton",

  methods: {
    buttonClick() {
      this.$emit("custom-click");
    },
  },
};
</script>
