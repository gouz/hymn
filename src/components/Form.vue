<script lang="ts" setup>
import { ref } from "vue";

let sentence: Ref<string> = ref("");

function maestro(): void {
  alert(sentence.value);
}
</script>
<template lang="pug">
#form.jumbotron
    h1 Hymn
    p Transform your text into a song !
    form
        button.hide(type="submit", disabled, aria-hidden="true")
        input(type="text", placeholder="Your text", v-model="sentence")
        button(type="button", @click="maestro") 
            include ../assets/img/music.svg
            span Music, maestro !
</template>
<style lang="less">
#form {
  h1 {
    @apply w-full;
    @apply font-bold text-2xl text-center;
  }

  p {
    @apply my-2;
    @apply text-lg text-center;
  }

  form {
    @apply flex items-center justify-center flex-col;

    input {
      @apply px-2 py-1;
      @apply w-96 h-12;
      @apply mb-2;
      @apply rounded;
      @apply text-slate-800 text-lg text-center;
      @apply border border-slate-600;
    }
  }
}
</style>
