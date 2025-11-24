<template>
  <GeneralButton @click="globalStore.nextBackground()" type="button">
    <Icon icon="material-symbols:image-outline" />
    <span class="name">Switch Background</span>
  </GeneralButton>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import GeneralButton from '../general/GeneralButton.vue';
import {useGlobalStore} from '@/stores/global.store';

const globalStore = useGlobalStore();

</script>
<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}
</style>
