<template>
  <div class="header">
    <span class="filler"></span>
    <Sprite class="eyes-logo" src="/sprites/eyes_sprite_2.png" :w="33" :h="21"
      :pos-x="eyesPositionX" :correction="1.01" />
    <div class="title">EYES OF NOITA</div>
    <Sprite class="eyes-logo" src="/sprites/eyes_sprite_2.png" :w="33" :h="21"
      :pos-x="5 - eyesPositionX" :correction="1.01" />
    <ToggleDarkTheme class="toggle-dark-theme" />
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import Sprite from '../utils/Sprite.vue';
import {useInterval} from '@vueuse/core';
import ToggleDarkTheme from '../utils/ToggleDarkTheme.vue';

const eyesPositionX = ref(0);
useInterval(5e2, {
  callback: () => {eyesPositionX.value = (eyesPositionX.value + 1) % 5}
});
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  backdrop-filter: var(--general-blur);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--padding);

  border-bottom: 1px solid var(--border-color);

  .eyes-logo {
    width: 33px;
    height: var(--header-hight);
    image-rendering: pixelated;
    filter: drop-shadow(0 0 3px var(--always-white));
  }
  .title {
    font-size: 28px;
    font-weight: 700;
    color: var(--always-black);
    filter: drop-shadow(0 0 3px var(--always-white));
  }
  .toggle-dark-theme {
    width: 30px;
    height: 30px;
    justify-content: center;
    &:deep(.name) {
      display: none;
    }
  }
}
</style>
