<template>
  <div class="image-container">
    <slot>
      <img :src="src" :alt="alt ?? 'image'" />
    </slot>
  </div>
</template>
<script setup lang="ts">
import type {ImageProps} from '@/utils/types';

defineProps<ImageProps>();
</script>
<style lang="scss" scoped>
.image-container {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
