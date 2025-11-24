<template>
  <Component :is="selectedLayout" />
</template>
<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue';

const LAYOUTS = {
  "default": defineAsyncComponent(() => import('./DefaultLayout.vue')),
} as const;

const selectedLayout = computed(() => LAYOUTS['default']);
</script>
