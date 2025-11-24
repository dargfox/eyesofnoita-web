<template>
  <div class="wrapper">
    <div ref="spriteElement" class="sprite-img" :src="src" :alt="alt" />
  </div>
</template>
<script setup lang="ts">
import {useElementBounding} from '@vueuse/core';
import {computed, ref} from 'vue';

interface IProps {
  src: string;
  alt?: string;
  w: number;
  h: number;
  posX?: number;
  posY?: number;
  scaleX?: number;
  scaleY?: number;
  correction?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  posX: 0,
  posY: 0,
  scaleX: 1,
  scaleY: 1,
  correction: 1.00,
})

const spriteElement = ref();
const { width, height } = useElementBounding(spriteElement);

const widthPX = computed(() => width.value + 'px');
const heightPX = computed(() => height.value + 'px');
const srcURL = computed(() => `url(${props.src})`);
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .sprite-img {
    background-image: v-bind(srcURL);
    background-position:
      calc( v-bind(widthPX) * v-bind(posX) * v-bind(correction) )
      calc( v-bind(heightPX) * v-bind(posY) * v-bind(correction) );
    background-size: cover;

    width: 100%;
    aspect-ratio: v-bind(w) / v-bind(h);
  }
}
</style>
