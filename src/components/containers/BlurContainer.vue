<template>
  <div class="blur-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.blur-container {
  backdrop-filter: var(--general-blur);
  padding: var(--padding-lg);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  // overflow-y: auto;
  scrollbar-width: none;
}
</style>
