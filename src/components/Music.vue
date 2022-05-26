<script setup lang="ts">
import Cipher from "../assets/js/Cipher";
import Composer from "../assets/js/Composer";
import SheetAudio from "../assets/js/SheetAudio";

import { useStore } from "../stores/hymn";
const hymnStore = useStore();

hymnStore.$subscribe((mutation, state) => {
  magic(state.sentence);
});

const printSheet = () => {
  window.print();
};

const changeText = () => {
  document.getElementById("form").classList.remove("hide");
  document.getElementById("music").classList.add("hide");
};

const magic = (text) => {
  if ("" != text) {
    const composer = new Composer(
      text,
      new Cipher().encode(text),
      hymnStore.ranges,
      hymnStore.rhythms
    );
    new SheetAudio("sheet", "audio", composer.render());
  }
};
</script>
<template lang="pug">
#music.jumbotron.hide
    #sheet
    #audio
    #buttons-wrapper
        button(type="button", @click="printSheet")
            include ../assets/img/print.svg
            span Print
        button(type="button", @click="changeText")
            include ../assets/img/edit.svg
            span Change text
</template>

<style lang="less">
#music {
  width: 880px;
}

#audio {
  @apply my-4;
}

#sheet {
  @apply bg-white text-black;
  @apply px-4 pb-8;
  @apply rounded;
  height: auto !important;
}

#buttons-wrapper {
  @apply flex items-center justify-around;
}
</style>
