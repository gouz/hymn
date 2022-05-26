<template lang="pug">
#music.jumbotron.hide
    #sheet
    #audio
    #buttons-wrapper
        button#print(type="button")
            include ../assets/img/print.svg
            span Print
        button#new(type="button")
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
