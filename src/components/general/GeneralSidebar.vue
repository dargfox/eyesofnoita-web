<template>
  <div class="sidebar">
    <div class="container">
      <template v-for="item, key of items">
        <RouterLink :key="key + 'l'" v-if="item.to" :to="item.to">
          <Icon :icon="item.icon" />
          <span class="name">{{ item.name }}</span>
        </RouterLink>
        <GeneralButton :key="key + 'b'" v-else-if="item.callback" @click="item.callback">
          <Icon :icon="item.icon" />
          <span class="name">{{ item.name }}</span>
        </GeneralButton>
      </template>
      <span class="divider"></span>
      <span class="spacer"></span>
      <SwitchBackground class="switch-background" />
      <ToggleDarkTheme class="dark-theme-toggle" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type {ISidebarItem} from '@/utils/types';
import ToggleDarkTheme from '../utils/ToggleDarkTheme.vue';
import GeneralButton from './GeneralButton.vue';
import {Icon} from '@iconify/vue';
import SwitchBackground from '../utils/SwitchBackground.vue';

interface IProps {
  items: ISidebarItem[];
}

defineProps<IProps>();
</script>
<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  height: 100%;
  width: 100%;

  padding: var(--padding);
  padding-left: 0;

  backdrop-filter: var(--general-blur);
  border-right: 1px solid var(--border-color);

  .container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--container-color);
    border-radius: 0 var(--border-radius) var(--border-radius) 0;

    & > *:not(.spacer):not(.divider) {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: var(--gap-sm);
      padding: 0 var(--padding-sm);
      color: var(--text-color);
      text-decoration: none;
      background: none;
      border: none;

      svg {
        width: 20px;
        min-width: 20px;
        height: 20px;
      }
    }
    .divider {
      width: 100%;
      height: 0px;
      border-bottom: 1px solid var(--border-color);
      margin: var(--padding) 0;
    }
    .spacer {
      flex: 1;
    }
  }
}
</style>

