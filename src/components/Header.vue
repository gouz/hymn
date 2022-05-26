<template lang="pug">
header
    a#github(
        href="https://github.com/gouz/hymn",
        rel="noopener",
        title="Link to the project",
        target="_blank"
      )
        include ../assets/img/github.svg
        span.a11y Link to the source
</template>

<style lang="less">
header {
  @apply fixed;
  @apply w-full;
  @apply flex items-center justify-end;

  #github {
    @apply text-slate-300;
    @apply m-2;

    svg {
      @apply w-10 h-10;
    }

    &:hover {
      @apply text-red-300;
    }
  }
}
</style>
