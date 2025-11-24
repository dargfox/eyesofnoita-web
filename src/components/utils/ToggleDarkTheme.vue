<template>
  <GeneralButton @click="toggleDark()" type="button">
    <Icon icon="material-symbols:light-mode" v-if="isDark" />
    <Icon icon="material-symbols:dark-mode" v-else />
    <span class="name">Toggle Dark Theme</span>
  </GeneralButton>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {useDark, useToggle} from '@vueuse/core';
import GeneralButton from '../general/GeneralButton.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>
<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}
</style>
