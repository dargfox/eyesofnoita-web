<template>
  <div class="layout" :data-dark="isDark">
    <div class="header"><slot name="header"></slot></div>
    <div class="sidebar"><slot name="sidebar"></slot></div>
    <div class="content"><slot name="content"><RouterView /></slot></div>
    <div class="footer"><slot name="footer"></slot></div>
    <div class="modals"><slot name="modals"></slot></div>
  </div>
</template>
<script setup lang="ts">
import {useGlobalStore} from '@/stores/global.store';
import {useDark} from '@vueuse/core';
import {storeToRefs} from 'pinia';
import {computed} from 'vue';
import {RouterView} from 'vue-router';

const { currentBackgroundURL, nextBackgroundURL } = storeToRefs(useGlobalStore());

const isDark = useDark();
const backgroundURL = computed(() => `url('${currentBackgroundURL.value}')`);
// Little hack to avoid flickering of background image
const nextBackgroundURL_ = computed(() => `url('${nextBackgroundURL.value}')`);

</script>
<style lang="scss" scoped>
.layout {
  --transition-time: .3s;

  display: grid;
  grid-template-areas:
    "header"
    "content"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: var(--header-height) 1fr var(--footer-height);

  width: 100%;
  height: 100dvh;

  background: v-bind(backgroundURL);
  transition: ease-in-out grid-template-columns var(--transition-time) var(--transition-time);

  // Little hack to avoid flickering of background image
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 1px;
    background: v-bind(nextBackgroundURL_);
    opacity: 0;
    pointer-events: none;
  }

  .header {
    grid-area: header;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .sidebar {
    position: fixed;
    height: calc( 100dvh - var(--header-height) );
    width: var(--sidebar-width);
    top: var(--header-height);
    left: 0px;
    z-index: 100;


    transform: translate3d(calc(-100% + var(--sidebar-width-closed)), 0px, -2px);
    transition: ease-in-out transform var(--transition-time);

    &:not(:hover):deep(.sidebar .container) {
      align-items: end;

      & > * {
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        animation: fade-sidebar-close .3s linear forwards;
      }
      .divider {
        height: 1px;
      }

      .name {
        display: none;
      }
    }

    &:hover {
      transform: translate3d(0px, 0px, -1px);

      &:deep(.sidebar .container > *) {
        animation: fade-sidebar-open .3s linear forwards;
      }
    }
  }
  .content {
    grid-area: content;
    max-height: calc(100dvh - var(--header-height));
    height: calc(100dvh - var(--header-height));
    margin-left: var(--sidebar-width-closed);
  }
  .footer {
    display: none !important;
    grid-area: footer;
  }
  .modals {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .header, .sidebar, .content, .footer, .modals {
    display: flex;
  }
}

@keyframes fade-sidebar-close {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-sidebar-open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
