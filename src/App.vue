<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import Music from "./components/Music.vue";

import { useStore } from "./stores/hymn";

const store = useStore();
onMounted(() => {
  store.fetchRanges();
  store.fetchRhythms();
});

function showMusic() {
  document.getElementById("form").classList.add("hide");
  document.getElementById("music").classList.remove("hide");
}
</script>

<template lang="pug">
Header
main
  Form(@maestro="showMusic")
  Music
</template>

<style lang="less">
#app {
  @apply w-full h-full;
}

main {
  @apply flex items-center justify-center;
  @apply w-full h-full;

  .jumbotron {
    @apply rounded-lg;
    @apply bg-slate-100;
    @apply px-8 py-4;
    @apply shadow-lg shadow-slate-600;
    @apply border border-slate-900;
  }
}
</style>
