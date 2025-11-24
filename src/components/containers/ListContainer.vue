<template>
  <BlurContainer class="wrapper">
    <slot name=""></slot>
    <CustomScrollbar
      :style="{height: '100%', borderRadius: '5px'}"
      :wrapperStyle="{height: '100%', width: '100%'}"
      :contentStyle="{height: '100%', width: '100%'}"
    >
      <div class="list-container">
        <slot></slot>
      </div>
    </CustomScrollbar>
  </BlurContainer>
</template>
<script setup lang="ts">
import BlurContainer from './BlurContainer.vue';

</script>
<style lang="scss" scoped>
.list-container {
  --columns: 1;
  background: var(--container-color);
  color: var(--text-color);
  padding: var(--padding-sm);
  border-radius: var(--border-radius-sm);
  min-height: 100%;

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(auto-fill, minmax(40px, 1fr));
  gap: var(--gap-sm);
}
</style>
